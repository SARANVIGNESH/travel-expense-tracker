import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EmptyList from '../components/EmptyList';
import { colors } from '../theme';
import randomImage from '../assets/randomImage';
import { useState } from 'react';
import { getDocs, query, where } from 'firebase/firestore'
import { tripsRef } from '../config/firebase';
import { useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase';
import { color } from 'react-native-tailwindcss';



const ProfileScreen = () => {
  const {user} = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

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

  const handleLogout = async () => {
    await signOut(auth);

  }

  useEffect(() => {
    if (isFocused) 
      fetchTrips();
  }, [isFocused])


  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 

    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
      <ScrollView 
      style={styles.container}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      showsVerticalScrollIndicator={false}
      >
        {/* <Image style={styles.userImg} src={require('../assets/randomImage')}></Image> */}
        <Image style={styles.userImg} source={user.photoURL ? { uri: user.photoURL } : require('../assets/user.png')} />
        <Text style={styles.userName}>{user.displayName ? user.displayName : 'User'}</Text>
        <Text style={styles.aboutUser}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ab do</Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity style={styles.userBtn} onPress={() => {navigation.navigate('EditProfile')}}>
            <Text style={styles.userBtnTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => {handleLogout()}}>
            <Text style={styles.userBtnTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{trips.length}</Text>
            <Text style={styles.userInfoSubTitle}>Trips</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>0</Text>
            <Text style={styles.userInfoSubTitle}>Budget</Text>
          </View>
        </View>


        {/* <View style={{height: 430}}>
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
        </View> */}


      </ScrollView>
    </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: color.green500,
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: color.black,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});



