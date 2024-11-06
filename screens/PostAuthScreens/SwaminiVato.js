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
import { useNavigation } from "@react-navigation/native";

import colors from '../../globalVariables/colors';

const SwaminiVatoScreen = () => {
  const [vatos, setVatos] = useState([]);
  const [completionStatuses, setCompletionStatuses] = useState({});
  const [isAccessCodeModalVisible, setIsAccessCodeModalVisible] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [selectedVatoId, setSelectedVatoId] = useState(null);
  const [isNewVatoModalVisible, setIsNewVatoModalVisible] = useState(false);
  const [newVatoName, setNewVatoName] = useState('');
  const [newVatoGujarati, setNewVatoGujarati] = useState('');
  const [newVatoEnglish, setNewVatoEnglish] = useState('');

  const navigation = useNavigation();

  const ACCESS_CODE = '1933';

  // Function to add a new Swamini Vato
  const handleAddNewVato = async () => {
    if (!newVatoName || !newVatoGujarati || !newVatoEnglish) {
      alert('Please fill out all fields.');
      return;
    }

    const newVato = {
      id: vatos.length + 1, // Assign a new ID
      gujaratiLipi: newVatoGujarati,
      englishDefinition: newVatoEnglish,
      tag: 'user-created', // Tag for user-created vatos
    };

    try {
      // Update Firestore with the new vato
      const vatoDataRef = doc(database, 'SCubedData', 'SwaminiVatoData');
      const updatedVatos = [...vatos, newVato];
      await updateDoc(vatoDataRef, { data: updatedVatos });

      // Update local state to include the new vato
      setVatos(updatedVatos);
      setIsNewVatoModalVisible(false);
      setNewVatoName('');
      setNewVatoGujarati('');
      setNewVatoEnglish('');
    } catch (error) {
      console.error('Error adding new vato:', error);
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
        const currentVatoCount = leaderboardDocSnap.data().swaminiVatos || 0;
        await updateDoc(leaderboardDocRef, {
          firstName,
          swaminiVatos: currentVatoCount + increment,
        });
      } else {
        await setDoc(leaderboardDocRef, {
          firstName,
          swaminiVatos: increment > 0 ? increment : 0,
        });
      }
    } else {
      console.error("User document does not exist in userData collection.");
    }
  }, []);
  
  // Function to delete a user-created vato
  const handleDeleteVato = async (vatoId) => {
    const updatedVatos = vatos.filter((vato) => vato.id !== vatoId);

    try {
      // Update Firestore with the filtered vatos
      const vatoDataRef = doc(database, 'SCubedData', 'SwaminiVatoData');
      await updateDoc(vatoDataRef, { data: updatedVatos });

      // Update local state to reflect the deletion
      setVatos(updatedVatos);
    } catch (error) {
      console.error('Error deleting vato:', error);
    }
  };

  const fetchCompletionStatuses = useCallback(async () => {
    const userDocRef = doc(database, 'userMukhpathsSwaminiVato', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      setCompletionStatuses(userDocSnap.data());
    }
  }, []);

  const fetchVatos = useCallback(async () => {
    setLoading(true);
    try {
      const vatoDataRef = doc(database, 'SCubedData', 'SwaminiVatoData');
      const vatoDataSnap = await getDoc(vatoDataRef);
      if (vatoDataSnap.exists()) {
        // console.log(vatoDataSnap.data().data)
        setVatos(vatoDataSnap.data().data);
      } else {
        console.log('No Swamini Vato data found in Firestore.');
      }
    } catch (error) {
      console.error('Error fetching Swamini Vato:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompletionStatuses();
    fetchVatos();
  }, [fetchCompletionStatuses, fetchVatos]);

  const toggleCompletionStatus = async (vatoId, requireAccessCode = false) => {
    if (requireAccessCode && accessCodeInput !== ACCESS_CODE) {
      setSelectedVatoId(vatoId);
      setIsAccessCodeModalVisible(true);
      return;
    }
  
    const isCompleted = !!completionStatuses[`vato${vatoId}`];
    const newStatus = !isCompleted;
  
    // Update local state
    setCompletionStatuses(prevStatuses => ({
      ...prevStatuses,
      [`vato${vatoId}`]: newStatus,
    }));
  
    // Update leaderboard based on completion status
    await updateLeaderboard(newStatus ? 1 : -1);
  
    // Update Firestore
    const userDocRef = doc(database, 'userMukhpathsSwaminiVato', auth.currentUser.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, { [`vato${vatoId}`]: newStatus });
    } else {
      await setDoc(userDocRef, { [`vato${vatoId}`]: newStatus });
    }
  };  

  const VatoCard = ({ vato }) => {
    const completed = !!completionStatuses[`vato${vato.id}`];
  
    const handleCompletionPress = () => {
      toggleCompletionStatus(vato.id, !completed);
    };
  
    return (
      <Card style={[styles.card, completed && styles.cardCompleted]}>
        <Card.Content>
          <Title style={styles.title}>
            <Text>Swamini Vat {vato.id}</Text> {/* Fix applied here */}
          </Title>
          <View style={styles.divider} />
          <Paragraph style={styles.paragraph}>{vato.gujaratiLipi}</Paragraph>
          <View style={styles.divider} />
          <Paragraph style={styles.paragraph}>{vato.englishDefinition}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleCompletionPress}
            textColor="white"
          >
            {completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Button>
          {vato.tag === 'user-created' && (
            <TouchableOpacity onPress={() => handleDeleteVato(vato.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          )}
        </Card.Actions>
      </Card>
    );
  };
  

  useLayoutEffect(() => {
    const completedVatosCount = Object.values(completionStatuses).filter((status) => status).length;
    const totalVatoCount = vatos.length;

    navigation.setOptions({
      headerRight: () => (
        <Text style={{ marginRight: 16, fontSize: 18 }}>
          {completedVatosCount}/{totalVatoCount}
        </Text>
      ),
    });
  }, [navigation, completionStatuses, vatos]);

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
        onPress={() => setIsNewVatoModalVisible(true)}
      >
        New Swamini Vato
      </Button>

      <FlatList
        data={vatos}
        renderItem={({ item }) => <VatoCard vato={item} />}
        keyExtractor={(item) => item.id.toString()} // Ensure key is a string and unique
       />

      {/* Modal for adding a new Vato */}
      <Modal
        visible={isNewVatoModalVisible}
        onRequestClose={() => setIsNewVatoModalVisible(false)}
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
              onPress={() => setIsNewVatoModalVisible(false)}
            >
              <Ionicons name="close" size={30} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Swamini Vato</Text>
            <TextInput
              style={styles.accessCodeInput}
              placeholderTextColor='white'
              placeholder="Vato Name"
              value={newVatoName}
              onChangeText={setNewVatoName}
            />
            <TextInput
              style={styles.accessCodeInput}
              placeholderTextColor='white'
              placeholder="Gujarati Text"
              value={newVatoGujarati}
              onChangeText={setNewVatoGujarati}
            />
            <TextInput
              style={styles.accessCodeInput}
              placeholderTextColor='white'
              placeholder="English Text"
              value={newVatoEnglish}
              onChangeText={setNewVatoEnglish}
            />
            <Button
              title="Add Vato"
              textColor='white'
              style={styles.submitButton}
              onPress={handleAddNewVato}
            >
              Add Vato
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
                  toggleCompletionStatus(selectedVatoId);
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
  button1: {
    borderRadius: 0,
    backgroundColor: colors.accent,
  },
  submitButton: {
    backgroundColor: colors.accent,
    marginTop: 10,
  },
  card: {
    margin: 10,
    backgroundColor: colors.darkBackground,
    borderRadius: 8,
    padding: 10,
  },
  cardCompleted: {
    backgroundColor: '#56E364',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    color: '#313131',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 14,
    color: '#313131',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginVertical: 5,
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
  buttonLabel: {
    color: colors.primary
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
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
});

export default SwaminiVatoScreen;
