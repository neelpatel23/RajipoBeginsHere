const admin = require('firebase-admin');
const serviceAccount = require('./scubed-eda81-firebase-adminsdk-cr7u1-2090f590c5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function deleteAllUsers(nextPageToken) {
  try {
    // List users in batches
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    const deletePromises = listUsersResult.users.map(userRecord =>
      admin.auth().deleteUser(userRecord.uid)
    );

    await Promise.all(deletePromises);
    console.log(`${listUsersResult.users.length} users deleted.`);

    if (listUsersResult.pageToken) {
      // Recursively call to delete next batch
      await deleteAllUsers(listUsersResult.pageToken);
    } else {
      console.log('All users deleted successfully.');
    }
  } catch (error) {
    console.error('Error deleting users:', error);
  }
}

// Start deletion
deleteAllUsers();
