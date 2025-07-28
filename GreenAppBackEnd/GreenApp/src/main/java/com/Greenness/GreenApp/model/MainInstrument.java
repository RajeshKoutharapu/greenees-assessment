package com.Greenness.GreenApp.model;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MainInstrument {
	@JsonProperty("instrument")
    private String instrumentName; // Name of the instrument, e.g., LC-MS, NMR
	@JsonProperty("data")
    private Map<String, Double> operatingConditions; // Key-value pairs of condition names and their values

    // Constructors
    public MainInstrument() {}

    public MainInstrument(String instrumentName, Map<String,Double> operatingConditions) {
        this.instrumentName = instrumentName;
        this.operatingConditions = operatingConditions;
    }

    // Getters and Setters
    public String getInstrumentName() {
        return instrumentName;
    }

    public void setInstrumentName(String instrumentName) {
        this.instrumentName = instrumentName;
    }

    public Map<String, Double> getOperatingConditions() {
        return operatingConditions;
    }

    public void setOperatingConditions(Map<String, Double> operatingConditions) {
        this.operatingConditions = operatingConditions;
    }

    // toString method for debugging
    @Override
    public String toString() {
        return "MainInstrument{" +
                "instrumentName='" + instrumentName + '\'' +
                ", operatingConditions=" + operatingConditions +
                '}';
    }
}
