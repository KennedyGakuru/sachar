import { useNavigation } from '@react-navigation/native';
import React, { useState,  } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { supabase } from '../supabase';
import { Ionicons } from '@expo/vector-icons';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    
    const handleLogin = async () => {
        const{data, error} = await supabase.auth.signInWithPassword({email,password});
        if (error) {
            Alert.alert('Login Failed', error.message);
        }else{
            Alert.alert('Succes!', 'Welcome back, ${data.user.email}');
            navigation.navigate('HomeTabs', { screen: 'Home' });
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
            <View className="h-10 flex-row items-center border border-gray-300 mb-2 px-3 rounded-[20px]">
            <TextInput
                className="flex-1 "
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                
            />
            <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
                <Ionicons
                 name={'eye'}
                 size={20}
                 color={showPassword ? "#75F94C" : 'gray'}
                 />
            </TouchableOpacity>
            </View>
            <Text className="mb-2 self-end" onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password</Text>
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
