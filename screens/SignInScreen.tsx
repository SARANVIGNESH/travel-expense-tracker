import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import BackButton from '../components/BackButton'
import { color } from 'react-native-tailwindcss'
import { useNavigation } from '@react-navigation/native'
import Snackbar from 'react-native-snackbar'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { setUserLoading } from '../redux/slices/user'
import services from '../utils/services'
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline'

function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const {userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      //   navigation.goBack();
      // navigation.navigate('Home');
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch(e) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: e.message,
          backgroundColor: 'red'
        });
      }
      

    } else {
      Snackbar.show({
        text: 'Email and Password are required',
        backgroundColor: 'red'
      });
    }
  }

  return (
    <ScreenWrapper>
      <View className='flex justify-between h-full mx-4'>
        <View>
        <View className='relative'>
          <View className='absolute top-0 left-0 z-10'>
            <BackButton />
          </View>
          <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign In</Text>
          </View>
          <View className='flex-row justify-center my-3 mt-5'>
          <Image className='h-80 w-80' source={require('../assets/login.png')} />
        </View>
        <View className='space-y-2 mx-2'>
          <Text className={`${colors.heading} text-xl font-bold`}>
            Email
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 25, paddingHorizontal: 10, backgroundColor: 'white' }}>
              <TextInput
                value={email}
                onChangeText={value => setEmail(value)}
                style={{ flex: 1, padding: 10 }}
                placeholder="Enter Email"
              />
          </View>
          <Text className={`${colors.heading} text-xl font-bold`}>Password</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 25, paddingHorizontal: 10, backgroundColor: 'white' }}>
              <TextInput
                value={password}
                onChangeText={value => setPassword(value)}
                secureTextEntry={!isPasswordVisible}
                style={{ flex: 1, padding: 10 }}
                placeholder="Enter Password"
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                {
                  isPasswordVisible ? <EyeIcon size={24} color={color.black} /> : <EyeSlashIcon size={24} color={color.black} />
                }
              </TouchableOpacity>
           </View>
          <TouchableOpacity className='flex-row justify-end'>
            <Text>Forget Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {
          userLoading ? <Loading /> : (
            <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: color.green500}} className='my-6 rounded-full p-3 shadow-sm mx-2'>
            <Text className='text-center text-white text-lg font-bold '>Sign In</Text>
          </TouchableOpacity>
          )
        }
       
      </View>

      </View>
    </ScreenWrapper>
    
  )
}

export default SignInScreen