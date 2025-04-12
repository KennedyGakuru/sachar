import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert,  ScrollView} from 'react-native';
import {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkModeContext } from '../components/DarkModeContext';


const EditProfileScreen = () => {
    const navigation = useNavigation();
    const {darkMode} = useContext(DarkModeContext);
    const [userInfo , setUserInfo] = useState({name:"", email:"",password:"",phone:"",address:""});
    const [paymentMethods, setPaymentMethods] = useState(["","",""]);
    useEffect(()=>{
        const loadData = async () =>{
            try{
                const storedUserInfo = await AsyncStorage.getItem("userInfo");
                const storedPayments = await AsyncStorage.getItem("paymentMethods");
                if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
                if (storedPayments) setPaymentMethods(JSON.parse(storedPayments));
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        loadData();
    },[]);
    const saveuserInfo = async () => {
        try{
            await AsyncStorage.setItem("userInfo",JSON.stringify(userInfo));
            await AsyncStorage.setItem("paymentMethods",JSON.stringify(paymentMethods));
            Alert.alert("Success", "Profile updated successfully!");
        } catch (error){
            console.error("Error saving data:", error);
        }
    } 

    return(
        <SafeAreaView className={`flex-1 ${darkMode ? 'bg-[#102F15]' : 'bg-white'}`}>
            
            <ScrollView >
            <View className="mx-4">
            <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 bg-[#75F94C] rounded-full flex items-center justify-center ">
                    <Ionicons name="arrow-back" size={24} color='white'/>
                </TouchableOpacity>
            </View> 
            <View className="items-center">
                <View className="h-auto w-[350px] bg-[#ccffb3] rounded-[20px] p-5 justify-between">
                    <Text className="text-[24px] text-center">Personal Information</Text>
                    {Object.keys(userInfo).map((key)=>(
                        <View className="flex-row items-center mt-2" key={key}>
                            <Text className="text-[18px] capitalize">{key.replace("_","")}:</Text>
                            <TextInput
                            className="text-[18px] flex-1  border-gray-400 ml-2"
                            value={userInfo[key]}
                            onChangeText={(text) =>setUserInfo({...userInfo, [key]:  text})}
                            secureTextEntry={key=== "password"}
                            />
                        </View>    
                    ))}
                </View>
            </View>
            <View className="items-center p-5 w-full ">
                <Text className={`${darkMode ? 'text-white' : 'text-black'} text-[20px] mb-2`}>Payment Methods</Text>

                {paymentMethods.map((method, index) => (
                <TextInput
                key={index}
                className="h-[55px] w-[350px] bg-[#ccffb3] rounded-[20px] p-2 mt-2 text-[18px]"
                placeholder={`Payment Method ${index + 1}`}
                value={method}
                onChangeText={(text) => {
                    let NewMethods = [...paymentMethods];
                    NewMethods[index] = text;
                    setPaymentMethods(NewMethods);
                }}
                />
                ))}
            </View>
            <View className="items-center">
            <TouchableOpacity className="h-[50px] w-[350px] bg-[#75F94C] items-center justify-center rounded-[20px]"  onPress={saveuserInfo}>
                <Text className="text-[20px] text-white font-bold"> Save Profile</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
            
        </SafeAreaView>
    )
};

export default EditProfileScreen;