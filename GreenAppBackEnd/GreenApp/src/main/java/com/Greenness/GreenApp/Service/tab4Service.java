package com.Greenness.GreenApp.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Greenness.GreenApp.Service.Tab2Services.mainInstrumentsService;
import com.Greenness.GreenApp.Service.Tab2Services.tab2Service;
import com.Greenness.GreenApp.Service.Tab3Services.tab3Service;
import com.Greenness.GreenApp.model.tabFourDataClass;

import jakarta.security.auth.message.module.ServerAuthModule;

@Service
public class tab4Service {
	
	@Autowired
	Tab1Service tab1service;
	@Autowired
	tab2Service tab2service;
	@Autowired
	tab3Service tab3service;
	
	@Autowired
	preReportResultsService prereportresultservice;
	@Autowired
	mainInstrumentsService maininstrumenservice;
	//Created map to map with the values of actual values of the Data entered in frontend 
	Map<String,Integer>insamplewastesamlemap=new HashMap<>();
	Map<String,Integer>derevationmap=new HashMap<>();
	Map<String,Integer>wastemanagementothersmap=new HashMap<>();
	//result in tab2
	Integer Result=0;
	//mimiaothorization in tab2
	Double miniaothorizationresult=0D;
	//used to caluculate final waste used in preresult report
	Double totalwastegenerated=0D;
	//final waste result used in prereport 
	Integer wastefinalresult=0;
	//this three variables are used in final report generation
	String instrumentposition="";
    String deriavtizationtempforinfo="";
    String samplepreperationinfo="";
    //this is used in final report and combination of wastemanagement of others and samples
    String wastemanagementforfinalreport="";
	
	public tab4Service() {
		insamplewastesamlemap.put("Off-Line", 0);
		insamplewastesamlemap.put("At-Line", 33);
		insamplewastesamlemap.put("On-Line", 66);
		insamplewastesamlemap.put("In-Line", 100);
		insamplewastesamlemap.put("Case-1", 100);
		insamplewastesamlemap.put("Case-2", 75);
		insamplewastesamlemap.put("Case-3", 50);
		insamplewastesamlemap.put("Case-4", 25);
		insamplewastesamlemap.put("Case-5", 0);
		insamplewastesamlemap.put("Reuse", 0);
		insamplewastesamlemap.put("Recycling", 0);
		insamplewastesamlemap.put("Degradation", 0);
		insamplewastesamlemap.put("Dispose", 0);
		insamplewastesamlemap.put("No-treatment", 0);
		derevationmap.put("Case-1",100);
		derevationmap.put("Case-2",75);
		derevationmap.put("Case-3",50);
	    derevationmap.put("Case-4",25);
		derevationmap.put("Case-5",0);
		wastemanagementothersmap.put("Reuse",100);
		wastemanagementothersmap.put("Recycling",75);
		wastemanagementothersmap.put("Degradations",50);
		wastemanagementothersmap.put("Dispose",25);
		wastemanagementothersmap.put("No-treatment",0);

	}
	
	//Data members of the TAB4
    Integer numberofanalytes=0;
    Integer insitu=0;
    Integer samplepreperation=0;
    Integer derivation=0;
    Integer wastemanagementofsamples=0;
    Integer wastemanagementofothers=0;
    String wastemanagementinfo="";
    
    //Method for Services Related to tab 4 
    public void getTab4Data(tabFourDataClass tabfourdata) {
    	numberofanalytes=tabfourdata.getNumAnalytes();
    	insitu=insamplewastesamlemap.get(tabfourdata.getInstrumentPosi());
    	instrumentposition=tabfourdata.getInstrumentPosi();//this is used in final report generation
    	samplepreperation=insamplewastesamlemap.get(tabfourdata.getSamplePreparation());
    	samplepreperationinfo=tabfourdata.getSamplePreparation();
    	derivation=derevationmap.get(tabfourdata.getDerivatization());
    	deriavtizationtempforinfo=tabfourdata.getDerivatization();//this id used in final report generation process
    	wastemanagementofsamples=wastemanagementothersmap.get(tabfourdata.getWasteManagementSamples());
    	wastemanagementofothers=wastemanagementothersmap.get(tabfourdata.getWasteManagementOthers());
    	//combining the sample and others waste management
    	wastemanagementforfinalreport=tabfourdata.getWasteManagementOthers()+" and "+tabfourdata.getWasteManagementSamples();
    	System.out.println(wastemanagementofothers+" : "+wastemanagementofsamples+" : "+numberofanalytes);
    	wastemanagementinfo=tabfourdata.getWasteInfo();
    	//Method call for the final result in TAB2 we are using because result include (no.of analytes used ) data in tab4 
         Result =tab2service.getEnergyConsomptionResult(numberofanalytes);
         System.out.println("Final Result of main and general instruments"+Result);
         
  	   //method call getting operation condition average and below code refer to caliculating miniaothorizationresult
  	      Double tempaverage=maininstrumenservice.getAverageOfLengthColomnSampletemeratures();
  	      miniaothorizationresult=(tempaverage+Result)/2;
  	  
  	       
    	
  	    //method call for  tab gases service passing no.of analytics for  caliculations
  	    tab3service.getNoofGasesServices(numberofanalytes);
  	  // method call to set final result waste used to caliculate waste generation in preresultReport class   
 	     wastefinalresult=setFinalWasteResult();
  	    
  	    //method cal to preReport class for instrument position
  	    prereportresultservice.setInstrumentPosition(insitu);
  	    
  	    //method cal to preReport class for sample preparation
  	    prereportresultservice.setSamplePreparation(samplepreperation);
  	    
     	//method cal to preReport class for setting derevation
  	    prereportresultservice.setDerivation(derivation);
  	    
  	    prereportresultservice.setEnergyConsumptionFinalResult(Result);
  	    
  	    //method call to set miniaothorization in preresultreportclass
  	    prereportresultservice.setminiaotherizationresult(miniaothorizationresult);
  	    
  	    //code for setting waste generation for preresultreport class
  	    //here i added 0.0 in the end because in java we will get round figure values only if the numerator double value so i added 
  	      prereportresultservice.setWasteGeneration((int) Math.round((wastemanagementofothers+wastemanagementofsamples+wastefinalresult+0.0)/3));
  	    
    }
    
  //below code refer to caliculating totalwaste generated  and  final waste result
    public Integer setFinalWasteResult() {
    	
	         //method call to get list of step1 value of nfpahealthvaluegases 
	      List<Double> list=tab3service.getstep1nfpahealthvalueforgases();
	      Double tempsum=0D;
	      for (Double temp : list) {
	    	  System.out.println(" check :"+temp);
		tempsum+=temp;
	   }
	      System.out.println("LJCZHJKDSKSDHFJKDJFLFHIUHI");
	    totalwastegenerated=Math.round((tab1service.tab1calcvalues.get("preperaionwaste")+tab2service.getEfluentWaste()+tempsum)/numberofanalytes)+.0;
        if(totalwastegenerated>=250)
        	 return 0;
        else if(totalwastegenerated>=150)
        	return 25;
        else if(totalwastegenerated<=50)
        	return 100;
        else if(totalwastegenerated<=100)
        	return 75;
        else
        	return 50;
    }
    
    //this method is called in finalreport class used to generate final report
    public String getinstrumentposition() {
    	return instrumentposition;
    }
    //this method is used to set derivatization information in fianl report
    public String getDerivatizationInformation() {
    	if(deriavtizationtempforinfo.equals("Case-1")) {
    		return " No Derivatization";
    	}
    	else if(deriavtizationtempforinfo.equals("Case-2")) {
    		return " Yes, Derivatization done with non-hazardous chemical / reagent as per the OSHA classification";
    	}
    	else if(deriavtizationtempforinfo.equals("Case-3")) {
    		return " Yes, Derivatization done with one hazardous chemical / reagent as per the OSHA classification";
    	}
    	else if(deriavtizationtempforinfo.equals("Case-4")) {
    		return "Yes, Derivatization done with two or more hazardous chemical / reagent as per the OSHA classification";
    	}
    	else
    	{
    		return "Yes, Derivatization done with two or more hazardous chemical / reagent as per the OSHA classification along with a thermal reaction (Heating/cooling)";
    	}
    }
    //below three mwthod are used by fianl result tab
    public String getwastemanagementForFinalReport() {
    	return wastemanagementforfinalreport;
    }
    public String getwasteManagementInfo() {
    	if(wastemanagementinfo.length()>0)
    		return wastemanagementinfo;
    	else
    		return "Not Written by User";
    }
    public String getSamplepreperationinfo() {
    	if(samplepreperationinfo.equals("Case-1"))
    		 return "No preparation/ No Filteration";
    	else if(samplepreperationinfo.equals("Case-2"))
    		return "Sample preparation done with dilution or simple preparation. (Eg: Diluting the samples or dissolving samples in a solution) ";
    	else if(samplepreperationinfo.equals("Case-3"))
    		return " Samples are prepared by using simple techniques (Eg: Sonication, vortex and centrifugation)";
    	else if(samplepreperationinfo.equals("Case-4"))
    		return " Samples are prepared by using simple techniques with thermal treatments (Eg: Heating, cooling and maintaining the temperature, prepared in controlled conditions with using case 3)";
    	else
    		 return " Samples are prepared by using high end techniques with heavy process (Eg: Solid phase extraction, Solid phase extraction or a chemical reaction)";
  
    }
    public Double getTotalWasteGenerated() {
    
    	return totalwastegenerated;
    }

}
