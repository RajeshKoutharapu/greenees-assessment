import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from '../../../allContexts/context'; 
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tab1.css";
import axios from "axios";

const Tab1 = () => {
  const { formData, setFormData } = useFormContext();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const standardsTableRef = useRef(null);
  const resolutionsTableRef = useRef(null);
  const samplesTableRef = useRef(null);

  // Initialize state from context
useEffect(() => {
  setFormData((prev) => {
    if (
      prev.standardsData &&
      prev.resolutionsData &&
      prev.samplesData
    ) {
      return prev; // No change, so skip re-render
    }

    return {
      ...prev,
      standardsData: prev.standardsData || [],
      resolutionsData: prev.resolutionsData || [],
      samplesData: prev.samplesData || [],
    };
  });
  // run only on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  const handleTitleChange = (e) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleStandardsChange = (e) => {
    const newRows = Number(e.target.value);
    setFormData((prev) => ({
      ...prev,
      standardsRows: newRows,
      standardsData: Array.from({ length: newRows }, (_, i) => prev.standardsData[i] || { weight: '', volume: '', filtration: '' }),
    }));
  };

  const handleResolutionsChange = (e) => {
    const newRows = Number(e.target.value);
    setFormData((prev) => ({
      ...prev,
      resolutionsRows: newRows,
      resolutionsData: Array.from({ length: newRows }, (_, i) => prev.resolutionsData[i] || { weight: '', volume: '', filtration: '' }),
    }));
  };

  const handleSamplesChange = (e) => {
    const newRows = Number(e.target.value);
    setFormData((prev) => ({
      ...prev,
      samplesRows: newRows,
      samplesData: Array.from({ length: newRows }, (_, i) => prev.samplesData[i] || { weight: '', volume: '', filtration: '' }),
    }));
  };

  const openGuide = () => setShowModal(true);
  const closeGuide = () => setShowModal(false);

  const generateTable = (rows, ref, data, setData) => (
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
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Weight in mL or g"
                value={data[i]?.weight || ""}
                onChange={(e) => {
                  const newData = [...data];
                  newData[i] = { ...newData[i], weight: e.target.value };
                  setData(newData);
                }}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Volume of solution consumed in mL"
                value={data[i]?.volume || ""}
                onChange={(e) => {
                  const newData = [...data];
                  newData[i] = { ...newData[i], volume: e.target.value };
                  setData(newData);
                }}
              />
            </td>
            <td>
              <select
                className="form-select"
                value={data[i]?.filtration || ""}
                onChange={(e) => {
                  const newData = [...data];
                  newData[i] = { ...newData[i], filtration: e.target.value };
                  setData(newData);
                }}
              >
                <option value="">Select Filtration</option>
                 <option value="None">None</option>
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
    if (!formData.title) {
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

    // Update formData with the extracted data
    setFormData((prev) => ({
      ...prev,
      standardsData,
      resolutionsData,
      samplesData,
    }));

    const requestData = {
      title: formData.title,
      standards: standardsData,
      resolutions: resolutionsData,
      samples: samplesData,
    };

    try {
      console.log("JSON Data to be sent:", JSON.stringify(requestData, null, 2));
      await axios.post("http://localhost:8080/api/tab1-data", requestData);
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    navigate("/dashboard/tab2");
  };

  return (<div className="container mt-5 tab1-container">
  <div className="card shadow-sm border-0 mb-4">
    <div className="card-body">
      <h3 className="mb-4 fw-bold text-primary">🧪 Title & Preparations</h3>

      <div className="mb-3">
        <label className="form-label fw-semibold">Name/Title</label>
        <input
          type="text"
          className="form-control rounded-pill"
          placeholder="Enter title here..."
          value={formData.title}
          onChange={handleTitleChange}
          required
        />
      </div>

      {/* Standards Section */}
      <div className="mb-3">
        <label className="form-label fw-semibold">No. of Standards/Ref</label>
        <input
          type="number"
          className="form-control rounded-pill"
          min="1"
          placeholder="Enter number of rows"
          value={formData.standardsRows}
          onChange={handleStandardsChange}
          required
        />
      </div>
      {formData.standardsRows > 0 && (
        <div className="table-responsive">{generateTable(formData.standardsRows, standardsTableRef, formData.standardsData, (data) => setFormData((prev) => ({ ...prev, standardsData: data })))}</div>
      )}

      {/* Resolutions Section */}
      <div className="mb-3">
        <label className="form-label fw-semibold">No. of Resolution/SST/Other Solution</label>
        <input
          type="number"
          className="form-control rounded-pill"
          min="1"
          placeholder="Enter number of rows"
          value={formData.resolutionsRows}
          onChange={handleResolutionsChange}
          required
        />
      </div>
      {formData.resolutionsRows > 0 && (
        <div className="table-responsive">{generateTable(formData.resolutionsRows, resolutionsTableRef, formData.resolutionsData, (data) => setFormData((prev) => ({ ...prev, resolutionsData: data })))}</div>
      )}

      {/* Samples Section */}
      <div className="mb-3">
        <label className="form-label fw-semibold">No. of Test Samples Prepared</label>
        <input
          type="number"
          className="form-control rounded-pill"
          min="1"
          placeholder="Enter number of rows"
          value={formData.samplesRows}
          onChange={handleSamplesChange}
        />
      </div>
      {formData.samplesRows > 0 && (
        <div className="table-responsive">{generateTable(formData.samplesRows, samplesTableRef, formData.samplesData, (data) => setFormData((prev) => ({ ...prev, samplesData: data })))}</div>
      )}

      {/* Footer Actions */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary rounded-pill" onClick={openGuide}>
          📘 Filtration Guide
        </button>
        <button className="btn btn-primary rounded-pill px-4" onClick={handleSubmit}>
          Next ➡️
        </button>
      </div>
    </div>
  </div>

  {/* Modal */}
  <Modal
    isOpen={showModal}
    closeModal={closeGuide}
    title="Guide Information"
    content={
      <div>
        <h5>None:</h5><p>No filtration</p>
        <h5>Sedimentation:</h5><p>Let particles settle naturally and use clear solution.</p>
        <h5>Centrifuge:</h5><p>Use centrifuge to clarify.</p>
        <h5>Membrane filtration:</h5><p>Use membrane to filter particles.</p>
        <h5>Centrifuge + filtration:</h5><p>Combine both methods.</p>
      </div>
    }
  />
</div>

  );
};

export default Tab1;
