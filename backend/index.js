const express = require('express')
const app = express()
const port = 4000
const mongo=require('./db')
mongo();
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  next();
})
app.use(express.json())
app.use('/api', require("./routes/CreateUser"))
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})