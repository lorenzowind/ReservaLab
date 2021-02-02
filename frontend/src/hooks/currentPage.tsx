import React, { createContext, useCallback, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

interface CurrentPageContextData {
  page: string;
  setCurrentPage(newPage: string): void;
}

const CurrentPageContext = createContext<CurrentPageContextData>(
  {} as CurrentPageContextData,
);

const CurrentPageProvider: React.FC = ({ children }) => {
  const location = useLocation();

  const [page, setPage] = useState(location.pathname);

  const setCurrentPage = useCallback((newPage: string) => {
    setPage(newPage);
  }, []);

  return (
    <CurrentPageContext.Provider
      value={{
        page,
        setCurrentPage,
      }}
    >
      {children}
    </CurrentPageContext.Provider>
  );
};

function useCurrentPage(): CurrentPageContextData {
  const context = useContext(CurrentPageContext);

  if (!context) {
    throw new Error(
      'useCurrentPage must be used within an CurrentPageProvider',
    );
  }

  return context;
}

export { CurrentPageProvider, useCurrentPage };
