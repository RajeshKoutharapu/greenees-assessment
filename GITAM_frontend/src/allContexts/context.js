import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: '',
    standardsRows: 0,
    resolutionsRows: 0,
    samplesRows: 0,
    standardsData: [],
    resolutionsData: [],
    samplesData: [],
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

