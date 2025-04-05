import {TouchableOpacity, Text,Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const PaymentsCard = ({title,imageSource, isSelected, onSelect}) => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const handlePress = () =>{
        setSelectedMethod(title);
    };
    return(
        <TouchableOpacity   style={{height: 50, width: 350, borderRadius: 10,
            backgroundColor: selectedMethod === title ? '#4CAF50' : '#CCFFB3', 
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8,
          }} onPress={onSelect}>
           <Ionicons name='checkmark-done-circle' size={24} color={selectedMethod === title ? 'green':'white'} />
           <Text className="text-[20px]">{title}</Text> 
           <Image source={imageSource}
           className='h-[50px] w-[50px]' />
        </TouchableOpacity>
    )
}

export default PaymentsCard;