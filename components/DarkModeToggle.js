import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DarkModeToggle = () => {
    const[darkMode, setDarkMode] = useState(false);

    useEffect(()=> {
        const loadDarkMode = async () => {
            const savedMode = await AsyncStorage.getItem("darkMode");
            if (savedMode !== null){
                setDarkMode(JSON.parse(savedMode));
            }
        };
        loadDarkMode();
    }, []);

    const toggleDarkMode = async () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
    };

    return(
        <View className={`flex-1 items-center justify-center ${darkMode ? "bg-black" : "bg-white"}`}>
            <TouchableOpacity
              onPress={toggleDarkMode}
              className="p-4 rounded-full bg-gray-300 dark:bg-gray-800"
              >
                <Ionicons
                name={darkMode ? "moon" : "sunny"}
                size={30}
                color={darkMode ? "white" : "black"}
                />
              </TouchableOpacity>
              <Text className={`text-xl mt-4 ${darkMode ? "text-white" : "text-black"}`}>
                {darkMode ? "DarkMode" : "LightMode"}
              </Text>
        </View>
    );
};

export default DarkModeToggle;