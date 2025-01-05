package com.Greenness.GreenApp.model;

import java.util.List;

public class tabTwoDataClass {
    private List<GeneralInstrument> generalInstruments;
    private List<MainInstrument> mainInstruments;

    // Getters and setters
    public List<GeneralInstrument> getGeneralInstruments() {
        return generalInstruments;
    }

    public void setGeneralInstruments(List<GeneralInstrument> generalInstruments) {
        this.generalInstruments = generalInstruments;
    }

    public List<MainInstrument> getMainInstruments() {
        return mainInstruments;
    }

    public void setMainInstruments(List<MainInstrument> mainInstruments) {
        this.mainInstruments = mainInstruments;
    }
}

