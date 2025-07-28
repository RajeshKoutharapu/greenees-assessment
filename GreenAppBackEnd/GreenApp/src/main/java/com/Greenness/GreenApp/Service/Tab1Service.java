package com.Greenness.GreenApp.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.Greenness.GreenApp.model.tabOneDataClass;
import com.Greenness.GreenApp.model.tabOneDataClass.Resolution;
import com.Greenness.GreenApp.model.tabOneDataClass.Sample;
import com.Greenness.GreenApp.model.tabOneDataClass.Standard;

@Service
public class Tab1Service {

	
	 Map<String,Integer> filterationvalue =new HashMap<>();
	 Map<String,Double> tab1calcvalues =new HashMap<>();
	 
	  //Calculating Filtartion And  preparation waste ml or g
	  Double filtartionsum;
	  Double WeightVolumesum;
	  
	  //variable uded to store number of solutions used colomn for fina report data gathering
	  Integer numberofsolutionsprepared=0;
	 
	 public Tab1Service() {
		 filterationvalue.put("None",100);
		 filterationvalue.put("Sedimentation",75);
		 filterationvalue.put("Centrifuge",50);
		 filterationvalue.put("Membrane filtration",25);
		 filterationvalue.put("Centrifuge + filtration",0);
	 }
	
	
	public void Tab1DataService(tabOneDataClass tabonedata) {
		
		//we are using clear method for crearing previous request data for avoiding error called adding data angain instead of replacing with new requesting data
		tab1calcvalues.clear();
		try {
		numberofsolutionsprepared=tabonedata.getResolutions().size()+tabonedata.getSamples().size()+tabonedata.getStandards().size();
		}
		catch(Exception e) {
			numberofsolutionsprepared=0;
		}
		
	tab1calc(tabonedata.getStandards(),tabonedata.getResolutions(),tabonedata.getSamples());
	
	//printing outputs of tab1
	System.out.println(tab1calcvalues);
		
	}
	
	  public void tab1calc(List<Standard> standard ,List<Resolution> resolution,List<Sample> sample) {
		  filtartionsum=0D;
		  WeightVolumesum=0D;
		  
		
		  if(sample.size()>0) {
		  for (Sample sample2 : sample) {
			   filtartionsum+=filterationvalue.get(sample2.getFiltration());
			   WeightVolumesum+=sample2.getVolume()+sample2.getWeight();
		}
		  }
		 if(resolution.size()>0) {
		  for(Resolution resol:resolution) {
			  filtartionsum+=filterationvalue.get(resol.getFiltration());
			  WeightVolumesum+=resol.getVolume()+resol.getWeight();
		  }
		 }
		 
		 if(standard.size()>0) {
		  for(Standard stand:standard) {
			  filtartionsum+=filterationvalue.get(stand.getFiltration());
			  WeightVolumesum+=stand.getVolume()+stand.getWeight();  
		  }
		 }
		 Integer temp=standard.size()+resolution.size()+sample.size();
		  Double avg=filtartionsum/temp;
		  
		  
		  //adding filtration average to map
		  tab1calcvalues.put("filtrationavarage",avg);
		  tab1calcvalues.put("preperaionwaste",WeightVolumesum);
		  
	  }
	  
	  //created method for tab3 to caluculate total waste return the wate generated in tab1
	  public Double getWasteVolume() {
		  return tab1calcvalues.get("preperaionwaste");
	  }
	 
	  //this method is used by the finareport class for gathering information about final report
	  public Integer getNumberofSolutionsPrepared() {
		  
		  return numberofsolutionsprepared;
	  }
}
