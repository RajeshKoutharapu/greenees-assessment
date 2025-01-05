package com.Greenness.GreenApp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NumberOfGases {
	 @JsonProperty("NfpaHealthValue")
    private List<List<String>> NfpaHealthValue;
	 @JsonProperty("NfpaFlammabilityValue")
    private List<List<String>> NfpaFlammabilityValue;
	   @JsonProperty("PhysicalHazardValue")
    private List<List<String>> PhysicalHazardValue;

    // Getters and Setters
    public List<List<String>> getNfpaHealthValue() {
        return NfpaHealthValue;
    }

    public void setNfpaHealthValue(List<List<String>> nfpaHealthValue) {
        NfpaHealthValue = nfpaHealthValue;
    }

    public List<List<String>> getNfpaFlammabilityValue() {
        return NfpaFlammabilityValue;
    }

    public void setNfpaFlammabilityValue(List<List<String>> nfpaFlammabilityValue) {
        NfpaFlammabilityValue = nfpaFlammabilityValue;
    }

    public List<List<String>> getPhysicalHazardValue() {
        return PhysicalHazardValue;
    }

    public void setPhysicalHazardValue(List<List<String>> physicalHazardValue) {
        PhysicalHazardValue = physicalHazardValue;
    }
}