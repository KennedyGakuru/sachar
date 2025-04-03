import {TouchableOpacity, Text,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileTabs =({ IconName, title, onPress, bgColor = '#ccffb3'}) =>{
    return(
        <TouchableOpacity
         onPress={onPress}
         style={{backgroundColor: bgColor}}
         className= "h-[60px] w-[350px]  mt-5 flex-row rounded-[20px] justify-between items-center p-2">
            <Ionicons name={IconName} size={24} color='white'/>
            <Text className="text-[22px]">{title}</Text>
            <Ionicons name={'arrow-forward-circle'} size={24} color='white'/>
         </TouchableOpacity>
    );
};

export default ProfileTabs;