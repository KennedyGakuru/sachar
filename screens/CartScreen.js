import {React, useContext, useState } from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearFromCart } from 'redux/cartSlice';
import CartItems from 'components/CartItems';
import { FlatList } from 'react-native-gesture-handler';
import { DarkModeContext } from 'components/DarkModeContext';

const CartScreen = () =>{
    const navigation = useNavigation();
    const {darkMode} = useContext(DarkModeContext);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch= useDispatch();
    const deliveryFee = 5;
    const discountPercentage = 25;
    const subTotal = cartItems.reduce((total,item) => total + item.price * item.quantity,0);
    const discountAmount = (subTotal * discountPercentage)/100;
    const finalAmount = subTotal + deliveryFee - discountAmount;
    

    return(
        <SafeAreaView className={`flex-1 ${darkMode ? "bg-[#102F15]" : "bg-white"}`}>
            <View className="mx-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 bg-[#75F94C] rounded-full flex items-center justify-center ">
                    <Ionicons name="arrow-back" size={24} color='white'/>
                </TouchableOpacity>
            </View>
            <View className="justify-center items-center">
                <Text className={` text-[24px] ${darkMode ? "text-white" : "text-black"}`}>My Cart</Text>
            </View>


            {cartItems.length> 0 ? (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={({ item }) => <CartItems item={item} />}
                    contentContainerStyle={{ paddingBottom: 140 }}
                    />
            ):(
                <View className='flex-1 justify-center items-center'>
                    <Text className={` text-lg} ${darkMode ? "text-white" : "text-black"}`}> Your Cart is empty</Text>
                </View>
            
            )}
            <View className=" items-center">
            <View className="bg-[#ccffb3] rounded-[20px] w-[350px] h-[125px] mt-[10px] p-[4px]">
                <View className="flex-row p-[15] ">
                    <View className="flex-1 ">
                <Text>SubTotal:</Text>
                <Text className='mt-4'>Delivery Fee:</Text>
                <Text className='mt-4'>Discount:</Text>
                    </View>
                    <View className='items-end'>
                    <Text>${subTotal.toFixed(2)} </Text>    
                    <Text className='mt-4'>${deliveryFee.toFixed(2)}</Text>    
                    <Text className='mt-4'>{discountPercentage}%</Text>    
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CheckOut',)} 
                 className="bg-[#75F94C] h-[65px] w-[350px] rounded-[20px] mt-[10px] items-center justify-center mb-[50px]">
                <Text className="text-white text-3xl ">CheckOut for $ {finalAmount.toFixed(2)}</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CartScreen;