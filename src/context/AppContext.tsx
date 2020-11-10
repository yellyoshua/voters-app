import React, { ReactNode } from "react";
import { TypeSchool } from "types/appTypes";
import school_config from "configurations/school";

export const useApp = () => {
  const school = React.useContext(SchoolContext);
  return { school };
}

export const SchoolContext = React.createContext<TypeSchool>(school_config);

export default function UserContextProvider({ children }: { children: ReactNode }) {

  return (
    <SchoolContext.Provider value={school_config}>
      {children}
    </SchoolContext.Provider>
  );
}