import { ThemeProvider } from "@/context/ThemeProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <ThemeProvider>
          <Toaster/>
          {children}  
        </ThemeProvider>
      </body>
    </html>
  );
}
