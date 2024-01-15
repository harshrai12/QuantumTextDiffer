import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack.mjs';

// Set the worker source for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function TextExtractor({ setParagraph1, setParagraph2 }) {
  // State to store the first file
  const [file1, setFile1] = useState(null);
  // State to store the second file
  const [file2, setFile2] = useState(null);

  // Effect to trigger text extraction when the first file changes
  useEffect(() => {
    if (file1) {
      extractText1();
    }
  }, [file1]);

  // Effect to trigger text extraction when the second file changes
  useEffect(() => {
    if (file2) {
      extractText2();
    }
  }, [file2]);

  // Handler for the first file input change
  const handleFileChange1 = (event) => {
    setFile1(event.target.files[0]);
  };

  // Handler for the second file input change
  const handleFileChange2 = (event) => {
    setFile2(event.target.files[0]);
  };

  // Function to extract text from the first file
  const extractText1 = async () => {
    // Create a FileReader to read the file as an array buffer
    const fileReader = new FileReader();
    // Callback executed when the file is loaded
    fileReader.onload = async () => {
      // Get the array buffer from the loaded file
      const arrayBuffer = fileReader.result;
      // Create a loading task for pdf.js with the array buffer
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      // Wait for the loading task to complete
      const pdfDoc = await loadingTask.promise;
      // Get the number of pages in the PDF document
      const numPages = pdfDoc.numPages;

      // Array to store text content of each page
      const allText = [];
      // Iterate through each page
      for (let i = 1; i <= numPages; i++) {
        // Get the page
        const page = await pdfDoc.getPage(i);
        // Get the text content of the page
        const pageText = await page.getTextContent();
        // Push the text of each item in the page to the array
        allText.push(pageText.items.map((item) => item.str).join(''));
      }

      // Set the state with the joined text from all pages
      setParagraph1(allText.join('\n'));
    };

    // Read the file as an array buffer
    fileReader.readAsArrayBuffer(file1);
  };

  // Function to extract text from the second file
  const extractText2 = async () => {
    // Create a FileReader to read the file as an array buffer
    const fileReader = new FileReader();
    // Callback executed when the file is loaded
    fileReader.onload = async () => {
      // Get the array buffer from the loaded file
      const arrayBuffer = fileReader.result;
      // Create a loading task for pdf.js with the array buffer
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      // Wait for the loading task to complete
      const pdfDoc = await loadingTask.promise;
      // Get the number of pages in the PDF document
      const numPages = pdfDoc.numPages;

      // Array to store text content of each page
      const allText = [];
      // Iterate through each page
      for (let i = 1; i <= numPages; i++) {
        // Get the page
        const page = await pdfDoc.getPage(i);
        // Get the text content of the page
        const pageText = await page.getTextContent();
        // Push the text of each item in the page to the array
        allText.push(pageText.items.map((item) => item.str).join(''));
      }

      // Set the state with the joined text from all pages
      setParagraph2(allText.join('\n'));
    };

    // Read the file as an array buffer
    fileReader.readAsArrayBuffer(file2);
  };

  // Component render
  return (
    <div>
      {/* File input for the first file */}
      <input type="file" onChange={handleFileChange1} />
      {/* Display whether File 1 is uploaded or not */}
      <pre>{file1 ? 'File 1 is uploaded.' : 'Please upload File 1.'}</pre>
      <hr />
      {/* File input for the second file */}
      <input type="file" onChange={handleFileChange2} />
      {/* Display whether File 2 is uploaded or not */}
      <pre>{file2 ? 'File 2 is uploaded.' : 'Please upload File 2.'}</pre>
    </div>
  );
}

export default TextExtractor;




