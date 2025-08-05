 // src/context/AlertContext.js
import React, { createContext, useContext, useState } from 'react';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    message: '',
    subtext: '',
    visible: false,
    type: 'success',
  });

  const showAlert = (message, subtext = '', type = 'success') => {
    setAlert({ message, subtext, visible: true, type });
    setTimeout(() => {
      setAlert({ message: '', subtext: '', visible: false, type: 'error' });
    }, 3000);
  };

  const icon =
    alert.type === 'success' ? (
      <FaRegCircleCheck className="text-green-500 w-12 h-12" />
    ) : (
      <FaRegCircleXmark className="text-red-500 w-12 h-12" />
    );

  const iconBg = alert.type === 'success' ? 'bg-green-100' : 'bg-red-100';

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {alert.visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300"></div>

          <div className="relative z-10 max-w-sm w-full p-6 bg-white rounded-3xl shadow-2xl text-center animate-fade-in-out transition-all duration-300">
            <div className="flex flex-col items-center space-y-4">
              <div className={`p-4 rounded-full ${iconBg}`}>
                {icon}
              </div>

              <h2 className="text-xl font-bold text-gray-800">{alert.message}</h2>

              {alert.subtext && (
                <p className="text-gray-600 text-sm">{alert.subtext}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};
