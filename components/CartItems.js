import {View, Image, Text, TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import { removeFromCart,updatedQuantity } from '../redux/cartSlice';
import { useContext, useState } from 'react';
import { DarkModeContext } from './DarkModeContext';

const CartItems = ({ item }) => {
    const dispatch = useDispatch();
    const { darkMode } = useContext(DarkModeContext);
    const [quantity, setQuantity] = useState(1);
    const IncreaseQuantity =() =>{
        setQuantity(prevQuantity => prevQuantity + 1)
        dispatch(updatedQuantity({id: item.id, quantity: item.quantity +1}));
    }
    const DecreaseQuantity =() =>{
        if(quantity>1){
            setQuantity(prevQuantity => prevQuantity -1)
            dispatch(updatedQuantity({id: item.id, quantity: item.quantity -1}));
        }
    }
    
    return(
        <View className="justify-center items-center mt-[10px]">
                    <View className="bg-[#ccffb3] h-[150px] w-[350px] rounded-[20px] flex-row">
                        <Image source={{uri: "https://www.phoneplacekenya.com/wp-content/uploads/2024/03/Apple-iPhone-16-1.jpg"}}
                        className="h-[150px] w-[150px] rounded-[20px]"/>
                        <View className="flex column justify-between m-4">
                            <Text className="text-2xl">{item.name}</Text>
                            <Text className="text-gray-500 text-lg">{item.storage}</Text>
                            <Text className="text-bold text-xl">${(item.price * quantity).toFixed(2)}</Text>
                        </View>
                        <View className="justify-between flex- column my-[10px] mx-[10px]">
                            <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
                            <Text className="text-2xl self-end text-gray-500">X</Text>
                            </TouchableOpacity>
                            <View className="flex-row ">
                                <TouchableOpacity onPress={DecreaseQuantity} className="bg-white h-[25px] w-[25px] items-center justify-center rounded-[5px]">
                                    <Text className="text-2xl">-</Text>
                                </TouchableOpacity>
                                    <Text className="text-2xl mx-2">{quantity}</Text>
                                <TouchableOpacity onPress={IncreaseQuantity} className="bg-white h-[25px] w-[25px] items-center justify-center rounded-[5px] ">
                                    <Text className="text-2xl">+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    </View>
    );
};

export default CartItems;