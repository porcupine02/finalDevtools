var admin = require("firebase-admin");

var serviceAccount = require("./travel-b2e34-firebase-adminsdk-bn6t6-eb904720fe.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// const analytics = getAnalytics(app);

// Export the initialized Firebase app and analytics instance
module.exports = { admin };