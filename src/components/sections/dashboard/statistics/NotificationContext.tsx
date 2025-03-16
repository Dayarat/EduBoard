// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface NotificationContextType {
//   notifications: string[];
//   addNotification: (message: string) => void;
//   clearNotifications: () => void;
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [notifications, setNotifications] = useState<string[]>([]);

//   const addNotification = (message: string) => {
//     setNotifications((prev) => [...prev, message]);
//   };

//   const clearNotifications = () => {
//     setNotifications([]);
//   };

//   return (
//     <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// // Custom Hook to use the Notification Context
// export const useNotifications = () => {
//   const context = useContext(NotificationContext);
//   if (!context) {
//     throw new Error('useNotifications must be used within a NotificationProvider');
//   }
//   return context;
// };
