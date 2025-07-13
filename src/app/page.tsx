import Link from "next/link";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/Static/HeroSection";

export default function Home() {

  return (
    <>
      {/* Header with Navigation */}
      <NavBar />
      <div className="gradient-hero">
        <div className="noise"></div>
      </div>
      {/* Main Content */}

      <main className="pt-16"> {/* Add padding-top for fixed navbar */}
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose TribeVibe?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover amazing features that make connecting with your community effortless
              </p>
            </header>
            
            <div className="grid md:grid-cols-3 gap-8">
              <article className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2">Find Your People</h3>
                <p className="text-gray-600">
                  Connect with groups that share your interests and passions
                </p>
              </article>
              
              <article className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2">Join Events</h3>
                <p className="text-gray-600">
                  Participate in exciting activities and meet new friends
                </p>
              </article>
              
              <article className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-2">Create Memories</h3>
                <p className="text-gray-600">
                  Share experiences and build lasting relationships
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Tribe?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of people who have already found their community on TribeVibe
            </p>
            <Link 
              href="/signup" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">TribeVibe</h3>
              <p className="text-gray-400 mb-4">
                Connecting communities, one group at a time.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="/groups" className="text-gray-400 hover:text-white transition-colors">
                  Browse Groups
                </Link>
                <Link href="/events" className="text-gray-400 hover:text-white transition-colors">
                  Find Events
                </Link>
                <Link href="/create-group" className="text-gray-400 hover:text-white transition-colors">
                  Create Group
                </Link>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </nav>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
                <Link href="/community-guidelines" className="text-gray-400 hover:text-white transition-colors">
                  Community Guidelines
                </Link>
                <Link href="/safety" className="text-gray-400 hover:text-white transition-colors">
                  Safety
                </Link>
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} TribeVibe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
