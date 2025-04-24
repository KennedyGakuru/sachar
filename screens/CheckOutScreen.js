import {SafeAreaView, Text, View, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import { ScrollView } from 'react-native-gesture-handler';
import * as Haptics from "expo-haptics";
import { DarkModeContext } from '../components/DarkModeContext';
import PaymentsCard from '../components/PaymentCard';

const CheckOutScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {darkMode} = useContext(DarkModeContext);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [shippingAddress, setShippingAddress] = useState(null);
    const cartItems = useSelector((state)=> state.cart.cartItems);
    const handlePress = (method) =>{
        setSelectedMethod(method);
    };
    const deliveryFee = 5;
    const discountPercentage = 25;
    const subTotal = cartItems.reduce((total,item) => total + item.price * item.quantity,0);
    const discountAmount = (subTotal * discountPercentage)/100;
    const finalAmount = subTotal + deliveryFee - discountAmount;
    const handlePressOrder =() =>{
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        navigation.navigate('OrderPlaced');
    };
    useEffect(() =>{
        if (route?.params?.address) {
            setShippingAddress(route.params.address);
            
            navigation.setParams({address: undefined});
        }
    }, [route?.params?.address]);

    return(
    <SafeAreaView className={`flex-1 ${darkMode ? "bg-[#102F15]" : "bg-white"}`}>
        <View className="mx-4">
            <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 bg-[#75F94C] rounded-full flex items-center justify-center ">
                    <Ionicons name="arrow-back" size={24} color='white'/>
                </TouchableOpacity>
            </View> 
        <View className='items-center'>
        <Text className={`text-[24px] ${darkMode ? 'text-white' : 'text-black'}`}>CheckOut</Text>
        </View>
        <View className="items-center mt-5">
    <View className="bg-[#ccffb3] h-[300px] w-[350px] rounded-[20px] p-5">
        <Text className="text-[20px] font-bold text-center mb-4 ">My Order</Text>

       <ScrollView className='max-h-[150px]'>
        {cartItems.length === 0 ? (
            <Text className={`text-center  ${darkMode ? 'text-white' : 'text-black'}`}>Your cart is empty.</Text>
        ) : (
            cartItems.map((item) => (
                <View key={item.id} className="flex-row justify-between w-full mb-2">
                    <Text>{item.name}</Text>
                    <Text>${item.price} x {item.quantity}</Text>
                </View>
            ))
        )}
        </ScrollView>
        
        <View className="w-full mt-4">
            
            <View className="flex-row justify-between">
                <Text>Subtotal:</Text>
                <Text>${subTotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mt-2">
                <Text>Delivery Fee:</Text>
                <Text>${deliveryFee.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mt-2">
                <Text>Discount:</Text>
                <Text>{discountPercentage}%</Text>
            </View>

            <View className="flex-row justify-between mt-2 border-t border-gray-400 pt-2">
                <Text className="text-[20px] font-bold">Final Total Price:</Text>
                <Text className="text-[20px] font-bold">${finalAmount.toFixed(2)}</Text>
            </View>
        </View>
    </View>
</View>

        <Text className={`text-[24px] mt-8 mx-5 mb-3 ${darkMode ? "text-white" : "text-black"}`}>Deliver to</Text>
        <View className='items-center'>
        <TouchableOpacity onPress={()=> navigation.navigate('Map',{setShippingAddress})}
        className="bg-[#ccffb3] h-[50px] w-[350px] rounded-[10px] flex-row justify-between">
            <View className="mt-4 mx-5">
            <Ionicons name='location' size={24} color="white"/>
            </View>
            <Text className="text-[20px] mt-4">
                {shippingAddress ? shippingAddress : 'Add shipping Address'}</Text>
            <View className="mt-4 mx-5">
            <Ionicons name='arrow-forward-circle' size={24} color="white" />
            </View>
            </TouchableOpacity>
        </View>
        <Text className={`text-[24px] mt-8 mx-5 mb-3 ${darkMode ? "text-white" : "text-black"}`}>Payment Method</Text>
        <View className="items-center justify-between flex-1 ">
        <PaymentsCard
        title="Mastercard"
        imageSource={require('../assets/mastercard-logo.png')}
        isSelected={selectedMethod === "Mastercard"}
        onSelect={setSelectedMethod}
        />
        <PaymentsCard
        title="Visa"
        imageSource={require('../assets/visa-logo-.png')}
        isSelected={selectedMethod === 'Visa'}
        onSelect={setSelectedMethod}
        />
        <PaymentsCard
        title="Apple Pay"
        imageSource={require('../assets/apple_pay-logo.png')}
        isSelected={selectedMethod === "Apple Pay"}
        onSelect={setSelectedMethod}
        />
        </View>
        <View className="items-center">
            <TouchableOpacity onPress={handlePressOrder} className="bg-[#75F94C] h-[65px] w-[350px] 
            rounded-[20px] items-center justify-center mt-8">
                <Text className="text-white text-2xl">Place Order</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
}

export default CheckOutScreen;