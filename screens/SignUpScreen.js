import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase';
import { createUserProfile } from '../createUserProfile';
import { Ionicons } from '@expo/vector-icons';
import * as AuthSession from 'expo-auth-session';

 const SignUpScreen = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [fullName, setFullName] = useState('');
        const [phone, setPhone] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setConfirmShowPassword] = useState(false);

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
          const FACEBOOK_CLIENT_ID = "690086923575108";

          const SignUpWithFacebook = async () => {
            console.log('Facebook button tapped!'); 
            const redirectUri = AuthSession.makeRedirectUri({
              native: '',
              useProxy: true,
            });
            console.log('Redirect URI:', redirectUri);
            const authUrl=  `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=email,public_profile`;
            
            const result= await AuthSession.startAsync({ authUrl});

            if (result.type === 'success'){
              const accessToken = result.params.access_token;
              const {data, error } = await supabase.auth.signInWithIdToken({
                provider: 'facebook',
                token: accessToken,
              });
              if (error) {
                console.log('Supabase SignUp error:', error.message);
              } else{
                console.log('Signed Up!', data);
              }
            }else{
              console.log('SignUp Failed:',result);
            }
          };
          

        return (
            
              <KeyboardAvoidingView behavior='padding'
              keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
              className="flex-1 p-10 ">
                <ScrollView 
                contentContainerStyle={{flexGrow:1}}
                keyboardShouldPersistTaps="handled"
                >
              <View className="items-center">
                          <Image source={require('../assets/Sachar-logo-4.png')}
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
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                
            />
            <TouchableOpacity onPress={()=> setConfirmShowPassword(!showConfirmPassword)}>
                <Ionicons
                 name={'eye'}
                 size={20}
                 color={showConfirmPassword ? "#75F94C" : 'gray'}
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
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType='phone-pad'
                />
                <TouchableOpacity className="bg-[#75F94C] h-[50px] width-[50px] rounded-[20px] items-center justify-center " onPress={handleSignUp}>
                    <Text className="text-white items-center text-[20px]">SignUp</Text>
                </TouchableOpacity>
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
                  <TouchableOpacity  onPress={SignUpWithFacebook} className="px-6">
                  <Ionicons name="logo-facebook" size={35} color="gray"/> 
                  </TouchableOpacity>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>
            
        );
    };

   


export default SignUpScreen;