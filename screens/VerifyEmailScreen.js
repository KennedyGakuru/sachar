import { useNavigation } from '@react-navigation/native';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';

const VerifyEmailScreen = () => {
    const navigation = useNavigation();
    
    return(
        <SafeAreaView className="flex-1 items-center justify-center">
            <Text className='text-[24px] mt-10  text-bold'>Verify you Email!</Text>
            <Text className="text-[20px] mb-10 mt-10 p-5">
                We've sent you an email with a confirmation link.
                 Please check your inbox and verify your email before logging in.
            </Text>
            <TouchableOpacity className="h-[50px] bg-[#75F94C] w-[200px] rounded-[20px] justify-center items-center">
                <Text className="text-lg text-white"   onPress={() => navigation.replace("Login")}>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default VerifyEmailScreen;