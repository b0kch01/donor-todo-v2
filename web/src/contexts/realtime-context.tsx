'use client'

import { createUser, randomUser } from "@/actions/db";
import { Person } from "@prisma/client";
import { create } from "domain";
import { createContext, useContext, useEffect, useOptimistic, useState } from "react";
import { io } from "socket.io-client";

type RealtimeContext = {
  users: Person[];
  createRandomPerson: () => void;
  addOptimisticData: (data: DataEdit) => void;
}

type DataSet = {
  type: "set";
  data: Person[];
}

type DataEdit = {
  type: "delete" | "create";
  data: Person;
}

const RealtimeContext = createContext<RealtimeContext | null>(null);

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}/secure`, { withCredentials: true })

export function Realtime({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Person[]>([]);
  const [optimisticData, addOptimisticData] = useOptimistic(
    data,
    (currentData: Person[], newData: DataEdit) => {
      if (newData.type === 'create') {
        return [...currentData, newData.data]
      }
      else if (newData.type === 'delete') {
        return currentData.filter((person: Person) => person.PersonID !== newData.data.PersonID)
      }
      return currentData
    }
  );

  const createRandomPerson = async () => {
    const user = await randomUser()
    addOptimisticData({
      type: 'create', data: {
        ...user,
        PersonID: Math.max(...data.map(person => person.PersonID), 0) + 1
      }
    })
    await createUser(user)
    //  sleep for a second
    // await new Promise(resolve => setTimeout(resolve, 2000))
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected to server")
    })

    socket.on('update', (payload: DataEdit | DataSet) => {
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
    <RealtimeContext.Provider value={{
      users: optimisticData,
      createRandomPerson,
      addOptimisticData
    }}>
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