import { createContext } from "react"

interface WalletContextType {
    collapsed: boolean;
    toggleMenu: () => void;
}

const defaultContext: WalletContextType = {
    collapsed: false,
    toggleMenu: () => { }
}

export const WalletContext = createContext<WalletContextType>(defaultContext)