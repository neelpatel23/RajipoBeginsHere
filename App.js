import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { auth } from './config/firebase';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from './screens/PreAuthScreens/Login';
import SwipeableMukhpathScreen from './screens/PostAuthScreens/Mukhpath';
import LeaderboardScreen from './screens/PostAuthScreens/Leaderboard';
import colors from './globalVariables/colors';
import AddContent from './screens/PostAuthScreens/AddContent';
import Settings from './screens/PostAuthScreens/Settings';
import TeamStandingsScreen from './screens/PostAuthScreens/TeamStandings';
import ResetPassword from './screens/PreAuthScreens/Reset';
import AnnouncementsScreen from './screens/PostAuthScreens/Announcements';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function SatsangStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SwipeableMukhpathScreen" 
        component={SwipeableMukhpathScreen} 
        options={{ 
          headerShown: false, // Set this to true to enable the header
          headerTransparent: true, // Set this to true to make the header transparent
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Use rgba for transparency
            borderBottomWidth: 1,
            borderBottomColor: colors.primary
          },
        }} 
      />
      <Stack.Screen
        name="AddContent" 
        component={AddContent} 
        options={{ 
          headerShown: false, // Set this to true to enable the header
          headerTransparent: false, // Set this to true to make the header transparent
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: colors.darkBackground,
            borderBottomWidth: 1,
            borderBottomColor: colors.primary
          },
        }} 
      />
    </Stack.Navigator>
  )
}

function MainStack() {
  return (
    <Tab.Navigator
      initialRouteName='Mukhpath'
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary, // Bright accent color for active tab
        tabBarInactiveTintColor: '#BBBBBB', // Light gray for inactive tabs
        tabBarStyle: {
          backgroundColor: colors.darkBackground, // Dark background for tab bar
          display: 'flex'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mukhpath') {
            iconName = 'list-circle-outline';
          } else if (route.name === 'Leaderboard') {
            iconName = 'analytics-outline';
          } else if (route.name === 'Standings') {
            iconName = 'bar-chart-outline';
          } else if (route.name == 'Settings') {
            iconName = 'settings-outline'
          } else if (route.name == 'Announcements') {
            iconName = 'megaphone-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Mukhpath" 
        component={SatsangStack}
        options={{ 
          tabBarShowLabel: true,
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.darkBackground, // Dark header background
            borderBottomWidth: 1,
            borderBottomColor: '#444444', // Darker border for header
          } 
        }}  
      />
      <Tab.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen}
        options={{ 
          tabBarShowLabel: true,
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.darkBackground, // Dark header background
            borderBottomWidth: 1,
            borderBottomColor: '#444444', // Darker border for header
          } 
        }}  
      />
      <Tab.Screen 
        name="Announcements" 
        component={AnnouncementsScreen}
        options={{ 
          tabBarShowLabel: true,
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.darkBackground, // Dark header background
            borderBottomWidth: 1,
            borderBottomColor: '#444444', // Darker border for header
          } 
        }}  
      />
      <Tab.Screen 
        name="Standings" 
        component={TeamStandingsScreen}
        options={{ 
          tabBarShowLabel: true,
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.darkBackground, // Dark header background
            borderBottomWidth: 1,
            borderBottomColor: '#444444', // Darker border for header
          } 
        }}  
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings}
        options={{ 
          tabBarShowLabel: true,
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.darkBackground, // Dark header background
            borderBottomWidth: 1,
            borderBottomColor: '#444444', // Darker border for header
          } 
        }}  
      />
    </Tab.Navigator>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Reset" component={ResetPassword} />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync();
    const unsubscribe = onAuthStateChanged(auth, authenticatedUser => {
      setUser(authenticatedUser ? authenticatedUser : null);
      setTimeout(() => {
        setIsLoading(false);
        SplashScreen.hideAsync();
      }, 2700); // 2.7 second delay
    });

    return unsubscribe; // Cleanup subscription
  }, [setUser]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground, // Dark background for the entire app
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBackground, // Dark background for the loading screen
  },
});
