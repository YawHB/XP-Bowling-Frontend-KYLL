import { ReactNode } from "react";
import NavHeader from "./components/NavHeader";
import Footer from "./components/Footer";

// Define Props type
type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="text-white">
        <div className="container mx-auto">
          {" "}
          {/* Center the content and add padding */}
          <NavHeader />
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="text-white">
        <div className="container mx-auto">
          {" "}
          {/* Center the content and add padding */}
          <Footer />
        </div>
      </footer>
    </div>
  );
}

// import { ReactNode } from "react";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// // Define Props type
// type LayoutProps = {
//   children: ReactNode;
// };

// export default function Layout({ children }: LayoutProps): JSX.Element {
//   return (
//     <div className="flex flex-col h-screen justify-between">
//       <header className="" >
//         <Navbar />
//       </header>
//       {children}
//       <footer className="">
//         <Footer />
//       </footer>
//     </div>
//   );
// }
