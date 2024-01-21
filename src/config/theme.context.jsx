import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    const toggleTheme = ()=>{
        let newtheme = (theme === 'dark')? "light" : "dark";
        localStorage.setItem("theme", newtheme);
        setTheme(newtheme)
    }
    return (
        <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider