import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, SafeAreaView } from 'react-native';
import { Card, Button, Title, Paragraph, Switch } from 'react-native-paper';
import { signOut, deleteUser } from 'firebase/auth';
import { auth, database } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import colors from '../../globalVariables/colors';

const Settings = ({ navigation }) => {
  const user = auth.currentUser;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(database, 'userData', user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchUserData();
  }, [user.uid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Settings',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, []);

  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const deleteAccount = async () => {
    await deleteUser(user);
    // Additional logic for post-deletion (navigation, state update, etc.)
  };

  const UserInfoCard = ({ title, detail }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View>
          <Title style={styles.cardTitle}>{title}</Title>
          <Paragraph style={styles.cardDetail}>{detail}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
        <View style={styles.cardContainer}>
            <UserInfoCard title="Full Name" detail={`${userData.firstName || ''} ${userData.lastName || ''}`} />
            <UserInfoCard title="Email" detail={userData.email || 'Not available'} />
            <UserInfoCard title="Group" detail={userData.group || 'Not available'} />
            <UserInfoCard title="Center" detail={userData.center || 'Not available'} />
            <UserInfoCard title="Role" detail={userData.role || 'Not available'} />
            <UserInfoCard title="Tier" detail={userData.tier || 'Not available'} />
            <UserInfoCard title="Team" detail={userData.team || 'Not Available'} />

            <Card style={styles.notificationCard}>
            <Card.Content>
                <View style={styles.switchContainer}>
                <Title style={styles.cardTitle}>Notifications</Title>
                <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
                </View>
            </Card.Content>
            </Card>
        </View>
        <View style={styles.buttonContainer}>
            <Button mode="outlined" onPress={handleSignOut} style={styles.button}>Sign Out</Button>
            <Button mode="elevated" onPress={deleteAccount} style={styles.deleteButton}>Delete Account</Button>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yogiCupBlue,
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.darkBackground,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 2, // Subtle shadow for Android
  },
  notificationCard: {
    backgroundColor: colors.darkBackground,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardDetail: {
    color: colors.primary,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30
  },
  button: {
    borderRadius: 20,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    width: '45%',
    color: '#ffffff'
  },
  deleteButton: {
    borderRadius: 20,
    backgroundColor: 'red',
    paddingVertical: 10,
    width: '45%',
    color: 'white'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBackground,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Settings;
