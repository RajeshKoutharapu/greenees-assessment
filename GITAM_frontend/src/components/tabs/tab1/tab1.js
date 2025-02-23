import React, { useContext,useState, useRef } from 'react';
// import { FormContext } from '../../FormContext'; // Import Context

import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tab1.css';
import axios from 'axios';

const Tab1 = () => {
  const [showModal, setShowModal] = useState(false);
  const [standardsRows, setStandardsRows] = useState(0);
  const [resolutionsRows, setResolutionsRows] = useState(0);
  const [samplesRows, setSamplesRows] = useState(0);
  const [title, setTitle] = useState('');
  // const { formData, setFormData } = useContext(FormContext);

  const navigate = useNavigate();
  const standardsTableRef = useRef(null);
  const resolutionsTableRef = useRef(null);
  const samplesTableRef = useRef(null);

  const handleStandardsChange = (e) => setStandardsRows(Number(e.target.value));
  const handleResolutionsChange = (e) => setResolutionsRows(Number(e.target.value));
  const handleSamplesChange = (e) => setSamplesRows(Number(e.target.value));
  const handleTitleChange = (e) => setTitle(e.target.value);

  const openGuide = () => setShowModal(true);
  const closeGuide = () => setShowModal(false);

  const generateTable = (rows, ref) => (
    <table ref={ref} className="table table-bordered">
      <thead>
        <tr>
          <th>Weight in mL or g</th>
          <th>Volume of solution consumed in mL</th>
          <th>Filtration</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i}>
            <td><input type="number" className="form-control" placeholder="Weight in mL or g" required /></td>
            <td><input type="number" className="form-control" placeholder="Volume of solution consumed in mL" /></td>
            <td>
              <select className="form-select">
                <option value="">Select Filtration</option>
                <option value="Sedimentation">Sedimentation</option>
                <option value="Centrifuge">Centrifuge</option>
                <option value="Membrane filtration">Membrane filtration</option>
                <option value="Centrifuge + filtration">Centrifuge + filtration</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const extractTableData = (tableRef) => {
    if (!tableRef.current) return [];
    return Array.from(tableRef.current.querySelectorAll("tbody tr")).map((row) => {
      const inputs = row.querySelectorAll("input, select");
      return {
        weight: inputs[0]?.value || "",
        volume: inputs[1]?.value || "",
        filtration: inputs[2]?.value || "",
      };
    });
  };

  const handleSubmit = async () => {
    if (!title) {
      alert("Please enter a title.");
      return;
    }

    const standardsData = extractTableData(standardsTableRef);
    const resolutionsData = extractTableData(resolutionsTableRef);
    const samplesData = extractTableData(samplesTableRef);

    if ([...standardsData, ...resolutionsData, ...samplesData].some((row) => !row.weight || !row.volume || !row.filtration)) {
      alert("Please fill out all required fields in the table.");
      return;
    }

    const requestData = { title, standards: standardsData, resolutions: resolutionsData, samples: samplesData };

    try {
      console.log("JSON Data to be sent:", JSON.stringify(requestData, null, 2));
      axios.post("http://localhost:8080/api/tab1-data", requestData);
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    navigate('/dashboard/tab2');
  };

  return (
    <div className="container mt-4 tab1-container">
      <h3>Title & Preparations</h3>

      <div className="row mb-3">
        <label className="col-md-4 col-form-label">Name/Title:</label>
        <div className="col-md-8">
          <input type="text" className="form-control" placeholder="Enter title here..." value={title} onChange={handleTitleChange} required />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-md-4 col-form-label">No. of Standards/Ref:</label>
        <div className="col-md-8">
          <input type="number" className="form-control" min="1" placeholder="Enter number of rows" onChange={handleStandardsChange} required />
        </div>
      </div>
      {standardsRows > 0 && <div className="table-section mb-4">{generateTable(standardsRows, standardsTableRef)}</div>}

      <div className="row mb-3">
        <label className="col-md-4 col-form-label">No. of Resolution/SST/other solution:</label>
        <div className="col-md-8">
          <input type="number" className="form-control" min="1" placeholder="Enter number of rows" onChange={handleResolutionsChange} required />
        </div>
      </div>
      {resolutionsRows > 0 && <div className="table-section mb-4">{generateTable(resolutionsRows, resolutionsTableRef)}</div>}

      <div className="row mb-3">
        <label className="col-md-4 col-form-label">No. of Test Samples Prepared:</label>
        <div className="col-md-8">
          <input type="number" className="form-control" min="1" placeholder="Enter number of rows" onChange={handleSamplesChange} />
        </div>
      </div>
      {samplesRows > 0 && <div className="table-section mb-4">{generateTable(samplesRows, samplesTableRef)}</div>}

      <footer className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={openGuide}>Guide 1</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Next</button>
      </footer>

      <Modal isOpen={showModal} closeModal={closeGuide} title="Guide Information" content={
        <div>
          <h5>Case-1: No preparation/ No Filtration</h5><p>This case involves no preparation or filtration.</p>
          <h5>Case-2: Sample preparation done with dilution or simple preparation</h5><p>Examples include diluting the samples or dissolving samples in a solution.</p>
          <h5>Case-3: Samples are prepared by using simple techniques</h5><p>Examples include sonication, vortexing, and centrifugation.</p>
          <h5>Case-4: Samples are prepared using simple techniques with thermal treatments</h5><p>Involves heating, cooling, and temperature control.</p>
          <h5>Case-5: Samples prepared using high-end techniques with heavy processes</h5><p>Includes solid-phase extraction, chemical reactions, and other complex methods.</p>
        </div>
      } />
    </div>
  );
};

export default Tab1;
