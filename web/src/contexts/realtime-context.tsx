'use client'

import { User } from "next-auth";
import { createContext, useContext, useState } from "react";

type RealtimeContext = {
  users: User[];
}

const RealtimeContext = createContext<RealtimeContext | null>(null);

export function Realtime({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<User[]>([]);

  return (
    <RealtimeContext.Provider value={{ users: data }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtimeContext() {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error("useRealtimeContext must be used within a RealtimeProvider");
  }
  return context;
}