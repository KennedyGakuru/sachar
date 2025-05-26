import { useState } from 'react';
import {View, Text, TouchableOpacity, SafeAreaView,TextInput, Alert} from 'react-native';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () => {
        if(password !== confirmPassword) {
            Alert.alert('Error', 'Password do no match');
        }

    }
    return(
        <SafeAreaView className="flex-1">
            <View className="items-center">
            <Text className="text-xlg p-10 text-['#75F94C'] text-2xl font-bold">Forgot Password</Text>
            </View>
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
             className="h-10 border border-gray-300 mb-4 px-4 rounded-[20px]"
             placeholder="Confirm Password"
             value={confirmPassword}
             onChangeText={setConfirmPassword}
             secureTextEntry
             />
             <View className="flex-1 items-center">
             <TouchableOpacity onPress={handleResetPassword}
             className="h-10 w-[300px] bg-[#75F94C] rounded-[20px] items-center justify-center">
                <Text className="text-['white']">Reset Password</Text>
             </TouchableOpacity>
             </View>
        </SafeAreaView>
    )
}

export default ForgotPasswordScreen;