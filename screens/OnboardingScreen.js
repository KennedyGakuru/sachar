import {useState, useRef} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity,Dimensions, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('window');

const slides = [
    {
        id:'1',
        title: 'Welcome to Sachar',
        description: 'Shop Smart, Shop Sachar.',
        image: require('../assets/Shopping bag-bro.png'),
    },
    {
        id:'2',
        title: 'Great Deals',
        description: 'Discover awesome discount and offers.',
        image: require('../assets/Sales consulting-cuate.png'),
    },
    {
        id:'3',
        title: 'Fast Delivery',
        description: 'Get your orders quickly and safely.',
        image: require('../assets/In no time-bro.png'),
    },
];

const OnboardingScreen = () =>{
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef();
    const navigation = useNavigation();

    const handleNext = () => {
        if(currentIndex < slides.length -1){
            flatListRef.current.scrollToIndex({ index: currentIndex + 1});
        } else {
            navigation.replace('Login');
        }
    };
    const handleSkip = () => {
        navigation.replace('Login');
    };
    const updateIndex = (e) => {
        const index=Math.round(e.nativeEvent.contentOffset.x/ width);
        setCurrentIndex(index);
    };
    const renderItem = ({ item }) => (
        <View className=" h-full items-center justify-center px-6">
            <Image
            source={item.image}
            style={{width: 350, height: 300}}
            resizeMode='contain'
            />
            <Text className="text-2xl  text-center mt-6 font-bold">{item.title}</Text>
            <Text className=" text-gray-600 text-center mt-3">{item.description}</Text>
        </View>
    );
    const Dot = ({ active }) => (
        <View
         style={{
            height: 8,
            width: 8,
            borderRadius: 4,
            backgroundColor: active ? '#75F94C' : '#D1D5DB',
            marginHorizontal: 5,
         }}
         />
    );
    return(
        <View className="flex-1 bg-white">
            <StatusBar barStyle='dark-content' />
            <TouchableOpacity onPress={handleSkip} className="absolute right-5 top-10 ">
                <Text className="text-[#75F94C] font-semibold text-2xl">Skip</Text>
            </TouchableOpacity>

            <FlatList
            ref={flatListRef}
            data={slides}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            onScroll={updateIndex}
            />


            <View className="flex-row justify-center mt-4">
                {slides.map((_,index)=>(
                <Dot key={index} active={index === currentIndex} />
            ))}
            </View>

            <TouchableOpacity
            onPress={handleNext}
            className="bg-[#75F94C] mx-6 my-6 p-4  rounded-[20px]">
                <Text className="text-white text-center font-bold text-2xl">
                    {currentIndex === slides.length -1 ? "Get Started" : "Next"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
export default OnboardingScreen;