import React from 'react'
import { Text, View, Image } from 'react-native'

function EmptyList({message}) {
  return (
    <View className='flex justify-center items-center my-5 space-y-3'>
        <Image className="w-36 h-36 shadow" source={require('../assets/empty.png')}></Image>
        <Text className="font-bold text-gray-400">{message || 'data not found'}</Text>
    </View>
  )
}

export default EmptyList