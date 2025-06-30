import NavBar from "./navbar";
import Footer from "./footer";
import HomePage from "./home";
export const metadata = {
  title: "Photographer | Dylan’s Portfolio",
  description: "Discover my best photographs — portraits, landscapes and more.",
};

export default async function Page() {
  return (
    <main className={`min-h-screen text-white bg-black`}>
      <NavBar />
      <HomePage />
      <Footer />
    </main>
  );
}
