import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { CurrentPageProvider } from './currentPage';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <CurrentPageProvider>{children}</CurrentPageProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
