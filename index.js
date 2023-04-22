const express = require('express')
const fileUpload = require('express-fileupload')
const pdfParse = require('pdf-parse')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(fileUpload())
app.use(cors());

app.post('/extract-text', (req, res)=>{
    if(!req.files && !req.files.pdfFile){
      return  res.status(400).end()
    }
    console.log('extracting started')
    pdfParse(req.files.pdfFile).then(result=>{
         res.send(result.text)
    })
})
app.use('/', (req, res)=>{
    return res.json('hello world')
})

const port = 3001;

app.listen(port, ()=>{
    console.log('listening on port ', port)
})