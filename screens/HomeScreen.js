import{View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { categories,products,Colors } from '../constants';
import { DarkModeContext } from '../components/DarkModeContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () =>{
  const {darkMode } = useContext(DarkModeContext);
  const navigation = useNavigation();
    const handleSearch = () => {    
    }

    return(
        <SafeAreaView className={`flex-1 ${darkMode ? "bg-[#102F15]" : "bg-white"}`}>
          <ScrollView showsVerticalScrollIndicator={false} >
            <StatusBar/>
            <View className='flex-row justify-between px-2'>
            <Text className={`text-4xl ${darkMode ? "text-white" : "text-black"}`}>Discover</Text>
            <Ionicons name="notifications" size={25} color="#75F94C" className="mr-10"/>
            </View>
            <View className="p-2">
            <View style={{ backgroundColor: "#E6FCE5" }} className="flex-row items-center rounded-3xl w-[90%] mx-auto px-3 py-4 ">
             <TextInput placeholder="Search" className="flex-1 text-gray-700 px-2 text-2xl" placeholderTextColor="gray" />
             <TouchableOpacity onPress={handleSearch}>
             <Ionicons name="search" size={30} color="#75F94C" />
             </TouchableOpacity>
            </View>
            </View>
            <View className="items-center pb-4">
            <View className="w-[360px] h-[120px] bg-[#ccffb3] rounded-[20px]">
            </View>
            </View>
            <View className="flex-row justify-between px-4 pt-4 ">
              <Text className={`text-3xl ${darkMode ? "text-white" : "text-black"}`}>Categories</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SeeAll')}>
              <Text className="color-[#75F94C]">See All</Text>
              </TouchableOpacity>
            </View>
            <View className="pl-2 px-4 pt-4">
            <FlatList
             data={categories}
             horizontal 
             showsHorizontalScrollIndicator={false} 
             keyExtractor={(item, index) => index.toString()}
             renderItem={({ item }) => (
             <View className="bg-[#ccffb3] px-6 py-2 rounded-lg mr-2">
              <Text className="text-black text-lg font-semibold">{item}</Text>
             </View>
             )}
            />
            </View>
            <View>
            <FlatList
               data={products}
               keyExtractor={(item) => item.id}
               numColumns={2} 
               columnWrapperStyle={{ paddingHorizontal: 1}} 
               scrollEnabled={false}
               renderItem={({ item }) => (
             <View className="w-[48%] ">
               <ProductCard product={item} />
             </View>
              )}
            />
            </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default HomeScreen;