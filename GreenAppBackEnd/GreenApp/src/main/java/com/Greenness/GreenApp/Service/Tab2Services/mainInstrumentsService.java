package com.Greenness.GreenApp.Service.Tab2Services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.Greenness.GreenApp.model.MainInstrument;

@Component
public class mainInstrumentsService {
	
	 Map<String, Double> maininstrumentsmap = new HashMap<>();
	  Double noofinjectionandruntimefortab3=0D;
	  //this variable is used to hold the average of main intruments conditions used to calculate miniaptherization result
	  Double averageoflengthcolumnsampletemperatures=0D;
	
	public mainInstrumentsService() {
		maininstrumentsmap.put("UV-Vis Spectrophotometer", 0.01);
        maininstrumentsmap.put("Raman Spectrometer", 0.01);
        maininstrumentsmap.put("HPLC", 0.2);
        maininstrumentsmap.put("UHPLC (UPLC)", 0.2);
        maininstrumentsmap.put("GC/MSD", 0.7);
        maininstrumentsmap.put("Triple Quadrupole GC/MS", 0.7);
        maininstrumentsmap.put("LC-MS", 0.8);
        maininstrumentsmap.put("GC", 0.4);
        maininstrumentsmap.put("Single Quadrupole GC-MS", 0.5);
        maininstrumentsmap.put("Triple Quadrupole LC/MS system", 1.3);
        maininstrumentsmap.put("HPLC-Prep", 1.2);
        maininstrumentsmap.put("ICP-OES", 0.3);
        maininstrumentsmap.put("ICP-MS", 0.4);
        maininstrumentsmap.put("CE", 0.3);
        maininstrumentsmap.put("CE-MS", 1.8);
        maininstrumentsmap.put("Portable CE", 0.1);
        maininstrumentsmap.put("Potentiometry", 0.01);
        maininstrumentsmap.put("FT-IR", 0.15);
        maininstrumentsmap.put("SFC", 0.8);
        maininstrumentsmap.put("SFC-Prep", 1.8);
        maininstrumentsmap.put("NMR", 2.3);
        maininstrumentsmap.put("XRD Diffractometer", 3.6);
        maininstrumentsmap.put("XRF-Spectrometer", 1.0);
        maininstrumentsmap.put("Automic absorption spectroscopy", 0.2);
        maininstrumentsmap.put("TOC Analyzer", 0.04);
        maininstrumentsmap.put("Nano Spectrophotometer", 0.02);
        maininstrumentsmap.put("Dissolution", 1.2);
	}
	
	//Method to find total mainInstruments Energy
  public Double getMainInstrumentsenergy(List<MainInstrument> maininstrumentdata) {
	  Double energy=0D;
	  Double energysum=0D;
	  Double time=0D;
	  Double noofinjections=0D;
	
	  
	  if(maininstrumentdata.size()>0) {
		  for (MainInstrument mainInstrumenttemp : maininstrumentdata) {
			  
			  //this conditions saparate the operation condition based on give prototype
			 if(mainInstrumenttemp.getInstrumentName().equals("HPLC") || mainInstrumenttemp.getInstrumentName().equals("UHPLC") || mainInstrumenttemp.getInstrumentName().equals("UPLC") || mainInstrumenttemp.getInstrumentName().equals("LC-MS") || mainInstrumenttemp.getInstrumentName().equals("GC") || mainInstrumenttemp.getInstrumentName().equals("LC-MS")) {
				  energy=maininstrumentsmap.get(mainInstrumenttemp.getInstrumentName());
				  if(energy==null)
					   energy=1.0;
				 time=mainInstrumenttemp.getOperatingConditions().get("run_time");
				  noofinjections=mainInstrumenttemp.getOperatingConditions().get("num_injections");
				  energysum+=(energy*time*noofinjections)/60;
				  noofinjectionandruntimefortab3+=time*noofinjections;
				  
				  
				  //bellow code is resposible for getting the values for caliculation of miniaothorization final result which is in tab2 but accissing in tab4 
				  
				           mainInstrumenttemp.getOperatingConditions().get("sample_temp");
				 
				  //Assigning the respeceted values for colomn length,sample and colmn teperatures based on the manuscript point number7
				  Integer manuscriptcolomnlegth=0;
				  Integer manuscriptcolomntemp=0;
				  Integer manuscriptsampletemp=0;
				  Double colomnlength=mainInstrumenttemp.getOperatingConditions().get("column_length");
				   
				   if(colomnlength>=250)
					   manuscriptcolomnlegth=0;
				   else if(colomnlength<=50)
					   manuscriptcolomnlegth=100;
				   else if(colomnlength<=100)
					   manuscriptcolomnlegth=75;
				   else if(colomnlength<=150)
					   manuscriptcolomnlegth=50;
				   else
					   manuscriptcolomnlegth=25;
				   
				   Double colomntemperature=mainInstrumenttemp.getOperatingConditions().get("column_temp");
				   
				   if(colomntemperature>=50)
					   manuscriptcolomntemp=0;
				   else if(colomntemperature>=40)
					   manuscriptcolomntemp=25;
				   else if(colomntemperature>=30)
					   manuscriptcolomntemp=50;
				   else
					   manuscriptcolomntemp=75;
				   
				   Double sampletemparature= mainInstrumenttemp.getOperatingConditions().get("sample_temp");
                  
                    if(sampletemparature<=5)
                    	manuscriptsampletemp=0;
                    else if(sampletemparature<=10)
                    	manuscriptsampletemp=25;
                    else if(sampletemparature<=15)
                    	manuscriptsampletemp=50;
                    else
                    	manuscriptsampletemp=75;
				  
                    averageoflengthcolumnsampletemperatures+=(manuscriptcolomnlegth+manuscriptcolomntemp+manuscriptsampletemp)/3;
				  
			 } 
			 else if(mainInstrumenttemp.getInstrumentName().equals("Dissolution") ){
				 energy=maininstrumentsmap.get(mainInstrumenttemp.getInstrumentName());
				 time=mainInstrumenttemp.getOperatingConditions().get("Time in minsn");
				 energysum+=(energy*time)/60;
				 
			 }
			 else if(mainInstrumenttemp.getInstrumentName().equals("NMR") || mainInstrumenttemp.getInstrumentName().equals("UV-Vis Spectrophotometer") || mainInstrumenttemp.getInstrumentName().equals("FT-IR")) {
				 energy=maininstrumentsmap.get(mainInstrumenttemp.getInstrumentName());
				 time=mainInstrumenttemp.getOperatingConditions().get("scan_time");
				  noofinjections=mainInstrumenttemp.getOperatingConditions().get("num_scans");
				  energysum+=(energy*time*noofinjections)/60;

				 
			 }
			 else {
				 energy=maininstrumentsmap.get(mainInstrumenttemp.getInstrumentName());
				 time=mainInstrumenttemp.getOperatingConditions().get("Time for of study");
				  noofinjections=mainInstrumenttemp.getOperatingConditions().get("Number of samles studied");
				  energysum+=(energy*time*noofinjections)/60;
			 }
		}
	  }
	 
	return energysum;
  }
  
  
  //Method to find efluentWaste 
  public Double getEfluentWaste(List<MainInstrument> maininstrumentdata) {
	  
	  Double effuentproduct=0D;
	  Double dissolution=0D;
	  Double frate=0D;
	  Double rtime=0D;
	  Double noofinjec=0D;
	  
	  for (MainInstrument mainInstrumenttemp : maininstrumentdata) {
		  if(mainInstrumenttemp.getInstrumentName().equals("HPLC") || mainInstrumenttemp.getInstrumentName().equals("UHPLC") || mainInstrumenttemp.getInstrumentName().equals("UPLC") || mainInstrumenttemp.getInstrumentName().equals("LC-MS") || mainInstrumenttemp.getInstrumentName().equals("GC") || mainInstrumenttemp.getInstrumentName().equals("LC-MS")) {
			  
			  frate=mainInstrumenttemp.getOperatingConditions().get("flow_rate");
			  rtime=mainInstrumenttemp.getOperatingConditions().get("run_time");
			  noofinjec=mainInstrumenttemp.getOperatingConditions().get("num_injections");
			  effuentproduct+=frate*rtime*noofinjec;
			  
			  
		 } 
		  else {
			  if(mainInstrumenttemp.getInstrumentName().equals("Dissolution")) {
				  dissolution+=mainInstrumenttemp.getOperatingConditions().get("Media Volume used for 6 bowls");
			  }
		  }
	}
	  
	  return effuentproduct+dissolution;
  }
  
  // Method for product of runtime and no.of injection for tab 3to caliculate Step 1 
  public Double getProductOfTimeAndInjections() {
	  return noofinjectionandruntimefortab3;
  }
  
  //method return the averages for of main instruments conditions used to caliculate mini aotherizationresult in tab2 but passing to tab4
  public Double getAverageOfLengthColomnSampletemeratures() {
	  return averageoflengthcolumnsampletemperatures;
  }
}
