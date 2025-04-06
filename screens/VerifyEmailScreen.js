import {View, Text, TouchableOpacity} from 'react-native';

const VerifyEmailScreen = () => {
    return(
        <View className="items-center justify-between">
            <Text className='text-[20px]'>Verify you Email!</Text>
            <Text>
                We've sent you an email with a confirmation link. Please check your inbox and verify your email before logging in.
            </Text>
            <TouchableOpacity className="h-[50px] bg-[#75F94C] rounded-[20px] justify-center">
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default VerifyEmailScreen;