import Footer from "@/components/shared/navbar/footer";
import Navbar from "@/components/shared/navbar/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
        {/* <Footer /> */}
      </div>
    </>
  );
}
