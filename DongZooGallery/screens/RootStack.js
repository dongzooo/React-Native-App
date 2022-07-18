import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from './SignInScreen';

//스택 생성
const Stack = createNativeStackNavigator();

function RootStack() {
    return (
       <Stack.Navigator>
           <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown:false}}
            />
       </Stack.Navigator>
    )
}

const style = StyleSheet.create({
})

export default RootStack;