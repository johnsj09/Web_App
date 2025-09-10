import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import DataTable from './components/DataTable';
import ChartComponent from './components/ChartComponent';

// Corrected Line: Pointing to the .mjs file.
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

function App() {
  const [rows, setRows] = useState([]);

  const handleAddNewRow = () => {
    const newRow = {
      id: crypto.randomUUID(),
      description: '',
      cost: 0,
      uploadedFile: null,
      isProcessing: false,
    };
    setRows(prevRows => [...prevRows, newRow]);
  };

  const handleUpdateRow = (id, updatedData) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.id === id ? { ...row, ...updatedData } : row
      )
    );
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
        handleUpdateRow(rowId, { description: 'PDF conversion failed', isProcessing: false });
        return;
      }
    }

    const worker = await createWorker('eng');
    try {
      const { data: { text } } = await worker.recognize(imageForOcr);
      await worker.terminate();

      const descriptionMatch = text.match(/Item:\s*(.*)/i);
      const costMatch = text.match(/Cost:\s*\$?(\d+\.?\d*)/i);

      const extractedData = {
        description: descriptionMatch ? descriptionMatch[1].trim() : 'Could not read description',
        cost: costMatch ? parseFloat(costMatch[1]) : 0,
      };

      handleUpdateRow(rowId, { ...extractedData, isProcessing: false });
    } catch (error) {
      console.error('Error processing file:', error);
      if (worker) {
        await worker.terminate();
      }
      handleUpdateRow(rowId, { description: 'OCR failed', isProcessing: false });
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      <main className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Interactive Data Management Tool
          </h1>
          <p className="text-slate-600 mt-2">
            A tool for dynamic data entry, visualization, and reporting.
          </p>
        </header>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Data Visualization</h2>
          <ChartComponent rows={rows} />
        </section>

        <section className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Data Entries</h2>
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