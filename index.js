const express = require('express')
const cors = require("cors");
const app = express()
require('dotenv').config()

app.use(cors());
app.use(express.json());


const port = 5000



app.get('/', (req, res) => {
  res.send('Image Uploading Server is Running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})