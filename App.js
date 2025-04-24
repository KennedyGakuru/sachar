import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import WishlistScreen from './screens/WishlistScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen'
import { Ionicons } from '@expo/vector-icons';
import store from './redux/store';
import { Provider } from 'react-redux';
import CheckOutScreen from './screens/CheckOutScreen';
import OrderPlacedScreen from './screens/OrderPlacedScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import { DarkModeProvider } from './components/DarkModeContext';
import SeeAllScreen from './screens/SeeAllScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import MapScreen from './screens/MapScreen';

const Tab = createBottomTabNavigator ();
const Stack = createStackNavigator ();

const HomeTabs = ()=> {
  return(
   
    <Tab.Navigator
     screenOptions={{
      tabBarStyle: {
        backgroundColor: 'gray', 
        borderRadius: 40, 
        height: 60, 
        width: '90%', 
        bottom: 20, 
        marginHorizontal: '5%', 
        position:'absolute'
      },
      tabBarActiveTintColor: '#75F94C',
      tabBarInactiveTintColor: 'white',
      tabBarShowLabel: false, 
      
     }}
     >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Ionicons name="home" size={size} color={color} style={{ marginBottom: -20 }}/> ) }}/>
      <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Ionicons name="cart" size={size} color={color} style={{ marginBottom: -20 }}/> ) }}/>
      <Tab.Screen name="WishList" component={WishlistScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Ionicons name="heart" size={size} color={color} style={{ marginBottom: -20 }}/> ) }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Ionicons name="person" size={size} color={color} style={{ marginBottom: -20 }}/> ) }}/>
     </Tab.Navigator>
     
  );
};

const App = () => {
  return(
    <Provider store={store}>
      <DarkModeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeTabs"> 
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }}/>
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="CheckOut" component={CheckOutScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="SeeAll" component={SeeAllScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </DarkModeProvider>
    </Provider>
  );
};

export default App;