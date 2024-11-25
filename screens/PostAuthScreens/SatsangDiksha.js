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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { database, auth } from '../../config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useNavigation } from "@react-navigation/native";
import colors from '../../globalVariables/colors';

const SatsangDiksha = ({ stopAudio }) => {
  const [shlokas, setShlokas] = useState([]);
  const [currentShloka, setCurrentShloka] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completionStatuses, setCompletionStatuses] = useState({});
  const [isAccessCodeModalVisible, setIsAccessCodeModalVisible] = useState(false);
  const [isNewShlokModalVisible, setIsNewShlokModalVisible] = useState(false);
  const [newShlokName, setNewShlokName] = useState('');
  const [newShlokGujarati, setNewShlokGujarati] = useState('');
  const [newShlokSanskrit, setNewShlokSanskrit] = useState('');
  const [newShlokEnglish, setNewShlokEnglish] = useState('');
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [selectedShlokaId, setSelectedShlokaId] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [audioPosition, setAudioPosition] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentAudioType, setCurrentAudioType] = useState(null);
  const [previousTier, setPreviousTier] = useState(null);
  const navigation = useNavigation();

  const updateUserTier = useCallback(async () => {
    const ghanshyamIds = [1, 4, 7, 20, 56, 63, 66, 83, 84, 85, 87, 92, 98, 110, 127, 130, 185, 188];
    const mahantIds = [
      1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 18, 19, 20, 21, 56, 63, 83, 84, 85, 86, 87, 89, 90, 91, 92, 93,
      94, 95, 96, 97, 98, 112, 113, 115, 116, 120, 121, 122, 124, 125, 126, 127, 128, 129, 130, 141,
      185, 186, 188, 189, 200, 229, 244, 258,
    ];
    const pramukhIds = [39, 40, 41, 42, 43, 51, 76, 77, 78, 79, 108, 109, 110, 117, 118, 119, 123, 136, 137, 157, 160, 161, 162, 165, 172, 192, 198, 225, 226, 247, 249, 256];

    const yogiIds = [9, 10, 11, 13, 22, 25, 27, 28, 29, 33, 45, 66, 70, 71, 72, 73, 75, 81, 82, 99, 102, 104, 105, 106, 107, 111, 114, 131, 132, 134, 135, 138, 140, 142, 143, 144, 145, 147, 148, 150, 151, 152, 153, 154, 155, 156, 158, 159, 163, 164, 166, 169, 170, 177, 179, 180, 181, 183, 191, 198, 199, 212, 213, 214, 215, 216, 217, 218, 221, 222, 223, 224, 227, 228, 231, 232, 162, 234, 235, 239, 245, 257, 260, 261, 262, 273];

    const shastrijiIds = [12, 16, 17, 23, 24, 26, 30, 31, 32, 34, 35, 36, 37, 38, 44, 46, 47, 48, 49, 50, 52, 53, 54, 55, 57, 58, 59, 60, 61, 62, 64, 65, 67, 68, 69, 74, 80, 88, 100, 101, 103, 133, 146, 149, 167, 168, 171, 173, 174, 175, 176, 178, 184, 187, 190, 193, 194, 195, 196, 197, 201, 202, 203, 204, 205, 206, 207, 209, 210, 219, 220, 230, 236, 237, 238, 240, 241, 242, 243, 246, 248, 250, 251, 253, 254, 255, 259, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 274, 275];

    const areAllShlokasComplete = (shlokaIds) =>
      shlokaIds.every((shlokaId) =>
        ['english', 'gujarati', 'sanskrit'].every(
          (language) => completionStatuses[`shloka${shlokaId}_${language}`]
        )
      );
  
    let newTier = null;
  
    // Determine the highest tier the user qualifies for
    if (areAllShlokasComplete(ghanshyamIds)) {
      newTier = 'Ghanshyam';
    }
    if (areAllShlokasComplete(mahantIds)) {
      newTier = 'Mahant';
    }
    if (areAllShlokasComplete(pramukhIds)) {
      newTier = 'Pramukh';
    }
    if (areAllShlokasComplete(yogiIds)) {
      newTier = 'Yogi';
    }

    if (areAllShlokasComplete(shastrijiIds)) {
      newTier = 'Shāstriji';
    }
  
    // Check if the tier has changed
    if (newTier && newTier !== previousTier) {
      const userDocRef = doc(database, 'userData', auth.currentUser.uid);
      try {
        await updateDoc(userDocRef, { tier: newTier });
        console.log(`User tier updated to ${newTier}`);
        alert(`Congratulations! You have reached the ${newTier} tier.`);
        setPreviousTier(newTier); // Update the previous tier state
      } catch (error) {
        console.error('Error updating user tier:', error);
      }
    }
  }, [completionStatuses, previousTier]);
    
  useEffect(() => {
    updateUserTier();
  }, [completionStatuses, updateUserTier]);  
  
  
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

  const fetchCompletionStatuses = useCallback(async () => {
    const userDocRef = doc(database, 'userMukhpathsSD', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      setCompletionStatuses(userDocSnap.data());
    }
  }, []);

  useEffect(() => {
    fetchCompletionStatuses();
    fetchShlokas();
  }, [fetchCompletionStatuses, fetchShlokas]);

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

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Stop the audio when the component unmounts
        }
      : undefined;
  }, [sound]);

  const stopShlokaAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (typeof stopAudio === 'function') {
      stopAudio(stopShlokaAudio); // Register the audio stop function
    }
  }, [stopAudio, sound]);

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
      console.error('Error loading audio:', error);
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
        await updateDoc(leaderboardDocRef, {
          firstName,
          shloks: leaderboardDocSnap.data().shloks + increment,
        });
      } else {
        await setDoc(leaderboardDocRef, {
          firstName,
          shloks: increment > 0 ? increment : 0,
          kirtans: 0,
        });
      }
    } else {
      console.error('User document does not exist in userData collection.');
    }
  }, []);

  const toggleCompletionStatus = async (shlokaId, language) => {
    const key = `shloka${shlokaId}_${language}`;
    const isComplete = completionStatuses[key];
  
    if (isComplete) {
      await markShlokaIncomplete(shlokaId, language);
    } else {
      setSelectedShlokaId(shlokaId);
      setSelectedLanguage(language);
      setIsAccessCodeModalVisible(true); // Open the modal for marking as complete
    }
  };
  
  

  const markShlokaComplete = async () => {
    const validAccessCodes = ['1933', '1907', '2017', '2023', '2014', '2004']; // Replace with your actual codes
    
    if (validAccessCodes.includes(accessCodeInput)) {
      setIsAccessCodeModalVisible(false);
      const key = `shloka${selectedShlokaId}_${selectedLanguage}`;
      const newStatus = true;
  
      // Update local state
      setCompletionStatuses((prevStatuses) => ({
        ...prevStatuses,
        [key]: newStatus,
      }));
  
      // Update Firestore
      try {
        const userDocRef = doc(database, 'userMukhpathsSD', auth.currentUser.email);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          await updateDoc(userDocRef, { [key]: newStatus });
        } else {
          await setDoc(userDocRef, { [key]: newStatus });
        }
  
        // Increment leaderboard based on language
        const increment = selectedLanguage === 'english' ? 1 : selectedLanguage === 'gujarati' ? 2 : 3;
        await updateLeaderboard(increment);
  
        // Update user tier
        await updateUserTier();
  
      } catch (error) {
        console.error('Error marking shloka complete:', error);
      }
  
      // Clear access code input
      setAccessCodeInput('');
    } else {
      alert('Incorrect access code.');
    }
  };
  
  
  
  const markShlokaIncomplete = async (shlokaId, language) => {
    const key = `shloka${shlokaId}_${language}`;
    const newStatus = false;
  
    // Update local state
    setCompletionStatuses((prevStatuses) => ({
      ...prevStatuses,
      [key]: newStatus,
    }));
  
    // Update Firestore
    try {
      const userDocRef = doc(database, 'userMukhpathsSD', auth.currentUser.email);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        await updateDoc(userDocRef, { [key]: newStatus });
      } else {
        await setDoc(userDocRef, { [key]: newStatus });
      }
  
      // Decrement leaderboard based on language
      const decrement = language === 'english' ? -1 : language === 'gujarati' ? -2 : -3;
      await updateLeaderboard(decrement);
  
      // Update user tier
      await updateUserTier();
  
    } catch (error) {
      console.error('Error marking shloka incomplete:', error);
    }
  };

  const calculateCardCompletion = (shlokaId) => {
    const completedLanguages = ['english', 'gujarati', 'sanskrit'].filter((lang) =>
      completionStatuses[`shloka${shlokaId}_${lang}`]
    ).length;
  
    return completedLanguages / 3; // Fraction of completion (0, 1/3, 2/3, or 1)
  };
  
  


  const ShlokaCard = React.memo(({ shloka }) => {
    // Calculate the card's completion fraction
    const cardCompletion = calculateCardCompletion(shloka.id);
    const cardStyles = [styles.card];
  
    // Apply styles based on completion
    if (cardCompletion === 1) {
      cardStyles.push(styles.cardCompleted);
    } else if (cardCompletion === 2 / 3) {
      cardStyles.push(styles.cardTwoThirdsCompleted);
    } else if (cardCompletion === 1 / 3) {
      cardStyles.push(styles.cardOneThirdCompleted);
    }
  
    return (
      <Card style={cardStyles}>
        <Card.Content>
          <Title style={styles.title}>{shloka.shlokas}</Title>
          {['gujarati', 'sanskrit', 'english'].map((language) => (
            <View key={language} style={styles.languageSection}>
              <Title style={styles.subTitle}>
                {language.charAt(0).toUpperCase() + language.slice(1)}
              </Title>
              <Paragraph style={styles.paragraph}>
                {language === 'sanskrit' ? shloka.sanskritLippy : shloka[`${language}Text`]}
              </Paragraph>
              {language !== 'english' && (
                <TouchableOpacity onPress={() => playShloka(shloka, language)}>
                  <Ionicons name="play-circle" size={40} color={colors.primary} />
                </TouchableOpacity>
              )}
              <Button
                style={styles.button}
                labelStyle={styles.buttonLabel}
                onPress={() => toggleCompletionStatus(shloka.id, language)}
              >
                {completionStatuses[`shloka${shloka.id}_${language}`]
                  ? 'Mark Incomplete'
                  : 'Mark Complete'}
              </Button>
            </View>
          ))}
        </Card.Content>
      </Card>
    );
  });  


  const MiniPlayer = () => {
    if (!currentShloka) return null;
  
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
        <Text style={styles.miniPlayerText}>{currentShloka.shlokas}</Text>
        <TouchableOpacity onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color="white" />
        </TouchableOpacity>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={audioPosition / audioDuration || 0}
          minimumTrackTintColor={colors.sliderTrack}
          maximumTrackTintColor={colors.sliderInactive}
          thumbTintColor={colors.thumbColor}
          onSlidingComplete={onSliderValueChange}
        />
      </View>
    );
  };

  useLayoutEffect(() => {
    const completedShlokasCount = Object.keys(completionStatuses).filter((key) => completionStatuses[key]).length;
    const totalShlokasCount = shlokas.length * 3; // since we have 3 languages per shloka

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
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        icon='plus'
        textColor='black'
        style={styles.newShloka}
        onPress={() => setIsNewShlokModalVisible(true)}
      >
        New Shloka
      </Button>

      <FlatList
        data={shlokas}
        renderItem={({ item }) => <ShlokaCard shloka={item} />}
        keyExtractor={(item) => item.shlokas} // Use unique shloka name or ID
      />

      <MiniPlayer />

      <Modal
        visible={isNewShlokModalVisible}
        onRequestClose={() => setIsNewShlokModalVisible(false)}
        transparent
        animationType="fade"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsNewShlokModalVisible(false)}
              >
                <Ionicons name="close" size={30} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add New Shlok</Text>
              <TextInput
                placeholderTextColor='white'
                style={styles.accessCodeInput}
                placeholder="Shlok Name"
                value={newShlokName}
                onChangeText={setNewShlokName}
              />
              <TextInput
                placeholderTextColor='white'
                style={styles.accessCodeInput}
                placeholder="Gujarati Text"
                value={newShlokGujarati}
                onChangeText={setNewShlokGujarati}
              />
              <TextInput
                placeholderTextColor='white'
                style={styles.accessCodeInput}
                placeholder="Sanskrit Text"
                value={newShlokSanskrit}
                onChangeText={setNewShlokSanskrit}
              />
              <TextInput
                placeholderTextColor='white'
                style={styles.accessCodeInput}
                placeholder="English Text"
                value={newShlokEnglish}
                onChangeText={setNewShlokEnglish}
              />
              <Button
                title="Add Shlok"
                textColor='white'
                style={styles.submitButton}
                onPress={() => {
                  if (!newShlokName || !newShlokGujarati || !newShlokSanskrit || !newShlokEnglish) {
                    alert('Please fill out all fields.');
                    return;
                  }

                  const newShlok = {
                    id: shlokas.length + 1,
                    shloks: newShlokName,
                    gujaratiText: newShlokGujarati,
                    sanskritText: newShlokSanskrit,
                    englishText: newShlokEnglish,
                    tag: 'user-created',
                  };

                  try {
                    const shlokaDataRef = doc(database, 'SCubedData', 'SatsangDikshaData');
                    const updatedShlokas = [...shlokas, newShlok];
                    updateDoc(shlokaDataRef, { data: updatedShlokas });

                    setShlokas(updatedShlokas);
                    setIsNewShlokModalVisible(false);
                    setNewShlokName('');
                    setNewShlokGujarati('');
                    setNewShlokSanskrit('');
                    setNewShlokEnglish('');
                  } catch (error) {
                    console.error('Error adding new shlok:', error);
                  }
                }}
              >
                Add Shlok
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={isAccessCodeModalVisible}
        onRequestClose={() => setIsAccessCodeModalVisible(false)}
        transparent
        animationType="slide"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsAccessCodeModalVisible(false)}
              >
                <Ionicons name="close" size={30} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Enter Access Code</Text>
              <TextInput
                placeholderTextColor='white'
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
                onPress={markShlokaComplete}
              >
                Submit
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
  },
  card: {
    margin: 10,
    backgroundColor: colors.darkBackground,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardOneThirdCompleted: {
    borderColor: '#FFD700',
    borderWidth: 2
  },
  cardTwoThirdsCompleted: {
    borderColor: '#FFA500',
    borderWidth: 5
  },
  cardCompleted: {
    backgroundColor: '#56E364',
  },
  title: {
    fontSize: 18,
    color: '#313131',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: '#313131',
    marginTop: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#313131',
    marginTop: 5,
  },
  buttonLabel: {
    color: colors.primary,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
    marginVertical: 10,
  },
  languageSection: {
    marginBottom: 10,
  },
  headerRightText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#424242',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
  },
  accessCodeInput: {
    borderColor: '#666666',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    color: 'white',
    backgroundColor: '#2C2C2C',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 10,
  },
  newShloka: {
    backgroundColor: colors.darkBackground,
  },
  miniPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  miniPlayerText: {
    color: 'white',
    fontSize: 19,
    marginRight: 20,
  },
  slider: {
    flex: 1,
    height: 40,
    marginLeft: 20,
    marginRight: 0,
  },
});

export default SatsangDiksha;