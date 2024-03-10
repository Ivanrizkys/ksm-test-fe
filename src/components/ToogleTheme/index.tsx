import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ToogleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative h-5 w-5">
      <button className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
        <Sun onClick={() => setTheme("dark")} className="h-5 w-5" />
      </button>
      <button className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
        <Moon onClick={() => setTheme("light")} className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ToogleTheme;
