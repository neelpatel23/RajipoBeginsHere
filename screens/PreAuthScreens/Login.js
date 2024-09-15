import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, StatusBar,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  Keyboard,
  Platform,
  SafeAreaView
} from 'react-native';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../config/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../globalVariables/colors';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [loading, setLoading] = useState(false);
  const [logoSize, setLogoSize] = useState({ width: 250, height: 250 });
  const [logoPosition, setLogoPosition] = useState({ top: 20 });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setLogoSize({ width: 200, height: 200 });
        setLogoPosition({ top: 0 });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setLogoSize({ width: 250, height: 250 });
        setLogoPosition({ top: 20 });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onHandleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Login Error', 'Email and password fields cannot be blank.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successfully logged in, navigate to the next screen if needed
    } catch (err) {
      Alert.alert('Login Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* <Image source={logoImage} style={[styles.logo, logoSize, logoPosition]} /> */}
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#000"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Enter password"
              placeholderTextColor="#000"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              textContentType="password"
              value={password}
              onSubmitEditing={onHandleLogin}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityToggle}>
              <Ionicons name={passwordVisibility ? "eye-off" : "eye"} size={24} color="#000" />
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          )}
          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot your password? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f829s9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    marginBottom: 50,
  },
  input: {
    backgroundColor: '#F6F7FB',
    width: '80%',
    height: 58,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  passwordInput: {
    flex: 1,
    // marginRight: 10,
  },
  visibilityToggle: {
    // position: 'relative',
    position: 'absolute',
    right: 10,
    top: '40%',
    transform: [{ translateY: -12 }],
  },
  button: {
    backgroundColor: colors.primary,
    width: '70%',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 14,
  },
  resetText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});
