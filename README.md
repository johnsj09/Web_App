Interactive Data Management Tool
Project for: Web Developer Test Specification
Version: 1.0 (Final Submission)
Submission Date: 10 September 2025
Developer: Jefri Thimoathi Johnson

1. Project Overview
This is a fully client-side, single-page web application developed to meet the requirements of the Web Developer Test Specification. It allows users to dynamically add and manage data entries, visualize that data in real-time with multiple chart types, automatically populate data from uploaded documents using Optical Character Recognition (OCR), and generate summary reports.

The application has been built with a focus on a clean, modern user interface, robust error handling, and a polished user experience with smooth animations and transitions.

2. Project Setup & Installation
To run this project, you will need to have Node.js and npm installed on your system.

Step 1: Install Dependencies
Navigate to the project's root directory in your terminal and run the following command to install all the required libraries:

npm install

This will install React, Tailwind CSS, and all other necessary packages.

Step 2: Start the Development Server
Once the installation is complete, run the following command to start the application:

npm run dev

The terminal will provide you with a local URL (usually http://localhost:5173). Please open this URL in a modern web browser like Google Chrome or Firefox to view the application.

3. Step-by-Step Feature Walkthrough
To facilitate a thorough review, please follow these steps to test the application's core features. Two test files are required: one correctly formatted and one incorrectly formatted.

Required Test Files:

Test_File_EIR001.pdf (or image): A document containing the text Item: [Description] and Cost: [Number].

Test_File_incorrect.pdf (or image): A document that is missing one or both of the required fields.

Part A: Data Entry and Visualization
Add Data Manually:

Click the "Add New Line" button. Observe the smooth animation as the new row appears.

In the "Description" field, type Manual Entry 1.

In the "Cost" field, type 150.99.

Observe the bar chart on the right update in real-time to display this new data point.

Add a Second Data Point:

Click "Add New Line" again.

Enter Manual Entry 2 for the description and 85.50 for the cost.

The chart will now display two bars, representing both data entries.

Switch Chart Types:

Using the controls above the chart, click "Line" and then "Pie".

Observe how the data visualization smoothly transitions between the different chart formats.

Part B: OCR and Error Handling
Test Successful OCR:

Click "Add New Line" to create a fresh row.

In this new row, click the "Upload File" button.

Select your correctly formatted test document (test_invoice_correct.pdf).

Observe the "Processing..." indicator, followed by the "Description" and "Cost" fields being automatically populated with the data extracted from the document. The chart will also update.

Test OCR Error Handling:

Click "Add New Line" one more time.

Click the "Upload File" button in this new row.

Select your incorrectly formatted test document.

Observe the "Processing..." indicator, followed by an alert box appearing with a user-friendly error message stating the file format is incorrect.

After you close the alert, the entire row will be automatically removed from the table, preventing data corruption.

Part C: Reporting Features
Generate Audit Summary:

With data present in the table, click the "Produce Audit Summary" button.

A new browser tab will open, displaying a clean and formatted summary of the data (Total Entries, Total Cost, Average Cost).

Generate PDF Report:

Click the "Generate PDF Report" button.

A file download prompt will appear for a PDF named data_report_[timestamp].pdf.

Open the downloaded file to verify that it contains a clean table with the data from your entries.

4. Technology Stack
Front-End Library: React

Build Tool: Vite

Styling: Tailwind CSS

Animations: Framer Motion

Icons: Heroicons

Data Visualization: Chart.js

OCR Engine: Tesseract.js

PDF Handling: pdfjs-dist (for reading), jsPDF & jspdf-autotable (for writing)

Code Formatting: Prettier

5. Accompanying Documents
This project submission is accompanied by the following documents for a complete overview of the development process:

Functional Requirement Specifications FRS.docx

Functional Design Specification FDS.docx

QC Test Plan.md