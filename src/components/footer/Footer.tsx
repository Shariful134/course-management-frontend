import { Link } from "react-router-dom";
// import logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="container mx-auto bg-gray-900 text-white pt-12 pb-6">
      <div className=" mx-auto px-6 md:px-6 grid md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          {/* <img src={logo} alt="Logo" className="h-10 w-auto mb-4" /> */}
          <p className="text-gray-300">
            EduPlatform is your trusted platform to learn from experts and
            achieve your goals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-blue-500 transition">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>Email: Shariful32213@gmail.com</p>
          <p>Phone: +880 1762 370 111</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        &copy; {new Date().getFullYear()} EduPlatform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
