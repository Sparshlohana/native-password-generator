import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// form validation
const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Password must be at least 4 characters')
    .max(20, 'Password must be less than 20 characters')
    .required('Password is required'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: Number) => {
    let characterList = '';
    if (lowerCase) {
      characterList += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (upperCase) {
      characterList += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (numbers) {
      characterList += '0123456789';
    }
    if (symbols) {
      characterList += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    }

    const password = createdPassword(characterList, passwordLength);
    setPassword(password);
    setIsPasswordGenerated(true);


  }

  const createdPassword = (characters: String, passwordLength: Number) => {
    let result = '';
    for (let i = 0; i < passwordLength.valueOf(); i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  }

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)

  }
  return (
    <ScrollView style={{ backgroundColor: 'black' }} keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <View>
          <Text style={styles.mainTitle}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}
            onSubmit={values => {
              generatePasswordString(+values.passwordLength);
              console.log(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View>
                  <View style={styles.passwordLengthContainer}>
                    <Text style={styles.passwordLengthTitle}>Password Length:</Text>
                    <TextInput
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      keyboardType='numeric'
                      style={[styles.passwordLengthInput, { color: 'white' }]}
                      placeholder='Enter Password Length..'
                    />
                  </View>
                </View>
                <View>
                  <View style={styles.passwordLengthContainer}>
                    <Text style={styles.passwordLengthTitle}>Include Lowercase:</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#1b8c2d"
                    />
                  </View>
                </View>
                <View>
                  <View style={styles.passwordLengthContainer}>
                    <Text style={styles.passwordLengthTitle}>Include Uppercase:</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#b31d92"
                    />
                  </View>
                </View>
                <View>
                  <View style={styles.passwordLengthContainer}>
                    <Text style={styles.passwordLengthTitle}>Include Numbers:</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#c8bf5b"
                      innerIconStyle={{ borderColor: numbers ? '#e2d758' : "#c8bf5b" }}
                    />
                  </View>
                </View>
                <View>
                  <View style={styles.passwordLengthContainer}>
                    <Text style={styles.passwordLengthTitle}>Include Symbols:</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#ff7e0c"
                    />
                  </View>
                </View>
                {touched.passwordLength && errors.passwordLength && <Text style={{ color: 'red', textAlign: 'center', fontSize: 20, marginTop: 20 }}>{errors.passwordLength}</Text>}
                {isPasswordGenerated && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Your Password is: </Text>
                  <Text selectable={true} style={{ color: '#abb5ff', fontSize: 20 }} >{password}</Text>
                </View>}

                <View style={styles.submitContainer}>
                  <TouchableOpacity disabled={!isValid} onPress={() => handleSubmit()}><Text style={styles.submitBtn}>Generate</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    handleReset();
                    resetPassword();
                  }}><Text style={styles.submitBtn}>Reset</Text></TouchableOpacity>
                </View>

              </>
            )}
          </Formik>
        </View>

      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  mainTitle: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'white',
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
  },
  passwordLengthContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 15,
  },
  passwordLengthTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  passwordLengthInput: {
    backgroundColor: 'transparent',
    width: '50%',
    height: 34,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 10,
    paddingVertical: 0,
    color: 'white',
    fontSize: 13,
  },
  submitContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20,
  },
  submitBtn: {
    padding: 8,
    borderRadius: 10,
    color: 'white',
    fontWeight: 'bold',
    borderColor: 'white',
    borderWidth: 1,
  }
})