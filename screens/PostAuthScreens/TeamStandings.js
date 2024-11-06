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

const TeamStandingsScreen = () => {
  const [teams, setTeams] = useState([]); // Holds the list of team names and their users
  const [leaderboardData, setLeaderboardData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0); // For TabView
  const [routes, setRoutes] = useState([]); // For dynamically creating tabs

  // Fetch users and group them by their teams
  const fetchTeamData = async () => {
    try {
      setIsLoading(true);
      const userCollection = collection(database, 'userData');
      const userDocsSnap = await getDocs(userCollection);

      const teams = {}; // Object to hold teams and their users

      userDocsSnap.forEach(doc => {
        const { firstName, team } = doc.data(); // Fetch user's firstName and team
        const user = {
          uid: doc.id, 
          firstName, 
          team
        };
        // Add users to the correct team
        if (!teams[team]) {
          teams[team] = []; // Initialize the team if not already present
        }
        teams[team].push(user); // Add user to the team
      });

      // Set team routes dynamically for the tabs
      const routes = Object.keys(teams).map((teamName, idx) => ({
        key: teamName, title: teamName
      }));
      setRoutes(routes);
      setTeams(teams); // Store the grouped team data
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch leaderboard data for each user, including shloks, kirtans, pbps, ahnicks, and swamini vatos
  const fetchLeaderboardData = async (users) => {
    try {
      const leaderboardDataPromises = users.map(async (user) => {
        const leaderboardDocRef = doc(database, 'leaderboard', user.uid);
        const leaderboardDocSnap = await getDoc(leaderboardDocRef);

        if (leaderboardDocSnap.exists()) {
          const { 
            kirtans = 0, 
            shloks = 0, 
            pbps = 0, 
            ahnicks = 0, 
            swaminiVatos = 0 
          } = leaderboardDocSnap.data();
          return { ...user, kirtans, shloks, pbps, ahnicks, swaminiVatos };
        } else {
          return { ...user, kirtans: 0, shloks: 0, pbps: 0, ahnicks: 0, swaminiVatos: 0 };
        }
      });

      return await Promise.all(leaderboardDataPromises);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      return [];
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTeamData();
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  // Render each team member's card with stats
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
              <Text style={styles.statText}>PBPs: {item.pbps}</Text>
              <Text style={styles.statText}>Ahniks: {item.ahnicks}</Text>
              <Text style={styles.statText}>Swamini Vatos: {item.swaminiVatos}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  // Render the team view in each tab
  const renderScene = ({ route }) => {
    const teamUsers = teams[route.key] || [];

    // Fetch leaderboard data for the selected team
    if (!leaderboardData[route.key]) {
      fetchLeaderboardData(teamUsers).then((data) => {
        setLeaderboardData((prevData) => ({ ...prevData, [route.key]: data }));
      });
      return <ActivityIndicator size="large" color={colors.primary} />;
    }

    return (
      <FlatList
        data={leaderboardData[route.key]} // Use the leaderboard data for this team
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
        renderTabBar={(props) => (
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
    backgroundColor: colors.inactiveIcon,
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

export default TeamStandingsScreen;
