import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { CurrentPageProvider } from './currentPage';
import { SubjectsProvider } from './subjects';
import { ClassroomsProvider } from './classrooms';
import { LaboratoriesProvider } from './laboratories';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <CurrentPageProvider>
        <SubjectsProvider>
          <ClassroomsProvider>
            <LaboratoriesProvider>{children}</LaboratoriesProvider>
          </ClassroomsProvider>
        </SubjectsProvider>
      </CurrentPageProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
