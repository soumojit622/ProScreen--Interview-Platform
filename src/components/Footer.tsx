import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/10 to-primary/20 text-black dark:text-white py-12">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 animate-fadeIn">
          {/* Footer Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center group">
              <img
                src="/logo.svg" // Replace this with your logo
                alt="ProScreen Logo"
                className="w-12 h-12 mr-3 transition-transform duration-300 group-hover:scale-110"
              />
              <h1 className="text-3xl font-semibold text-emerald-500 transition-transform duration-300 group-hover:text-emerald-500 dark:text-white dark:group-hover:text-emerald-500">
                ProScreen
              </h1>
            </Link>
            <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">
              Empowering individuals with creative solutions. Join us and get
              started today!
            </p>
          </div>

          {/* Footer Column 2: Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["About Us", "Contact Us", "Careers", "Get Started"].map(
                (link, index) => (
                  <li key={index}>
                    <Link
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-600 hover:text-emerald-500 transition-all duration-300 transform hover:translate-x-2 dark:text-gray-300 dark:hover:text-emerald-500"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Footer Column 3: Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Follow Us
            </h3>
            <div className="flex gap-6">
              <Link
                href="https://github.com"
                target="_blank"
                className="text-gray-600 hover:text-emerald-500 transition-all duration-300 transform hover:scale-110 dark:text-gray-300 dark:hover:text-emerald-500"
              >
                <FaFacebook className="w-8 h-8" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-gray-600 hover:text-emerald-500 transition-all duration-300 transform hover:scale-110 dark:text-gray-300 dark:hover:text-emerald-500"
              >
                <FaTwitter className="w-8 h-8" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-gray-600 hover:text-emerald-500 transition-all duration-300 transform hover:scale-110 dark:text-gray-300 dark:hover:text-emerald-500"
              >
                <FaInstagram className="w-8 h-8" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-gray-600 hover:text-emerald-500 transition-all duration-300 transform hover:scale-110 dark:text-gray-300 dark:hover:text-emerald-500"
              >
                <FaLinkedin className="w-8 h-8" />
              </Link>
            </div>
          </div>

          {/* Footer Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Contact
            </h3>
            <p className="text-sm text-gray-600 hover:text-emerald-500 transition-opacity duration-300 dark:text-gray-300 dark:hover:text-emerald-500">
              Email: <span className="underline">support@proscreen.com</span>
            </p>
            <p className="hover:text-emerald-500 transition-opacity duration-300 dark:text-gray-300 dark:hover:text-emerald-500">
              Phone: <span className="underline">+91- 98765 43210</span>
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-300 mt-10 pt-6 text-center dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} ProScreen. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 mt-2 dark:text-gray-300">
            Made with <span className="animate-pulse">❤️</span> by Soumojit
            Banerjee
          </p>
        </div>
      </div>
    </footer>
  );
};
