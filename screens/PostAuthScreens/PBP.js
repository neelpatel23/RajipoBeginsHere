import React, { useState, useEffect, useCallback, useLayoutEffect  } from 'react';
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
import { Card, Title, Paragraph, Button} from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { database, auth } from '../../config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";

import colors from '../../globalVariables/colors';

const PBPScreen = () => {
  const [quotations, setQuotations] = useState([]);
  const [completionStatuses, setCompletionStatuses] = useState({});
  const [isAccessCodeModalVisible, setIsAccessCodeModalVisible] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [selectedQuotationId, setSelectedQuotationId] = useState(null);
  const [isNewQuotationModalVisible, setIsNewQuotationModalVisible] = useState(false);
  const [newQuotationName, setNewQuotationName] = useState('');
  const [newQuotationGujarati, setNewQuotationGujarati] = useState('');
  const [newQuotationEnglish, setNewQuotationEnglish] = useState('');

  const navigation = useNavigation();

  const ACCESS_CODE = '1933';

    // Function to add a new quotation
  const handleAddNewQuotation = async () => {
    if (!newQuotationName || !newQuotationGujarati || !newQuotationEnglish) {
      alert('Please fill out all fields.');
      return;
    }

    const newQuotation = {
      id: quotations.length + 1, // Assign a new ID (you might want to ensure unique IDs)
      name: newQuotationName,
      gujarati: newQuotationGujarati,
      english: newQuotationEnglish,
      tag: 'user-created', // Tag for user-created quotations
    };

    try {
      // Update Firestore with the new quotation
      const quotationDataRef = doc(database, 'SCubedData', 'PBPData');
      const updatedQuotations = [...quotations, newQuotation];
      await updateDoc(quotationDataRef, { data: updatedQuotations });

      // Update local state to include the new quotation
      setQuotations(updatedQuotations);
      setIsNewQuotationModalVisible(false);
      setNewQuotationName('');
      setNewQuotationGujarati('');
      setNewQuotationEnglish('');
    } catch (error) {
      console.error('Error adding new quotation:', error);
    }
  };

  const updateLeaderboard = useCallback(async (increment) => {
    const userDocRef = doc(database, 'userData', auth.currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);
  
    if (userDocSnap.exists()) {
      const { firstName } = userDocSnap.data();
      const leaderboardDocRef = doc(database, 'leaderboard', auth.currentUser.uid);
  
      const leaderboardDocSnap = await getDoc(leaderboardDocRef);
      if (leaderboardDocSnap.exists()) {
        const currentPBPCount = leaderboardDocSnap.data().pbps || 0;
        await updateDoc(leaderboardDocRef, {
          firstName,
          pbps: currentPBPCount + increment,
        });
      } else {
        await setDoc(leaderboardDocRef, {
          firstName,
          pbps: increment > 0 ? increment : 0,
        });
      }
    } else {
      console.error("User document does not exist in userData collection.");
    }
  }, []);
  
  // Function to delete a user-created quotation
  const handleDeleteQuotation = async (quotationId) => {
    const updatedQuotations = quotations.filter((quotation) => quotation.id !== quotationId);

    try {
      // Update Firestore with the filtered quotations
      const quotationDataRef = doc(database, 'SCubedData', 'PBPData');
      await updateDoc(quotationDataRef, { data: updatedQuotations });

      // Update local state to reflect the deletion
      setQuotations(updatedQuotations);
    } catch (error) {
      console.error('Error deleting quotation:', error);
    }
  };

  const fetchCompletionStatuses = useCallback(async () => {
    const userDocRef = doc(database, 'userMukhpathsPBP', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      setCompletionStatuses(userDocSnap.data());
    }
  }, []);

  const fetchQuotations = useCallback(async () => {
    setLoading(true);
    try {
      const quotationDataRef = doc(database, 'SCubedData', 'PBPData');
      const quotationDataSnap = await getDoc(quotationDataRef);
      if (quotationDataSnap.exists()) {
        setQuotations(quotationDataSnap.data().data);
      } else {
        console.log('No PBP data found in Firestore.');
      }
    } catch (error) {
      console.error('Error fetching PBP:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompletionStatuses();
    fetchQuotations();
  }, [fetchCompletionStatuses, fetchQuotations]);

  const toggleCompletionStatus = async (quotationId, requireAccessCode = false) => {
    if (requireAccessCode && accessCodeInput !== ACCESS_CODE) {
      setSelectedQuotationId(quotationId);
      setIsAccessCodeModalVisible(true);
      return;
    }
  
    const isCompleted = !!completionStatuses[`quotation${quotationId}`];
    const newStatus = !isCompleted;
  
    // Update local state
    setCompletionStatuses(prevStatuses => ({
      ...prevStatuses,
      [`quotation${quotationId}`]: newStatus,
    }));
  
    // Only update leaderboard if the quotation is being marked as complete or incomplete
    await updateLeaderboard(newStatus ? 1 : -1);
  
    // Update Firebase
    const userDocRef = doc(database, 'userMukhpathsPBP', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, { [`quotation${quotationId}`]: newStatus });
    } else {
      await setDoc(userDocRef, { [`quotation${quotationId}`]: newStatus });
    }
  };  
  

  const QuotationCard = ({ quotation }) => {
    const completed = !!completionStatuses[`quotation${quotation.id}`];
  
    const handleCompletionPress = () => {
      setSelectedQuotationId(quotation.id);
      toggleCompletionStatus(quotation.id, !completed);
    };
  
    return (
      <Card style={[styles.card, completed && styles.cardCompleted]}>
        <Card.Content>
          <Title style={styles.title}>{quotation.name}</Title>
          <View style={styles.divider} />
          <Paragraph style={styles.paragraph}>{quotation.gujarati}</Paragraph>
          <View style={styles.divider} />
          <Paragraph style={styles.paragraph}>{quotation.english}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleCompletionPress}
            textColor='white'
          >
            {completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Button>
          {quotation.tag === 'user-created' && (
            <TouchableOpacity onPress={() => handleDeleteQuotation(quotation.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          )}
        </Card.Actions>
      </Card>
    );
  };

  // Add modal for creating new quotations in the return block of PBPScreen
  <>
    // Add modal for creating new quotations in the return block of PBPScreen
    <Modal
      visible={isNewQuotationModalVisible}
      onRequestClose={() => setIsNewQuotationModalVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsNewQuotationModalVisible(false)}
          >
            <Ionicons name="close" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Add New Quotation</Text>
          <TextInput
            style={styles.accessCodeInput}
            placeholder="Quotation Name"
            value={newQuotationName}
            onChangeText={setNewQuotationName} />
          <TextInput
            style={styles.accessCodeInput}
            placeholder="Gujarati Text"
            value={newQuotationGujarati}
            onChangeText={setNewQuotationGujarati} />
          <TextInput
            style={styles.accessCodeInput}
            placeholder="English Text"
            value={newQuotationEnglish}
            onChangeText={setNewQuotationEnglish} />
          <Button
            title="Add Quotation"
            textColor='white'
            style={styles.submitButton}
            onPress={handleAddNewQuotation}
          >
            Add Quotation
          </Button>
        </View>
      </View>
    </Modal>
    // Update the "New Quotation" button's onPress event
    <Button
      icon='plus'
      mode='contained'
      style={styles.button1}
      onPress={() => setIsNewQuotationModalVisible(true)}
    >
      New Quotation
    </Button>
    </>
   
  useLayoutEffect(() => {
    // Calculate completed shlokas count
    const completedKirtansCount = Object.values(completionStatuses).filter(status => status).length;
    // Calculate total number of shlokas
    const totalQuotationCount = quotations.length
    
    // Update the header counter in real-time
    navigation.setOptions({
      headerRight: () => (
        <Text style={{ marginRight: 16, fontSize: 18 }}>
          {completedKirtansCount}/{totalQuotationCount}
        </Text>
      ),
    });
  }, [navigation, completionStatuses, quotations]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* New Quotation Button */}
      <Button
        icon='plus'
        textColor='black'
        style={styles.button1}
        onPress={() => setIsNewQuotationModalVisible(true)}
      >
        New Quotation
      </Button>
  
      {/* FlatList for rendering quotations */}
      <FlatList
        data={quotations}
        renderItem={({ item }) => <QuotationCard quotation={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
  
      {/* Modal for adding a new quotation */}
      <Modal
        visible={isNewQuotationModalVisible}
        onRequestClose={() => setIsNewQuotationModalVisible(false)}
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
                onPress={() => setIsNewQuotationModalVisible(false)}
              >
                <Ionicons name="close" size={30} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add New Quotation</Text>
              <TextInput
                style={styles.accessCodeInput}
                placeholderTextColor='white'
                placeholder="Quotation Name"
                value={newQuotationName}
                onChangeText={setNewQuotationName}
              />
              <TextInput
                style={styles.accessCodeInput}
                placeholderTextColor='white'
                placeholder="Gujarati Text"
                value={newQuotationGujarati}
                onChangeText={setNewQuotationGujarati}
              />
              <TextInput
                style={styles.accessCodeInput}
                placeholder="English Text"
                placeholderTextColor='white'
                value={newQuotationEnglish}
                onChangeText={setNewQuotationEnglish}
              />
              <Button
                title="Add Quotation"
                placeholderTextColor='white'
                textColor='white'
                style={styles.submitButton}
                onPress={handleAddNewQuotation}
              >
                Add Quotation
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
  
      {/* Modal for entering the access code */}
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
              placeholderTextColor='white'
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
                  toggleCompletionStatus(selectedQuotationId);
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
floatingButton: {
  position: 'absolute',
  top: 20,
  right: 20,
  zIndex: 100,
},
submitButton: {
    backgroundColor: colors.accent, // Set the button background color
    marginTop: 10, // Adjust as needed
    },
  headerContainer: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    backgroundColor: colors.darkBackground,
    borderRadius: 8,
    padding: 10
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
    backgroundColor: colors.accent,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
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
  miniPlayerText: {
    color: 'white',
    fontSize: 19,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 5,
  },
  button: {
    backgroundColor: colors.accent,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  button1: {
    borderRadius: 0,
    backgroundColor: colors.accent
  },
  buttonLabel: {
    color: colors.primary
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
    padding: 10
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginVertical: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
});

export default PBPScreen;

