'use client';

import { useState } from 'react';
import { Edit, Save, X, Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import type { PersonalInfo, SocialLink, SocialIconType } from '@/types/portfolio.types';
import { SOCIAL_ICON_OPTIONS } from '@/lib/constants/social-icons';

interface PersonalInfoEditorProps {
  personalInfo?: PersonalInfo;
  socialLinks: SocialLink[];
  onUpdate: () => void;
}

export default function PersonalInfoEditor({ personalInfo, socialLinks, onUpdate }: PersonalInfoEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Personal Info State
  const [formData, setFormData] = useState({
    profilePicture: personalInfo?.profilePicture || '',
    greeting: personalInfo?.greeting || '',
    position: personalInfo?.position || '',
    aboutMe: personalInfo?.aboutMe || '',
  });
  const [profilePreview, setProfilePreview] = useState(personalInfo?.profilePicture || '');

  // Social Links State
  const [links, setLinks] = useState<SocialLink[]>(socialLinks);
  const [newLink, setNewLink] = useState<Partial<SocialLink>>({
    name: '',
    icon: 'github',
    url: '',
  });
  const [isAddingLink, setIsAddingLink] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/profile-picture', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const { url } = await response.json();
      setFormData(prev => ({ ...prev, profilePicture: url }));
      setProfilePreview(url);
      setSuccess('Profile picture uploaded successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSavePersonalInfo = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/portfolio/personal-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update personal information');
      }

      setSuccess('Personal information updated successfully!');
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddLink = async () => {
    if (!newLink.name || !newLink.icon || !newLink.url) {
      setError('Please fill in all link fields');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/portfolio/social-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLink),
      });

      if (!response.ok) {
        throw new Error('Failed to add social link');
      }

      const addedLink = await response.json();
      setLinks(prev => [...prev, addedLink]);
      setNewLink({ name: '', icon: 'github', url: '' });
      setIsAddingLink(false);
      setSuccess('Social link added successfully!');
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/portfolio/social-links/${linkId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete social link');
      }

      setLinks(prev => prev.filter(link => link.id !== linkId));
      setSuccess('Social link deleted successfully!');
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      profilePicture: personalInfo?.profilePicture || '',
      greeting: personalInfo?.greeting || '',
      position: personalInfo?.position || '',
      aboutMe: personalInfo?.aboutMe || '',
    });
    setProfilePreview(personalInfo?.profilePicture || '');
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Personal Information
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <Edit className="w-4 h-4" />
            Edit Info
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSavePersonalInfo}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
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

      {/* Personal Info Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Profile Picture
          </label>
          {isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {profilePreview ? (
                  <img 
                    src={profilePreview} 
                    alt="Profile Preview" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500">No image</span>
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="block w-full text-sm text-gray-900 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200 disabled:opacity-50"
                  />
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF or WEBP (MAX. 5MB)
                  </p>
                  {isUploading && (
                    <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">Uploading...</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {formData.profilePicture ? (
                <img 
                  src={formData.profilePicture} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500">No image</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Greeting
          </label>
          {isEditing ? (
            <input
              type="text"
              name="greeting"
              value={formData.greeting}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Hi, I am"
            />
          ) : (
            <p className="text-gray-900 dark:text-white">{formData.greeting || 'Not set'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Position
          </label>
          {isEditing ? (
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Full Stack Developer"
            />
          ) : (
            <p className="text-gray-900 dark:text-white">{formData.position || 'Not set'}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            About Me
          </label>
          {isEditing ? (
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{formData.aboutMe || 'Not set'}</p>
          )}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Social Links ({links.length})
          </h3>
          {!isAddingLink && (
            <button
              onClick={() => setIsAddingLink(true)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </button>
          )}
        </div>

        {/* Add New Link Form */}
        {isAddingLink && (
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add New Link</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Link Name (e.g., GitHub)"
                value={newLink.name}
                onChange={(e) => setNewLink(prev => ({ ...prev, name: e.target.value }))}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newLink.icon}
                onChange={(e) => setNewLink(prev => ({ ...prev, icon: e.target.value as SocialIconType }))}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
              >
                {SOCIAL_ICON_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type="url"
                placeholder="URL (https://...)"
                value={newLink.url}
                onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleAddLink}
                disabled={isSaving}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition text-sm disabled:opacity-50"
              >
                {isSaving ? 'Adding...' : 'Add Link'}
              </button>
              <button
                onClick={() => {
                  setIsAddingLink(false);
                  setNewLink({ name: '', icon: 'github', url: '' });
                }}
                disabled={isSaving}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition text-sm disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Links List */}
        <div className="space-y-2">
          {links.length > 0 ? (
            links.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">
                    {link.icon}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{link.name}</p>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate block"
                    >
                      {link.url}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => link.id && handleDeleteLink(link.id)}
                  disabled={isSaving}
                  className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition disabled:opacity-50"
                  title="Delete link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No social links added yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
