import { useNavigation } from '@react-navigation/native';
import React, { useState,  } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
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
            navigation.replace('HomeTabs', { screen: 'Home' });
        }
    };
    const SignIn = () => {
        navigation.replace('SignUp');
    }

    return (
        <View className="flex-1 p-5 bg-white">
            <View className="items-center justify-center">
            <Image source={require('../assets/Sachar logo 4.png')}
             className="w-[350px] h-[350px]"
             resizeMode='contain'
             />
             </View>
            <Text className="text-[24px] font-bold mb-5 text-center text-[#75F94C]">Login</Text>
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
           <View className="flex-row items-center my-6">
                      <View className="flex-1 h-px bg-gray-300"></View>
                      <Text className="mx-4 text-gray-400">or</Text>
                      <View className="flex-1 h-px bg-gray-300"></View>
                    </View>
                <View className="mt-6 flex-row justify-between">
                  <TouchableOpacity className="px-6">
                  <Ionicons name="logo-google" size={35} color="gray"/> 
                  </TouchableOpacity>
                  <TouchableOpacity className="px-6">
                    <Ionicons name="logo-apple" size={35} color="gray"/> 
                  </TouchableOpacity>
                  <TouchableOpacity  className="px-6">
                  <Ionicons name="logo-facebook" size={35} color="gray"/> 
                  </TouchableOpacity>
                </View>
        </View>
    );
};

export default LoginScreen;
