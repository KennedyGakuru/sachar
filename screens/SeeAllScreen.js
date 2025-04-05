import {SafeAreaView,View, Text, TouchableOpacity} from 'react-native';
import { DarkModeContext } from '../components/DarkModeContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SeeAllScreen = () =>{
    const {darkMode} = useContext(DarkModeContext);
    const navigation = useNavigation();
    return(
        <SafeAreaView className={`flex-1 ${darkMode ? 'bg-[#102F15]' : 'bg-white'}`}>
            <View className="mx-4">
            <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 bg-[#75F94C] rounded-full flex items-center justify-center ">
                    <Ionicons name="arrow-back" size={24} color='white'/>
                </TouchableOpacity>
            </View> 
            <Text className={`${darkMode ? 'text-white' : 'text-black'}`}>WhatsApp</Text>
        </SafeAreaView>
    );
};

export default SeeAllScreen;