import React, { useState } from 'react';
import DataTable from './components/DataTable';

function App() {
  const [rows, setRows] = useState([]);

  const handleAddNewRow = () => {
    const newRow = {
      id: crypto.randomUUID(),
      description: '',
      cost: 0,
      uploadedFile: null,
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
          {/* ChartComponent will go here */}
        </section>

        <section className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Data Entries</h2>
          <DataTable
            rows={rows}
            onAddNewRow={handleAddNewRow}
            onUpdateRow={handleUpdateRow}
          />
        </section>
      </main>
    </div>
  );
}

export default App;