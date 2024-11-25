import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { database, auth } from '../../config/firebase';
import { doc, getDoc, collection, onSnapshot, deleteDoc, addDoc } from 'firebase/firestore';
import colors from '../../globalVariables/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnnouncementsScreen = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isNewAnnouncementModalVisible, setIsNewAnnouncementModalVisible] = useState(false);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementText, setNewAnnouncementText] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch user's role from Firestore
  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(database, 'userData', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists() && userDocSnap.data().role === 'Admin') {
          setIsAdmin(true);
        }
      }
    };
    fetchUserRole();
  }, []);

  // Fetch announcements from Firestore in real-time
  useEffect(() => {
    const announcementsCollection = collection(database, 'Announcements');
    const unsubscribe = onSnapshot(announcementsCollection, (snapshot) => {
      const fetchedAnnouncements = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnnouncements(fetchedAnnouncements);
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  const addNewAnnouncement = async () => {
    if (!newAnnouncementTitle || !newAnnouncementText) {
      alert('Please fill out all fields.');
      return;
    }

    const user = auth.currentUser;
    const newAnnouncement = {
      title: newAnnouncementTitle,
      text: newAnnouncementText,
      author: user ? user.displayName || user.email : 'Anonymous',
      authorId: user ? user.uid : null,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(database, 'Announcements'), newAnnouncement);

      setIsNewAnnouncementModalVisible(false);
      setNewAnnouncementTitle('');
      setNewAnnouncementText('');
    } catch (error) {
      console.error('Error adding new announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    Alert.alert(
      "Delete Announcement",
      "Are you sure you want to delete this announcement?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(database, 'Announcements', announcementId));
            } catch (error) {
              console.error('Error deleting announcement:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const AnnouncementCard = ({ announcement }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{announcement.title}</Text>
        <Text style={styles.paragraph}>{announcement.text}</Text>
        <Text style={styles.author}>Posted by: {announcement.author}</Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        {isAdmin && (
          <TouchableOpacity onPress={() => handleDeleteAnnouncement(announcement.id)}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        )}
      </Card.Actions>
    </Card>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isAdmin ? (
        <>
          <Button
            icon="plus"
            textColor="black"
            style={styles.addButton}
            onPress={() => setIsNewAnnouncementModalVisible(true)}
          >
            Add New Announcement
          </Button>
          <Text style={styles.adminNotification}>
            You are logged in as an Admin. You can add or delete announcements.
          </Text>
        </>
      ) : (
        <Text style={styles.nonAdminMessage}>
          You can view announcements below.
        </Text>
      )}
  
      <FlatList
        data={announcements}
        renderItem={({ item }) => <AnnouncementCard announcement={item} />}
        keyExtractor={(item) => item.id}
      />
  
      <Modal
        visible={isNewAnnouncementModalVisible}
        onRequestClose={() => setIsNewAnnouncementModalVisible(false)}
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
                onPress={() => setIsNewAnnouncementModalVisible(false)}
              >
                <Ionicons name="close" size={30} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add New Announcement</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Announcement Title"
                value={newAnnouncementTitle}
                onChangeText={setNewAnnouncementTitle}
              />
              <TextInput
                style={[styles.input, styles.announcementText]}
                placeholderTextColor="white"
                placeholder="Announcement Text"
                value={newAnnouncementText}
                onChangeText={setNewAnnouncementText}
                multiline
              />
              <Button
                title="Add Announcement"
                textColor="white"
                style={styles.submitButton}
                onPress={addNewAnnouncement}
              >
                Add Announcement
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );  
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
  },
  adminNotification: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 10,
  },
  nonAdminMessage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.secondaryText,
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    margin: 10,
    backgroundColor: colors.darkBackground,
    borderRadius: 8,
    padding: 10,
  },
  addButton: {
    margin: 20,
    backgroundColor: colors.accent,
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
  author: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 5,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    color: colors.lightText,
    marginBottom: 15,
  },
  input: {
    borderColor: colors.inputBorder,
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    color: colors.lightText,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
  },
  announcementText: {
    height: 100,
    textAlignVertical: 'top',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: colors.accent,
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnnouncementsScreen;