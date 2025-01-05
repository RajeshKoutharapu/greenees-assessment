import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access passed data
import './tab5.css'; // Import your styles

const Tab5 = () => {
    const location = useLocation(); // Access the current route's state
    const passedData = location.state?.data || {}; // Retrieve passed data safely

    const [reportData, setReportData] = useState({
        
        numberAnalytesStudied: '',
        totalEnergyConsumedInKwh: '',
        totalWasteGenerated: '',
        numberSolutionsPrepared: '',
        numberOfGeneralInstrumentsUsed : '',
        numberOfMainInstrumentsUsed: '',
        instrumentPosition: '',
        samplePreparationInformation: '',
        derivatizationInformation: '',
        wasteManagement: '',
        wastemanagementInformation: '',
        resultsGreenness: '',
        finalResult: '',
        OperatorSafetyFinalResultForGraph:'',
        InstrumentPositionForGraph:'',
        SamplePreparationForGraph:'',
        HazardusChemicalResltForGraph:'',
        DerivatizationForGraph:'',
        MiniautorisationResultForGraph:'',
        WasteGenerationForGraph:'',
        EnergyConsumptionFinalResultForGraph:'',
        AnalysingTheMultipleAnalytesInASingleRunForGraph:''
    });

    useEffect(() => {
        if (Object.keys(passedData).length > 0) {
            setReportData(passedData); // Update state with passed data
        }
    }, [passedData]);

    return (
        <div className="tab-content">
            <h2>Report</h2>
            <div className="report-content">
                <p><strong>Number of Analytes Studied:</strong> <span>{reportData.numberAnalytesStudied}</span></p>
                <p><strong>Total Energy Consumed:</strong> <span>{reportData.totalEnergyConsumedInKwh}</span></p>
                <p><strong>Total Waste Generated:</strong> <span>{reportData.totalWasteGenerated}</span></p>
                <p><strong>Number of Solutions Prepared (STD + SST + SPL):</strong> <span>{reportData.numberSolutionsPrepared}</span></p>
                <p><strong>Number of General Instruments Used:</strong> <span>{reportData.numberOfGeneralInstrumentsUsed}</span></p>
                <p><strong>Number of Main Instruments Used:</strong> <span>{reportData.numberOfMainInstrumentsUsed}</span></p>
                <p><strong>Instrument Position:</strong> <span>{reportData.instrumentPosition}</span></p>
                <p><strong>Sample Preparation:</strong> <span>{reportData.samplePreparationInformation}</span></p>
                <p><strong>Derivatization:</strong> <span>{reportData.derivatizationInformation}</span></p>
                <p><strong>Waste Management:</strong> <span>{reportData.wasteManagement}</span></p>
                <p><strong>Waste Management Information (If Yes):</strong> <span>{reportData.wastemanagementInformation}</span></p>
                <p><strong>Results % Greenness:</strong> <span>{reportData.resultsGreenness}</span></p>
                <p><strong>Final Result:</strong> <span>{reportData.finalResult}</span></p>
            </div>
        </div>
    );
};
export default Tab5;
