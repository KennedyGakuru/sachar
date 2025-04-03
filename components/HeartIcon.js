import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Animated,} from "react-native";

const HeartIcon = ({onPress, isFavorite}) =>{ 
    const scaleValue =useRef(new Animated.Value(1)).current;

    const animateIcon = () => {
        Animated.spring(scaleValue, {
            toValue:1.2,
            friction:3,
            useNativeDriver: true,
        }) .start(() => {
            Animated.spring(scaleValue, {
                toValue: 1,
                friction:3,
                useNativeDriver: true,
            }) .start();
        });
    };
    const handlePress = ()=>{
        animateIcon();
        onPress();
    };

    return(
        <TouchableOpacity onPress={handlePress}>
            <Animated.View style={{transform:[{scale:scaleValue}]}}>
                <Ionicons 
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? 'red' : 'gray'}
                />
            </Animated.View>
        </TouchableOpacity>
    );

};

export default HeartIcon;