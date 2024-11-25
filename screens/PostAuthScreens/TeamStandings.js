import React, { useState, useEffect, memo } from 'react';
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
import { TabView, TabBar } from 'react-native-tab-view';
import { database, auth } from '../../config/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import colors from '../../globalVariables/colors';

const TEAM_NAMES = [
  "Good Mukhpath Bhaiya",
  "Dwij's Dweebs",
  "The Last Chairbenders",
  "Dev's D Line",
  "Mukhpath Sharp Shooters",
  "Reserve Officers' Training Corps (ROTC)",
  "Young Yogis",
  "Meets Meet Neels",
  "Team Prapti",
  "Skimmed",
  "AP MW",
  "Swami's Lions",
  "Big Bodies",
  "Epic Failures",
  "Keshav's Kachoris",
  "Flaming Pandas",
  "Urmil's Umbrellas",
  "Manit's Mohanthals",
];

const TeamStandingsScreen = () => {
  const [users, setUsers] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);

  const routes = TEAM_NAMES.map((team) => ({ key: team, title: team }));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
  
      // Fetch user data
      const userCollection = collection(database, 'userData');
      const userDocsSnap = await getDocs(userCollection);
      const userList = [];
      userDocsSnap.forEach((doc) => {
        const { firstName, team } = doc.data();
        userList.push({ uid: doc.id, firstName, team });
      });
      setUsers(userList);
  
      // Fetch leaderboard data
      const leaderboardPromises = userList.map(async (user) => {
        const leaderboardDocRef = doc(database, 'leaderboard', user.uid);
        const leaderboardDocSnap = await getDoc(leaderboardDocRef);
        if (leaderboardDocSnap.exists()) {
          const data = leaderboardDocSnap.data();
          const totalScore =
            (data.shloks || 0) +
            (data.kirtans || 0) +
            (data.pbps || 0) +
            (data.swaminiVatos || 0) +
            (data.ahnicks || 0);
          return { ...user, ...data, totalScore };
        }
        return { ...user, kirtans: 0, shloks: 0, pbps: 0, ahnicks: 0, swaminiVatos: 0, totalScore: 0 };
      });
  
      const leaderboard = await Promise.all(leaderboardPromises);
  
      // Group leaderboard data by teams and calculate team total scores
      const groupedData = TEAM_NAMES.reduce((acc, team) => {
        const teamUsers = leaderboard.filter((user) => user.team === team);
        const teamTotalScore = teamUsers.reduce((sum, user) => sum + user.totalScore, 0);
        acc[team] = { users: teamUsers, teamTotalScore };
        return acc;
      }, {});
  
      setLeaderboardData(groupedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };
  
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // const totalScore = item.shloks + item.kirtans + item.pbps + item.swaminiVatos + item.ahnicks;


  const MemorizedCard = memo(({ item, isCurrentUser }) => (
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
            <Text style={styles.teamScore}>Total Score: {item.totalScore}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  ));
  

  

  const renderItem = ({ item }) => {
    const isCurrentUser = item.uid === auth.currentUser?.uid;
    return <MemorizedCard item={item} isCurrentUser={isCurrentUser} />;
  };

  const renderScene = ({ route }) => {
    const teamData = leaderboardData[route.key] || { users: [], teamTotalScore: 0 };
    const teamUsers = teamData.users;
    const teamTotalScore = teamData.teamTotalScore;
  
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.teamScore}>
          Total Team Score: {teamTotalScore}
        </Text>
        <FlatList
          data={teamUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid}
          initialNumToRender={5} // Render only 5 items initially
          maxToRenderPerBatch={10} // Render 10 items at a time
          windowSize={5} // Load 5 screens worth of items
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
      </View>
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
            scrollEnabled
            renderLabel={({ route, focused }) => (
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
  teamScore: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: colors.primary,
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
  },
  tabIndicator: {
    backgroundColor: colors.primary,
    height: 3,
  },
});

export default TeamStandingsScreen;

