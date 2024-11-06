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
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import colors from '../../globalVariables/colors';

const AhnikScreen = () => {
  const [ahniks, setAhniks] = useState([]);
  const [currentAhnik, setCurrentAhnik] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completionStatuses, setCompletionStatuses] = useState({});
  const [isAccessCodeModalVisible, setIsAccessCodeModalVisible] = useState(false);
  const [isNewAhnikModalVisible, setIsNewAhnikModalVisible] = useState(false);
  const [newAhnikName, setNewAhnikName] = useState('');
  const [newAhnikEnglishText, setNewAhnikEnglishText] = useState('');
  const [newAhnikEnglishDefinition, setNewAhnikEnglishDefinition] = useState('');
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [selectedAhnikId, setSelectedAhnikId] = useState(null);
  const [audioPosition, setAudioPosition] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const navigation = useNavigation();
  const ACCESS_CODE = '1933';

  // Fetch Ahnik completion statuses for the current user
  const fetchCompletionStatuses = useCallback(async () => {
    const userDocRef = doc(database, 'userMukhpathsAhnik', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      setCompletionStatuses(userDocSnap.data());
    }
  }, []);

  // Fetch Ahnik data from Firestore
  const fetchAhniks = useCallback(async () => {
    setLoading(true);
    try {
      const ahnikDataRef = doc(database, 'SCubedData', 'AhnikData');
      const ahnikDataSnap = await getDoc(ahnikDataRef);
      if (ahnikDataSnap.exists()) {
        setAhniks(ahnikDataSnap.data().data);
      } else {
        console.log('No Ahnik data found in Firestore.');
      }
    } catch (error) {
      console.error('Error fetching Ahniks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompletionStatuses();
    fetchAhniks();
  }, [fetchCompletionStatuses, fetchAhniks]);

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const playAhnik = async (ahnik) => {
    if (sound) {
      await sound.unloadAsync();
    }
  
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: ahnik.audioURL });
      setSound(newSound);
      setCurrentAhnik(ahnik);
      setIsPlaying(true);
  
      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
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
        const currentAhniks = leaderboardDocSnap.data().ahnicks || 0;
        const currentShloks = leaderboardDocSnap.data().shloks || 0;

        await updateDoc(leaderboardDocRef, {
          firstName,
          ahnicks: currentAhniks + increment,
          shloks: currentShloks,
        });
      } else {
        await setDoc(leaderboardDocRef, {
          firstName,
          ahnicks: increment > 0 ? increment : 0,
          shloks: currentShloks || 0,
        });
      }
    } else {
      console.error("User document does not exist in userData collection.");
    }
  }, []);

  const toggleCompletionStatus = async (ahnikId, requireAccessCode = false) => {
    if (requireAccessCode && accessCodeInput !== ACCESS_CODE) {
      setSelectedAhnikId(ahnikId);
      setIsAccessCodeModalVisible(true);
      return;
    }

    const isCompleted = !!completionStatuses[`ahnik${ahnikId}`];
    const newStatus = !isCompleted;

    setCompletionStatuses(prevStatuses => ({
      ...prevStatuses,
      [`ahnik${ahnikId}`]: newStatus,
    }));

    await updateLeaderboard(newStatus ? 1 : -1);

    const userDocRef = doc(database, 'userMukhpathsAhnik', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, { [`ahnik${ahnikId}`]: newStatus });
    } else {
      await setDoc(userDocRef, { [`ahnik${ahnikId}`]: newStatus });
    }
  };

  const addNewAhnik = async () => {
    if (!newAhnikName || !newAhnikEnglishText || !newAhnikEnglishDefinition) {
      alert('Please fill out all fields.');
      return;
    }

    const newAhnik = {
      id: ahniks.length + 1,
      kirtans: newAhnikName,
      englishText: newAhnikEnglishText,
      englishDefinition: newAhnikEnglishDefinition,
      tag: 'user-created',
    };

    try {
      const ahnikDataRef = doc(database, 'SCubedData', 'AhnikData');
      const updatedAhnicks = [...ahniks, newAhnik];
      await updateDoc(ahnikDataRef, { data: updatedAhnicks });

      setAhniks(updatedAhnicks);
      setIsNewAhnikModalVisible(false);
      setNewAhnikName('');
      setNewAhnikEnglishText('');
      setNewAhnikEnglishDefinition('');
    } catch (error) {
      console.error('Error adding new ahnik:', error);
    }
  };

  const handleDeleteAhnik = async (ahnikId) => {
    const updatedAhnicks = ahniks.filter(ahnik => ahnik.id !== ahnikId);
    try {
      const ahnikDataRef = doc(database, 'SCubedData', 'AhnikData');
      await updateDoc(ahnikDataRef, { data: updatedAhnicks });
      setAhniks(updatedAhnicks);
    } catch (error) {
      console.error('Error deleting ahnik:', error);
    }
  };

  const AhnikCard = ({ ahnik }) => {
    const completed = !!completionStatuses[`ahnik${ahnik.id}`];
  
    const handleCompletionPress = () => {
      setSelectedAhnikId(ahnik.id);
      toggleCompletionStatus(ahnik.id, !completed);
    };
  
    return (
      <Card style={[styles.card, completed && styles.cardCompleted]}>
        <Card.Content>
          <Title style={styles.title}>{ahnik.kirtans}</Title>
          <View style={styles.divider} />
          <Paragraph style={styles.paragraph}>{ahnik.englishText}</Paragraph>
          <View style={styles.divider} />
          <Paragraph style={styles.paragraph}>{ahnik.englishDefinition}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleCompletionPress}
          >
            {completed ? "Mark Incomplete" : "Mark Complete"}
          </Button>
          <TouchableOpacity onPress={() => playAhnik(ahnik)}>
            <Ionicons name="play-circle" size={40} color={colors.primary} />
          </TouchableOpacity>
          {ahnik.tag === 'user-created' && (
            <TouchableOpacity onPress={() => handleDeleteAhnik(ahnik.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          )}
        </Card.Actions>
      </Card>
    );
  };

  const MiniPlayer = () => {
    if (!currentAhnik) return null;
  
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
        <Text style={styles.miniPlayerText}>{currentAhnik.kirtans}</Text>
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
    const completedAhnicksCount = Object.values(completionStatuses).filter(status => status).length;
    const totalAhnicksCount = ahniks.length;
    
    navigation.setOptions({
      headerRight: () => (
        <Text style={{ marginRight: 16, fontSize: 18, color: colors.lightText }}>
          {completedAhnicksCount}/{totalAhnicksCount}
        </Text>
      ),
    });
  }, [navigation, completionStatuses, ahniks]);

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
        style={styles.button1}
        onPress={() => setIsNewAhnikModalVisible(true)}
      >
        New Ahnik
      </Button>

      <FlatList
        data={ahniks}
        renderItem={({ item }) => <AhnikCard ahnik={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <MiniPlayer />

      <Modal
        visible={isNewAhnikModalVisible}
        onRequestClose={() => setIsNewAhnikModalVisible(false)}
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
              onPress={() => setIsNewAhnikModalVisible(false)}
            >
              <Ionicons name="close" size={30} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Ahnik</Text>
            <TextInput
              style={styles.accessCodeInput}
              placeholderTextColor='white'
              placeholder="Ahnik Name"
              value={newAhnikName}
              onChangeText={setNewAhnikName}
            />
            <TextInput
              style={styles.accessCodeInput}
              placeholderTextColor='white'
              placeholder="English Text"
              value={newAhnikEnglishText}
              onChangeText={setNewAhnikEnglishText}
            />
            <TextInput
              style={styles.accessCodeInput}
              placeholderTextColor='white'
              placeholder="English Definition"
              value={newAhnikEnglishDefinition}
              onChangeText={setNewAhnikEnglishDefinition}
            />
            <Button
              title="Add Ahnik"
              textColor='white'
              style={styles.submitButton}
              onPress={addNewAhnik}
            >
              Add Ahnik
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
                  toggleCompletionStatus(selectedAhnikId);
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
    paddingBottom: 0
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    color: colors.lightText,
    marginBottom: 15,
  },
  accessCodeInput: {
    borderColor: colors.inputBorder,
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    color: colors.lightText,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
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
    borderBottomColor: colors.divider,
    marginVertical: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: colors.accent,
    marginTop: 10,
    color: 'white',
  },
  title: {
    fontSize: 18,
    color: '#313131',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 14,
    color: '#313131',
    marginTop: 5,
  },
  button1: {
    borderRadius: 0,
    backgroundColor: colors.accent
  },
  buttonLabel: {
    color: colors.primary
  },
});

export default AhnikScreen;
