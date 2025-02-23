import React, { createContext, useState } from "react";

// Create Context
export const FormContext = createContext();

// Provider Component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
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
