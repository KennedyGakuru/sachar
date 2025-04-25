import {View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { setShippingAddress } from '../redux/checkoutSlice';

const MapScreen = ({navigation}) => {
  const dispatch = useDispatch();
  
    const [region,setRegion]= useState({
        latitude: -1.2921, 
        longitude: 36.8219,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    })
    const handleSelectLocation = (location) =>{
      dispatch(setShippingAddress(location));
      navigation.goBack();
    }
    return(
        <View className="flex-1">
            <MapView
            style={StyleSheet.absoluteFillObject}
            region={region}
            onRegionChangeComplete={(r) => setRegion(r)}
            >
                <Marker coordinate={region} />
             </MapView>
             <TouchableOpacity
              style={{
                position:'absolute',
                bottom: 40,
                alignSelf: 'center',
                backgroundColor:'#75F94C',
                padding:15,
                borderRadius: 10,
              }}   
              onPress={() => handleSelectLocation(myLocation)}
              >
                <Text style={{color: 'white', fontSize: 18}}>Confirm Location</Text>
              </TouchableOpacity>
        </View>
    )
};

export default MapScreen;  