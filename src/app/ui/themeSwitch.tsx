"use client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "@nextui-org/react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    if(theme == "light"){
      setDarkMode(false)
    }else{
      setDarkMode(true)
    }
  }, [theme])

  if(!mounted) return null

  function handleChange(){
    setDarkMode(!darkMode)
    if(darkMode){
        setTheme("light")
    }else{
        setTheme("dark")
    }
  }

  return (
    <Switch
    isSelected={darkMode}
    onValueChange={setDarkMode}
    onChange={handleChange}
    color="secondary"
    startContent={<FontAwesomeIcon icon={faMoon}/>}
    endContent={<FontAwesomeIcon icon={faSun}/>}
    className="border border-white rounded-full"
    />
  )
};