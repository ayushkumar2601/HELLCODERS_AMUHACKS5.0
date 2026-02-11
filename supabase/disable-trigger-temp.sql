-- Temporarily disable the trigger to test signup
-- This allows user creation without the automatic profile/student creation

-- Disable the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- You can now sign up, and we'll create the profile/student data manually after
SELECT 'Trigger disabled. You can now sign up. Profile data will need to be created manually.' as status;

-- After signup, run this to create profile and student data:
-- Replace 'USER_EMAIL_HERE' with the email you signed up with

/*
-- Get the user ID first
SELECT id, email FROM auth.users WHERE email = 'USER_EMAIL_HERE';

-- Then insert profile (replace USER_ID with the actual UUID)
INSERT INTO profiles (id, full_name, email, role)
VALUES ('USER_ID', 'Your Name', 'USER_EMAIL_HERE', 'student');

-- Then insert student data
INSERT INTO students (profile_id, department, gpa, stress_index, career_score)
VALUES ('USER_ID', 'Computer Science', 8.0, 50, 75);
*/
