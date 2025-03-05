import Footer from "../_layout/footer";
import Header from "../_layout/header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="pt-[70px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
