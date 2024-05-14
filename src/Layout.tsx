import { ReactNode } from "react";
import NavHeader from "./components/NavHeader";
import Footer from "./components/Footer";

// Define Props type
type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
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

// import { ReactNode } from "react";
// import NavHeader from "./components/NavHeader";
// import Footer from "./components/Footer";

// // Define Props type
// type LayoutProps = {
//   children: ReactNode;
// };

// export default function Layout({ children }: LayoutProps): JSX.Element {
//   return (
//     <div className="flex flex-col h-screen">
//       <header className="text-white">
//         <div className="container mx-auto">
//           <NavHeader />
//         </div>
//       </header>
//       <main className="flex-grow">
//         <div className="container mx-auto">{children}</div>
//       </main>
//       <footer className="text-white">
//         <div className="container mx-auto">
//           <Footer />
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default function Layout({ children }: LayoutProps): JSX.Element {
//   return (
//     <div className="flex flex-col h-screen">
//       <header className="text-white">
//         <NavHeader />
//       </header>
//       <main className="flex-grow">{children}</main>
//       <footer className="text-white">
//         <Footer />
//       </footer>
//     </div>
//   );
// }
