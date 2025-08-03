package com.Greenness.GreenApp.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Greenness.GreenApp.Service.Tab2Services.tab2Service;



@Service
public class finalReportService {
	@Autowired
	tab4Service tab4service;
    @Autowired
    tab2Service tab2service;
    @Autowired 
    Tab1Service tab1service;
    @Autowired
    preReportResultsService prereportresult;
    
    
	Map<String,String> finalreportmwmbersmap=new HashMap<>();
	
	public Map<String,String> getResponseData(){
		
     finalreportmwmbersmap.put("numberAnalytesStudied",String.valueOf(tab4service.numberofanalytes));
     finalreportmwmbersmap.put("totalEnergyConsumedInKwh",String.valueOf(tab2service.getEnergyConsumptionFinalREsult()));
     finalreportmwmbersmap.put("totalWasteGenerated",String.valueOf(tab4service.totalwastegenerated));
     finalreportmwmbersmap.put("numberSolutionsPrepared",String.valueOf(tab1service.getNumberofSolutionsPrepared()));
     finalreportmwmbersmap.put("numberOfGeneralInstrumentsUsed",String.valueOf(tab2service.getNumberOfGeneralInstruments()));
     finalreportmwmbersmap.put("numberOfMainInstrumentsUsed",String.valueOf(tab2service.getNumberOfMainInstruments()));
     finalreportmwmbersmap.put("instrumentPosition",tab4service.getinstrumentposition());
    
     finalreportmwmbersmap.put("samplePreparationInformation",tab4service.getSamplepreperationinfo());
     finalreportmwmbersmap.put("derivatizationInformation",tab4service.getDerivatizationInformation());
     finalreportmwmbersmap.put("wasteManagement",tab4service.getwastemanagementForFinalReport());
     finalreportmwmbersmap.put("wastemanagementInformation",tab4service.getwasteManagementInfo());
     finalreportmwmbersmap.put("OperatorSafetyFinalResultForGraph",String.valueOf( prereportresult.operationsaftyfinalresult));
     finalreportmwmbersmap.put("InstrumentPositionForGraph",String.valueOf(prereportresult.instrumentposition));
     finalreportmwmbersmap.put("SamplePreparationForGraph",String.valueOf(prereportresult.samplepreparation));
     finalreportmwmbersmap.put("HazardusChemicalResltForGraph",String.valueOf(prereportresult.hazarduschemicalresult));
     finalreportmwmbersmap.put("DerivatizationForGraph",String.valueOf(prereportresult.devrivation));
     finalreportmwmbersmap.put("MiniautorisationResultForGraph",String.valueOf(prereportresult.miniaothorizationresult));
     finalreportmwmbersmap.put("WasteGenerationForGraph",String.valueOf(prereportresult.wastegeneration));
     finalreportmwmbersmap.put("EnergyConsumptionFinalResultForGraph",String.valueOf(prereportresult.energyconsumtionfinalresult));
     finalreportmwmbersmap.put("AnalysingTheMultipleAnalytesInASingleRunForGraph",String.valueOf(prereportresult.analysingthemultipleanalytesinasinglerun));
     
     //caliculating the Greenness of the dtata 
     
     Double greenness=(prereportresult.operationsaftyfinalresult+prereportresult.instrumentposition+prereportresult.samplepreparation+prereportresult.hazarduschemicalresult+prereportresult.devrivation+prereportresult.miniaothorizationresult+prereportresult.wastegeneration+prereportresult.energyconsumtionfinalresult+prereportresult.analysingthemultipleanalytesinasinglerun)/9;
       greenness=Math.round(greenness*10.0)/10.0;//rounding of the decimal points 
     finalreportmwmbersmap.put("resultsGreenness",String.valueOf(greenness));
     //caliculating the result 
     if(greenness>=60)
    	 finalreportmwmbersmap.put("finalResult","Green");
     else if(greenness>=50 && greenness<=59.9)
    	 finalreportmwmbersmap.put("finalResult","moderately"+ " Green");
     else
    	 finalreportmwmbersmap.put("finalResult","Non Green");


     System.out.println(finalreportmwmbersmap);
		return finalreportmwmbersmap;
	}
}
