import Footer from "../_layout/footer";
import Header from "../_layout/header";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-[70px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
