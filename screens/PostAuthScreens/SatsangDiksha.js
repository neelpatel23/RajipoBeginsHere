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
  const [audioPosition, setAudioPosition] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentAudioType, setCurrentAudioType] = useState(null);

  const navigation = useNavigation();
  const ACCESS_CODE = '1933';

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
          sound.unloadAsync() // Stop the audio when the component unmounts
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

  const toggleCompletionStatus = async (shlokaId, requireAccessCode = false) => {
    if (requireAccessCode && accessCodeInput !== ACCESS_CODE) {
      setSelectedShlokaId(shlokaId);
      setIsAccessCodeModalVisible(true);
      return;
    }

    const isCompleted = !!completionStatuses[`shloka${shlokaId}`];
    const newStatus = !isCompleted;

    setCompletionStatuses(prevStatuses => ({
      ...prevStatuses,
      [`shloka${shlokaId}`]: newStatus,
    }));

    await updateLeaderboard(newStatus ? 1 : -1);

    const userDocRef = doc(database, 'userMukhpathsSD', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, { [`shloka${shlokaId}`]: newStatus });
    } else {
      await setDoc(userDocRef, { [`shloka${shlokaId}`]: newStatus });
    }
  };

  const addNewShlok = async () => {
    if (!newShlokName || !newShlokGujarati || !newShlokSanskrit || !newShlokEnglish) {
      alert('Please fill out all fields.');
      return;
    }

    const newShlok = {
      id: shlokas.length + 1,
      shlokas: newShlokName,
      gujaratiText: newShlokGujarati,
      sanskritLippy: newShlokSanskrit,
      englishText: newShlokEnglish,
      tag: 'user-created',
    };

    try {
      const shlokaDataRef = doc(database, 'SCubedData', 'SatsangDikshaData');
      const updatedShlokas = [...shlokas, newShlok];
      await updateDoc(shlokaDataRef, { data: updatedShlokas });

      setShlokas(updatedShlokas);
      setIsNewShlokModalVisible(false);
      setNewShlokName('');
      setNewShlokGujarati('');
      setNewShlokSanskrit('');
      setNewShlokEnglish('');
    } catch (error) {
      console.error('Error adding new shlok:', error);
    }
  };

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
  

  const ShlokaCard = ({ shloka }) => {
    const completed = !!completionStatuses[`shloka${shloka.id}`];

    const handleCompletionPress = () => {
      setSelectedShlokaId(shloka.id);
      toggleCompletionStatus(shloka.id, !completed);
    };

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
          <Paragraph style={styles.paragraph}>{shloka.sanskritLippy}</Paragraph>
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
            {completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Button>
          {shloka.tag === 'user-created' && (
            <TouchableOpacity onPress={() => handleDeleteShlok(shloka.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          )}
        </Card.Actions>
      </Card>
    );
  };

  const handleDeleteShlok = async (shlokaId) => {
    const updatedShlokas = shlokas.filter(shloka => shloka.id !== shlokaId);
    try {
      const shlokaDataRef = doc(database, 'SCubedData', 'SatsangDikshaData');
      await updateDoc(shlokaDataRef, { data: updatedShlokas });
      setShlokas(updatedShlokas);
    } catch (error) {
      console.error('Error deleting shlok:', error);
    }
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
        keyExtractor={(item) => item.id.toString()}
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
                onPress={addNewShlok}
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
              onPress={() => {
                if (accessCodeInput === ACCESS_CODE) {
                  toggleCompletionStatus(selectedShlokaId);
                  setIsAccessCodeModalVisible(false);
                  setAccessCodeInput('');
                } else {
                  alert('Incorrect access code.');
                }
              }}
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
    paddingBottom: 0,
  },
  card: {
    margin: 10,
    backgroundColor: colors.darkBackground,
    borderRadius: 8,
    padding: 10,
  },
  cardCompleted: {
    backgroundColor: "#56E364",
    borderColor: colors.primary,
    borderWidth: 1,
  },
  newShloka: {
    backgroundColor: colors.darkBackground
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
    color: colors.primary
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
