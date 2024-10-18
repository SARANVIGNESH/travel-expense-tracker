import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/randomImage'
import EmptyList from '../components/EmptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { auth, db, expensesRef, tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import { getDocs, query, where } from 'firebase/firestore'
import services from '../utils/services'
import Header from '../components/Header'
import { color } from 'react-native-tailwindcss'
import CircularChart from '../components/CircularChart'
import { ScrollView } from 'react-native-gesture-handler'

const items = [
  {
    id: 1,
    place: 'Gujarat',
    country: 'India'
  },
  {
    id: 2,
    place: 'Gujarat',
    country: 'India'
  },
  {
    id: 3,
    place: 'Gujarat',
    country: 'India'
  },
  {
    id: 4,
    place: 'Gujarat',
    country: 'India'
  }
]


function HomeScreen() {
  const {user} = useSelector(state => state.user);
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const data = [];
    const q = query(tripsRef, where("userId", "==", user.uid));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach(doc=> {
      // console.log('fetched data', doc.data());
      data.push({...doc.data(), id: doc.id})
    })
    setTrips(data);
  }

  useEffect(() => {
    if (isFocused) 
      fetchTrips();
    // fetchTripsExpenseAmount();
  }, [isFocused])
  const handleLogout = async () => {
    await signOut(auth);

  }

  return (
    <ScreenWrapper>
      {/* <View className='flex-row justify-between items-center p-4'>
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Expensify</Text>
        <TouchableOpacity onPress={handleLogout} className='p-2 px-3 bg-white border border-gray-200 rounded-full'>
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
        </View> */}
        {/* <View className='flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 b-4'> */}
        <View style={{
            marginTop: 20,
            padding: 20,
            backgroundColor: color.green500,
            height: 150,
            marginBottom: 170
        }}>
          {/* <Image source={require('../assets/banner.png')} className='w-60 h-60' /> */}
          <Header />
          <CircularChart trips={trips}/>
        </View>
       <View className='px-4'>
       <View className='flex-row justify-between items-center'>
          <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddTrip')} className='p-2 px-3 bg-white border border-gray-200 rounded-full'>
          <Text className={colors.heading}>Add Trip</Text>
        </TouchableOpacity>
        </View>
        <View style={{height: 430}}>
          <FlatList data={trips}
           numColumns={2} 
           keyExtractor={item=> item.id} 
           showsVerticalScrollIndicator={false} 
           ListEmptyComponent={<EmptyList  message={"You haven't not recorded any trip yet"}/>}
           columnWrapperStyle={{
            justifyContent: 'space-between',
           }}
           
           renderItem={({item}) => {
            return (
              <TouchableOpacity 
              className='bg-white p-3 rounded-2xl mb-3 shadow-sm' 
              onPress={() => navigation.navigate('TripExpenses', {...item})}
              >
                <View>
                  <Image source={randomImage()} className='w-36 h-36 mb-2' />
                  <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                  <Text className={`${colors.heading} text-xs`}>{item.country}</Text>

                </View>
              </TouchableOpacity>
            )

          }} >

          </FlatList>
        </View>
       </View>
    </ScreenWrapper>

    
  )
}



export default HomeScreen




   