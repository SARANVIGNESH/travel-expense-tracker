import React, { ReactNode } from 'react'
import { View } from 'react-native'

const ScreenWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    let statusBarHeight = 30
    return (
        <View style={{ paddingTop: statusBarHeight }}>
            { children } 
        </View>
    )
}

export default ScreenWrapper
