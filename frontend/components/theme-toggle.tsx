"use client";  

import { useTheme } from "next-themes";  
import { Sun, Moon } from "lucide-react";  
import { Button } from "@/components/ui/button";  
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";  
import {useState,useEffect} from "react";

export function ThemeToggle() {  
  const { theme, setTheme } = useTheme();  
  
  return (  
    <DropdownMenu>  
      <DropdownMenuTrigger asChild>  
        <Button  
          variant="outline"  
          size="icon"  
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}  
        >  
          {theme === "dark" ? (  
            <Moon className="h-[1.2rem] w-[1.2rem]" />  
          ) : (  
            <Sun className="h-[1.2rem] w-[1.2rem]" />  
          )}  
          <span className="sr-only">Toggle theme</span>  
        </Button>  
      </DropdownMenuTrigger>  
    </DropdownMenu>  
  );  
}  