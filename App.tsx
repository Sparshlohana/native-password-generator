import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Yup from 'yup'


// form validation
const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Password must be at least 4 characters')
    .max(16, 'Password must be less than 16 characters')
    .required('Password is required'),
});

const App = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})