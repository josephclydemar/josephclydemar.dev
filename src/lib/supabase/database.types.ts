// Supabase Database Types
// These types match the actual Supabase schema

export interface Database {
  public: {
    Tables: {
      portfolio_config: {
        Row: {
          id: string;
          personal_info: {
            greeting: string;
            name: string;
            position: string;
            tagline?: string;
            profileImage?: string;
            resumeUrl?: string;
          };
          social_links: {
            email?: string;
            github?: string;
            linkedin?: string;
            twitter?: string;
            instagram?: string;
            facebook?: string;
            discord?: string;
            website?: string;
          };
          about_me: {
            title: string;
            description: string;
            highlights?: string[];
            yearsOfExperience?: number;
            location?: string;
          };
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          personal_info: Database['public']['Tables']['portfolio_config']['Row']['personal_info'];
          social_links: Database['public']['Tables']['portfolio_config']['Row']['social_links'];
          about_me: Database['public']['Tables']['portfolio_config']['Row']['about_me'];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          personal_info?: Database['public']['Tables']['portfolio_config']['Row']['personal_info'];
          social_links?: Database['public']['Tables']['portfolio_config']['Row']['social_links'];
          about_me?: Database['public']['Tables']['portfolio_config']['Row']['about_me'];
          is_active?: boolean;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'other';
          proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
          icon?: string;
          order?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'other';
          proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
          icon?: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'other';
          proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
          icon?: string;
          order?: number;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string;
          long_description?: string;
          thumbnail: string;
          images: string[];
          technologies: string[];
          github_url?: string;
          live_url?: string;
          features?: string[];
          status?: 'completed' | 'in-progress' | 'planned';
          start_date?: string;
          end_date?: string;
          is_featured?: boolean;
          order?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          long_description?: string;
          thumbnail: string;
          images?: string[];
          technologies: string[];
          github_url?: string;
          live_url?: string;
          features?: string[];
          status?: 'completed' | 'in-progress' | 'planned';
          start_date?: string;
          end_date?: string;
          is_featured?: boolean;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          long_description?: string;
          thumbnail?: string;
          images?: string[];
          technologies?: string[];
          github_url?: string;
          live_url?: string;
          features?: string[];
          status?: 'completed' | 'in-progress' | 'planned';
          start_date?: string;
          end_date?: string;
          is_featured?: boolean;
          order?: number;
          updated_at?: string;
        };
      };
      experiences: {
        Row: {
          id: string;
          position: string;
          company: string;
          employment_type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
          location: string;
          start_date: string;
          end_date?: string;
          is_current_role?: boolean;
          logo?: string;
          description: string;
          responsibilities: string[];
          achievements: string[];
          skills: string[];
          order?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          position: string;
          company: string;
          employment_type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
          location: string;
          start_date: string;
          end_date?: string;
          is_current_role?: boolean;
          logo?: string;
          description: string;
          responsibilities: string[];
          achievements: string[];
          skills: string[];
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          position?: string;
          company?: string;
          employment_type?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
          location?: string;
          start_date?: string;
          end_date?: string;
          is_current_role?: boolean;
          logo?: string;
          description?: string;
          responsibilities?: string[];
          achievements?: string[];
          skills?: string[];
          order?: number;
          updated_at?: string;
        };
      };
      educations: {
        Row: {
          id: string;
          school: string;
          degree: string;
          field: string;
          start_date: string;
          end_date?: string;
          is_currently_enrolled?: boolean;
          logo?: string;
          description: string;
          courses?: string[];
          achievements?: string[];
          gpa?: string;
          order?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school: string;
          degree: string;
          field: string;
          start_date: string;
          end_date?: string;
          is_currently_enrolled?: boolean;
          logo?: string;
          description: string;
          courses?: string[];
          achievements?: string[];
          gpa?: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          school?: string;
          degree?: string;
          field?: string;
          start_date?: string;
          end_date?: string;
          is_currently_enrolled?: boolean;
          logo?: string;
          description?: string;
          courses?: string[];
          achievements?: string[];
          gpa?: string;
          order?: number;
          updated_at?: string;
        };
      };
      certifications: {
        Row: {
          id: string;
          name: string;
          issuer: string;
          issue_date: string;
          expiry_date?: string;
          credential_id?: string;
          credential_url?: string;
          logo?: string;
          description: string;
          skills: string[];
          validation_details?: string;
          order?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          issuer: string;
          issue_date: string;
          expiry_date?: string;
          credential_id?: string;
          credential_url?: string;
          logo?: string;
          description: string;
          skills: string[];
          validation_details?: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          issuer?: string;
          issue_date?: string;
          expiry_date?: string;
          credential_id?: string;
          credential_url?: string;
          logo?: string;
          description?: string;
          skills?: string[];
          validation_details?: string;
          order?: number;
          updated_at?: string;
        };
      };
    };
  };
}
