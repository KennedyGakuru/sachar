import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import ProductCard from '../components/ProductCard'; 
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavourites } from '../redux/favoriteSlice';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useContext, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DarkModeContext } from '../components/DarkModeContext';


const WishlistScreen = () => {
    const favorites = useSelector(state => state.favorite?.items || []);
    const {darkMode} =useContext(DarkModeContext);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(()=>{
            
        }, [favorites])
    )

    return(
        <SafeAreaView className={`flex-1 ${darkMode ? "bg-[#102F15]" : "bg-white"}`}>
                
            <View className="items-center">
                <Text className={`text-[24px] text-bold ${darkMode ? 'text-white' : 'text-black'}`}>WishList</Text>
            </View>
            <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{paddingHorizontal:1}}
            renderItem={({ item }) =>(
                <View className="w-[48%]">
                    <ProductCard product={item}/>
                </View>
            )}
            />
        </SafeAreaView>
    )
};

export default WishlistScreen;