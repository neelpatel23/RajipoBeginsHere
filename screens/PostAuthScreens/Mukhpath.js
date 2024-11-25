import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import colors from '../../globalVariables/colors';
import SatsangDiksha from './SatsangDiksha';
import KirtansScreen from './Kirtans';
// import { SafeAreaView } from 'react-native-safe-area-context';
import PBPScreen from './PBP';
import SwaminiVatoScreen from './SwaminiVato';
import AhnikScreen from './Ahnik';
import NotesScreen from './Notes';

const SwipeableMukhpathScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ahnik', title: 'Ahnik' },
    { key: 'mukhpath', title: 'Satsang Diksha' },
    { key: 'kirtans', title: 'Kirtans' },
    { key: 'pbp', title: 'PBP' },
    { key: 'svato', title: 'Swami Ni Vato' },
    { key: 'notes', title: 'Notes' },

  ]);

  const [stopAudioCallback, setStopAudioCallback] = useState(null);

  const onIndexChange = (newIndex) => {
    // Check if stopAudioCallback is a function before invoking
    if (typeof stopAudioCallback === 'function') {
      stopAudioCallback(); // Stop audio when switching tabs
    }
    setIndex(newIndex);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'mukhpath':
        return <SatsangDiksha stopAudio={setStopAudioCallback} />;
      case 'pbp':
        return <PBPScreen />;
      case 'kirtans':
        return <KirtansScreen />;
      case 'svato':
        return <SwaminiVatoScreen />
      case 'ahnik':
        return <AhnikScreen />
      case 'notes':
        return <NotesScreen />
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
          onIndexChange={onIndexChange} // Use the modified onIndexChange
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
