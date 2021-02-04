import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { CurrentPageProvider } from './currentPage';
import { SubjectsProvider } from './subjects';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <CurrentPageProvider>
        <SubjectsProvider>{children}</SubjectsProvider>
      </CurrentPageProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
