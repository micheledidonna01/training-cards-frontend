import { createContext } from "react";
import useSchede from "../customhooks/useSchede";

export const SchedeContext = createContext();

export function SchedeContextProvider({children}){

    const {
        getSchede,
        schede,
        setSchede,
        esercizi,
        getEsercizi
    } = useSchede();

    return (
        <SchedeContext.Provider value={{
            getSchede,
            schede,
            setSchede,
            esercizi,
            getEsercizi
        }}>
            {children}
        </SchedeContext.Provider>
    )
};
