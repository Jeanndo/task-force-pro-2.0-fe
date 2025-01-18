import { createContext } from "react"

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

const defaultValue: ThemeContextType = {
    theme: 'light',
    toggleTheme: () => { }
}


export const ThemeContext = createContext<ThemeContextType>(defaultValue)