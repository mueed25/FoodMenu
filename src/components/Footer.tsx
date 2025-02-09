

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10 ">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} FoodMenu. All rights reserved.</p>
        <nav className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;