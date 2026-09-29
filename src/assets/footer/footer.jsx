import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showForm, setShowForm] = useState(false);
 const links = [
    { to: "/", label: "Home" },
    { to: "/shop/mens", label: "Mens" },
    { to: "/shop/womens", label: "Women" },
    { to: "/shop", label: "Shop" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: <FaFacebook />, href: "#" },
    { name: "Twitter", icon: <FaTwitter />, href: "#" },
    { name: "LinkedIn", icon: <FaLinkedin />, href: "#" },
    { name: "Instagram", icon: <FaInstagram />, href: "#" },
  ];

  return (
    <footer className="bg-[#222222] text-white text-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-sans">Navigation</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.to}
                    className="hover:text-gray-300 transition duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MdEmail className="mr-2" />
                <a
                  href=""
                  className="hover:text-gray-300 transition duration-300"
                >
                  strydekicks@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <MdPhone className="mr-2" />
                <a
                  href="tel:"
                  className="hover:text-gray-300 transition duration-300"
                >
                  +254 115 112760
                </a>
              </li>
              <li className="flex items-center">
                <MdLocationOn className="mr-2" />
                <span>Moi Avenue, Nairobi CBD, Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-gray-300 transition duration-300"
                  aria-label={`Visit our ${link.name} page`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>

            <p>Have a question or want to work together?</p>

            <button
              onClick={() => setShowForm(true)}
              className="bg-[#222222] border border-[#89E900] rounded-xl text-white font-bold py-2 px-4"
            >
              Contact Us
            </button>
          </div>

          {showForm && (
            <div className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-[#222222] text-white overflow-y-auto slide-up">
              {" "}
              <button
                onClick={() => setShowForm(false)}
                className="fixed top-6 right-6 text-3xl text-white hover:text-[#89E900]"
              >
                ✕
              </button>
              <div className="min-h-screen flex items-center justify-center px-6">
                <form className="w-full max-w-2xl space-y-6">
                  <h1 className="text-5xl font-bold mb-10">Contact Us</h1>

                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-gray-500 p-4 text-xl outline-none focus:border-[#89E900]"
                  />

                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-transparent border-b border-gray-500 p-4 text-xl outline-none focus:border-[#89E900]"
                  />

                  <textarea
                    placeholder="Your message"
                    rows="6"
                    className="w-full bg-transparent border-b border-gray-500 p-4 text-xl outline-none focus:border-[#89E900] resize-none"
                  />

                  <button
                    type="submit"
                    className="bg-[#89E900] text-[#222222] font-bold px-8 py-4 rounded-xl"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
