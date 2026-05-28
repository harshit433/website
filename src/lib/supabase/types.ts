export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          role: 'admin' | 'member'
          is_public: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      padas: {
        Row: {
          id: string
          title: string
          lyrics: string
          language: string
          audio_url: string | null
          tags: string[]
          is_public: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['padas']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['padas']['Insert']>
      }
      bhakti_clips: {
        Row: {
          id: string
          title: string
          description: string | null
          youtube_id: string
          start_seconds: number | null
          end_seconds: number | null
          tags: string[]
          rasa_type: string | null
          thumbnail_url: string | null
          created_by: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['bhakti_clips']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['bhakti_clips']['Insert']>
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['journal_entries']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['journal_entries']['Insert']>
      }
      discussions: {
        Row: {
          id: string
          title: string
          channel: string
          created_by: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['discussions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['discussions']['Insert']>
      }
      messages: {
        Row: {
          id: string
          discussion_id: string
          user_id: string
          content: string
          parent_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Pada = Database['public']['Tables']['padas']['Row']
export type BhaktiClip = Database['public']['Tables']['bhakti_clips']['Row']
export type JournalEntry = Database['public']['Tables']['journal_entries']['Row']
export type Discussion = Database['public']['Tables']['discussions']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
