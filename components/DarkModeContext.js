import {useState, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DarkModeContext = createContext();
export  const DarkModeProvider = ({ children })  => {
    const [darkMode, setDarkMode] = useState(false);

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
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}