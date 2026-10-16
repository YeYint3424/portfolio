import Link from "next/link";
import Snow from "@/components/Snow";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Snow />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-32">
          <p className="text-sky text-sm font-bold tracking-[0.2em] uppercase mb-3">
            404 Error
          </p>
          <h1 className="font-sans font-extrabold text-white text-4xl sm:text-6xl tracking-tight mb-4">
            Page Not Found
          </h1>
          <p className="text-frost/70 text-base max-w-md mb-8">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg border border-sky/30 bg-sky/10 text-sky hover:bg-sky/20 transition-colors font-medium text-sm"
          >
            Return to Home
          </Link>
        </main>
        <Footer />
      </div>
    </>
  );
}
