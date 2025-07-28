// context/FormContext.js
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Tab1 Data
    title: '',
    standardsRows: 0,
    resolutionsRows: 0,
    samplesRows: 0,
    standardsData: [],
    resolutionsData: [],
    samplesData: [],

    // Tab2 Data
    generalInstrumentRows: 0,
    mainInstrumentsCount: 0,
    generalInstrumentData: [],
    mainInstrumentData: [],
    mainInstrumentTables: {},
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);