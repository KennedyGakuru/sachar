import { supabase } from './supabase'

export const createUserProfile = async (userId, fullName, phone) => {
  try {
    const { data, error } = await supabase
      .from('Profiles') 
      .insert([
        {
          user_id: userId,
          full_name: fullName,
          phone: phone,
        },
      ]).select();

    if (error) {
      console.error('Profile Creation Error:', error);
      return { error };
    }

    console.log('Profile created:', data);
    return { data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { error: err };
  }
};
