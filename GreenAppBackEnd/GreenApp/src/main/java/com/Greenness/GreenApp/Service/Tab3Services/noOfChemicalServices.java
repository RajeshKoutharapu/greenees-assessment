package com.Greenness.GreenApp.Service.Tab3Services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class noOfChemicalServices {
	Double healthtemp=0D;
	Double flemmabilitytemp=0D;
	Double physicalhazardtemp=0D;
	
	Map<String,Integer> nfpahealtflemabilityhmap=new HashMap<>();
	Map<String,Integer> signalwordmap=new HashMap<>();
	Map<String,Integer> physicalhazardhmap=new HashMap<>();



	public noOfChemicalServices() {
		nfpahealtflemabilityhmap.put("0",100);
		nfpahealtflemabilityhmap.put("1",75);
		nfpahealtflemabilityhmap.put("2",50);
		nfpahealtflemabilityhmap.put("3",25);
		nfpahealtflemabilityhmap.put("4",0);
		signalwordmap.put("Danger",0);
		signalwordmap.put("warning",33);
		signalwordmap.put("Caution",66);
		signalwordmap.put("not mentioned",100);
	   physicalhazardhmap.put("SA",0);     
	   physicalhazardhmap.put("OX",33);
	   physicalhazardhmap.put("W",66);
	   physicalhazardhmap.put("N/A",100);


	}
	
	public Integer getChemicalNfpaHeathAverage( List<List<String>> healthvalue) {
		//we are assigning 0 coz crearing previous request data for avoiding error called adding data angain instead of replacing with new requesting data
         healthtemp=0D;
		
		for(int i=0;i<healthvalue.size();i++) {
			
				healthtemp+=(nfpahealtflemabilityhmap.get(healthvalue.get(i).get(1))*Double.parseDouble(healthvalue.get(i).get(2)))/100;
			
		}
		System.out.println((int) Math.round( healthtemp/healthvalue.size()));
		
		return (int) Math.round( healthtemp/healthvalue.size());
		
	}
	public Integer getChemicalNfpaFlemmabilityAverage(List<List<String>> flemmabilityvalue) {
		//we are using clear method for crearing previous request data for avoiding error called adding data angain instead of replacing with new requesting data
        flemmabilitytemp=0D;
		for(int i=0;i<flemmabilityvalue.size();i++) {
			flemmabilitytemp+=(nfpahealtflemabilityhmap.get(flemmabilityvalue.get(i).get(1))*Double.parseDouble(flemmabilityvalue.get(i).get(2)))/100;
		}
		System.out.println((int) Math.round(flemmabilitytemp/flemmabilityvalue.size()));
		return (int) Math.round(flemmabilitytemp/flemmabilityvalue.size());

	}
	public Double getChemicalPhysicalHazardAverage(List<List<String>> physicalhazardvalue) {
		 Integer phsum=0;
		Integer swsum=0;
		Double phaverage=0D,swaverage=0D;
		for(int i=0;i<physicalhazardvalue.size();i++) {
			 phsum+=physicalhazardhmap.get(physicalhazardvalue.get(i).get(1));
			 swsum+=signalwordmap.get(physicalhazardvalue.get(i).get(2));
         }
		if(0<physicalhazardvalue.size()) {
		 phaverage=(double) (phsum/physicalhazardvalue.size());
		 swaverage=(double) (swsum/physicalhazardvalue.size());
	
		}
		return (phaverage+swaverage)/2;

	}
}
