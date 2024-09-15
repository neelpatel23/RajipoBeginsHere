import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { Card } from 'react-native-paper';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { database, auth } from '../../config/firebase';
import colors from '../../globalVariables/colors';
import { TabView, TabBar } from 'react-native-tab-view';

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Mahant', title: 'Mahant' },
    { key: 'Pramukh', title: 'Pramukh' },
    { key: 'Yogi', title: 'Yogi' },
  ]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      // Fetch all user documents from the 'userData' collection
      const userCollection = collection(database, 'userData');
      const userDocsSnap = await getDocs(userCollection);

      const users = [];
      userDocsSnap.forEach(doc => {
        users.push({ 
          uid: doc.id, 
          firstName: doc.data().firstName, 
          tier: doc.data().tier
        });
      });

      // Fetch leaderboard data for each user
      const leaderboardDataPromises = users.map(async (user) => {
        const leaderboardDocRef = doc(database, 'leaderboard', user.uid);
        const leaderboardDocSnap = await getDoc(leaderboardDocRef);

        if (leaderboardDocSnap.exists()) {
          const { kirtans = 0, shloks = 0 } = leaderboardDocSnap.data();
          return { ...user, kirtans, shloks };
        } else {
          return { ...user, kirtans: 0, shloks: 0 };
        }
      });

      const leaderboardData = await Promise.all(leaderboardDataPromises);

      // Sort the leaderboard data by the total number of memorized items (shloks + kirtans)
      leaderboardData.sort((a, b) => (b.shloks + b.kirtans) - (a.shloks + a.kirtans));

      setLeaderboardData(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData();
  };

  const renderItem = ({ item }) => {
    const isCurrentUser = item.uid === auth.currentUser.uid;

    return (
      <Card style={[styles.card, isCurrentUser && styles.currentUserCard]}>
        <Card.Content>
          <View style={styles.cardContent}>
            <Text style={[styles.name, isCurrentUser && styles.currentUserName]}>
              {item.firstName}
            </Text>
            <View style={styles.stats}>
              <Text style={styles.statText}>Shloks: {item.shloks}</Text>
              <Text style={styles.statText}>Kirtans: {item.kirtans}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderScene = ({ route }) => {
    const filteredData = leaderboardData.filter(user => user.tier === route.key);

    return (
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={colors.darkBackground}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBackground }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
        renderTabBar={props => (
          <TabBar 
            {...props}
            style={styles.tabBar}
            scrollEnabled={true}
            renderLabel={({ route, focused, color }) => (
              <Text style={{ color: focused ? colors.primary : colors.inactiveIcon, fontSize: 16 }}>
                {route.title}
              </Text>
            )}
            indicatorStyle={styles.tabIndicator}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
    padding: 10,
  },
  card: {
    marginVertical: 8,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    borderColor: colors.cardBorder,
    borderWidth: 1,
  },
  currentUserCard: {
    borderColor: '#56E364',
    borderWidth: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    color: colors.lightText,
    fontWeight: 'bold',
  },
  currentUserName: {
    color: '#56E364',
  },
  stats: {
    flexDirection: 'column',
  },
  statText: {
    fontSize: 16,
    color: colors.lightText,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: colors.darkBackground,
    elevation: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  tabIndicator: {
    backgroundColor: colors.primary,
    height: 3,
  },
});

export default LeaderboardScreen;
