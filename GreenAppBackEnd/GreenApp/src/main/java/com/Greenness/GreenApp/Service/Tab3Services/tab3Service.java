package com.Greenness.GreenApp.Service.Tab3Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Greenness.GreenApp.Service.preReportResultsService;
import com.Greenness.GreenApp.Service.Tab2Services.mainInstrumentsService;
import com.Greenness.GreenApp.model.tabThreeDataClass;

@Service
public class tab3Service {
	@Autowired
	noOfChemicalServices chemicalservices;
	@Autowired
	noOfGasesService gasesservices;
	@Autowired
	preReportResultsService prereportfinalresult;
	@Autowired
	mainInstrumentsService maininstrumentservice;
	
	Integer chemicalnfpahealthaverage=0;
	Integer chemicalnfpaFlemabilityaverage=0;
	Double chemicalphysicalHazardaverage=0D;
	
	Integer gasesnfpahealthaverage=0;
	Integer gasesnfpaflemmabilityaverage=0;
	Double gasespgysicalhazaedaverage=0D;
	
	tabThreeDataClass  tabthreedataforgasesclac;
	
	//this list of step1 values of nfpsHealthValue used in finding total waste generated field used to caliculate final waste result on prefinalReport
	List<Double> step1nfpahealthvaluelist=new  ArrayList<>();
	
	public void getTab3Services(tabThreeDataClass tabthreedata) {
		
		tabthreedataforgasesclac=tabthreedata;
		chemicalnfpahealthaverage=chemicalservices.getChemicalNfpaHeathAverage(tabthreedata.getNumberOfChemicals().getNfpaHealthValue());
		System.out.println("chemicalhealth average :"+chemicalnfpahealthaverage);
		
		chemicalnfpaFlemabilityaverage=chemicalservices.getChemicalNfpaFlemmabilityAverage(tabthreedata.getNumberOfChemicals().getNfpaFlammabilityValue());
		System.out.println("chemicalflemability average :"+chemicalnfpaFlemabilityaverage);
		
		chemicalphysicalHazardaverage=chemicalservices.getChemicalPhysicalHazardAverage(tabthreedata.getNumberOfChemicals().getPhysicalHazardValue());
		System.out.println("chemicalphysicalhazardaverage  :"+chemicalphysicalHazardaverage);
	}
	
	public void getNoofGasesServices(Integer noofanalyticsstudied) {
		//we are using clear method for crearing previous request data for avoiding error called adding data angain instead of replacing with new requesting data
         gasesnfpaflemmabilityaverage=0;
         gasesnfpahealthaverage=0;
         gasespgysicalhazaedaverage=0D;
         
		
		//function call for finding the gasesnfpshealthaverage 
		gasesnfpahealthaverage=gasesservices.getGasesNfpahealthAndFlemmabilityAverage(tabthreedataforgasesclac.getNumberOfGases().getNfpaHealthValue(),noofanalyticsstudied);
		System.out.println("gasesnfpahealth average :"+gasesnfpahealthaverage);
		
		//this bellow code represents getting nfpahealthvaluelist(used to calicilate total waste generated) from step1 in calicilation of nfpahealthvalu average 
		Double timeandinjectionsproduct=maininstrumentservice.getProductOfTimeAndInjections();
		step1nfpahealthvaluelist=gasesservices.step1(tabthreedataforgasesclac.getNumberOfGases().getNfpaHealthValue(),timeandinjectionsproduct);
		
		//we are using the same function call for gaesnfpaFlMMEBILITY also whay because the functionality of both are same
		
		gasesnfpaflemmabilityaverage=gasesservices.getGasesNfpahealthAndFlemmabilityAverage(tabthreedataforgasesclac.getNumberOfGases().getNfpaFlammabilityValue(), noofanalyticsstudied);
		System.out.println("gasesnfpaflemmability average :"+gasesnfpaflemmabilityaverage);
		
		//method call for finding physicalhazard average value
		gasespgysicalhazaedaverage=gasesservices.getGasesPhysicalHazardAverage(tabthreedataforgasesclac.getNumberOfGases().getPhysicalHazardValue());
		System.out.println("gasesPhysical Hazard Average :"+gasespgysicalhazaedaverage);
		
		//method call for  operationsaftyresult  preResultReport 
		prereportfinalresult.getOperationSaftyFinalResult(chemicalphysicalHazardaverage, gasespgysicalhazaedaverage);
		
		//method call for  setting hazarduschemical result in preResultReport so passing required one
		prereportfinalresult.setHazardusChemicalResult(chemicalnfpahealthaverage,chemicalnfpaFlemabilityaverage,gasesnfpahealthaverage,gasesnfpaflemmabilityaverage);
		
	}
	
	//method used to pass nfpshealvalue step1 result list
	public List<Double> getstep1nfpahealthvalueforgases() {
		return step1nfpahealthvaluelist;
	}
	
	
	
}
