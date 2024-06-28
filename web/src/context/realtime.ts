'use client'

import { createContext, useContext, useState } from "react";

const RealtimeContext = createContext();

export function Realtime({ children }) {
  const [data, setData] = useState([]);

  return (
    <RealtimeContext.Provider value= {{ data }
}>
  { children }
  </RealtimeContext.Provider>
  );
}