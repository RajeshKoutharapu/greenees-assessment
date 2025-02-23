import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './tab4.css'; 
import Modal from '../../Modal/Modal';

const Tab4 = () => {
    const navigate = useNavigate();
    const [numAnalytes, setNumAnalytes] = useState('');
    //const [numRows, setNumRows] = useState(0);
    const [wasteInfo, setWasteInfo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const guides = {
        guide3: "This is information for Guide 3. Add relevant details here.",
        guide4: "This is information for Guide 4. Add relevant details here.",
        guide5: "This is information for Guide 5. Add relevant details here.",
        guide6: "This is information for Guide 6. Add relevant details here.",
        guide7: "This is information for Guide 7. Add relevant details here.",
        guide00: "This is general guide information for Guide 00."
    };

    const handleNumAnalytesChange = (e) => {
        setNumAnalytes(e.target.value);
    };
    const openGuide = (guideId) => {
        if (guideId === 'guide4') {
            // Handle Guide 4 (Sample Preparation)
            const caseDetails = {
                'Case-1': "No preparation",
                'Case-2': "Sample preparation done with dilution or simple preparation. (Eg: Diluting the samples or dissolving samples in a solution)",
                'Case-3': "Samples are prepared by using simple techniques (Eg: Sonication, vortex and centrifugation)",
                'Case-4': "Samples are prepared by using simple techniques with thermal treatments (Eg: Heating, cooling and maintaining the temperature, prepared in controlled conditions with using case 3)",
                'Case-5': "Samples are prepared by using high-end techniques with heavy processes (Eg: Solid phase extraction, or a chemical reaction)"
            };
    
            // Directly show the case details without dropdown
            let content = Object.keys(caseDetails).map((caseKey) => {
                return `<strong>${caseKey}</strong>: ${caseDetails[caseKey]}<br><br>`;
            }).join('');
    
            setModalContent(content);
        } else if (guideId === 'guide3') {
            // Handle Guide 3 (Instrument Posi)
            const caseDetails = {
                'In-Line': "Sample need to be analyzed in the process manufacturing automatically without sample collecting (Avoid storage, eg: PAT technology by remote sensor testing)",
                'On-Line': "Samples will be manually collected at the time of manufacturing and perform the analysis without preparation (Avoid storage, eg: Appearance, Width, shape and size by Vernier callipers).",
                'At-Line': "Samples will be manually collected and discontinuous sample preparation, measurement and evaluation (eg: Perform a series of analysis like continuous sample preparations at different time intervals, (eg: pH, PSD, zeta potential, concentration or content… etc).",
                'Off-Line': "Sample will be stored for certain period or send to some other laboratory to conduct analysis with a sequence of runs to complete the testing (eg: dissolution, impurities, and stability samples or content… etc)."
            };
    
            // Directly show the case details without dropdown
            let content = Object.keys(caseDetails).map((caseKey) => {
                return `<strong>${caseKey}</strong>: ${caseDetails[caseKey]}<br><br>`;
            }).join('');
    
            setModalContent(content);
        } else if (guideId === 'guide5') {
            // Handle Guide 5 (Derivatization)
            const caseDetails = {
                'Case-1': "No Derivatization",
                'Case-2': "Yes, Derivatization done with non-hazardous chemical/reagent as per the OSHA classification",
                'Case-3': "Yes, Derivatization done with one hazardous chemical/reagent as per the OSHA classification",
                'Case-4': "Yes, Derivatization done with two or more hazardous chemicals/reagents as per the OSHA classification",
                'Case-5': "Yes, Derivatization done with two or more hazardous chemicals/reagents as per the OSHA classification along with a thermal reaction (Heating/cooling)"
            };
    
            // Directly show the case details without dropdown
            let content = Object.keys(caseDetails).map((caseKey) => {
                return `<strong>${caseKey}</strong>: ${caseDetails[caseKey]}<br><br>`;
            }).join('');
    
            setModalContent(content);
        } else if (guideId === 'guide6' || guideId === 'guide7') {
            // Handle Guide 6 and 7 (Waste Management)
            const caseDetails = {
                'Dispose': "Procedure need to mention clearly, eg: Using the bio degradation solutions to degrade the waste and dispose.",
                'Degradation': "Procedure need to mention clearly, eg: Using the bio degradation solutions to degrade the waste and sending for the recycling.",
                'Recycling': "Recycling procedure need to mention clearly.",
                'Reuse': "Recycling and re-use procedure need to mention clearly."
            };
    
            // Directly show the case details without dropdown
            let content = Object.keys(caseDetails).map((caseKey) => {
                return `<strong>${caseKey}</strong>: ${caseDetails[caseKey]}<br><br>`;
            }).join('');
    
            setModalContent(content);
        } else {
            // Handle other guides
            setModalContent(guides[guideId] || "Guide information not available.");
        }
    
        setShowModal(true);
    };
    
    
    

    const closeGuide = () => setShowModal(false);

    const handleSubmit = async () => {
        const numAnalytesValue = document.getElementById('numAnalytes').value.trim();
        const instrumentPosiValue = document.getElementById('instrumentPosi').value;
        const samplePreparationValue = document.getElementById('samplePreparation').value;
        const derivatizationValue = document.getElementById('derivatization').value;
    
        if (!numAnalytesValue || !instrumentPosiValue || !samplePreparationValue || derivatizationValue === "Select Case") {
            alert("Please fill all required fields: Number of Analytes Studied, Instrument Posi (Insitu), Sample Preparation, and Derivatization.");
            return;
        }
    
        const requestData = {
            numAnalytes: numAnalytesValue,
            wasteInfo,
            samplePreparation: samplePreparationValue,
            derivatization: derivatizationValue,
            wasteManagementSamples: document.getElementById('wasteManagementSamples').value,
            wasteManagementOthers: document.getElementById('wasteManagementOthers').value,
            instrumentPosi: instrumentPosiValue,
        };
    
        console.log("Request Data:", requestData);
    
        try {
            const response = await fetch('http://localhost:8080/api/tab4-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });
    
            const responseData = await response.json();
            console.log("Response Data:", responseData);
            navigate('/dashboard/tab5', { state: { data: responseData } });
    
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    

    return (
        <div className="tab-content">
            <h2>General</h2>
            <div className="form-group">
                <label htmlFor="numAnalytes">Number of Analytes Studied:</label>
                <input
                    type="text"
                    id="numAnalytes"
                    placeholder="Enter the number"
                    value={numAnalytes}
                    onChange={handleNumAnalytesChange}
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="instrumentPosi">Instrument Posi (Insitu):</label>
                <select id="instrumentPosi">
                <option value="">Select Instrument position</option>
                    <option value="In-Line">In-Line</option>
                    <option value="On-Line">On-Line</option>
                    <option value="At-Line">At-Line</option>
                    <option value="Off-Line">Off-Line</option>
                </select>
                <button className="btn btn-secondary" onClick={() => openGuide('guide3')}>Guide 3</button>
            </div>

            <div className="form-group">
                <label htmlFor="samplePreparation">Sample Preparation:</label>
                <select id="samplePreparation">
                <option value="">Select Sample preperation</option>
                    <option value="Case-1">Case-1</option>
                    <option value="Case-2">Case-2</option>
                    <option value="Case-3">Case-3</option>
                    <option value="Case-4">Case-4</option>
                    <option value="Case-5">Case-5</option>
                </select>
                <button className="btn btn-secondary" onClick={() => openGuide('guide4')}>Guide 4</button>
            </div>

            <div className="form-group">
                <label htmlFor="derivatization">Derivatization:</label>
                <select id="derivatization">
                    <option value="Select Case">Select Case</option>
                    <option value="Case-1">Case-1</option>
                    <option value="Case-2">Case-2</option>
                    <option value="Case-3">Case-3</option>
                    <option value="Case-4">Case-4</option>
                    <option value="Case-5">Case-5</option>
                </select>
                <button className="btn btn-secondary" onClick={() => openGuide('guide5')}>Guide 5</button>
            </div>

            <div className="form-group">
                <label htmlFor="wasteManagementSamples">Waste Management of Samples:</label>
                <select id="wasteManagementSamples">
                <option value="">Select waste management samples</option>
                    <option value="Reuse">Reuse</option>
                    <option value="Recycling">Recycling</option>
                    <option value="Degradations">Degradations</option>
                    <option value="Dispose">Dispose</option>
                    <option value="No-treatment">No-treatment</option>
                </select>
                <button className="btn btn-secondary" onClick={() => openGuide('guide6')}>Guide 6</button>
            </div>

            <div className="form-group">
                <label htmlFor="wasteManagementOthers">Waste Management of Others:</label>
                <select id="wasteManagementOthers">
                <option value="">Select Waste management Others</option>
                    <option value="Reuse">Reuse</option>
                    <option value="Recycling">Recycling</option>
                    <option value="Degradations">Degradations</option>
                    <option value="Dispose">Dispose</option>
                    <option value="No-treatment">No-treatment</option>
                </select>
                <button  className="btn btn-secondary" onClick={() => openGuide('guide7')}>Guide 7</button>
            </div>

            <div className="form-group" id="waste-info-section">
                <label htmlFor="wasteInfo">Waste Management Information (if yes):</label>
                <textarea
                    id="wasteInfo"
                    rows="4"
                    placeholder="Enter the information"
                    value={wasteInfo}
                    onChange={(e) => setWasteInfo(e.target.value)}
                ></textarea>
            </div>

            {/* Navigation Footer */}
            <footer>
                <button onClick={() => navigate('/dashboard/tab3')}>Back</button>
              {/*  <button onClick={() => navigate('/dashboard/tab5')}>Next</button>  */}
              <button onClick={handleSubmit}>Next</button>
              {/*  <button  className="btn btn-secondary" onClick={() => openGuide('guide00')}>Guide 00</button> */}
            </footer>

            {/* Modal for Guide */}
                    <Modal 
            isOpen={showModal} 
            closeModal={closeGuide} 
            title="Guide Information"
            content={<div dangerouslySetInnerHTML={{ __html: modalContent }} />}
           
            
        />

        </div>
    );
};

export default Tab4;
