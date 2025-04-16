import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase';
import { createUserProfile } from '../createUserProfile';

 const SignUpScreen = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [fullName, setFullName] = useState('');
        const [phone, setPhone] = useState('');
        const [showPassword, setShowPassword] = useState(false);

        const navigation = useNavigation();

        const handleSignUp = async () => {
            if (password !== confirmPassword) {
              Alert.alert('Error', 'Passwords do not match');
              return;
            }
          
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
            });
          
            if (error) {
              Alert.alert('Sign Up Failed', error.message);
              return;
            }
          
            const user = data?.user;
          
            if (!user) {
              Alert.alert('Sign Up Failed', 'No user returned from Supabase');
              return;
            }
          
            try {
              await createUserProfile(user.id, fullName, phone);
              navigation.replace('VerifyEmail');
            } catch (err) {
              console.log('Error creating profile:', err);
              Alert.alert('Profile Error', 'Something went wrong creating your profile.');
            }
          };
          

        return (
            <View className="flex-1 p-5 bg-white">
              <View className="items-center">
                          <Image source={require('../assets/Sachar logo 4.png')}
                           className="w-[300px] h-[300px]"
                           resizeMode='contain'
                           />
                           </View>
                <Text className="text-2xl font-bold mb-5 text-center text-[#75F94C]">Sign Up</Text>
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
            <View className="h-10 flex-row items-center border border-gray-300 mb-2 px-3 rounded-[20px]">
            <TextInput
                className="flex-1 "
                placeholder="Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
                <TextInput
                    className="h-10 border border-gray-300 mb-4 px-3 rounded-[20px]"
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}

                />
                <TextInput
                    className="h-10 border border-gray-300 mb-4 px-3 rounded-[20px]"
                    placeholder="phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType='phone-pad'
                />
                <TouchableOpacity className="bg-[#75F94C] h-[50px] width-[50px] rounded-[20px] items-center justify-center " onPress={handleSignUp}>
                    <Text className="text-white items-center text-[20px]">SignUp</Text>
                </TouchableOpacity>
            </View>
        );
    };

   


export default SignUpScreen;