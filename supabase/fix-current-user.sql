-- Fix the current logged-in user by creating missing profile and student records
-- Run this in Supabase SQL Editor

-- First, let's see what users exist
SELECT id, email, created_at, raw_user_meta_data 
FROM auth.users 
ORDER BY created_at DESC;

-- Create profile for any user missing one
INSERT INTO public.profiles (id, full_name, email, role)
SELECT 
    u.id,
    COALESCE(u.raw_user_meta_data->>'full_name', 'User'),
    u.email,
    'student'
FROM auth.users u
WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = u.id
);

-- Create student record for any profile missing one
INSERT INTO public.students (profile_id, department, gpa, stress_index, career_score)
SELECT 
    p.id,
    COALESCE(
        (SELECT raw_user_meta_data->>'department' FROM auth.users WHERE id = p.id),
        'Computer Science'
    ),
    0.00,
    0,
    0
FROM public.profiles p
WHERE p.role = 'student'
AND NOT EXISTS (
    SELECT 1 FROM public.students s WHERE s.profile_id = p.id
);

-- Verify the fix
SELECT 
    p.id,
    p.email,
    p.full_name,
    p.role,
    s.department,
    s.gpa
FROM profiles p
LEFT JOIN students s ON p.id = s.profile_id
ORDER BY p.created_at DESC;
