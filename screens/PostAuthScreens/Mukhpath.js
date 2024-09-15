import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { TabView, TabBar } from 'react-native-tab-view';
import colors from '../../globalVariables/colors';
import SatsangDiksha from './SatsangDiksha';
import KirtansScreen from './Kirtans';
// import { SafeAreaView } from 'react-native-safe-area-context';
import PBPScreen from './PBP';

const SwipeableMukhpathScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'mukhpath', title: 'Mukhpath' },
    { key: 'pbp', title: 'PBP' },
    { key: 'kirtans', title: 'Kirtans' },
    { key: 'svato', title: 'Swami Ni Vato' },
    { key: 'ahnik', title: 'Ahnik' },
  ]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    const tabTitles = ['Mukhpath', 'Purshottam Bolya Prite', 'Kirtans'];
    navigation.setOptions({
      headerTitle: tabTitles[index],
      headerStyle: {
        backgroundColor: colors.darkBackground,
      },
      headerTintColor: 'white',
    });
  }, [navigation, index]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'mukhpath':
        return <SatsangDiksha />;
      case 'pbp':
        return <PBPScreen />;
      case 'kirtans':
        return <KirtansScreen />;
      case 'svato':
        return <PBPScreen />
      case 'ahnik':
        return <PBPScreen />
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBackground }}>
      <View style={{ flex: 1 }}>
        <TabView
          style={{ flex: 1 }}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: '100%' }}
          renderTabBar={props => (
            <TabBar 
              {...props}
              style={styles.tabBar}
              scrollEnabled={true} // Enable horizontal scrolling
              renderLabel={({ route, focused, color }) => (
                <Text style={{ color: focused ? colors.primary : colors.inactiveIcon, fontSize: 16 }}>
                  {route.title}
                </Text>
              )}
              indicatorStyle={styles.tabIndicator}
            />
          )}
        /> 
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
    elevation: 1,
  },
  tabBar: {
    backgroundColor: colors.darkBackground,
    elevation: 0,
    paddingBottom: 0, // Ensure no extra padding
    marginBottom: 0, // Ensure no extra margin
  },
  tabIndicator: {
    backgroundColor: colors.primary,
    height: 3, // Adjust the height of the indicator if needed
  },
});

export default SwipeableMukhpathScreen;
