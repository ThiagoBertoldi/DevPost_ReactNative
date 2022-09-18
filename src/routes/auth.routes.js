import React from "react";
import{ createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import SignIn from '../pages/SignIn';

export default function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
        </Stack.Navigator>
    );
}