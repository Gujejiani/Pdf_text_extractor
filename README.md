# PDF Text Extraction API

This repository contains an Express.js application that provides endpoints to upload a PDF file or provide a filename to extract text from the PDF. It also has an endpoint to list all PDF files in a specified directory.

## Features

- **Upload and parse PDF files:** Users can upload a PDF file via a POST request, and the server will return the extracted text.
- **Parse existing PDF files by filename:** Users can provide a filename of an existing PDF in the `public` directory, and the server will return the extracted text.
- **List available PDF files:** Users can retrieve a list of all PDF files in the `public` directory.

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/pdf-text-extraction-api.git
   cd pdf-text-extraction-api
   npm install
   npm start

    
  
