import React from 'react'
import { ActivityIndicator } from 'react-native'
import { colors } from '../theme'
import { View } from 'react-native'

function Loading() {
  return (
    <View className='flex-row justify-center py-8'>
        <ActivityIndicator size="large" color={colors.button}></ActivityIndicator>
    </View>
    
  )
}

export default Loading