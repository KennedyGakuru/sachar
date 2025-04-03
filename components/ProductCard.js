import {View, Text, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import HeartIcon from './HeartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from 'redux/favoriteSlice';

const ProductCard = ({ product}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorite.items);
    const isFavorite = favorites.some(item => item.id  === product.id);

    
    const handlePress = () =>{
        if (isFavorite){
            dispatch(removeFromFavorites(product));
        } else {
            dispatch(addToFavorites(product));
        }
    }
    return(
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product })}>
            <View className=" justify-center items-center p-4">
                <View className="w-[150px] h-[200px] bg-[#ccffb3] rounded-[20px]">
                <Image source={{uri: 'https://www.phoneplacekenya.com/wp-content/uploads/2024/03/Apple-iPhone-16-1.jpg',}}
              style={{ width: '100%', height: '75%', borderRadius: 20 }}
            />
            <View className="flex-row justify-between w-full px-[10px] mt-[5px] pb-[10px]">
                <View className="flex-col justify-center items-center">
                    <Text>{product.name}</Text>
                    <Text>{product.price}</Text>
                </View>
                <View className="flex-col justify-center items-center">
                    <Text>⭐ 4.5</Text>
                    <HeartIcon onPress={handlePress} isFavorite={isFavorite} />
                </View>
            </View>
                </View>
            </View>  
        </TouchableOpacity>
    );
};

export default ProductCard;