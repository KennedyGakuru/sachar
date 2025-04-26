import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';
import ProfileTabs from '../components/ProfileTabs';
import { DarkModeContext } from '../components/DarkModeContext';
import { useContext, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../supabase';


const ProfileScreen = () =>{
    const navigation = useNavigation();
    const {darkMode} = useContext(DarkModeContext);
    const [image, setImage] = useState(null);
    const [profile, setProfile] = useState(null);

    const pickImage = async () => {
        try {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
          }
      
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
      
          if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri); // Instantly show the picked image for better UX
      
            // Now upload it
            const uploadedUrl = await uploadImage(uri);
            if (uploadedUrl) {
              await updateUserAvatar(uploadedUrl);
              console.log('Upload and database update successful!');
            } else {
              console.error('Failed to upload image.');
            }
          }
        } catch (error) {
          console.error('Error picking or uploading image:', error);
        }
      };
      
      const updateUserAvatar = async (avatarUrl) => {
        const { data: { user } } = await supabase.auth.getUser();
      
        if (!user) {
          console.error('No user logged in.');
          return;
        }
      
        const { data, error } = await supabase
          .from('Profiles')
          .update({ avatar_url: avatarUrl })
          .eq('user_id', user.id);
      
        if (error) console.error('Error updating avatar:', error);
        else console.log('Avatar updated:', data);
      };
      
    const uploadImage = async (uri) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error('No user authenticated');
      return null;
    }

    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = `${user.id}_${Date.now()}.jpeg`;

    const { data, error } = await supabase.storage
      .from('avatar')
      .upload(fileName, blob, {
        contentType: 'image/jpeg',
      });

    if (error) {
      console.error('Supabase upload error:', error.message);
      return null;
    }

    const { data: publicData } = supabase
      .storage
      .from('avatar')
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  } catch (error) {
    console.error('Upload Image failed:', error);
    return null;
  }
};


    useEffect(() =>{
        const fetchProfile = async () => {
            const {data:{user}} = await supabase.auth.getUser();
            const {data, error} = await supabase
            .from('Profiles')
            .select('*')
            .eq('user_id',user.id)
            .single();
            if (error) console.error('Error fetching profile:',error);
            else setProfile(data);
        };
        fetchProfile();
    },[]);

    return(
        <SafeAreaView className={`flex-1 ${darkMode ? "bg-[#102F15]" : "bg-white"}`}>
            <View className="items-center">
                <Text className={`text-[24px] mb-5 ${darkMode ? 'text-white' : 'text-black'}`}>Profile</Text>
                <View className="relative w-[150px] h-[150px]">
                <Image source= {image ?  { uri:image} : profile?.avatar_url?{uri:profile.avatar_url}
                : require('../assets/default-avatar.png')}
                 className='w-[150px] h-[150px]  rounded-full '/>
                 <TouchableOpacity onPress={pickImage}>
                 <Ionicons name="create-outline" size={24} color={`${darkMode ? 'white' : 'dark'}`} 
                 className= "absolute bottom-0 right-0"/>
                 </TouchableOpacity>
                 </View>
                <Text className={`text-[20px] ${darkMode ? 'text-white' : 'text-black'}`}>Darren Watkins</Text>
                <Text className={`${darkMode ? 'text-white' : 'text-black'}`}>Darrenwatkins@gmail.com</Text>
            </View>
            <View className='items-center '>
            <ProfileTabs
             IconName="person"
             title="Edit Profile"
             onPress={() => navigation.navigate('EditProfile')}
             />
            <ProfileTabs
             IconName="settings"
             title="Settings"
             onPress={() => navigation.navigate('Settings')}
             />
            <ProfileTabs
             IconName="person"
             title="Edit Profile"
             onPress={() => navigation.navigate('EditProfile')}
             />
            <ProfileTabs
             IconName="log-out"
             title="Log out"
             onPress={() => {}}
             bgColor="#ff6666"
             />
            </View>
        </SafeAreaView>
    )
};

export default ProfileScreen;