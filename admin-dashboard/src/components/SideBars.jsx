import React from 'react';
import './sideBar.css';
import Papa from 'papaparse';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase'; // Import Firestore DB from firebase.jsx

function SideBars() {
    const handleCSVUpload = (e) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.csv';

        fileInput.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const csvData = e.target.result;

                    // Parse CSV data using PapaParse
                    Papa.parse(csvData, {
                        complete: async (result) => {
                            const parsedData = result.data.map((row, index) => ({
                                country: row[0]?.trim() || "",   // Default to an empty string if missing
                                code: row[1]?.trim() || "",
                                year: row[2] ? new Date(row[2].split('/').reverse().join('-')) : null, // Parse date if valid
                                prevalence: row[3] ? parseFloat(row[3]) : null, // Parse prevalence if valid
                                continent: row[4]?.trim() || "",
                            }));

                            // Upload all data to Firestore
                            await uploadToFirestore(parsedData);
                        },
                        header: false, // Assuming no headers in the CSV
                        skipEmptyLines: true,
                    });
                };
                reader.readAsText(file);
            }
        };
        fileInput.click();
    };

    const uploadToFirestore = async (data) => {
        try {
            const carsCollection = collection(db, "cars"); // Reference to the Firestore collection
            const uploadPromises = data.map(car => addDoc(carsCollection, car)); // Upload all rows
            await Promise.all(uploadPromises); // Wait for all rows to be uploaded
            alert('CSV uploaded successfully!');
            console.log('CSV data uploaded to Firestore:', data);
        } catch (error) {
            alert('Error uploading CSV to Firestore: ' + error.message);
            console.error('Error:', error);
        }
    };

    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#components-nav" href="./linechartpage">
                        <i className="bi bi-menu-button-wide"></i>
                        <span>Line Graph</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#forms-nav" href="./donutpiepage">
                        <i className="bi bi-journal-text"></i>
                        <span>Donut Chart and Pie Graph</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#forms-nav" href="./choroplethmappage">
                        <i className="bi bi-journal-text"></i>
                        <span>Choropleth Map</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#forms-nav" href="./histogrampage">
                        <i className="bi bi-journal-text"></i>
                        <span>Prevalence Histogram</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed"
                        data-bs-target="#tables-nav"
                        data-bs-toggle="collapse"
                        href="#"
                    >
                        <i className="bi bi-layout-text-window-reverse"></i>
                        <span>Manage Data</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="tables-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="/car-lists">
                                <i className="bi bi-circle"></i>
                                <span>Data Lists</span>
                            </a>
                        </li>
                        <li>
                            <a href="/edit-car">
                                <i className="bi bi-circle"></i>
                                <span>Edit Data</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <button className="nav-link collapsed" onClick={handleCSVUpload}>
                        <i className="bi bi-file-earmark-csv"></i>
                        <span>Upload CSV</span>
                    </button>
                </li>
            </ul>
        </aside>
    );
}

export default SideBars;
