import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../redux/slices/user';
import { auth } from '../config/firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import { color } from 'react-native-tailwindcss';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import { HomeIcon, UserIcon } from 'react-native-heroicons/solid'
import EditProfileScreen from '../screens/EditProfileScreen';


const Tab = createBottomTabNavigator();


const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ 
          headerTitle: "User Profile",
          headerBackTitleVisible: false,
          headerStyle: {
          backgroundColor: '#fff',
          },
        }} 
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{
          headerTitle: "Edit profile",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
        }} 
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'Home') {
            return <HomeIcon size={24} color={focused ? color.green500 : color.black} />
          }
          return <UserIcon size={24} color={focused ? color.green500 : color.black} />
        },
        tabBarActiveTintColor: color.green500,
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 14,
          paddingBottom: 5,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
}




export default function AppNavigation() {

    
  const { user } = useSelector(state=> state.user);
  const dispatch = useDispatch();
  

  onAuthStateChanged(auth, u=> {
    console.log('got user', u)
    dispatch(setUser(u));
  })

  if (user) {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        {/* <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} /> */}
        <Stack.Screen options={{ headerShown: false }} name="Main" component={TabNavigator} />
        <Stack.Screen options={{headerShown: false}} name="AddTrip" component={AddTripScreen} />
        <Stack.Screen options={{headerShown: false}} name="TripExpenses" component={TripExpensesScreen} />
        <Stack.Screen options={{headerShown: false, presentation: 'modal', headerTitle: 'Add New Expense'}} name="AddExpense" component={AddExpenseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  } else {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
      <Stack.Screen options={{headerShown: false, presentation: 'modal'}} name="SignIn" component={SignInScreen} />
      <Stack.Screen options={{headerShown: false, presentation: 'modal'}} name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  } 
  }