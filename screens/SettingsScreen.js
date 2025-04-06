import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DarkModeContext } from '../components/DarkModeContext';
import { useContext } from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

const SettingsScreen = () => {
    const navigation=useNavigation();
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    return(
        <SafeAreaView className={`flex-1 ${darkMode ? "bg-[#102F15]" : "bg-white"}`}>
            <View className="mx-4">
            <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 bg-[#75F94C] rounded-full flex items-center justify-center ">
                    <Ionicons name="arrow-back" size={24} color='white'/>
                </TouchableOpacity>
            </View> 
            <View className='items-center'>
            <Text className={`text-[24px] ${darkMode ? "text-white" : "text-black"}`}>Settings </Text>
            </View>
            <View className=" p-10 ">
                <View className='flex-row items-center mb-8'>
            <Ionicons name="notifications" size={24} color={darkMode ? "white" : "black"}/> 
            <Text className={`text-[24px] ${darkMode ? "text-white" : "text-black"}`}>  Notification</Text> 
                </View>
                <View className='flex-row items-center mb-8'>
                    <TouchableOpacity onPress={toggleDarkMode} className="rounded-full ">
                    <Ionicons name={darkMode ? "sunny" : "moon"} size={24} color={darkMode ? "white" : "black"} />
                    </TouchableOpacity> 
            <Text className={`text-[24px] ${darkMode ? "text-white" : "text-black"}`}>  {darkMode ? "Light Mode" : "Dark Mode"}</Text> 
                </View>
                <View className='flex-row items-center mb-8'>
            <Ionicons name="star" size={24} color={darkMode ? "white" : "black"}/> 
            <Text className={`text-[24px] ${darkMode ? "text-white" : "text-black"}`}>  Rate App</Text> 
                </View>
                <View className='flex-row items-center mb-8'>
            <Ionicons name="share-social" size={24} color={darkMode ? "white" : "black"}/> 
            <Text className={`text-[24px] ${darkMode ? "text-white" : "text-black"}`}>  Share App</Text> 
                </View>
                <View className='flex-row items-center mb-8'>
            <Ionicons name="lock-closed" size={24} color={darkMode ? "white" : "black"}/> 
            <Text className={`text-[24px] ${darkMode ? "text-white" : "text-black"}`}> Privacy Policy</Text> 
                </View>
                <View className='flex-row items-center mb-8'>
            <Ionicons name="document-text" size={24} color={darkMode ? "white" : "black"}/> 
            <Text className={`text-[24px] ${darkMode ? "text-white" : "text-black"}`}> Terms and Conditions</Text> 
                </View>
            
            </View>
            
        </SafeAreaView>
    )
};

export default SettingsScreen;