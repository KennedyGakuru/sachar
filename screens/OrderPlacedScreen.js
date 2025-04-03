import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DarkModeContext } from 'components/DarkModeContext';
import { useContext } from 'react';

const OrderPlacedScreen = () => {
    const navigation = useNavigation();
    const {darkMode} = useContext(DarkModeContext);

    return(
        <SafeAreaView className={`flex-1 ${darkMode ? 'bg-[#102F15]' : 'bg-white'}`}>
            <View className="flex-1 items-center justify-center">
                <Image source={require('../assets/icegif-310.gif')}
                className="h-[150px] w-[250px]"/>
            <Text className="text-4xl text-bold mt-10">Congratulations</Text>
            <Text>Order has been placed. Your order no. is #1737</Text>
            </View>
            <View className="items-center">
            <TouchableOpacity onPress={() => navigation.navigate('HomeTabs',{screen:"Home"})} className="bg-[#75F94C] h-[65px] w-[350px] rounded-[20px] justify-center items-center">
                <Text className="text-3xl text-bold text-white">Go Home</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default OrderPlacedScreen;