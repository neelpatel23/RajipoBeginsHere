import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, StatusBar,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  Platform,
  SafeAreaView,
  Image
} from 'react-native';
import { sendPasswordResetEmail } from '@firebase/auth';
import { auth } from '../../config/firebase';
import colors from '../../globalVariables/colors';
const logoImage = require("../../assets/image1.png");


export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState('');
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

  const handlePasswordReset = async () => {
    if (email === '') {
      Alert.alert('Reset Password Error', 'Please enter an email address.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password Reset', 'A password reset email has been sent to your email address.');
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert('Reset Password Error', err.message);
    } finally {
      setLoading(false);
    }
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
          <Image source={logoImage} style={[styles.logo, logoSize, logoPosition]} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#000"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
              <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>
          )}
          <View style={styles.backToLoginContainer}>
            <Text style={styles.backToLoginText}>Remember your password? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginText}>Login</Text>
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
  resetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
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
  backToLoginContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  backToLoginText: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 14,
  },
  loginText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});
