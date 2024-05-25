import { ReactNode } from "react";
import NavHeader from "./components/standardLayout/NavHeader";
import Footer from "./components/standardLayout/Footer";

// Define Props type
type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-800 text-white">
      <header className="text-white w-full">
        <NavHeader />
      </header>
      <main className="flex-grow">
        <div className="w-full">{children}</div>
      </main>
      <footer className="text-white w-full">
        <Footer />
      </footer>
    </div>
  );
}
