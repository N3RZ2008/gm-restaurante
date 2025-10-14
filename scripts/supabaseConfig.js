import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = "https://ogqhoclfwxbontogsyep.supabase.co/"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncWhvY2xmd3hib250b2dzeWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NzQ4MDksImV4cCI6MjA3NjA1MDgwOX0.h7A2Q5Q6-Nthlii5DA_m1LVFIKcudK_QyTkLCrPz6S8"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { supabase }