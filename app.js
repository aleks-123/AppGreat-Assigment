require('dotenv').config({ path: './config/.env' });

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log('Could not start service');
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
});
