import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './tab5.css';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useFormContext } from '../../../allContexts/context';

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);

const Tab5 = () => {
    const location = useLocation();
    const reportRef = useRef();
 const [showPrintButton, setShowPrintButton] = useState(true);

    const passedData = React.useMemo(() => location.state?.data || {}, [location.state?.data]);
   const { formData } = useFormContext();  // This gives you access to title

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
        if (value <= 50) return 'red';
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
                    '#e0e0e0' // light gray instead of transparent
                ],
                borderWidth: 1,
                cutout: '70%',
                hoverOffset: 4
            }
        ]
        
    };
const redBarLabels = barChartData.labels.filter((label, index) => {
  const value = barChartData.datasets[0].data[index];
  return value <= 50;
});

    // Plugin to show text in center of doughnut chart
    // Plugin to display text inside the doughnut chart
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { width } = chart;
    const { height } = chart;
    const ctx = chart.ctx;
    const centerText = chart.options.plugins.centerText?.text || '';

    ctx.save();
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = 'black'; // Make sure the color is visible
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(centerText, width / 2, height / 2);
    ctx.restore();
  }
};
const barValuePlugin = {
  id: 'barValuePlugin',
  afterDatasetsDraw: (chart) => {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];
        ctx.fillStyle = 'black';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value, bar.x, bar.y - 5);
      });
    });
  }
};





    const downloadPDF = () => {
  setShowPrintButton(false); // Hide the button before taking screenshot

  setTimeout(() => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.text('Greenness Assessment', 15, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, imgWidth, imgHeight);
      pdf.save('Greenness_Assessment_Report.pdf');

      setShowPrintButton(true); // Show the button again after PDF is saved
    });
  }, 100); // Wait a moment to ensure re-render
};

    return (
        <div ref={reportRef} className="report-content">
            <h3>Greenness Assessment</h3>
            <p><strong>Title:</strong> {formData.title}</p>

            {/* <p>Title :reportData.</p> */}
            <table className="report-table">
                <tbody>
                    <tr><th>Number of Analytes Studied</th><td>{reportData.numberAnalytesStudied}</td></tr>
                    <tr><th>Total Energy Consumed (kWh)</th><td>{reportData.totalEnergyConsumedInKwh}</td></tr>
                    <tr><th>Total Waste Generated (mL or g)</th><td>{reportData.totalWasteGenerated}</td></tr>
                    <tr><th>Number of Solutions Prepared</th><td>{reportData.numberSolutionsPrepared}</td></tr>
                    <tr><th>General Instruments Used</th><td>{reportData.numberOfGeneralInstrumentsUsed}</td></tr>
                    <tr><th>Main Instruments Used</th><td>{reportData.numberOfMainInstrumentsUsed}</td></tr>
                    <tr><th>Instrument Position</th><td>{reportData.instrumentPosition}</td></tr>
                    <tr><th>Sample Preparation</th><td>{reportData.samplePreparationInformation}</td></tr>
                    <tr><th>Derivatization</th><td>{reportData.derivatizationInformation}</td></tr>
                    <tr><th>Waste Management for chemicals and consumbles(eg;filters, tubes)</th><td>{reportData.wasteManagement}</td></tr>
                    <tr><th>Waste Management Info</th><td>{reportData.wastemanagementInformation}</td></tr>
                    <tr><th>Greenness (%)</th><td>{reportData.resultsGreenness}</td></tr>
                    <tr><th>Final Result</th><td>{reportData.finalResult}</td></tr>
                </tbody>
            </table>
<div className="graphs-section">
  <div className="bar-graph">
    <h3>Bar Graph</h3>
<Bar
  data={barChartData}
  options={{
    responsive: true,
    maintainAspectRatio: true, // REQUIRED if using height prop
    scales: {
      y: {
        beginAtZero: true,
        max: 120
      }
    },
    layout: {
      padding: {
        top: 20
      }
    }
  }}
  height={200}  // Works only with maintainAspectRatio: true
  plugins={[barValuePlugin]}
/>


  </div>

  <div className="doughnut-graph">
    <h3>% GREENNESS</h3>
    <Doughnut
      data={doughnutChartData}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        cutout: '70%',
        plugins: {
          legend: { display: false },
          centerText: {
            text: reportData.resultsGreenness?.toString() + '%' || 'N/A'
          }
        }
      }}
      plugins={[centerTextPlugin]}
    />
  </div>
</div>
      {redBarLabels.length > 0 && (
  <p style={{ marginTop: '20px', marginLeft: '10px' }}>
    <strong>Scientist has to work on to improve Greenness = </strong>{" "}
    {redBarLabels.map((label, idx) => (
      <span key={idx} style={{ color: 'red', fontWeight: 'bold' }}>
        {label}{idx < redBarLabels.length - 1 ? ', ' : ''}
      </span>
    ))}
  </p>
)}


{showPrintButton && (
  <button className="btn btn-secondary" onClick={downloadPDF}>
    Print
  </button>
)}
        </div>
    );
 

};

export default Tab5;
