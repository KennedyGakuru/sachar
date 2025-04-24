import {TouchableOpacity, Text,Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const PaymentsCard = ({title,imageSource, isSelected, onSelect}) => {
    return(
        <TouchableOpacity   style={{height: 50, width: 350, borderRadius: 10,
            backgroundColor: isSelected ? '#4CAF50' : '#CCFFB3', 
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8,
          }} onPress={() => onSelect(title)}>
           <Ionicons name='checkmark-done-circle' size={24} color={isSelected ? 'green':'white'} />
           <Text className="text-[20px]">{title}</Text> 
           <Image source={imageSource}
           className='h-[50px] w-[50px]' />
        </TouchableOpacity>
    )
}

export default PaymentsCard;