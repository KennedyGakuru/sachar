import { useNavigation } from '@react-navigation/native';
import React, { useState,  } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { supabase } from '../supabase';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    
    const handleLogin = () => {
        if (email === '' || password === '') {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        
        if (email === '11' && password === '22') {
            // Alert.alert('Success', 'Logged in successfully');
            navigation.navigate('HomeTabs', { screen: 'Home' }); 
        } else {
            Alert.alert('Error', 'Invalid email or password');
        }
    };
    const SignIn = () => {
        navigation.navigate('SignUp');
    }

    return (
        <View className="flex-1 justify-center p-5 bg-white">
            <Text className="text-2xl font-bold mb-5 text-center text-[#75F94C]">Login</Text>
            <TextInput
                className="h-10 border border-gray-300 mb-4 px-3 rounded-[20px]"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                className="h-10 border border-gray-300 mb-2 px-3 rounded-[20px]"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text className="mb-2 self-end">Forgot Password</Text>
           <TouchableOpacity className="h-[50px] bg-[#75F94C] rounded-[20px] items-center justify-center"
           onPress={handleLogin}>
            <Text className="text-[20px] text-white">Login</Text>
           </TouchableOpacity>
           <View className="flex-row mt-4 items-center">
           <Text>Don't have an account? </Text>
           <Text onPress={SignIn} className="text-[#75F94C]"> SignUp</Text>
           </View>
        </View>
    );
};

export default LoginScreen;
