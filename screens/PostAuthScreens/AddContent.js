import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { database } from '../../config/firebase';
import colors from '../../globalVariables/colors';

const AddContent = ({ navigation }) => {
  const [contentType, setContentType] = useState('shlokas');  // Default content type
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [shlokas, setShlokas] = useState('');
  const [sanskritLippy, setSanskritLippy] = useState('');
  const [gujaratiText, setGujaratiText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [audioURL1, setAudioURL1] = useState('');

  const contentTypes = [
    { label: 'Shlokas', value: 'shlokas' },
    { label: 'Kirtans', value: 'kirtans' },
    { label: 'Purshottam Bolya Prite', value: 'pbp' },
    { label: 'Swamini Vato', value: 'swaminiVato' },
    // Add more options as needed
  ];

  const handleSubmit = async () => {
    if (!shlokas || !sanskritLippy || !gujaratiText || !englishText || !audioURL || !audioURL1) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      const collectionName = contentType === 'shlokas' ? 'SatsangDikshaData' : 'KirtansData'; // Extend this for other types
      const shlokaDataRef = doc(database, 'SCubedData', collectionName);
      const shlokaDataSnap = await getDoc(shlokaDataRef);

      let updatedData = [];
      if (shlokaDataSnap.exists()) {
        updatedData = [...shlokaDataSnap.data().data, {
          shlokas,
          sanskritLippy,
          gujaratiText,
          englishText,
          audioURL,
          audioURL1,
          id: shlokaDataSnap.data().data.length + 1, // Incremental ID
        }];
      } else {
        updatedData = [{
          shlokas,
          sanskritLippy,
          gujaratiText,
          englishText,
          audioURL,
          audioURL1,
          id: 1,
        }];
      }

      await updateDoc(shlokaDataRef, { data: updatedData });

      Alert.alert('Success', `New ${contentType} added successfully.`);
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      console.error(`Error adding ${contentType}:`, error);
      Alert.alert('Error', `An error occurred while adding the new ${contentType}.`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBackground }}>
      <View style={styles.container}>
        {/* Custom Dropdown */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsDropdownOpen(true)}
        >
          <Text style={styles.dropdownText}>
            {contentTypes.find(type => type.value === contentType)?.label || 'Select Content Type'}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={isDropdownOpen}
          transparent
          animationType="fade"
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setIsDropdownOpen(false)}
          >
            <View style={styles.modalContainer}>
              <ScrollView>
                {contentTypes.map(type => (
                  <TouchableOpacity
                    key={type.value}
                    style={styles.modalItem}
                    onPress={() => {
                      setContentType(type.value);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{type.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>

        <TextInput
          style={styles.input}
          placeholder="Shloks"
          value={shlokas}
          onChangeText={setShlokas}
        />
        <TextInput
          style={styles.input}
          placeholder="Sanskrit Lippy"
          value={sanskritLippy}
          onChangeText={setSanskritLippy}
        />
        <TextInput
          style={styles.input}
          placeholder="Gujarati Text"
          value={gujaratiText}
          onChangeText={setGujaratiText}
        />
        <TextInput
          style={styles.input}
          placeholder="English Text"
          value={englishText}
          onChangeText={setEnglishText}
        />
        <TextInput
          style={styles.input}
          placeholder="Audio URL"
          value={audioURL}
          onChangeText={setAudioURL}
        />
        <TextInput
          style={styles.input}
          placeholder="Audio URL1"
          value={audioURL1}
          onChangeText={setAudioURL1}
        />
        <Button
          title="Add Content"
          color={colors.primary}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.darkBackground,
  },
  dropdown: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#333333',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#424242',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default AddContent;
