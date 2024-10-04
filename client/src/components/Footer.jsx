// Footer component definition
function Footer() {
    // Render the footer
    return (
        <footer className="bg-[#222831] text-white py-8 border-t-4 border-yellow-500">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* About Section */}
                    <div className="w-full md:w-1/3 mb-6 pr-10">
                        <h2 className="text-2xl font-bold mb-4">About Us</h2>
                        <p className="text-gray-400">
                            We offer the finest handmade jewelry with unique designs crafted with love and care.
                            Explore our collection and find your next timeless piece.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="w-full md:w-1/3 mb-6">
                        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                        <ul>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">Home</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">Shop</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">About Us</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Subscribe Section */}
                    <div className="w-full md:w-1/3 mb-6">
                        <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
                        <p className="text-gray-400 mb-4">
                            Subscribe to receive updates on our latest collections and exclusive offers.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                className="px-2 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none"
                                placeholder="Enter your email"
                            />
                            <button
                                type="submit"
                                className="px-2 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4">
                    <div className="flex flex-wrap justify-between items-center">
                        {/* Social Media Links */}
                        <div className="w-full md:w-auto mb-4 md:mb-0">
                            <h2 className="text-xl font-bold mb-2">Follow Us</h2>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <i className="fab fa-pinterest"></i>
                                </a>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="w-full md:w-auto text-gray-400">
                            © 2024 Swapnabir Dutta. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Export the Footer component
export default Footer;
