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

const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [isNewNoteModalVisible, setIsNewNoteModalVisible] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
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

  // Fetch notes from Firestore in real-time
  useEffect(() => {
    const notesCollection = collection(database, 'Notes');
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const fetchedNotes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetchedNotes);
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  const addNewNote = async () => {
    if (!newNoteTitle || !newNoteText) {
      alert('Please fill out all fields.');
      return;
    }

    const user = auth.currentUser;
    const newNote = {
      title: newNoteTitle,
      text: newNoteText,
      author: user ? user.displayName || user.email : 'Anonymous',
      authorId: user ? user.uid : null,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(database, 'Notes'), newNote);

      setIsNewNoteModalVisible(false);
      setNewNoteTitle('');
      setNewNoteText('');
    } catch (error) {
      console.error('Error adding new note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
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
              await deleteDoc(doc(database, 'Notes', noteId));
            } catch (error) {
              console.error('Error deleting note:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const NoteCard = ({ note }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.paragraph}>{note.text}</Text>
        <Text style={styles.author}>Posted by: {note.author}</Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        {isAdmin && (
          <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
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
    <View style={styles.container}>
      <Button
        icon='plus'
        textColor='black'
        style={styles.addButton}
        onPress={() => setIsNewNoteModalVisible(true)}
      >
        Add New Note
      </Button>

      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteCard note={item} />}
        keyExtractor={(item) => item.id}
      />

      <Modal
        visible={isNewNoteModalVisible}
        onRequestClose={() => setIsNewNoteModalVisible(false)}
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
                onPress={() => setIsNewNoteModalVisible(false)}
              >
                <Ionicons name="close" size={30} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add New Note</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor='white'
                placeholder="Note Title"
                value={newNoteTitle}
                onChangeText={setNewNoteTitle}
              />
              <TextInput
                style={[styles.input, styles.noteText]}
                placeholderTextColor='white'
                placeholder="Note Text"
                value={newNoteText}
                onChangeText={setNewNoteText}
                multiline
              />
              <Button
                title="Add Note"
                textColor='white'
                style={styles.submitButton}
                onPress={addNewNote}
              >
                Add Note
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
  noteText: {
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

export default NotesScreen;
