import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { CurrentPageProvider } from './currentPage';
import { SubjectsProvider } from './subjects';
import { ClassroomsProvider } from './classrooms';
import { LaboratoriesProvider } from './laboratories';
import { SchedulesProvider } from './schedules';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <CurrentPageProvider>
        <SubjectsProvider>
          <ClassroomsProvider>
            <LaboratoriesProvider>
              <SchedulesProvider>{children}</SchedulesProvider>
            </LaboratoriesProvider>
          </ClassroomsProvider>
        </SubjectsProvider>
      </CurrentPageProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
