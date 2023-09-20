import { createContext, useContext, useEffect, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe ser usado dentro de un AlertProvider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AlertProvider = ({ children }) => {
  const [alertConfig, setAlertInternalConfig] = useState({
    show: false,
    status: 'success',
    title: 'Alerta',
    message: 'Alerta',
    timeOff:3000
  });

  const setAlertConfig= (config) => {
    setAlertInternalConfig({ ...alertConfig, ...config });
  }

  useEffect(() => {
    if (alertConfig.show) {
      const timeout = setTimeout(() => {
        setAlertInternalConfig({
          show: false,
          status: 'success',
          title: 'Alerta',
          message: 'Alerta',
          timeOff:3000
        });
      }, alertConfig.timeOff);

      return () => {
        clearTimeout(timeout);
      };
    }
  },[alertConfig])
  
  return (
    <AlertContext.Provider value={{ setAlertConfig, alertConfig }}>
      {children}
    </AlertContext.Provider>
  );
};
