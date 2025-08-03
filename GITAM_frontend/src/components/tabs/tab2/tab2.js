import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import { useFormContext } from '../../../allContexts/context'; // Ensure this is the correct path

import './tab2.css';

const Tab2 = () => {
  const { formData, setFormData } = useFormContext(); // Get formData and setFormData from context

  // Initialize state from context or default values
  
  const [generalInstrumentRows, setGeneralInstrumentRows] = useState(formData.generalInstrumentRows || 0);
  const [mainInstrumentsCount, setMainInstrumentsCount] = useState(formData.mainInstrumentsCount || 0);
  const [generalInstrumentData, setGeneralInstrumentData] = useState(formData.generalInstrumentData || [
    { instrument: '', time: '' },
  ]);
  
  const [mainInstrumentData, setMainInstrumentData] = useState(formData.mainInstrumentData || []);
  const [mainInstrumentTables, setMainInstrumentTables] = useState(formData.mainInstrumentTables || {});
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const instrumentTables = {
    'Automic absorption spectroscopy': 'OtherInstruments',
    'CE': 'OtherInstruments',
    'CE-MS': 'OtherInstruments',
    'Dissolution': 'Dissolution',
    'FT-IR': 'IR',
    'GC': 'GC',
    'GC-MS': 'GC_MS',
    'HPLC': 'HPLC',
    'HPLC-Prep': 'OtherInstruments',
    'ICP-MS': 'OtherInstruments',
    'ICP-OES': 'OtherInstruments',
    'LC-MS': 'LC_MS',
    'Nano Spectrophotometer': 'OtherInstruments',
    'NMR': 'NMR',
    'Portable CE': 'OtherInstruments',
    'Potentiometry': 'OtherInstruments',
    'Raman Spectrometer': 'OtherInstruments',
    'SFC': 'OtherInstruments',
    'SFC-Prep': 'OtherInstruments',
    'Single Quadrupole GC-MS': 'OtherInstruments',
    'TOC Analyzer': 'OtherInstruments',
    'Triple Quadrupole GC/MS': 'OtherInstruments',
    'Triple Quadrupole LC/MS system': 'OtherInstruments',
    'UV-Vis Spectrophotometer': 'UV',
    'UHPLC': 'UHPLC',
    'UPLC': 'UPLC',
    'XRD Diffractometer': 'OtherInstruments',
    'XRF-Spectrometer': 'OtherInstruments',
  };

  // Update context whenever the component mounts or state changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev, // Preserve existing formData
      generalInstrumentRows,
      mainInstrumentsCount,
      generalInstrumentData,
      mainInstrumentData,
      mainInstrumentTables,
    }));
  }, [generalInstrumentRows, mainInstrumentsCount, generalInstrumentData, mainInstrumentData, mainInstrumentTables, setFormData]);

  // Handle General Instruments Change
  const handleGeneralInstrumentChange = (index, field, value) => {
    const updatedData = [...generalInstrumentData];
    updatedData[index] = {
      ...updatedData[index], // Preserve existing fields
      [field]: value, // Update the specific field (instrument or time)
    };
    setGeneralInstrumentData(updatedData);
  };

  // Handle Main Instrument Selection
  const handleMainInstrumentChange = (index, value) => {
    const updatedData = [...mainInstrumentData];
    updatedData[index] = value;
    setMainInstrumentData(updatedData);

    // Initialize instrument-specific data
    setMainInstrumentTables((prev) => ({
      ...prev,
      [index]: {},
    }));
  };

  // Handle input changes in specific tables
  const handleTableInputChange = (instrumentIndex, field, value) => {
    setMainInstrumentTables((prev) => ({
      ...prev,
      [instrumentIndex]: {
        ...prev[instrumentIndex],
        [field]: value,
      },
    }));
  };

  const generateGeneralInstrumentTable = (numRows) => {
    return Array.from({ length: numRows }, (_, i) => (
      <tr key={i}>
        <td>
          <select
            className="form-select"
            value={generalInstrumentData[i]?.instrument || ''} // Set value from state
            onChange={(e) => handleGeneralInstrumentChange(i, 'instrument', e.target.value)}
          >
          <option value="">select option</option>
            <option value="(-)40°C freezer">(-)40°C freezer</option>
            <option value="Amino Acid Analyzer">Amino Acid Analyzer</option>
            <option value="Alloy Analyzer">Alloy Analyzer</option>
            <option value="Autoclave">Autoclave</option>
            <option value="Balance">Balance</option>
            <option value="Centrifuges">Centrifuges</option>
            <option value="Chemiluminescent Immunoassay Analyzer">Chemiluminescent Immunoassay Analyzer</option>
            <option value="Cold Centrifuges">Cold Centrifuges</option>
            <option value="Conductavity meter">Conductavity meter</option>
            <option value="Dehumidifier">Dehumidifier</option>
            <option value="Differential Scanning Calorimeter">Differential Scanning Calorimeter</option>
            <option value="Disintegration Tester">Disintegration Tester</option>
            <option value="Fume hood">Fume hood</option>
            <option value="Flame Photometer">Flame Photometer</option>
            <option value="Flammability Tester">Flammability Tester</option>
            <option value="Flow Meter and Electronic Leak Detector">Flow Meter and Electronic Leak Detector</option>
            <option value="Fume hood">Fume hood</option>
            <option value="Gas laser">Gas laser</option>
            <option value="Gel Strength Test System">Gel Strength Test System</option>
            <option value="Homogenizer">Homogenizer</option>
            <option value="Hot air oven">Hot air oven</option>
            <option value="Hot plate with stirrer">Hot plate with stirrer</option>
            <option value="Hybridization Oven">Hybridization Oven</option>
            <option value="IR Carbon and Sulphur Analyzer">IR Carbon and Sulphur Analyzer</option>
            <option value="Incubated and Refrigerated Benchtop Shaker">Incubated and Refrigerated Benchtop Shaker</option>
            <option value="Liquid Suction Filtration Vacuum Pump">Liquid Suction Filtration Vacuum Pump</option>
            <option value="Liquid nitrogen freezer">Liquid nitrogen freezer</option>
            <option value="Magnetic stirrer">Magnetic stirrer</option>
            <option value="Melting Point Apparatus">Melting Point Apparatus</option>
            <option value="Microscopes">Microscopes</option>
            <option value="Milk Analyzer">Milk Analyzer</option>
            <option value="Milk Fat Analyzer">Milk Fat Analyzer</option>
            <option value="Microwave Digestion System">Microwave Digestion System</option>
            <option value="Nucleic Acid Extraction System">Nucleic Acid Extraction System</option>
            <option value="Nucleic Acid Purification System">Nucleic Acid Purification System</option>
            <option value="Orbitol shaker">Orbitol shaker</option>
            <option value="Osmometer">Osmometer</option>
            <option value="Peristaltic Pump">Peristaltic Pump</option>
            <option value="pH meter">pH meter</option>
            <option value="Polarimeter">Polarimeter</option>
            <option value="Refrigerators">Refrigerators</option>
            <option value="Sample Concentrator">Sample Concentrator</option>
            <option value="Slide Dryer">Slide Dryer</option>
            <option value="Solutions Remediator">Solutions Remediator</option>
            <option value="Sonicator">Sonicator</option>
            <option value="Specific Gravity Tester">Specific Gravity Tester</option>
            <option value="Stroboscope">Stroboscope</option>
            <option value="Sulphur Content Tester">Sulphur Content Tester</option>
            <option value="Tablet Hardness Testers">Tablet Hardness Testers</option>
            <option value="Tap Density Tester">Tap Density Tester</option>
            <option value="Tissue Culture Hoods, UV light">Tissue Culture Hoods, UV light</option>
            <option value="Tube Roller Mixer">Tube Roller Mixer</option>
            <option value="Ultra-Low Freezers">Ultra-Low Freezers</option>
            <option value="Ubbelohde Viscometer">Ubbelohde Viscometer</option>
            <option value="Vacuum Pump">Vacuum Pump</option>
            <option value="Vertical Laminar Flow Cabinet">Vertical Laminar Flow Cabinet</option>
            <option value="Vortex mixer">Vortex mixer</option>
            <option value="Water bath">Water bath</option>
            <option value="Water Bath Shakers">Water Bath Shakers</option>
          </select>
        </td>
        <td>
          <input
            type="number"
            className="form-control"
            placeholder="Enter time in mins"
            value={generalInstrumentData[i]?.time || ''} // Set value from state
            onChange={(e) => handleGeneralInstrumentChange(i, 'time', e.target.value)}
          />
        </td>
      </tr>
    ));
  };

  const generateMainInstrumentDropdowns = (numDropdowns) => {
    return Array.from({ length: numDropdowns }, (_, i) => (
      <div key={i} className="mb-3">
        <label htmlFor={`main-instrument-${i}`} className="form-label">Main Instrument {i + 1}:</label>
        <select
          id={`main-instrument-${i}`}
          className="form-select"
          value={mainInstrumentData[i] || ''} // Set value from state
          onChange={(e) => handleMainInstrumentChange(i, e.target.value)}
        >
          <option value="">Select Main Instrument</option>
          {Object.keys(instrumentTables).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        {mainInstrumentData[i] && instrumentTables[mainInstrumentData[i]] && (
          <div className="table-section mt-3">
            <h5>{instrumentTables[mainInstrumentData[i]]} Table</h5>
            {renderInstrumentTable(i, instrumentTables[mainInstrumentData[i]])}
          </div>
        )}
      </div>
    ));
  };

  const renderInstrumentTable = (instrumentIndex, tableName) => {
    const tableStructure = {
      HPLC: [
        { label: 'Column length in mm', field: 'column_length' },
        { label: 'Column temperature °C', field: 'column_temp' },
        { label: 'Sample temperature °C', field: 'sample_temp' },
        { label: 'Flow rate (mL/min)', field: 'flow_rate' },
        { label: 'Run time (mins)', field: 'run_time' },
        { label: 'Number of injections', field: 'num_injections' },
      ],
      LC_MS: [
        { label: 'Column length in mm', field: 'column_length' },
        { label: 'Column temperature °C', field: 'column_temp' },
        { label: 'Sample temperature °C', field: 'sample_temp' },
        { label: 'Flow rate (mL/min)', field: 'flow_rate' },
        { label: 'Run time (mins)', field: 'run_time' },
        { label: 'Number of injections', field: 'num_injections' },
      ],
      NMR: [
        { label: 'Time for scanning (1 sample in mins)', field: 'scan_time' },
        { label: 'Number of scans', field: 'num_scans' },
      ],
      GC: [
        { label: 'Column length in mm', field: 'column_length' },
        { label: 'Column oven temperature °C', field: 'column_temp' },
        { label: 'Sample oven temperature °C', field: 'sample_temp' },
        { label: 'Carrier gas Flow rate (mL/min)', field: 'flow_rate' },
        { label: 'Run time (mins)', field: 'run_time' },
        { label: 'Number of injections', field: 'num_injections' },
      ],
      IR: [
        { label: 'Time for scanning (1 sample in mins)', field: 'scan_time' },
        { label: 'Number of scans', field: 'num_scans' },
      ],
      UV: [
        { label: 'Time for scanning (1 sample in mins)', field: 'scan_time' },
        { label: 'Number of scans', field: 'num_scans' },
      ],
      UPLC: [
        { label: 'Column length in mm', field: 'column_length' },
        { label: 'Column temperature °C', field: 'column_temp' },
        { label: 'Sample temperature °C', field: 'sample_temp' },
        { label: 'Flow rate (mL/min)', field: 'flow_rate' },
        { label: 'Run time (mins)', field: 'run_time' },
        { label: 'Number of injections', field: 'num_injections' },
      ],
      UHPLC: [
        { label: 'Column length in mm', field: 'column_length' },
        { label: 'Column temperature °C', field: 'column_temp' },
        { label: 'Sample temperature °C', field: 'sample_temp' },
        { label: 'Flow rate (mL/min)', field: 'flow_rate' },
        { label: 'Run time (mins)', field: 'run_time' },
        { label: 'Number of injections', field: 'num_injections' },
      ],
      GC_MS: [
        { label: 'Column length in mm', field: 'column_length' },
        { label: 'Column oven temperature °C', field: 'column_temp' },
        { label: 'Sample oven temperature °C', field: 'sample_temp' },
        { label: 'Carrier gas Flow rate (mL/min)', field: 'flow_rate' },
        { label: 'Run time (mins)', field: 'run_time' },
        { label: 'Number of injections', field: 'num_injections' },
      ],
      FT_IR: [
        { label: 'Time for scanning (1 sample in mins)', field: 'scan_time' },
        { label: 'Number of scans', field: 'num_scans' },
      ],
      Dissolution: [
        { label: 'Media Volume used for 6 bowls', field: 'Media Volume used for 6 bowls' },
        { label: 'Time in mins', field: 'Time in mins' },
      ],
      OtherInstruments: [
        { label: 'Time for of study (mins)', field: 'Time for of study' },
        { label: 'Number of samles studied', field: 'Number of samles studied' },
      ],
    };

    if (!tableStructure[tableName]) {
      return <p>No configuration available for {tableName}.</p>;
    }

    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>{tableName} Parameters</th>
            <th>Operating conditions</th>
          </tr>
        </thead>
        <tbody>
          {tableStructure[tableName].map((row) => (
            <tr key={row.field}>
              <td>{row.label}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={mainInstrumentTables[instrumentIndex]?.[row.field] || ''}
                  onChange={(e) =>
                    handleTableInputChange(instrumentIndex, row.field, e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleSubmit = async () => {
    try {
      // Validation for General Instruments
      if (generalInstrumentRows === 0 && mainInstrumentsCount === 0) {
        alert("Please enter the number of general instruments or main instruments or both.");
        return;
      }

      // Validate General Instruments Data
      if (generalInstrumentRows > 0) {
        const isGeneralInstrumentDataValid = generalInstrumentData.every(
          (row) => row.instrument && row.time
        );
        if (!isGeneralInstrumentDataValid) {
          alert("Please fill out all fields for general instruments.");
          return;
        }
      }

      // Validate Main Instruments
      if (mainInstrumentsCount > 0) {
        // Ensure all main instrument dropdowns have a selected value
        if (!mainInstrumentData.every((instrument) => instrument)) {
          alert("Please select a main instrument for all dropdowns.");
          return;
        }

        // Validate each main instrument's table fields
        const isMainInstrumentTablesValid = mainInstrumentData.every((instrument, index) => {
          const tableData = mainInstrumentTables[index] || {}; // Ensure it's an object

          // Define the required fields for each instrument type
          const tableStructure = {
            HPLC: ["column_length", "column_temp", "sample_temp", "flow_rate", "run_time", "num_injections"],
            LC_MS: ["column_length", "column_temp", "sample_temp", "flow_rate", "run_time", "num_injections"],
            NMR: ["scan_time", "num_scans"],
            GC: ["column_length", "column_temp", "sample_temp", "flow_rate", "run_time", "num_injections"],
            IR: ["scan_time", "num_scans"],
            UV: ["scan_time", "num_scans"],
            UPLC: ["column_length", "column_temp", "sample_temp", "flow_rate", "run_time", "num_injections"],
            UHPLC: ["column_length", "column_temp", "sample_temp", "flow_rate", "run_time", "num_injections"],
            GC_MS: ["column_length", "column_temp", "sample_temp", "flow_rate", "run_time", "num_injections"],
            FT_IR: ["scan_time", "num_scans"],
            Dissolution: ["Media Volume used for 6 bowls", "Time in mins"],
            OtherInstruments: ["Time for of study", "Number of samles studied"],
          };

          // Retrieve required fields for the selected instrument
          const requiredFields = tableStructure[instrument] || [];

          // Ensure all required fields have a non-empty value
          return requiredFields.every((field) => tableData[field]?.trim());
        });

        if (!isMainInstrumentTablesValid) {
          alert("Please fill out all required fields in the main instrument tables.");
          return;
        }
      }

      // Prepare request data
      const requestData = {
        generalInstruments: generalInstrumentData, // General instruments data
        mainInstruments: mainInstrumentData.map((instrument, index) => ({
          instrument,
          data: mainInstrumentTables[index] || {},
        })),
      };

      console.log("Request Data:", JSON.stringify(requestData, null, 2)); // Debugging step

      // API Request
      const response = await fetch("http://localhost:8080/api/tab2-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      console.log("Data submitted successfully!");
      navigate("/dashboard/Chemicals_Reagents_Solvents_Gas"); // Navigate only if submission is successful
    } catch (error) {
      console.error("Submission Error:", error);
      alert("An error occurred while submitting the data. Please try again.");
    }
  };

  return (
    <div className="container mt-4 ">
      <h3 className='text-primary'>🧪 Instruments/Equipments</h3>

      <div className="mb-3">
        <label>Number of General Instruments Used:</label>
        <input
          type="number"
          className="form-control"
          min="0"
          value={generalInstrumentRows} // Set value from state
          onChange={(e) => setGeneralInstrumentRows(Number(e.target.value))}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>General Instruments</th>
            <th>Used Time in minutes</th>
          </tr>
        </thead>
        <tbody>{generateGeneralInstrumentTable(generalInstrumentRows)}</tbody>
      </table>

      <div className="mb-3">
        <label>Number of Main Instruments Used:</label>
        <input
          type="number"
          className="form-control"
          min="0"
          value={mainInstrumentsCount} // Set value from state
          onChange={(e) => setMainInstrumentsCount(Number(e.target.value))}
        />
      </div>
        
      {generateMainInstrumentDropdowns(mainInstrumentsCount)}

  <div className="alert alert-info" role="alert">
    <strong>Note:</strong> Note: Except carrier gas flow rate, rest of the gasses flow rate and information mentioned in Chemicals/Reagents/Gases Section.

  </div>




      <footer>
        <button onClick={() => navigate('/dashboard/Title_Preparations')}>Back</button>
        <button   onClick={handleSubmit}> Next ➡️</button>
      </footer>
    </div>
  );
};

export default Tab2;