import "@/styles/globals.css";
import { store } from "@/global/store";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Provider as ReduxProvider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ReduxProvider store={store}>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </ReduxProvider>
    </ThemeProvider>
  );
}
