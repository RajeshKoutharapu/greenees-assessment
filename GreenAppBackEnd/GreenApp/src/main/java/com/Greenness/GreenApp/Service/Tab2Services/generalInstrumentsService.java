package com.Greenness.GreenApp.Service.Tab2Services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.Greenness.GreenApp.model.GeneralInstrument;

@Component
public class generalInstrumentsService {
	
	Map<String,Double> generalinstrumentmap=new HashMap<>();

	public generalInstrumentsService() {
		generalinstrumentmap.put("(-)40°C freezer", 0.40);
        generalinstrumentmap.put("Incubated and Refrigerated Benchtop Shaker", 0.47);
        generalinstrumentmap.put("Ultra-Low Freezers", 0.53);
        generalinstrumentmap.put("Conductivity meter", 0.004);
        generalinstrumentmap.put("pH meter", 0.004);
        generalinstrumentmap.put("Autoclave", 1.29);
        generalinstrumentmap.put("Solutions Remediator", 0.21);
        generalinstrumentmap.put("Balance", 0.004);
        generalinstrumentmap.put("Fume hood", 4.79);
        generalinstrumentmap.put("Gas laser", 0.63);
        generalinstrumentmap.put("Cold Centrifuges", 0.23);
        generalinstrumentmap.put("Centrifuges", 0.01);
        generalinstrumentmap.put("Refrigerators", 0.033);
        generalinstrumentmap.put("Microscopes", 0.25);
        generalinstrumentmap.put("Tissue Culture Hoods, UV light", 0.025);
        generalinstrumentmap.put("Water bath", 0.5);
        generalinstrumentmap.put("Hot plate with stirrer", 1.02);
        generalinstrumentmap.put("Magnetic stirrer", 1.02);
        generalinstrumentmap.put("Orbitol shaker", 0.75);
        generalinstrumentmap.put("Vortex mixer", 0.06);
        generalinstrumentmap.put("Sonicator", 2.4);
        generalinstrumentmap.put("Stroboscope", 0.05);
        generalinstrumentmap.put("Sample Concentrator", 0.5);
        generalinstrumentmap.put("Slide Dryer", 0.35);
        generalinstrumentmap.put("Hot air oven", 1.1);
        generalinstrumentmap.put("Osmometer", 0.08);
        generalinstrumentmap.put("Nucleic Acid Purification System", 0.3);
        generalinstrumentmap.put("Nucleic Acid Extraction System", 0.5);
        generalinstrumentmap.put("Microwave Digestion System", 1.6);
        generalinstrumentmap.put("Vertical Laminar Flow Cabinet", 0.35);
        generalinstrumentmap.put("IR Carbon and Sulphur Analyzer", 0.22);
        generalinstrumentmap.put("Chemiluminescent Immunoassay Analyzer", 1.0);
        generalinstrumentmap.put("Hybridization Oven", 0.6);
        generalinstrumentmap.put("Homogenizer", 0.11);
        generalinstrumentmap.put("Gel Strength Test System", 0.06);
        generalinstrumentmap.put("Flammability Tester", 0.5);
        generalinstrumentmap.put("Flame Photometer", 0.25);
        generalinstrumentmap.put("Differential Scanning Calorimeter", 2.0);
        generalinstrumentmap.put("Dehumidifier", 0.28);
        generalinstrumentmap.put("Amino Acid Analyzer", 0.21);
        generalinstrumentmap.put("Alloy Analyzer", 0.15);
        generalinstrumentmap.put("Water Bath Shakers", 2.0);
        generalinstrumentmap.put("Ubbelohde Viscometer", 0.13);
        generalinstrumentmap.put("Tube Roller Mixer", 0.03);
        generalinstrumentmap.put("Melting Point Apparatus", 0.12);
        generalinstrumentmap.put("Tap Density Tester", 0.04);
        generalinstrumentmap.put("Tablet Hardness Testers", 0.04);
        generalinstrumentmap.put("Sulphur Content Tester", 0.03);
        generalinstrumentmap.put("Specific Gravity Tester", 0.03);
        generalinstrumentmap.put("Peristaltic Pump", 0.06);
        generalinstrumentmap.put("Vacuum Pump", 0.12);
        generalinstrumentmap.put("Milk Fat Analyzer", 0.50);
        generalinstrumentmap.put("Milk Analyzer", 0.04);
        generalinstrumentmap.put("Polarimeter", 0.25);
        generalinstrumentmap.put("Liquid Suction Filtration Vacuum Pump", 0.01);
        generalinstrumentmap.put("Liquid nitrogen freezer", 0.12);
        generalinstrumentmap.put("Disintegration Tester", 0.60);
        generalinstrumentmap.put("Flow Meter and Electronic Leak Detector", 0.004);
		
	}
	
	//Method to find the general instruments total energy
	public Double generalInstrumentenEnergy(List<GeneralInstrument> generalinstrument) {
		Double totalenergy=0D;
		  
		if(generalinstrument.size()>0) {
			for (GeneralInstrument generalInstrumenttemp : generalinstrument) {
				
			Double energy=generalinstrumentmap.get(generalInstrumenttemp.getInstrument());
			totalenergy+=(energy*generalInstrumenttemp.getTime())/60;
				
			}
		}
		
		
		return totalenergy;
	}
	
}
