"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle({ variant = "outline" }: { variant?: "outline" | "ghost" }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant={variant} size="icon" onClick={toggleTheme}>
      <Sun className="w-[1.2rem] h-[1.2rem] rotate-90 dark:-rotate-0 scale-0 dark:scale-100 transition-transform" />
      <Moon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 dark:rotate-90 scale-100 dark:scale-0 transition-transform" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
