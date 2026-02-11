-- Fix RLS Policies - The issue is that policies are blocking reads
-- Run this in Supabase SQL Editor

-- First, let's check what's in the database
SELECT 'Checking auth users:' as step;
SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 5;

SELECT 'Checking profiles:' as step;
SELECT id, email, role FROM profiles ORDER BY created_at DESC LIMIT 5;

SELECT 'Checking students:' as step;
SELECT id, profile_id, department FROM students ORDER BY created_at DESC LIMIT 5;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Students can view own data" ON students;
DROP POLICY IF EXISTS "Students can update own data" ON students;
DROP POLICY IF EXISTS "Admins can view all students" ON students;
DROP POLICY IF EXISTS "Admins can update all students" ON students;

-- Create simpler, working policies for profiles
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- Create simpler, working policies for students
CREATE POLICY "Students can view own data"
    ON students FOR SELECT
    TO authenticated
    USING (profile_id = auth.uid());

CREATE POLICY "Students can update own data"
    ON students FOR UPDATE
    TO authenticated
    USING (profile_id = auth.uid());

CREATE POLICY "Students can insert own data"
    ON students FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = auth.uid());

-- Verify policies are created
SELECT 'RLS Policies fixed!' as status;
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('profiles', 'students')
ORDER BY tablename, policyname;
