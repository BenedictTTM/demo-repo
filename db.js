const { MongoClient } = require('mongodb');

// MongoDB connection URL and Database name
const dbName = 'yourDatabaseName'; // Replace with your actual database name

let dbConnection;
//mongodb+srv://benedict:0109089004.password@cluster0.9lb1v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
module.exports = {
  // Connect to MongoDB
  ConnectToDb: () => {
    return MongoClient.connect('mongodb+srv://benedict:0109089004.password@cluster0.9lb1v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
      .then((client) => {
        console.log('Connected to MongoDB');
        
        // Select the database
        dbConnection = client.db();
        console.log(`Database "$}" selected`);
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      });
  },

  // Get the database instance
  getDb: () => {
    if (!dbConnection) {
      throw new Error('Database not connected yet');
    }
    return dbConnection;
  },
};

