import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

 const SignUpScreen = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const navigation = useNavigation();

        const handleSignUp = () => {
            if (password !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match');
                return;
            }
            // Add your sign-up logic here
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('Login'); // Redirect to the Login screen
        };

        return (
            <View className="flex-1 justify-center p-5 bg-white">
                <Text className="text-2xl font-bold mb-5 text-center text-[#75F94C]">Sign Up</Text>
                <TextInput
                    className="h-10 border border-gray-300 mb-4 px-3 rounded-[20px]"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    className="h-10 border border-gray-300 mb-4 px-3 rounded-[20px]"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    className="h-10 border border-gray-300 mb-4 px-3 rounded-[20px]"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <TouchableOpacity className="bg-[#75F94C] h-[50px] width-[50px] rounded-[20px] items-center justify-center " onPress={handleSignUp}>
                    <Text className="text-white items-center text-[20px]">SignUp</Text>
                </TouchableOpacity>
            </View>
        );
    };

   


export default SignUpScreen;
