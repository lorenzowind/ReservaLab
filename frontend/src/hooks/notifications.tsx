import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import api from '../services/api';

export interface NotificationsState {
  id: string;
  type: 'schedules' | 'support' | 'programs';
  description: string;
  recipient_user_id: string;
  sender_user_id: string;
  created_at: Date;
}

interface NotificationsContextData {
  notifications: NotificationsState[];
  getNotifications(): void;
}

function sortNotifications(notifications: NotificationsState[]) {
  const auxNotifications = notifications;

  for (let i = 1; i < auxNotifications.length; i += 1) {
    for (let j = 0; j < auxNotifications.length - i; j += 1) {
      if (auxNotifications[j].created_at > auxNotifications[j + 1].created_at) {
        const auxNotification = auxNotifications[j];
        auxNotifications[j] = auxNotifications[j + 1];
        auxNotifications[j + 1] = auxNotification;
      }
    }
  }

  return auxNotifications;
}

const NotificationsContext = createContext<NotificationsContextData>(
  {} as NotificationsContextData,
);

const NotificationsProvider: React.FC = ({ children }) => {
  const [currentNotifications, setCurrentNotifications] = useState<
    NotificationsState[]
  >([]);

  const getNotifications = useCallback(async () => {
    const response = await api.get<NotificationsState[]>('notifications');

    setCurrentNotifications(sortNotifications(response.data));
  }, []);

  useEffect(() => {
    if (!currentNotifications.length) {
      getNotifications();
    }
  }, [currentNotifications, getNotifications]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications: currentNotifications,
        getNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

function useNotifications(): NotificationsContextData {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error(
      'useNotifications must be used within an NotificationsProvider',
    );
  }

  return context;
}

export { NotificationsProvider, useNotifications };
