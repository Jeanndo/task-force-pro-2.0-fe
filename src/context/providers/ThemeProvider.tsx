'use client'
import { useEffect, useState } from 'react'
import { Children } from '@/lib/Interfaces'
import { ThemeContext } from '../themeContext'


const ThemeProvider = ({ children }: Children) => {

    const [theme, setTheme] = useState<string>('light')

    const toggleTheme = () => {
        setTheme((prev) => prev === "light" ? "dark" : "light")
    }
    console.log("Theme",theme)
    useEffect(() => {
        const root = document.documentElement

        if (theme === "light") {
            root.classList.add("light")
            root.classList.remove('dark')
        } else {
            root.classList.add('dark')
            root.classList.remove('light')
        }
    }, [theme, setTheme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
