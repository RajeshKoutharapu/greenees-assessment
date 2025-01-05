package com.Greenness.GreenApp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class tabThreeDataClass {
    @JsonProperty("NumberOfChemicals")
    private NumberOfChemicals numberOfChemicals;

    @JsonProperty("NumberOfGases")
    private NumberOfGases numberOfGases;

    // Getters and Setters
    public NumberOfChemicals getNumberOfChemicals() {
        return numberOfChemicals;
    }

    public void setNumberOfChemicals(NumberOfChemicals numberOfChemicals) {
        this.numberOfChemicals = numberOfChemicals;
    }

    public NumberOfGases getNumberOfGases() {
        return numberOfGases;
    }

    public void setNumberOfGases(NumberOfGases numberOfGases) {
        this.numberOfGases = numberOfGases;
    }

	@Override
	public String toString() {
		return "tabThreeDataClass [numberOfChemicals=" + numberOfChemicals + ", numberOfGases=" + numberOfGases
				+ ", getNumberOfChemicals()=" + getNumberOfChemicals() + ", getNumberOfGases()=" + getNumberOfGases()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}
    
}
