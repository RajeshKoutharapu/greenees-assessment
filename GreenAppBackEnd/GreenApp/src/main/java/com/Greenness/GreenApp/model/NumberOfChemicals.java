package com.Greenness.GreenApp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class NumberOfChemicals {

    @JsonProperty("NfpaHealthValue")
    private List<List<String>> nfpaHealthValue;

    @JsonProperty("NfpaFlammabilityValue")
    private List<List<String>> nfpaFlammabilityValue;

    @JsonProperty("PhysicalHazardValue")
    private List<List<String>> physicalHazardValue;

    // Getters and Setters
    public List<List<String>> getNfpaHealthValue() {
        return nfpaHealthValue;
    }

    public void setNfpaHealthValue(List<List<String>> nfpaHealthValue) {
        this.nfpaHealthValue = nfpaHealthValue;
    }

    public List<List<String>> getNfpaFlammabilityValue() {
        return nfpaFlammabilityValue;
    }

    public void setNfpaFlammabilityValue(List<List<String>> nfpaFlammabilityValue) {
        this.nfpaFlammabilityValue = nfpaFlammabilityValue;
    }

    public List<List<String>> getPhysicalHazardValue() {
        return physicalHazardValue;
    }

    public void setPhysicalHazardValue(List<List<String>> physicalHazardValue) {
        this.physicalHazardValue = physicalHazardValue;
    }
}
