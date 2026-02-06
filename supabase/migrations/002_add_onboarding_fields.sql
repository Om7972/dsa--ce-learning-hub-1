-- Add onboarding fields to users table
-- Add columns individually to avoid parser issues
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS onboarded boolean DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS learning_goals text[] DEFAULT ARRAY[]::text[];
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS skill_level text DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS interests text[] DEFAULT ARRAY[]::text[];
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS daily_time_commitment text DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS preferred_language text DEFAULT 'English';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS onboarding_completed_at timestamp DEFAULT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS onboarding_step integer DEFAULT 0;

-- Add index for onboarding queries
CREATE INDEX idx_users_onboarded ON public.users(onboarded);
CREATE INDEX idx_users_skill_level ON public.users(skill_level);

-- Enable RLS on users table if not already enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only view/update their own data
CREATE POLICY "Users can read their own data"
ON public.users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
ON public.users FOR UPDATE
USING (auth.uid() = id);

-- RLS Policy: Service role can update user onboarding status
CREATE POLICY "Service role can manage user onboarding"
ON public.users FOR ALL
USING (auth.role() = 'service_role');
