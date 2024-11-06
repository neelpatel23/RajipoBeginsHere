const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const serviceAccount = require('./scubed-eda81-firebase-adminsdk-cr7u1-2090f590c5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Initialize Firestore database

// Path to the Swamini Vato JSON file
const jsonFilePath = path.join(__dirname, 'SWJson.json');

// Function to upload Swamini Vato to Firestore
const uploadSwaminiVato = async () => {
  try {
    // Read JSON file data
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    const swaminiVato = JSON.parse(data);

    // Firestore reference
    const docRef = db.collection('SCubedData').doc('SwaminiVatoData');
    
    // Upload data to Firestore
    await docRef.set({ data: swaminiVato });
    
    console.log('Swamini Vato uploaded successfully');
  } catch (error) {
    console.error('Error uploading Swamini Vato:', error);
  }
};

// Execute the upload function
uploadSwaminiVato();
