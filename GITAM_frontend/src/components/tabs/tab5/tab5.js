import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './tab5.css';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);

const Tab5 = () => {
    const location = useLocation();
    const reportRef = useRef(); // Reference to capture the report section

    const passedData = React.useMemo(() => location.state?.data || {}, [location.state?.data]);

    const [reportData, setReportData] = useState({
        numberAnalytesStudied: '',
        totalEnergyConsumedInKwh: '',
        totalWasteGenerated: '',
        numberSolutionsPrepared: '',
        numberOfGeneralInstrumentsUsed: '',
        numberOfMainInstrumentsUsed: '',
        instrumentPosition: '',
        samplePreparationInformation: '',
        derivatizationInformation: '',
        wasteManagement: '',
        wastemanagementInformation: '',
        resultsGreenness: '',
        finalResult: '',
        OperatorSafetyFinalResultForGraph: '',
        InstrumentPositionForGraph: '',
        SamplePreparationForGraph: '',
        HazardusChemicalResltForGraph: '',
        DerivatizationForGraph: '',
        MiniautorisationResultForGraph: '',
        WasteGenerationForGraph: '',
        EnergyConsumptionFinalResultForGraph: '',
        AnalysingTheMultipleAnalytesInASingleRunForGraph: ''
    });

    useEffect(() => {
        if (Object.keys(passedData).length > 0) {
            setReportData(passedData);
        }
    }, [passedData]);

    const getBarColor = (value) => {
        if (value <= 40) return 'red';
        if (value > 40 && value < 50) return 'orange';
        if (value >= 50 && value < 60) return 'yellow';
        return 'green';
    };

    const getCircleColor = (value) => {
        if (value >= 60) return 'green';
        if (value >= 50 && value < 60) return 'yellow';
        return 'red';
    };

    const barChartData = {
        labels: [
            'Operator Safety', 'Instrument Position', 'Sample Preparation', 'Hazardous Chemicals',
            'Derivatization', 'Miniaturization', 'Waste Generation', 'Energy Consumption',
            'Analyzing Multiple Analytes'
        ],
        datasets: [
            {
                label: 'Graph Values',
                data: [
                    reportData.OperatorSafetyFinalResultForGraph,
                    reportData.InstrumentPositionForGraph,
                    reportData.SamplePreparationForGraph,
                    reportData.HazardusChemicalResltForGraph,
                    reportData.DerivatizationForGraph,
                    reportData.MiniautorisationResultForGraph,
                    reportData.WasteGenerationForGraph,
                    reportData.EnergyConsumptionFinalResultForGraph,
                    reportData.AnalysingTheMultipleAnalytesInASingleRunForGraph
                ],
                backgroundColor: [
                    getBarColor(reportData.OperatorSafetyFinalResultForGraph),
                    getBarColor(reportData.InstrumentPositionForGraph),
                    getBarColor(reportData.SamplePreparationForGraph),
                    getBarColor(reportData.HazardusChemicalResltForGraph),
                    getBarColor(reportData.DerivatizationForGraph),
                    getBarColor(reportData.MiniautorisationResultForGraph),
                    getBarColor(reportData.WasteGenerationForGraph),
                    getBarColor(reportData.EnergyConsumptionFinalResultForGraph),
                    getBarColor(reportData.AnalysingTheMultipleAnalytesInASingleRunForGraph)
                ]
            }
        ]
    };

    const doughnutChartData = {
        labels: ['Final Result'],
        datasets: [
            {
                data: [reportData.resultsGreenness, 100 - reportData.resultsGreenness],
                backgroundColor: [
                    getCircleColor(reportData.resultsGreenness),
                    'transparent'
                ],
                hoverOffset: 4
            }
        ]
    };

    const downloadPDF = () => {
        const input = reportRef.current; // Get the report section

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.text('Greenness Assessment', 15, 10);
            pdf.addImage(imgData, 'PNG', 10, 20, imgWidth, imgHeight);
            pdf.save('Greenness_Assessment_Report.pdf');
        });
    };

    return (
        <div className="tab-content">
            <h2>Report</h2>
            <div ref={reportRef} className="report-content">
                <h3>Greenness Assessment</h3>
                <p><strong>Number of Analytes Studied:</strong> {reportData.numberAnalytesStudied}</p>
                <p><strong>Total Energy Consumed:</strong> {reportData.totalEnergyConsumedInKwh}</p>
                <p><strong>Total Waste Generated:</strong> {reportData.totalWasteGenerated}</p>
                <p><strong>Number of Solutions Prepared:</strong> {reportData.numberSolutionsPrepared}</p>
                <p><strong>Number of General Instruments Used:</strong> {reportData.numberOfGeneralInstrumentsUsed}</p>
                <p><strong>Number of Main Instruments Used:</strong> {reportData.numberOfMainInstrumentsUsed}</p>
                <p><strong>Instrument Position:</strong> {reportData.instrumentPosition}</p>
                <p><strong>Sample Preparation:</strong> {reportData.samplePreparationInformation}</p>
                <p><strong>Derivatization:</strong> {reportData.derivatizationInformation}</p>
                <p><strong>Waste Management:</strong> {reportData.wasteManagement}</p>
                <p><strong>Waste Management Information:</strong> {reportData.wastemanagementInformation}</p>
                <p><strong>Results % Greenness:</strong> {reportData.resultsGreenness}</p>
                <p><strong>Final Result:</strong> {reportData.finalResult}</p>

                <div className="graphs-section">
                    <div className="bar-graph">
                        <h3>Bar Graph</h3>
                        <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                    </div>
                    <div className="doughnut-graph">
                        <h3>% GREENNESS</h3>
                        <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                    </div>
                </div>
            </div>
            <button className="btn btn-secondary" onClick={downloadPDF}>Print</button>
        </div>
    );
};

export default Tab5;
