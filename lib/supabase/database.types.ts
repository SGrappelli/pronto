export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string
          owner_id: string
          name: string
          slug: string
          type: string | null
          phone: string | null
          email: string | null
          address: string | null
          timezone: string
          currency: string
          logo_url: string | null
          plan: string
          plan_expires_at: string | null
          telegram_bot_token: string | null
          telegram_chat_id: string | null
          viber_bot_token: string | null
          viber_chat_id: string | null
          owner_whatsapp: string | null
          onboarding_completed: boolean
          ls_customer_id: string | null
          ls_subscription_id: string | null
          ls_variant_id: string | null
          email_provider: string | null
          smtp_host: string | null
          smtp_port: number | null
          smtp_user: string | null
          smtp_pass: string | null
          smtp_from: string | null
          resend_api_key: string | null
          meta_whatsapp_phone_number_id: string | null
          meta_whatsapp_access_token: string | null
          brand_color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          slug: string
          type?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          timezone?: string
          currency?: string
          logo_url?: string | null
          plan?: string
          plan_expires_at?: string | null
          telegram_bot_token?: string | null
          telegram_chat_id?: string | null
          viber_bot_token?: string | null
          viber_chat_id?: string | null
          owner_whatsapp?: string | null
          onboarding_completed?: boolean
          ls_customer_id?: string | null
          ls_subscription_id?: string | null
          ls_variant_id?: string | null
          email_provider?: string | null
          smtp_host?: string | null
          smtp_port?: number | null
          smtp_user?: string | null
          smtp_pass?: string | null
          smtp_from?: string | null
          resend_api_key?: string | null
          meta_whatsapp_phone_number_id?: string | null
          meta_whatsapp_access_token?: string | null
          brand_color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          slug?: string
          type?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          timezone?: string
          currency?: string
          logo_url?: string | null
          plan?: string
          plan_expires_at?: string | null
          telegram_bot_token?: string | null
          telegram_chat_id?: string | null
          viber_bot_token?: string | null
          viber_chat_id?: string | null
          owner_whatsapp?: string | null
          onboarding_completed?: boolean
          ls_customer_id?: string | null
          ls_subscription_id?: string | null
          ls_variant_id?: string | null
          email_provider?: string | null
          smtp_host?: string | null
          smtp_port?: number | null
          smtp_user?: string | null
          smtp_pass?: string | null
          smtp_from?: string | null
          resend_api_key?: string | null
          meta_whatsapp_phone_number_id?: string | null
          meta_whatsapp_access_token?: string | null
          brand_color?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: {
          foreignKeyName: string
          columns: string[]
          isOneToOne?: boolean
          referencedRelation: string
          referencedColumns: string[]
        }[]
      }
      employees: {
        Row: {
          id: string
          business_id: string
          user_id: string | null
          name: string
          role: string
          phone: string | null
          email: string | null
          avatar_url: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          user_id?: string | null
          name: string
          role?: string
          phone?: string | null
          email?: string | null
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          user_id?: string | null
          name?: string
          role?: string
          phone?: string | null
          email?: string | null
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      services: {
        Row: {
          id: string
          business_id: string
          name: string
          description: string | null
          price: number
          duration_min: number
          category: string | null
          is_active: boolean
          capacity: number
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          description?: string | null
          price: number
          duration_min?: number
          category?: string | null
          is_active?: boolean
          capacity?: number
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          description?: string | null
          price?: number
          duration_min?: number
          category?: string | null
          is_active?: boolean
          capacity?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      clients: {
        Row: {
          id: string
          business_id: string
          name: string
          phone: string | null
          email: string | null
          notes: string | null
          tags: string[]
          telegram_id: string | null
          viber_id: string | null
          viber_user_id: string | null
          whatsapp_number: string | null
          birthday: string | null
          total_visits: number
          total_spent: number
          last_visit_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          phone?: string | null
          email?: string | null
          notes?: string | null
          tags?: string[]
          telegram_id?: string | null
          viber_id?: string | null
          viber_user_id?: string | null
          whatsapp_number?: string | null
          birthday?: string | null
          total_visits?: number
          total_spent?: number
          last_visit_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          phone?: string | null
          email?: string | null
          notes?: string | null
          tags?: string[]
          telegram_id?: string | null
          viber_id?: string | null
          viber_user_id?: string | null
          whatsapp_number?: string | null
          birthday?: string | null
          total_visits?: number
          total_spent?: number
          last_visit_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      appointments: {
        Row: {
          id: string
          business_id: string
          client_id: string | null
          employee_id: string | null
          service_id: string | null
          starts_at: string
          ends_at: string
          status: string
          price: number | null
          notes: string | null
          source: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          client_id?: string | null
          employee_id?: string | null
          service_id?: string | null
          starts_at: string
          ends_at: string
          status?: string
          price?: number | null
          notes?: string | null
          source?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          client_id?: string | null
          employee_id?: string | null
          service_id?: string | null
          starts_at?: string
          ends_at?: string
          status?: string
          price?: number | null
          notes?: string | null
          source?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          }
        ]
      }
      transactions: {
        Row: {
          id: string
          business_id: string
          appointment_id: string | null
          client_id: string | null
          employee_id: string | null
          amount: number
          payment_method: string
          status: string
          items: Json
          receipt_number: string | null
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          appointment_id?: string | null
          client_id?: string | null
          employee_id?: string | null
          amount: number
          payment_method?: string
          status?: string
          items?: Json
          receipt_number?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          appointment_id?: string | null
          client_id?: string | null
          employee_id?: string | null
          amount?: number
          payment_method?: string
          status?: string
          items?: Json
          receipt_number?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          }
        ]
      }
      inventory_items: {
        Row: {
          id: string
          business_id: string
          name: string
          sku: string | null
          category: string | null
          unit: string
          quantity: number
          low_stock_threshold: number
          cost_price: number | null
          sell_price: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          sku?: string | null
          category?: string | null
          unit?: string
          quantity?: number
          low_stock_threshold?: number
          cost_price?: number | null
          sell_price?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          sku?: string | null
          category?: string | null
          unit?: string
          quantity?: number
          low_stock_threshold?: number
          cost_price?: number | null
          sell_price?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      inventory_movements: {
        Row: {
          id: string
          business_id: string
          item_id: string
          type: string
          quantity: number
          note: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          item_id: string
          type: string
          quantity: number
          note?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          item_id?: string
          type?: string
          quantity?: number
          note?: string | null
          created_by?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          }
        ]
      }
      notification_log: {
        Row: {
          id: string
          business_id: string
          ref_id: string
          type: string
          channel: string
          sent_at: string
        }
        Insert: {
          id?: string
          business_id: string
          ref_id: string
          type: string
          channel?: string
          sent_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          ref_id?: string
          type?: string
          channel?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_log_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      business_hours: {
        Row: {
          id: string
          business_id: string
          day_of_week: number
          is_open: boolean
          open_time: string
          close_time: string
        }
        Insert: {
          id?: string
          business_id: string
          day_of_week: number
          is_open?: boolean
          open_time?: string
          close_time?: string
        }
        Update: {
          id?: string
          business_id?: string
          day_of_week?: number
          is_open?: boolean
          open_time?: string
          close_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_hours_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: {
      get_booked_slots: {
        Args: Record<string, unknown>
        Returns: {
          starts_at: string
          ends_at: string
        }[]
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
