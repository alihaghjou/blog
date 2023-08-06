export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          content: string | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
