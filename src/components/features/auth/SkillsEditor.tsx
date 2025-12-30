'use client';

import { useState } from 'react';
import { Edit, Save, X, Plus, Trash2, Code } from 'lucide-react';
import type { Skill } from '@/types/portfolio.types';

interface SkillsEditorProps {
  skills: Skill[];
  onUpdate: () => void;
}

const CATEGORIES = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'devops', label: 'DevOps' },
  { value: 'tools', label: 'Tools' },
  { value: 'other', label: 'Other' },
] as const;

const PROFICIENCY_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
] as const;

export default function SkillsEditor({ skills, onUpdate }: SkillsEditorProps) {
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: '',
    category: 'frontend',
    proficiency: 'intermediate',
    icon: '',
    order: 0,
  });

  const handleAddSkill = async () => {
    if (!newSkill.name || !newSkill.category) {
      setError('Please fill in skill name and category');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/portfolio/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      });

      if (!response.ok) {
        throw new Error('Failed to add skill');
      }

      setSuccess('Skill added successfully!');
      setNewSkill({ name: '', category: 'frontend', proficiency: 'intermediate', icon: '', order: 0 });
      setIsAddingSkill(false);
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateSkill = async (skill: Skill) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/portfolio/skills/${skill.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill),
      });

      if (!response.ok) {
        throw new Error('Failed to update skill');
      }

      setSuccess('Skill updated successfully!');
      setEditingSkill(null);
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/portfolio/skills/${skillId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete skill');
      }

      setSuccess('Skill deleted successfully!');
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Code className="w-6 h-6" />
          Skills ({skills.length})
        </h2>
        {!isAddingSkill && (
          <button
            onClick={() => setIsAddingSkill(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        )}
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Add New Skill Form */}
      {isAddingSkill && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add New Skill</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Skill Name (e.g., React)"
              value={newSkill.name}
              onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value as Skill['category'] }))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <select
              value={newSkill.proficiency}
              onChange={(e) => setNewSkill(prev => ({ ...prev, proficiency: e.target.value as Skill['proficiency'] }))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
            >
              {PROFICIENCY_LEVELS.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Icon URL (optional)"
              value={newSkill.icon}
              onChange={(e) => setNewSkill(prev => ({ ...prev, icon: e.target.value }))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Order"
              value={newSkill.order}
              onChange={(e) => setNewSkill(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAddSkill}
              disabled={isSaving}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition text-sm disabled:opacity-50"
            >
              {isSaving ? 'Adding...' : 'Add Skill'}
            </button>
            <button
              onClick={() => {
                setIsAddingSkill(false);
                setNewSkill({ name: '', category: 'frontend', proficiency: 'intermediate', icon: '', order: 0 });
              }}
              disabled={isSaving}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition text-sm disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Skills by Category */}
      <div className="space-y-6">
        {CATEGORIES.map(category => {
          const categorySkills = groupedSkills[category.value] || [];
          if (categorySkills.length === 0) return null;

          return (
            <div key={category.value}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 capitalize">
                {category.label} ({categorySkills.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categorySkills.map(skill => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    {editingSkill?.id === skill.id ? (
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={editingSkill.name}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                        />
                        <select
                          value={editingSkill.proficiency}
                          onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: e.target.value as Skill['proficiency'] })}
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                        >
                          {PROFICIENCY_LEVELS.map(level => (
                            <option key={level.value} value={level.value}>{level.label}</option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateSkill(editingSkill)}
                            disabled={isSaving}
                            className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs disabled:opacity-50"
                          >
                            <Save className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setEditingSkill(null)}
                            disabled={isSaving}
                            className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs disabled:opacity-50"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{skill.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                            {skill.proficiency}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingSkill(skill)}
                            className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition"
                            title="Edit skill"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            disabled={isSaving}
                            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition disabled:opacity-50"
                            title="Delete skill"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {skills.length === 0 && !isAddingSkill && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No skills added yet. Click "Add Skill" to get started.
        </p>
      )}
    </div>
  );
}
