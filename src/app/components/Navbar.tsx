import { Link, useLocation } from "react-router-dom";

export function Navbar() {
    const location = useLocation();

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Todo", path: "/todo" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Games", path: "/games" },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
            <div className="flex space-x-8">
                {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                        ? "border-blue-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                >
                    {item.name}
                </Link>
                ))}
            </div>
            </div>
        </div>
        </nav>
    );
}
