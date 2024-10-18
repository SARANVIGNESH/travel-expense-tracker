import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { color, colors } from 'react-native-tailwindcss';
import { UserCircleIcon } from 'react-native-heroicons/outline';
import { auth } from '../config/firebase';
import { signOut } from '@firebase/auth';



const Header = () => {
    const {user} = useSelector(state => state.user);
    const handleLogout = async () => {
      await signOut(auth);
  
    }
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    }}
    >
        {/* <Image 
        source={{uri: user?.photoURL}}
        style={{width: 50, height: 50, borderRadius: 99}}
        /> */}
        {
          user.photoURL ?
          <Image 
          source={{uri: user?.photoURL}}
          style={{width: 50, height: 50, borderRadius: 99}}
          /> : <UserCircleIcon size={50} color={color.black}/>
        }
        {/* <UserCircleIcon size={50} color={color.black}/> */}
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '85%'
        }}>
            <View>
                <Text style={{color: color.white, fontSize: 16}}>Welcome</Text>
                <Text style={{color: color.white, fontSize: 20}}>{user.displayName ? user.displayName : "User"}</Text>
            </View>
            <TouchableOpacity onPress={handleLogout} className='p-2 px-3 bg-white border border-gray-200 rounded-full'>
          <Text className={colors.black}>Logout</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default Header