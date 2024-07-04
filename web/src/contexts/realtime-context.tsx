'use client'

import { Person } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

type RealtimeContext = {
  users: Person[];
}

const RealtimeContext = createContext<RealtimeContext | null>(null);

const socket = io("http://localhost:3001/secure", { withCredentials: true })

export function Realtime({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Person[]>([]);

  useEffect(() => {

    socket.on('connect', () => {
      console.log("Connected to server")
    })

    socket.on('update', (payload: { type: "delete" | "create", data: Person } | { type: "set", data: Person[] }) => {
      console.log("Got update from server", payload)

      if (payload.type === 'set') {
        setData(payload.data)
      }
      else if (payload.type === 'create') {
        setData(data => [...data, payload.data])
      }
      else if (payload.type === 'delete') {
        setData(data => data.filter((person: Person) => person.PersonID !== payload.data.PersonID))
      }
    })

    return () => {
      console.log("Disconnecting from server")
      socket.disconnect()
    }
  }, [])

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