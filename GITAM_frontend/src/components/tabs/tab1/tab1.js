import React, { useState } from 'react';
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

  const navigate = useNavigate();

  const handleStandardsChange = (e) => setStandardsRows(e.target.value);
  const handleResolutionsChange = (e) => setResolutionsRows(e.target.value);
  const handleSamplesChange = (e) => setSamplesRows(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);

  const openGuide = () => setShowModal(true);
  const closeGuide = () => setShowModal(false);

  const generateTable = (rows) => {
    return Array.from({ length: rows }, (_, i) => (
      <tr key={i}>
        <td><input type="text" className="form-control" placeholder="Weight in mL or g" /></td>
        <td><input type="text" className="form-control" placeholder="Volume of solution consumed in mL" /></td>
        <td>
          <select className="form-select">
            <option value="None">None</option>
            <option value="Sedimentation">Sedimentation</option>
            <option value="Centrifuge">Centrifuge</option>
            <option value="Membrane filtration">Membrane filtration</option>
            <option value="Centrifuge + filtration">Centrifuge + filtration</option>
          </select>
        </td>
      </tr>
    ));
  };

  const handleSubmit = async () => {
    const standardsData = Array.from(document.querySelectorAll("#standardsTable tbody tr")).map((row) => {
      const inputs = row.querySelectorAll("input, select");
      return {
        weight: inputs[0]?.value || "",
        volume: inputs[1]?.value || "",
        filtration: inputs[2]?.value || "",
      };  
    });

    const resolutionsData = Array.from(document.querySelectorAll("#resolutionsTable tbody tr")).map((row) => {
      const inputs = row.querySelectorAll("input, select");
      return {
        weight: inputs[0]?.value || "",
        volume: inputs[1]?.value || "",
        filtration: inputs[2]?.value || "",
      };
    });

    const samplesData = Array.from(document.querySelectorAll("#samplesTable tbody tr")).map((row) => {
      const inputs = row.querySelectorAll("input, select");
      return {
        weight: inputs[0]?.value || "",
        volume: inputs[1]?.value || "",
        filtration: inputs[2]?.value || "",
      };
    });

    const requestData = {
      title,
      standards: standardsData,
      resolutions: resolutionsData,
      samples: samplesData,
    };

    try {
      console.log("JSON Data to be sent:", JSON.stringify(requestData, null, 2));
      const response = await axios.post("http://localhost:8080/api/tab1-data", requestData);
      console.log("Response from server:", response.data);
      
    } catch (error) {
      console.error("Error submitting data:", error);
      
    }
    navigate('/dashboard/tab2');
  };

  return (
    <div className="container mt-4 tab1-container">
      <h3>Title & Preparations</h3>

      <div className="row mb-3">
        <label htmlFor="title" className="col-md-4 col-form-label">Name/Title:</label>
        <div className="col-md-8">
          <input type="text" className="form-control" id="title" placeholder="Enter title here..." value={title} onChange={handleTitleChange} />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="standards" className="col-md-4 col-form-label">No. of Standards/Ref:</label>
        <div className="col-md-8">
          <input type="number" className="form-control" id="standards" min="1" placeholder="Enter number of rows" onChange={handleStandardsChange} />
        </div>
      </div>
      {standardsRows > 0 && (
        <div className="table-section mb-4">
          <table id="standardsTable" className="table table-bordered">
            <thead>
              <tr>
                <th>Weight in mL or g</th>
                <th>Volume of solution consumed in mL</th>
                <th>Filtration</th>
              </tr>
            </thead>
            <tbody>
              {generateTable(standardsRows)}
            </tbody>
          </table>
        </div>
      )}

      <div className="row mb-3">
        <label htmlFor="resolutions" className="col-md-4 col-form-label">No. of Resolution/SST/other solution:</label>
        <div className="col-md-8">
          <input type="number" className="form-control" id="resolutions" min="1" placeholder="Enter number of rows" onChange={handleResolutionsChange} />
        </div>
      </div>
      {resolutionsRows > 0 && (
        <div className="table-section mb-4">
          <table id="resolutionsTable" className="table table-bordered">
            <thead>
              <tr>
                <th>Weight in mL or g</th>
                <th>Volume of solution consumed in mL</th>
                <th>Filtration</th>
              </tr>
            </thead>
            <tbody>
              {generateTable(resolutionsRows)}
            </tbody>
          </table>
        </div>
      )}

      <div className="row mb-3">
        <label htmlFor="samples" className="col-md-4 col-form-label">No. of Test Samples Prepared:</label>
        <div className="col-md-8">
          <input type="number" className="form-control" id="samples" min="1" placeholder="Enter number of rows" onChange={handleSamplesChange} />
        </div>
      </div>
      {samplesRows > 0 && (
        <div className="table-section mb-4">
          <table id="samplesTable" className="table table-bordered">
            <thead>
              <tr>
                <th>Weight in mL or g</th>
                <th>Volume of solution consumed in mL</th>
                <th>Filtration</th>
              </tr>
            </thead>
            <tbody>
              {generateTable(samplesRows)}
            </tbody>
          </table>
        </div>
      )}

      <footer className="d-flex justify-content-between">
      <button className="btn btn-secondary" onClick={openGuide}>Guide 1</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Next</button>
       
       {/*  <button className="btn btn-success" onClick={handleSubmit}>Submit</button> New Submit Button */}
      </footer>

      <Modal 
  isOpen={showModal} 
  closeModal={closeGuide} 
  title="Guide Information"
  content={
    <div>
      <h5>Case-1: No preparation/ No Filtration</h5>
      <p>This case involves no preparation or filtration.</p>

      <h5>Case-2: Sample preparation done with dilution or simple preparation</h5>
      <p>Examples include diluting the samples or dissolving samples in a solution.</p>

      <h5>Case-3: Samples are prepared by using simple techniques</h5>
      <p>Examples include using techniques like sonication, vortexing, and centrifugation.</p>

      <h5>Case-4: Samples are prepared by using simple techniques with thermal treatments</h5>
      <p>This involves heating, cooling, and maintaining the temperature in controlled conditions, often used with the techniques from Case-3.</p>

      <h5>Case-5: Samples are prepared by using high-end techniques with heavy processes</h5>
      <p>This includes methods like solid-phase extraction, chemical reactions, and other complex techniques.</p>
    </div>
  }
/>

    </div>
  );
};

export default Tab1;
