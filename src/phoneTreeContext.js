import { createContext, useState } from "react";

const PhoneTreeContext = createContext({});

export function PhoneTreeProvider({ children }) {
  const [parent, setParent] = useState(null);
  return (
    <PhoneTreeContext.Provider value={{ parent, setParent }}>
      {children}
    </PhoneTreeContext.Provider>
  );
}

export default PhoneTreeContext;
