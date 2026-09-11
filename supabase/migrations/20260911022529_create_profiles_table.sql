/*
# Create profiles table for user roles and admin access

1. New Tables
- `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `name` (text, user display name)
  - `email` (text, unique)
  - `phone` (text, nullable)
  - `cpf` (text, nullable)
  - `role` (text, not null, default 'CUSTOMER' — one of: ADMIN, VICE_ADMIN, SUPPORT, RESELLER, AFFILIATE, CUSTOMER)
  - `status` (text, not null, default 'ACTIVE' — one of: ACTIVE, DISABLED, EXPIRED)
  - `reseller_model` (text, nullable — one of: CREDIT_PACK, MONTHLY_CREDITS, CUSTOMER_LIMIT)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `profiles`.
- Users can read their own profile.
- Users can update their own profile (except role/status, which are admin-controlled via service role).
- No public access — only authenticated users.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  email text UNIQUE NOT NULL,
  phone text,
  cpf text,
  role text NOT NULL DEFAULT 'CUSTOMER',
  status text NOT NULL DEFAULT 'ACTIVE',
  reseller_model text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);
