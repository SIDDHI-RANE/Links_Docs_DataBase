// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const Sequelize = require('sequelize');
const port = 2030;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(bodyParser.json());

// Import required libraries


const sequelize = new Sequelize('magic', 'root', 'rootpassword', {
  host: 'localhost',
  dialect: 'mysql', // Or 'postgres', 'sqlite', etc., depending on your database
});

// Define the 'File' model
const File = sequelize.define('File', {
  // Id: {
  //   type: Sequelize.INTEGER(8), 
  //   allowNull: true,
  // },
  File_Name:{
    type: Sequelize.STRING(45), 
    allowNull: true,
  },

  File_Url: {
    type: Sequelize.BLOB('long'), // Use BLOB for binary data, 'long' is for large files
    allowNull: false,
  },
  Description:{
    type: Sequelize.STRING(45), 
    allowNull: true,
  },
});

// Synchronize the model with the database (creates the 'File' table if not exist)
sequelize.sync()
  .then(() => {
    console.log('Database and tables synced!');
  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });

app.post('/upload', upload.single('pdfFile'), (req, res) => {
  const pdfData = req.file.buffer; // Access the binary data of the uploaded PDF file
  console.log("Shashoto is baka !\n\n\n",req.name);
  

  File.create({
    "File_Name":"siddhesh pdf",
    "File_Url": pdfData,
    "Description":"THis is the best pdf in the whole universe"
  })
    .then(() => {
      console.log('PDF file uploaded and stored in the database.');
      res.send('PDF file uploaded successfully.');
    })
    .catch((error) => {
      console.error('Error storing PDF file in the database:', error);
      res.status(500).send('Error uploading the PDF file.');
    });
});








  // Endpoint to handle file upload

  // app.post('/api/links', (req, res) => {
  //   const link = req.body.link;

  //   collection.insertOne({ link }, (err, result) => {
  //     if (err) {
  //       console.error('Error inserting link:', err);
  //       res.status(500).json({ message: 'Error inserting link' });
  //       return;
  //     }

  //     res.status(201).json({ message: 'Link inserted successfully' });
  //   });
  // });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

