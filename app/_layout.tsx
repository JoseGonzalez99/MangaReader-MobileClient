import { Slot } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import React from 'react';
import { verifyInstallation } from 'nativewind';

import "../global.css"

export default function RootLayout() {
     // Ensure to call inside a component, not globally
     verifyInstallation();
  return (
    <AuthProvider>
      <Slot  />
    </AuthProvider>
  );
}
