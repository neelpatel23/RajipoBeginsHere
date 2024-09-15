import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { database, auth } from '../../config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useNavigation } from "@react-navigation/native";
import colors from '../../globalVariables/colors';

const SatsangDiksha = () => {
  const [shlokas, setShlokas] = useState([]);
  const [currentShloka, setCurrentShloka] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completionStatuses, setCompletionStatuses] = useState({});
  const [isAccessCodeModalVisible, setIsAccessCodeModalVisible] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [selectedShlokaId, setSelectedShlokaId] = useState(null);
  const [audioPosition, setAudioPosition] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentAudioType, setCurrentAudioType] = useState(null);

  const navigation = useNavigation();
  const ACCESS_CODE = '1933';

  // Fetch shlokas from the database
  const fetchShlokas = useCallback(async () => {
    setLoading(true);
    try {
      const shlokaDataRef = doc(database, 'SCubedData', 'SatsangDikshaData');
      const shlokaDataSnap = await getDoc(shlokaDataRef);
      if (shlokaDataSnap.exists()) {
        setShlokas(shlokaDataSnap.data().data);
      } else {
        console.log('No shloka data found in Firestore.');
      }
    } catch (error) {
      console.error('Error fetching shlokas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch the completion statuses
  const fetchCompletionStatuses = useCallback(async () => {
    const userDocRef = doc(database, 'userMukhpathsSD', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      setCompletionStatuses(userDocSnap.data());
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchCompletionStatuses();
    fetchShlokas();  // Ensure fetchShlokas is being called
  }, [fetchCompletionStatuses, fetchShlokas]);

  // Set up audio mode on component mount
  useEffect(() => {
    const setAudioMode = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (e) {
        console.log(e);
      }
    };
    setAudioMode();
  }, []);

  // Unload sound when the component unmounts
  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);
  
  const handleAddContent = () => {
    navigation.navigate('AddContent'); // Navigate to the Add Content screen
  };

  const playShloka = async (shloka, audioType) => {
    if (sound) {
      await sound.unloadAsync();
    }
  
    try {
      const audioURL = audioType === 'sanskrit' ? shloka.audioURL : shloka.audioURL1;
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioURL });
      setSound(newSound);
      setCurrentShloka(shloka);
      setCurrentAudioType(audioType);
      setIsPlaying(true);
  
      newSound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };
  
  const updatePlaybackStatus = (status) => {
    setIsPlaying(status.isPlaying);
    setAudioPosition(status.positionMillis);
    setAudioDuration(status.durationMillis);
  };
  
  const updateLeaderboard = useCallback(async (increment) => {
    const userDocRef = doc(database, 'userData', auth.currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const { firstName } = userDocSnap.data();
      const leaderboardDocRef = doc(database, 'leaderboard', auth.currentUser.uid);

      const leaderboardDocSnap = await getDoc(leaderboardDocRef);
      if (leaderboardDocSnap.exists()) {
        // Update the existing leaderboard entry
        await updateDoc(leaderboardDocRef, {
          firstName,
          shloks: leaderboardDocSnap.data().shloks + increment,
        });
      } else {
        // Create a new leaderboard entry if it doesn't exist
        await setDoc(leaderboardDocRef, {
          firstName,
          shloks: increment > 0 ? increment : 0,  // Ensure no negative values on creation
          kirtans: 0,  // Initialize kirtans to 0
        });
      }
    } else {
      console.error("User document does not exist in userData collection.");
    }
  }, []);

  const toggleCompletionStatus = async (shlokaId, requireAccessCode = false) => {
    if (requireAccessCode && accessCodeInput !== ACCESS_CODE) {
      setSelectedShlokaId(shlokaId);
      setIsAccessCodeModalVisible(true);
      return;
    }
  
    const isCompleted = !!completionStatuses[`shloka${shlokaId}`];
    const newStatus = !isCompleted;
  
    // Update local state
    setCompletionStatuses(prevStatuses => ({
      ...prevStatuses,
      [`shloka${shlokaId}`]: newStatus,
    }));
  
    // Update leaderboard
    await updateLeaderboard(newStatus ? 1 : -1);
  
    // Update Firebase
    const userDocRef = doc(database, 'userMukhpathsSD', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, { [`shloka${shlokaId}`]: newStatus });
    } else {
      await setDoc(userDocRef, { [`shloka${shlokaId}`]: newStatus });
    }
  };

  const ShlokaCard = ({ shloka }) => {
    const completed = !!completionStatuses[`shloka${shloka.id}`];
  
    const handleCompletionPress = () => {
      setSelectedShlokaId(shloka.id);
      toggleCompletionStatus(shloka.id, !completed);
    };
  
    const sanskritLippyWithLineBreaks = shloka.sanskritLippy.replace(/\n/g, '\n');
  
    return (
      <Card style={[styles.card, completed && styles.cardCompleted]}>
        <Card.Content>
          <Title style={styles.title}>{shloka.shlokas}</Title>
          <Title style={styles.subTitle}>Gujarati</Title>
          <Paragraph style={styles.paragraph}>{shloka.gujaratiText}</Paragraph>
          <TouchableOpacity onPress={() => playShloka(shloka, 'gujarati')}>
            <Ionicons name="play-circle" size={40} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <Title style={styles.subTitle}>Sanskrit</Title>
          <Paragraph style={styles.paragraph}>{sanskritLippyWithLineBreaks}</Paragraph>
          <TouchableOpacity onPress={() => playShloka(shloka, 'sanskrit')}>
            <Ionicons name="play-circle" size={40} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <Title style={styles.subTitle}>English</Title>
          <Paragraph style={styles.paragraph}>{shloka.englishText}</Paragraph>
          <View style={styles.divider} />
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleCompletionPress}
          >
            {completed ? "Mark Incomplete" : "Mark Complete"}
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  const MiniPlayer = () => {
    if (!currentShloka) return null;  // Only show MiniPlayer if a shloka is loaded

    const togglePlayPause = async () => {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    };

    const onSliderValueChange = async (value) => {
      if (sound) {
        const newPosition = value * audioDuration;
        await sound.setPositionAsync(newPosition);
        setAudioPosition(newPosition);
      }
    };
  
    return (
      <View style={styles.miniPlayer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.miniPlayerText}>{currentShloka.shlokas}</Text>
          <Text style={styles.audioTypeText}> ({currentAudioType === 'sanskrit' ? 'Sanskrit' : 'Gujarati'})</Text>
        </View>
        <TouchableOpacity onPress={togglePlayPause} style={{ marginLeft: 10 }}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color="white" />
        </TouchableOpacity>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={audioPosition / audioDuration || 0}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#FFFFFF"
          onSlidingComplete={onSliderValueChange}
        />
      </View>
    );
  };

  useLayoutEffect(() => {
    const completedShlokasCount = Object.values(completionStatuses).filter(status => status).length;
    const totalShlokasCount = shlokas.length;
    
    navigation.setOptions({
      headerRight: () => (
        <Text style={styles.headerRightText}>
          {completedShlokasCount}/{totalShlokasCount}
        </Text>
      ),
    });
  }, [navigation, completionStatuses, shlokas]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f16827" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        // style={{ marginBottom: currentShloka ? 45 : 0 }}  // Adjust marginBottom based on whether the MiniPlayer is visible
        data={shlokas}
        renderItem={({ item }) => <ShlokaCard shloka={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <MiniPlayer />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleAddContent}
      >
        <Ionicons name="add-circle" size={60} color={colors.primary} />
      </TouchableOpacity>
      <Modal
        visible={isAccessCodeModalVisible}
        onRequestClose={() => setIsAccessCodeModalVisible(false)}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsAccessCodeModalVisible(false)}
            >
              <Ionicons name="close" size={30} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Enter Access Code</Text>
            <TextInput
              style={styles.accessCodeInput}
              placeholder="Access Code"
              value={accessCodeInput}
              onChangeText={(text) => setAccessCodeInput(text)}
              secureTextEntry
            />
            <Button
              title="Submit"
              textColor='white'
              style={styles.submitButton}
              onPress={() => {
                if (accessCodeInput === ACCESS_CODE) {
                  toggleCompletionStatus(selectedShlokaId);
                  setIsAccessCodeModalVisible(false);
                  setAccessCodeInput('');
                } else {
                  alert("Incorrect access code.");
                }
              }}
            >
              Submit
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,  // Dark background
    paddingBottom: 0,
  },
  card: {
    margin: 10,
    backgroundColor: colors.darkBackground,  // Darker background for cards
    borderRadius: 8,
    padding: 10,
  },
  cardCompleted: {
    backgroundColor: "#56E364",
    borderColor: colors.primary,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    color: '#313131',  // Light text color
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: '#313131',  // Slightly lighter than the title
    marginTop: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#313131',  // Light paragraph color
    marginTop: 5,
  },
  buttonLabel: {
    color: colors.primary
  },
  miniPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#333333',  // Dark mini player background
  },
  miniPlayerText: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
  audioTypeText: {
    color: '#BBBBBB',
    fontSize: 12,
  },
  slider: {
    flex: 1,
    height: 40,
    marginLeft: 20,
    marginRight: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Slightly darker overlay
  },
  modalContent: {
    backgroundColor: '#424242',  // Dark modal background
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFFFFF',
  },
  accessCodeInput: {
    borderColor: '#666666',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    color: '#FFFFFF',
    backgroundColor: '#2C2C2C',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginTop: 10,
    color: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 100,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
    marginVertical: 10,
  },
  headerRightText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default SatsangDiksha;
