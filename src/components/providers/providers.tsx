"use client";

import { createStore, AppStore, myStore } from '@/src/store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { AuthState } from '@/src/featurs/auth/slices/auth.slice';

interface ProvidersProps {
  children: React.ReactNode;
  initialAuth?: AuthState;
}

export default function Providers({ children, initialAuth }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = initialAuth
      ? createStore({ auth: initialAuth })
      : myStore;
  }

  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </QueryClientProvider>
    </Provider>
  );
}
        
    
   
