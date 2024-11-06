const admin = require('firebase-admin');
const serviceAccount = require('./scubed-eda81-firebase-adminsdk-cr7u1-2090f590c5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Initialize Firestore database

const users =
[
    {
      "userEmail": "pm1701@sampark.email",
      "displayName": "PMD",
      "firstName": "Sadhu",
      "lastName": "Purnamangaldas",
      "center": "Midwest",
      "role": "Kishore",
      "group": "Kishore",
      "team": "Team 1",
      "tier": "Mahant"
    },
  ]

  users.forEach(user => {
    admin.auth().createUser({
      email: user.userEmail,
      emailVerified: false,
      password: 'SCubed24', // You should set a secure password
      displayName: user.displayName,
      disabled: false
    })
    .then((userRecord) => {
      console.log('Successfully created new user:', userRecord.uid);
  
      // Prepare user data with the additional 'role' field
      const userData = {
        uid: userRecord.uid,
        email: user.userEmail,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        center: user.center,
        role: user.role,
        group: user.group,
        team: user.team,
        tier: user.tier
      };
  
      // Store the user data in Firestore
      db.collection('userData').doc(userRecord.uid).set(userData)
        .then(() => console.log(`User data stored in Firestore for ${user.email}`))
        .catch(error => console.error(`Error storing user data in Firestore for ${user.email}:`, error));
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
  });
