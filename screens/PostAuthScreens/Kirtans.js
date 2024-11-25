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

const KirtansScreen = () => {
  const [kirtans, setKirtans] = useState([]);
  const [currentKirtan, setCurrentKirtan] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completionStatuses, setCompletionStatuses] = useState({});
  const [isAccessCodeModalVisible, setIsAccessCodeModalVisible] = useState(false);
  const [isNewKirtanModalVisible, setIsNewKirtanModalVisible] = useState(false);
  const [newKirtanName, setNewKirtanName] = useState('');
  const [newKirtanEnglishText, setNewKirtanEnglishText] = useState('');
  const [newKirtanEnglishDefinition, setNewKirtanEnglishDefinition] = useState('');
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [selectedKirtanId, setSelectedKirtanId] = useState(null);
  const [audioPosition, setAudioPosition] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const navigation = useNavigation();
  const ACCESS_CODE = '1933';

  const fetchCompletionStatuses = useCallback(async () => {
    const userDocRef = doc(database, 'userMukhpathsKirtans', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      setCompletionStatuses(userDocSnap.data());
    }
  }, []);

  const fetchKirtans = useCallback(async () => {
    setLoading(true);
    try {
      const kirtanDataRef = doc(database, 'SCubedData', 'KirtansData');
      const kirtanDataSnap = await getDoc(kirtanDataRef);
      if (kirtanDataSnap.exists()) {
        setKirtans(kirtanDataSnap.data().data);
      } else {
        console.log('No Kirtan data found in Firestore.');
      }
    } catch (error) {
      console.error('Error fetching Kirtans:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompletionStatuses();
    fetchKirtans();
  }, [fetchCompletionStatuses, fetchKirtans]);

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const playKirtan = async (kirtan) => {
    if (sound) {
      await sound.unloadAsync();
    }
  
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: kirtan.audioURL });
      setSound(newSound);
      setCurrentKirtan(kirtan);
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
        const currentKirtans = leaderboardDocSnap.data().kirtans || 0;
        const currentShloks = leaderboardDocSnap.data().shloks || 0;

        await updateDoc(leaderboardDocRef, {
          firstName,
          kirtans: currentKirtans + increment,
          shloks: currentShloks,
        });
      } else {
        await setDoc(leaderboardDocRef, {
          firstName,
          kirtans: increment > 0 ? increment : 0,
          shloks: currentShloks || 0,
        });
      }
    } else {
      console.error("User document does not exist in userData collection.");
    }
  }, []);

  const toggleCompletionStatus = async (kirtanId, requireAccessCode = false) => {
    const validAccessCodes = ['1933', '1907', '2017', '2023', '2014', '2004']; // Your access codes
  
    // Show the modal if access code is required but not yet entered
    if (requireAccessCode && !validAccessCodes.includes(accessCodeInput)) {
      setSelectedKirtanId(kirtanId);
      setIsAccessCodeModalVisible(true); // Open the modal
      return;
    }
  
    const isCompleted = !!completionStatuses[`kirtan${kirtanId}`];
    const newStatus = !isCompleted;
  
    setCompletionStatuses((prevStatuses) => ({
      ...prevStatuses,
      [`kirtan${kirtanId}`]: newStatus,
    }));
  
    // Update leaderboard
    await updateLeaderboard(newStatus ? 5 : -5);
  
    // Update Firestore
    const userDocRef = doc(database, 'userMukhpathsKirtans', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, { [`kirtan${kirtanId}`]: newStatus });
    } else {
      await setDoc(userDocRef, { [`kirtan${kirtanId}`]: newStatus });
    }
  };
  
  

  const addNewKirtan = async () => {
    if (!newKirtanName || !newKirtanEnglishText || !newKirtanEnglishDefinition) {
      alert('Please fill out all fields.');
      return;
    }

    const newKirtan = {
      id: kirtans.length + 1,
      kirtans: newKirtanName,
      englishText: newKirtanEnglishText,
      englishDefinition: newKirtanEnglishDefinition,
      tag: 'user-created',
    };

    try {
      const kirtanDataRef = doc(database, 'SCubedData', 'KirtansData');
      const updatedKirtans = [...kirtans, newKirtan];
      await updateDoc(kirtanDataRef, { data: updatedKirtans });

      setKirtans(updatedKirtans);
      setIsNewKirtanModalVisible(false);
      setNewKirtanName('');
      setNewKirtanEnglishText('');
      setNewKirtanEnglishDefinition('');
    } catch (error) {
      console.error('Error adding new kirtan:', error);
    }
  };

  const handleDeleteKirtan = async (kirtanId) => {
    const updatedKirtans = kirtans.filter(kirtan => kirtan.id !== kirtanId);
    try {
      const kirtanDataRef = doc(database, 'SCubedData', 'KirtansData');
      await updateDoc(kirtanDataRef, { data: updatedKirtans });
      setKirtans(updatedKirtans);
    } catch (error) {
      console.error('Error deleting kirtan:', error);
    }
  };

  const KirtanCard = ({ kirtan }) => {
    const completed = !!completionStatuses[`kirtan${kirtan.id}`];
  
    const handleCompletionPress = () => {
      setSelectedKirtanId(kirtan.id);
      toggleCompletionStatus(kirtan.id, !completed);
    };
  
    return (
      <Card style={[styles.card, completed && styles.cardCompleted]}>
        <Card.Content>
          <Title style={styles.title}>{kirtan.kirtans}</Title>
          <View style={styles.divider} />
          <Paragraph style={styles.paragraph}>{kirtan.englishText}</Paragraph>
          <View style={styles.divider} />
          <Paragraph style={styles.paragraph}>{kirtan.englishDefinition}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleCompletionPress}
          >
            {completed ? "Mark Incomplete" : "Mark Complete"}
          </Button>
          <TouchableOpacity onPress={() => playKirtan(kirtan)}>
            <Ionicons name="play-circle" size={40} color={colors.primary} />
          </TouchableOpacity>
          {kirtan.tag === 'user-created' && (
            <TouchableOpacity onPress={() => handleDeleteKirtan(kirtan.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          )}
        </Card.Actions>
      </Card>
    );
  };

  const MiniPlayer = () => {
    if (!currentKirtan) return null;
  
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
        <Text style={styles.miniPlayerText}>{currentKirtan.kirtans}</Text>
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
    const completedKirtansCount = Object.values(completionStatuses).filter(status => status).length;
    const totalKirtansCount = kirtans.length;
    
    navigation.setOptions({
      headerRight: () => (
        <Text style={{ marginRight: 16, fontSize: 18, color: colors.lightText }}>
          {completedKirtansCount}/{totalKirtansCount}
        </Text>
      ),
    });
  }, [navigation, completionStatuses, kirtans]);

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
        onPress={() => setIsNewKirtanModalVisible(true)}
      >
        New Kirtan
      </Button>

      <FlatList
        data={kirtans}
        renderItem={({ item }) => <KirtanCard kirtan={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <MiniPlayer />

      <Modal
        visible={isNewKirtanModalVisible}
        onRequestClose={() => setIsNewKirtanModalVisible(false)}
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
              onPress={() => setIsNewKirtanModalVisible(false)}
            >
              <Ionicons name="close" size={30} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Kirtan</Text>
            <TextInput
              style={styles.accessCodeInput}
              placeholderTextColor='white'
              placeholder="Kirtan Name"
              value={newKirtanName}
              onChangeText={setNewKirtanName}
            />
            <TextInput
              style={styles.accessCodeInput}
              placeholderTextColor='white'
              placeholder="English Text"
              value={newKirtanEnglishText}
              onChangeText={setNewKirtanEnglishText}
            />
            <TextInput
              style={styles.accessCodeInput}
              placeholderTextColor='white'
              placeholder="English Definition"
              value={newKirtanEnglishDefinition}
              onChangeText={setNewKirtanEnglishDefinition}
            />
            <Button
              title="Add Kirtan"
              textColor='white'
              style={styles.submitButton}
              onPress={addNewKirtan}
            >
              Add Kirtan
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
              placeholderTextColor='white'
              value={accessCodeInput}
              onChangeText={(text) => setAccessCodeInput(text)}
              secureTextEntry
            />
            <Button
              title="Submit"
              textColor="white"
              style={styles.submitButton}
              onPress={() => {
                const validAccessCodes = ['1933', '1907', '2017', '2023', '2014', '2004']; // Valid codes

                if (validAccessCodes.includes(accessCodeInput)) {
                  toggleCompletionStatus(selectedKirtanId); // Call with the selected ID
                  setIsAccessCodeModalVisible(false); // Close the modal
                  setAccessCodeInput(''); // Clear the input
                } else {
                  alert("Incorrect access code."); // Show error
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

export default KirtansScreen;
