import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsMenuOpen(false);
        navigate("/");
    };

    const handleNavigation = (path) => {
        setIsMenuOpen(false);
        navigate(path);
    };

    const navLinks = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Create Post", path: "/create-post" },
        { label: "My Posts", path: "/my-posts" },
        { label: "Profile", path: "/profile" },
    ];

    return (
        <nav className="relative bg-[#F8F7F2] px-5 py-4 text-[#243B2F] shadow-sm sm:px-8">
            <div className="flex items-center justify-between">
                {/* Brand name */}
                <h1
                    onClick={() => handleNavigation("/")}
                    className="shrink-0 cursor-pointer font-serif text-2xl font-bold tracking-tight sm:text-3xl"
                >
                    Travel Diary
                </h1>

                {/* Desktop navigation: visible on medium screens and larger */}
                <div className="hidden items-center gap-5 text-sm font-medium md:flex lg:gap-7">
                    {navLinks.map((link) => (
                        <button
                            key={link.path}
                            onClick={() => handleNavigation(link.path)}
                            className="whitespace-nowrap transition-colors hover:text-[#73866A]"
                        >
                            {link.label}
                        </button>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="whitespace-nowrap rounded-full bg-[#355C43] px-5 py-2.5 text-white transition-colors hover:bg-[#284733] focus:outline-none focus:ring-2 focus:ring-[#355C43] focus:ring-offset-2"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile hamburger button: visible on small screens */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D8DED4] text-2xl text-[#355C43] transition-colors hover:bg-[#E9EDE5] focus:outline-none focus:ring-2 focus:ring-[#355C43] md:hidden"
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    {isMenuOpen ? "×" : "☰"}
                </button>
            </div>

            {/* Mobile navigation menu */}
            {isMenuOpen && (
                <div
                    id="mobile-navigation"
                    className="mt-4 flex flex-col gap-1 border-t border-[#E3E5DD] pt-3 md:hidden"
                >
                    {navLinks.map((link) => (
                        <button
                            key={link.path}
                            onClick={() => handleNavigation(link.path)}
                            className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-[#E9EDE5] hover:text-[#355C43]"
                        >
                            {link.label}
                        </button>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="mt-2 w-full rounded-lg bg-[#355C43] px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:bg-[#284733]"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
