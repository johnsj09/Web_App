import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DataTable from './components/DataTable';
import ChartComponent from './components/ChartComponent';
import ActionControls from './components/ActionControls';
import ChartControls from './components/ChartControls';

// Set up the PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

function App() {
  const [rows, setRows] = useState([]);
  const [chartType, setChartType] = useState('bar');

  const handleAddNewRow = () => {
    const newRow = {
      id: crypto.randomUUID(),
      description: '',
      cost: 0,
      uploadedFile: null,
      isProcessing: false,
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleUpdateRow = (id, updatedData) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, ...updatedData } : row)),
    );
  };

  // New function to remove a row by its ID
  const handleDeleteRow = (rowId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
  };

  const handleProcessFile = async (rowId, file) => {
    handleUpdateRow(rowId, { isProcessing: true, uploadedFile: file.name });
    let imageForOcr = file;
    if (file.type === 'application/pdf') {
      try {
        const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport: viewport }).promise;
        imageForOcr = canvas.toDataURL();
      } catch (pdfError) {
        console.error('Error converting PDF to image:', pdfError);
        // Updated error handling: show alert and remove row
        alert('There was an error processing this PDF. Please try a different file.');
        handleDeleteRow(rowId);
        return;
      }
    }
    const worker = await createWorker('eng');
    try {
      const {
        data: { text },
      } = await worker.recognize(imageForOcr);
      await worker.terminate();

      // --- New Validation Logic ---
      const descriptionMatch = text.match(/Item:\s*(.*)/i);
      const costMatch = text.match(/Cost:\s*\$?(\d+\.?\d*)/i);
      
      // Check if both fields were found in the document
      if (!descriptionMatch || !costMatch) {
        alert('Error: The uploaded file is not in the correct format. Please ensure it contains both "Item:" and "Cost:" fields.');
        handleDeleteRow(rowId); // Remove the row
        return; // Stop the function
      }
      // --- End of Validation Logic ---

      const extractedData = {
        description: descriptionMatch[1].trim(),
        cost: parseFloat(costMatch[1]),
      };
      handleUpdateRow(rowId, { ...extractedData, isProcessing: false });
    } catch (error) {
      console.error('Error processing file:', error);
      if (worker) {
        await worker.terminate();
      }
      // Updated error handling: show alert and remove row
      alert('An unexpected error occurred during OCR processing. The row will be removed.');
      handleDeleteRow(rowId);
    }
  };

  const handleGenerateAudit = () => {
    if (rows.length === 0) {
      alert('There is no data to summarize.');
      return;
    }

    const totalEntries = rows.length;
    const totalCost = rows.reduce((sum, row) => sum + row.cost, 0);
    const averageCost = totalEntries > 0 ? totalCost / totalEntries : 0;

    const reportHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Audit Summary</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; background-color: #f1f5f9; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          .container { background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); width: 100%; max-w: 500px; }
          h1 { margin-top: 0; color: #1e293b; }
          ul { list-style: none; padding: 0; }
          li { display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid #e2e8f0; }
          li:last-child { border-bottom: none; }
          span { color: #475569; }
          strong { font-family: monospace; font-size: 1.1rem; color: #0f172a; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Audit Summary</h1>
          <ul>
            <li><span>Total Entries:</span><strong>${totalEntries}</strong></li>
            <li><span>Total Cost:</span><strong>$${totalCost.toFixed(2)}</strong></li>
            <li><span>Average Cost:</span><strong>$${averageCost.toFixed(
              2,
            )}</strong></li>
          </ul>
        </div>
      </body>
      </html>
    `;

    const newTab = window.open();
    newTab.document.open();
    newTab.document.write(reportHTML);
    newTab.document.close();
  };

  const handleGeneratePdf = () => {
    if (rows.length === 0) {
      alert('There is no data to generate a report.');
      return;
    }
    const doc = new jsPDF();
    const tableColumn = ['Description', 'Cost'];
    const tableRows = [];
    rows.forEach((row) => {
      const rowData = [row.description, `$${row.cost.toFixed(2)}`];
      tableRows.push(rowData);
    });
    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    const filename = `data_report_${timestamp}.pdf`;
    doc.text('Data Report', 14, 15);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save(filename);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <main className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Interactive Data Management Tool
          </h1>
          <p className="mt-2 text-slate-600">
            A tool for dynamic data entry, visualization, and reporting.
          </p>
        </header>

        <section className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <ActionControls
            onGenerateAudit={handleGenerateAudit}
            onGeneratePdf={handleGeneratePdf}
          />
        </section>

        <section className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-slate-700">
            Data Visualization
          </h2>
          <ChartControls
            currentType={chartType}
            onTypeChange={setChartType}
          />
          <ChartComponent rows={rows} type={chartType} />
        </section>

        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-slate-700">
            Data Entries
          </h2>
          <DataTable
            rows={rows}
            onAddNewRow={handleAddNewRow}
            onUpdateRow={handleUpdateRow}
            onProcessFile={handleProcessFile}
          />
        </section>
      </main>
    </div>
  );
}

export default App;