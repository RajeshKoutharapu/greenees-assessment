import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './tab3.css';
import Modal from '../../Modal/Modal';
import { useFormContext } from '../../../allContexts/context';

const Tab3 = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormContext();

  const [numRows1, setNumRows1] = useState(formData.numRows1 || 0);
  const [numRows2, setNumRows2] = useState(formData.numRows2 || 0);
  const [nfpaHealthData1, setNfpaHealthData1] = useState(formData.nfpaHealthData1 || []);
  const [nfpaFlammabilityData1, setNfpaFlammabilityData1] = useState(formData.nfpaFlammabilityData1 || []);
  const [physicalHazardData1, setPhysicalHazardData1] = useState(formData.physicalHazardData1 || []);
  const [nfpaHealthData2, setNfpaHealthData2] = useState(formData.nfpaHealthData2 || []);
  const [nfpaFlammabilityData2, setNfpaFlammabilityData2] = useState(formData.nfpaFlammabilityData2 || []);
  const [physicalHazardData2, setPhysicalHazardData2] = useState(formData.physicalHazardData2 || []);
  const [showGuideInfo, setShowGuideInfo] = useState(false);

  const openGuide1 = () => setShowGuideInfo(true);
  const closeGuide1 = () => setShowGuideInfo(false);
  const openGuide2 = () => window.open('/ChemicalReferenceTable.html', '_blank');

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      numRows1,
      numRows2,
      nfpaHealthData1,
      nfpaFlammabilityData1,
      physicalHazardData1,
      nfpaHealthData2,
      nfpaFlammabilityData2,
      physicalHazardData2,
    }));
  }, [
    numRows1, numRows2,
    nfpaHealthData1, nfpaFlammabilityData1, physicalHazardData1,
    nfpaHealthData2, nfpaFlammabilityData2, physicalHazardData2,
    setFormData
  ]);

  const handleInputChange = (e, setter, rowIndex, colIndex, tableType) => {
    const value = e.target.value;

    setter(prev => {
      const updated = [...prev];
      if (!updated[rowIndex]) updated[rowIndex] = [];
      updated[rowIndex][colIndex] = value;
      return updated;
    });

    if (colIndex === 0) {
      const syncName = (dataSetter) => {
        dataSetter(prev => {
          const updated = [...prev];
          if (!updated[rowIndex]) updated[rowIndex] = [];
          updated[rowIndex][0] = value;
          return updated;
        });
      };

      if (tableType === 'chemicals') {
        syncName(setNfpaHealthData1);
        syncName(setNfpaFlammabilityData1);
        syncName(setPhysicalHazardData1);
      } else if (tableType === 'gases') {
        syncName(setNfpaHealthData2);
        syncName(setNfpaFlammabilityData2);
        syncName(setPhysicalHazardData2);
      }
    }
  };

  const createTable = (title, headers, inputTypes, numRows, tableData, tableSetter, tableType, ...dropdownOptions) => (
    <table className="chemical-table">
      <thead>
        <tr><th colSpan={headers.length}><h3>{title}</h3></th></tr>
        <tr>{headers.map((header, idx) => <th key={idx}>{header}</th>)}</tr>
      </thead>
      <tbody>
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {inputTypes.map((type, colIndex) => (
              <td key={colIndex}>
                {type === 'input' ? (
                  <input
                    type="text"
                    value={tableData[rowIndex]?.[colIndex] || ''}
                    onChange={(e) => handleInputChange(e, tableSetter, rowIndex, colIndex, tableType)}
                  />
                ) : (
                  <select
                    value={tableData[rowIndex]?.[colIndex] || ''}
                    onChange={(e) => handleInputChange(e, tableSetter, rowIndex, colIndex, tableType)}
                  >
                    <option value="">Select</option>
                    {dropdownOptions[colIndex - 1]?.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const isDataValid = () => {
    const validateTable = (data, section, tableName, headers) => {
      for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < headers.length; col++) {
          const value = data[row]?.[col];
          if (!value || value.trim() === '') {
            alert(`Please fill "${headers[col]}" in "${tableName}" for ${section}, row ${row + 1}`);
            return false;
          }
        }
      }
      return true;
    };

    return (
      validateTable(nfpaHealthData1, 'Chemicals', 'NFPA Health', ['Name', 'NFPA Health Value', 'in %']) &&
      validateTable(nfpaFlammabilityData1, 'Chemicals', 'NFPA Flammability', ['Name', 'NFPA Flammability Value', 'in %']) &&
      validateTable(physicalHazardData1, 'Chemicals', 'Physical Hazard', ['Name', 'Physical Hazard', 'Signal Word']) &&
      validateTable(nfpaHealthData2, 'Gases', 'NFPA Health', ['Name', 'NFPA Health Value', 'ml/min']) &&
      validateTable(nfpaFlammabilityData2, 'Gases', 'NFPA Flammability', ['Name', 'NFPA Flammability Value', 'ml/min']) &&
      validateTable(physicalHazardData2, 'Gases', 'Physical Hazard', ['Name', 'Physical Hazard', 'Signal Word'])
    );
  };

  const handleSubmit = async () => {
    if (!isDataValid()) return;

    const jsonData = {
      NumberOfChemicals: {
        NfpaHealthValue: nfpaHealthData1,
        NfpaFlammabilityValue: nfpaFlammabilityData1,
        PhysicalHazardValue: physicalHazardData1,
      },
      NumberOfGases: {
        NfpaHealthValue: nfpaHealthData2,
        NfpaFlammabilityValue: nfpaFlammabilityData2,
        PhysicalHazardValue: physicalHazardData2,
      },
    };

    console.log("Request Data:", JSON.stringify(jsonData, null, 2));

    try {
      const response = await fetch('http://localhost:8080/api/tab3-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      const text = await response.text();
      if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
      console.log('Server Response:', text ? JSON.parse(text) : {});
      navigate('/dashboard/tab4');
    } catch (err) {
      alert('Failed to submit data. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h3 className='text-primary'> 🧪 Chemicals/Reagents/Solvents/Gas Used</h3>

      {/* Input for Chemicals */}
      <div className="input-row">
        <label htmlFor="numRows1">Number of Chemicals/Reagents/Solvents Used:</label>
        <input
          type="number"
          id="numRows1"
          min="1"
          placeholder="Enter number of rows"
          value={numRows1}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10) || 0;
            setNumRows1(val);
            setNfpaHealthData1([]);
            setNfpaFlammabilityData1([]);
            setPhysicalHazardData1([]);
          }}
        />
        <button className="btn btn-success" onClick={openGuide2}>Data For Information Only</button>
      </div>

      {numRows1 > 0 && (
        <div className="table-section">
          {createTable('NFPA Health', ['Name', 'NFPA Health Value', 'Purity in %'], ['input', 'dropdown', 'input'], numRows1, nfpaHealthData1, setNfpaHealthData1, 'chemicals', ['0', '1', '2', '3', '4'])}
          {createTable('NFPA Flammability', ['Name', 'NFPA Flammability Value', 'Purity in %'], ['input', 'dropdown', 'input'], numRows1, nfpaFlammabilityData1, setNfpaFlammabilityData1, 'chemicals', ['0', '1', '2', '3', '4'])}
          {createTable('Physical Hazard', ['Name', 'Physical Hazard', 'Signal Word'], ['input', 'dropdown', 'dropdown'], numRows1, physicalHazardData1, setPhysicalHazardData1, 'chemicals', ['N/A', 'W', 'OX', 'SA'], ['not mentioned', 'Caution', 'warning', 'Danger'])}
        </div>
      )}

      {/* Input for Gases */}
      <div className="input-row">
        <label htmlFor="numRows2">Number of Gases Used:</label>
        <input
          type="number"
          id="numRows2"
          min="1"
          placeholder="Enter number of rows"
          value={numRows2}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10) || 0;
            setNumRows2(val);
            setNfpaHealthData2([]);
            setNfpaFlammabilityData2([]);
            setPhysicalHazardData2([]);
          }}
        />
      </div>

      {numRows2 > 0 && (
        <div className="table-section">
          {createTable('NFPA Health', ['Name', 'NFPA Health Value', 'Flow mL/min'], ['input', 'dropdown', 'input'], numRows2, nfpaHealthData2, setNfpaHealthData2, 'gases', ['0', '1', '2', '3', '4'])}
          {createTable('NFPA Flammability', ['Name', 'NFPA Flammability Value', 'Flow mL/min'], ['input', 'dropdown', 'input'], numRows2, nfpaFlammabilityData2, setNfpaFlammabilityData2, 'gases', ['0', '1', '2', '3', '4'])}
          {createTable('Physical Hazard', ['Name', 'Physical Hazard', 'Signal Word'], ['input', 'dropdown', 'dropdown'], numRows2, physicalHazardData2, setPhysicalHazardData2, 'gases', ['N/A', 'W', 'OX', 'SA'], ['not mentioned', 'Caution', 'warning', 'Danger'])}
        </div>
      )}

      <footer>
        <button onClick={() => navigate('/dashboard/tab2')}>Back</button>
        <button className="btn btn-secondary" onClick={openGuide1}>Guide for PhysicalHazard and SignalWord</button>
        <button onClick={handleSubmit}> Next ➡️</button>
      </footer>

      <Modal
        isOpen={showGuideInfo}
        closeModal={closeGuide1}
        title="Guide Information"
        content={
          <div>
            <h5>SA: Simple Asphyxiant</h5><p>Can cause unconsciousness or death by suffocation.</p>
            <h5>OX: Oxidizer</h5><p>Can enhance combustion.</p>
            <h5>W: Water Reactivity</h5><p>Reacts dangerously with water.</p>
            <h5>N/A: Not Applicable</h5><p>Data not available or relevant.</p>
            <h5>Danger</h5><p>Severe hazard.</p>
            <h5>Warning</h5><p>Moderate hazard.</p>
            <h5>Caution</h5><p>Slight toxicity.</p>
          </div>
        }
      />
    </div>
  );
};

export default Tab3;
