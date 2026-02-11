'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signUp(formData: {
  email: string
  password: string
  fullName: string
  department?: string
}) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          role: 'student', // Always student
          department: formData.department || 'Computer Science',
        },
      },
    })

    if (error) {
      console.error('Signup error:', error)
      return { error: error.message }
    }

    if (!data.user) {
      return { error: 'Failed to create user account' }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard/student')
  } catch (error: any) {
    console.error('Signup exception:', error)
    return { error: error.message || 'An unexpected error occurred during signup' }
  }
}

export async function signIn(formData: { email: string; password: string }) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard/student')
  } catch (error: any) {
    console.error('Login exception:', error)
    return { error: error.message || 'An unexpected error occurred during login' }
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function getCurrentUser() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { user, profile }
}

export async function getStudentData(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('profile_id', userId)
    .single()

  if (error) {
    return null
  }

  return data
}
