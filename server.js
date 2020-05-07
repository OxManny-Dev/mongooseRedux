const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo_db', { useNewUrlParser: true,  useUnifiedTopology: true  });

app.listen(PORT, () => console.log("Server started"));

