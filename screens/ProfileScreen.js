import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';
import ProfileTabs from '../components/ProfileTabs';
import { DarkModeContext } from '../components/DarkModeContext';
import { useContext } from 'react';

const ProfileScreen = () =>{
    const navigation = useNavigation();
    const {darkMode} = useContext(DarkModeContext);

    return(
        <SafeAreaView className={`flex-1 ${darkMode ? "bg-[#102F15]" : "bg-white"}`}>
            
            <View className="items-center">
                <Text className={`text-[24px] mb-5 ${darkMode ? 'text-white' : 'text-black'}`}>Profile</Text>
                <Image source={require('../assets/ishoowspeed.jpg')}
                 className='w-[150px] h-[150px] bg-[red] rounded-[75px] '/>
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