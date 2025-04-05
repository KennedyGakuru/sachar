import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useEffect, useState } from 'react';
import { addToFavorites, removeFromFavorites } from '../redux/favoriteSlice';
import HeartIcon from '../components/HeartIcon';




const ProductDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { product } = route.params;
    const dispatch = useDispatch();
      
   const favorites = useSelector(state => state.favorite.items);

   const isFavorite = favorites.some(item => item.id === product.id );

   const [iconColor,setIconColor] =useState(isFavorite ? 'red':'gray');

   useEffect(()=>{
    setIconColor(isFavorite? 'red':'gray');
   },[isFavorite]);

   const handlePress= () =>{
    if (isFavorite){
        dispatch(removeFromFavorites(product));
    } else{
        dispatch(addToFavorites(product));
    }
   };
   
    return(
        <SafeAreaView>
            <View className="flex-row justify-between mx-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 bg-[#75F94C] rounded-full flex items-center justify-center ">
                    <Ionicons name="arrow-back" size={24} color='white'/>
                </TouchableOpacity>
                <View className="flex-row ">
                <View className="w-10 h-10 bg-gray-200 rounded-full mx-4 items-center justify-center">
                <HeartIcon onPress={handlePress} isFavorite={isFavorite} />
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('HomeTabs',{ screen: 'Cart'})}
                    className="w-10 h-10 bg-gray-200 rounded-full mx-4 items-center justify-center">
                    <Ionicons name='cart' size={24} color={'#75F94C'}/>
                </TouchableOpacity>
                </View>
            </View>
            <View className="items-center">
                <Image source= {{uri:"https://www.phoneplacekenya.com/wp-content/uploads/2024/03/Apple-iPhone-16-1.jpg"}}
                className="h-[350px] w-[350px] rounded-[20px]"
                />
            </View>
            <View className="flex justify-center items-center p-4 ">
                <View className="bg-[#ccffb3] w-[350px] h-[300] rounded-[20px] px-4">
                    <View>
                        <Text className="text-[24px] font-bold mt-5">iPhone 16</Text>
                        <View className="flex-row justify-between p-4">
                            <View className="bg-white h-[25px] w-[50px] justify-center items-center rounded-[10px]">
                            <Text>⭐ 4.2</Text>
                            </View>
                            <View className="bg-white h-[25px] w-[50px] justify-center items-center rounded-[10px]">
                            <Text>👍 98%</Text>
                            </View>
                            <View className="bg-white h-[25px] w-[75px] justify-center items-center rounded-[10px]">
                            <Text className="text-[12px]">234 reviews</Text>
                            </View>
                        </View>
                        <Text className="text-[20px] ">
                        ​The iPhone 16, introduced in September 2024, 
                        features a 6.1-inch Super Retina XDR display, 
                        a 48MP Fusion camera, and is powered by the A18 chip. 
                        It also integrates advanced AI capabilities, 
                        enhancing Siri and offering new photo-editing tools.
                        </Text>
                        <View className=" flex-row justify-between p-4">
                            <TouchableOpacity className="bg-white w-[75px] h-[30px] rounded-[10px] justify-center items-center">
                                <Text className="text-xl">1 TB</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white w-[75px] h-[30px] rounded-[10px] justify-center items-center">
                                <Text className="text-xl">512 GB</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white  w-[75px] h-[30px] rounded-[10px] justify-center items-center">
                                <Text className="text-xl">256 GB</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View className=" flex-row justify-between p-4">
                <View className="bg-[#ccffb3] h-[75px] w-[175px] rounded-[20px]  mt-[30px] items-center justify-center">
                    <Text className="text-[36px] font-bold">$ 799.99</Text>
                </View>
                <TouchableOpacity onPress={() => dispatch(addToCart(product))} className="bg-['#75F94C'] h-[75px] w-[200px] rounded-[20px] mt-[30px] flex-row justify-center items-center ">
                    <Text className="font-bold text-[24px] px-[10px] text-white">Add to cart</Text>
                    <Ionicons name='cart' size={24} color="white"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ProductDetailsScreen;