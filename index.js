const express = require('express');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/extract-text', (req, res) => {
    if (req.files && req.files.pdfFile) {
        // Handle the uploaded PDF file
        pdfParse(req.files.pdfFile).then(result => {
            res.send(result.text);
        }).catch(error => {
            res.status(500).send('Error parsing PDF file');
        });
    } else if (req.body.pdfName) {
        // Handle the PDF filename provided in the body
        const pdfPath = path.join(__dirname, 'public', req.body.pdfName);
        if (fs.existsSync(pdfPath)) {
            const dataBuffer = fs.readFileSync(pdfPath);
            pdfParse(dataBuffer).then(result => {
                res.send(result.text);
            }).catch(error => {
                res.status(500).send('Error parsing PDF file');
            });
        } else {
            res.status(404).send('PDF file not found');
        }
    } else {
        res.status(400).send('No PDF file or filename provided');
    }
});

app.get('/pdf-files', (req, res) => {
    const pdfDirectory = path.join(__dirname, 'public');
    fs.readdir(pdfDirectory, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        res.json(pdfFiles);
    });
});

app.use('/', (req, res) => {
    return res.json('hello world');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('listening on port ', port);
});
