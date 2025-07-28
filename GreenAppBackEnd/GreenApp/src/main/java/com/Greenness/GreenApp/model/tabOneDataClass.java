package com.Greenness.GreenApp.model;

import java.util.List;

import java.util.List;

public class tabOneDataClass {
    private String title;
    private List<Standard> standards;
    private List<Resolution> resolutions;
    private List<Sample> samples;

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Standard> getStandards() {
        return standards;
    }

    public void setStandards(List<Standard> standards) {
        this.standards = standards;
    }

    public List<Resolution> getResolutions() {
        return resolutions;
    }

    public void setResolutions(List<Resolution> resolutions) {
        this.resolutions = resolutions;
    }

    public List<Sample> getSamples() {
        return samples;
    }

    public void setSamples(List<Sample> samples) {
        this.samples = samples;
    }

    public static class Standard {
        private Double weight;
        private Double volume;
        private String filtration;

        // Getters and Setters
        public Double getWeight() {
            return weight;
        }

        public void setWeight(Double weight) {
            this.weight = weight;
        }

        public Double getVolume() {
            return volume;
        }

        public void setVolume(Double volume) {
            this.volume = volume;
        }

        public String getFiltration() {
            return filtration;
        }

        public void setFiltration(String filtration) {
            this.filtration = filtration;
        }
    }

    public static class Resolution {
        private Double weight;
        private Double volume;
        private String filtration;

        // Getters and Setters
        public Double getWeight() {
            return weight;
        }

        public void setWeight(Double weight) {
            this.weight = weight;
        }

        public Double getVolume() {
            return volume;
        }

        public void setVolume(Double volume) {
            this.volume = volume;
        }

        public String getFiltration() {
            return filtration;
        }

        public void setFiltration(String filtration) {
            this.filtration = filtration;
        }
    }

    public static class Sample {
        private Double weight;
        private Double volume;
        private String filtration;

        // Getters and Setters
        public Double getWeight() {
            return weight;
        }

        public void setWeight(Double weight) {
            this.weight = weight;
        }

        public Double getVolume() {
            return volume;
        }

        public void setVolume(Double volume) {
            this.volume = volume;
        }

        public String getFiltration() {
            return filtration;
        }

        public void setFiltration(String filtration) {
            this.filtration = filtration;
        }
    }
}
