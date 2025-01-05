import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './tab3.css';
import Modal from '../../Modal/Modal';

const Tab3 = () => {
  const navigate = useNavigate();
  const [numRows1, setNumRows1] = useState(0);
  const [numRows2, setNumRows2] = useState(0);

  // Separate states for each table
  const [nfpaHealthData1, setNfpaHealthData1] = useState([]);
  const [nfpaFlammabilityData1, setNfpaFlammabilityData1] = useState([]);
  const [physicalHazardData1, setPhysicalHazardData1] = useState([]);
  const [nfpaHealthData2, setNfpaHealthData2] = useState([]);
  const [nfpaFlammabilityData2, setNfpaFlammabilityData2] = useState([]);
  const [physicalHazardData2, setPhysicalHazardData2] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const openGuide = () => setShowModal(true);
  const closeGuide = () => setShowModal(false);

  const handleInputChange = (e, tableSetter, rowIndex, colIndex) => {
    const value = e.target.value;
    tableSetter((prevData) => {
      const updatedData = [...prevData];
      if (!updatedData[rowIndex]) updatedData[rowIndex] = [];
      updatedData[rowIndex][colIndex] = value;
      return updatedData;
    });
  };

  const createTable = (title, headers, inputTypes, numRows, tableData, tableSetter, ...dropdownOptions) => {
    return (
      <table className="chemical-table">
        <thead>
          <tr>
            <th colSpan={headers.length}>
              <h3>{title}</h3>
            </th>
          </tr>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
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
                      onChange={(e) => handleInputChange(e, tableSetter, rowIndex, colIndex)}
                    />
                  ) : (
                    <select
                      value={tableData[rowIndex]?.[colIndex] || ''}
                      onChange={(e) => handleInputChange(e, tableSetter, rowIndex, colIndex)}
                    >
                      <option value="">Select</option>
                      {dropdownOptions[colIndex - 1]?.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
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
  };

  const handleSubmit = async () => {
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

    console.log('JSON Data:', JSON.stringify(jsonData, null, 2));

    try {
        const response = await fetch('http://localhost:8080/api/tab3-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });

        console.log('Response Status:', response.status);
        const responseText = await response.text(); // Get the raw response text
        console.log('Response Text:', responseText); // Log it

        if (!response.ok) {
            throw new Error(`Server Error: ${response.statusText}`);
        }

        // Check if responseText is not empty before parsing
        const result = responseText ? JSON.parse(responseText) : {};
        console.log('Server Response:', result);
        navigate('/dashboard/tab4');
    } catch (error) {
        console.error('Error:', error.message);
        alert('Error: Failed to send data. Please try again.');
    }
};
  
  return (
    <div>
      <h3>Chemicals/Reagents/Solvents/Gas Used</h3>

      {/* Input for First Group */}
      <div className="input-row">
        <label htmlFor="numRows1">Number of Chemicals/Reagents/Solvents Used:</label>
        <input
          type="number"
          id="numRows1"
          min="1"
          placeholder="Enter number of rows"
          value={numRows1}
          onChange={(e) => {
            setNumRows1(parseInt(e.target.value, 10) || 0);
            setNfpaHealthData1([]);
            setNfpaFlammabilityData1([]);
            setPhysicalHazardData1([]);
          }}
        />
      </div>
      {numRows1 > 0 && (
        <div className="table-section">
          {createTable('NFPA Health', ['Name', 'NFPA Health Value', 'in %'], ['input', 'dropdown', 'input'], numRows1, nfpaHealthData1, setNfpaHealthData1, ['0', '1', '2', '3', '4'])}
          {createTable('NFPA Flammability', ['Name', 'NFPA Flammability Value', 'in %'], ['input', 'dropdown', 'input'], numRows1, nfpaFlammabilityData1, setNfpaFlammabilityData1, ['0', '1', '2', '3', '4'])}
          {createTable('Physical Hazard', ['Name', 'Physical Hazard', 'Signal Word'], ['input', 'dropdown', 'dropdown'], numRows1, physicalHazardData1, setPhysicalHazardData1, ['N/A', 'W', 'OX', 'SA'], ['not mentioned', 'caution', 'warning', 'Danger'])}
        </div>
      )}

      {/* Input for Second Group */}
      <div className="input-row">
        <label htmlFor="numRows2">Number of Gases Used :</label>
        <input
          type="number"
          id="numRows2"
          min="1"
          placeholder="Enter number of rows"
          value={numRows2}
          onChange={(e) => {
            setNumRows2(parseInt(e.target.value, 10) || 0);
            setNfpaHealthData2([]);
            setNfpaFlammabilityData2([]);
            setPhysicalHazardData2([]);
          }}
        />
      </div>
      {numRows2 > 0 && (
        <div className="table-section">
          {createTable('NFPA Health', ['Name', 'NFPA Health Value', 'ml/min'], ['input', 'dropdown', 'input'], numRows2, nfpaHealthData2, setNfpaHealthData2, ['0', '1', '2', '3', '4'])}
          {createTable('NFPA Flammability', ['Name', 'NFPA Flammability Value', 'ml/min'], ['input', 'dropdown', 'input'], numRows2, nfpaFlammabilityData2, setNfpaFlammabilityData2, ['0', '1', '2', '3', '4'])}
          {createTable('Physical Hazard', ['Name', 'Physical Hazard', 'Signal Word'], ['input', 'dropdown', 'dropdown'], numRows2, physicalHazardData2, setPhysicalHazardData2, ['N/A', 'W', 'OX', 'SA'], ['not mentioned', 'caution', 'warning', 'Danger'])}
        </div>
      )}

      <footer>
        <button onClick={() => navigate('/dashboard/tab2')}>Back</button>
        <button className="btn btn-secondary" onClick={openGuide}>Guide 3</button>
        <button onClick={handleSubmit}>Next</button>
      </footer>

      <Modal 
  isOpen={showModal} 
  closeModal={closeGuide} 
  title="Guide Information"
  content={
    <div>
      <h5>SA: Simple Asphyxiant</h5>
      <p>Can cause unconsciousness or death by suffocation. These substances displace oxygen in the air, leading to a hazardous environment.</p>

      <h5>OX: Oxidizer</h5>
      <p>Oxidizers are significant fire hazards if they are not handled properly. They can cause or enhance combustion, even in materials that would not normally burn.</p>

      <h5>W: Water Reactivity</h5>
      <p>These substances react dangerously with water, and its use should be avoided. Such reactions can release harmful gases, heat, or even cause explosions.</p>

      <h5>N/A: Not Applicable/Not Available</h5>
      <p>This classification means that the information is either not applicable to the material or the data is unavailable.</p>

      <h5>Danger</h5>
      <p>Used for more severe toxicity situations. A hazardous situation that, if not avoided, will result in death or serious injury.</p>

      <h5>Warning</h5>
      <p>Used for less severe toxicity situations. A hazardous situation that, if not avoided, could result in death or serious injury.</p>

      <h5>Caution</h5>
      <p>Indicates slight toxicity, typically if eaten or absorbed through the skin. A hazardous situation that, if not avoided, could result in minor or moderate injury.</p>
    </div>
  }
/>

    </div>
  );
};

export default Tab3;
