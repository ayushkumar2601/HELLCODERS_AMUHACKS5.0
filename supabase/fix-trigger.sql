-- Fix the trigger function to handle errors properly
-- Run this AFTER running the main schema.sql

-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create a better version of the function with error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert into profiles table
    INSERT INTO public.profiles (id, full_name, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        NEW.email,
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
    )
    ON CONFLICT (id) DO NOTHING;
    
    -- If user is a student, create student record
    IF COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student') = 'student' THEN
        INSERT INTO public.students (profile_id, department, gpa, stress_index, career_score)
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'department', 'Computer Science'),
            0.00,
            0,
            0
        )
        ON CONFLICT (profile_id) DO NOTHING;
    END IF;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error but don't fail the user creation
        RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Test that the function exists
SELECT 'Trigger function updated successfully' as status;
