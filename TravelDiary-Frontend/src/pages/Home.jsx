import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return(
        <main className="min-h-screen bg-[#F8F7F2] text-[#243B2F]">
            {/* Hero Section  */}
            <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-12 md:grid-cols-2 md:px-12">

                {/* Left Content  */}

                <div className="space-y-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#73866A]">
                        Every journey has a story
                    </p>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        The world is a book,
                        <span className="mt-2 block font-serif italic font-normal">
                            and every journey tells a story.
                        </span>
                    </h1>

                    <p className="max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
                        Discover new places, capture beautiful moments, and keep your
                        travel memories alive. Your next adventure deserves a story.
                    </p>

                    {/* Action Button  */}
                    <div className="flex flex-wrap gap-4 pt-3">
                        <button 
                        onClick={() => navigate("/register")}
                        className="rounded-full bg-[#355C43] px-7 py-3.5 font-medium text-white transition hover:bg-[#284733] focus:outline-none focus:ring-2 focus:ring-[#355C43] focus:ring-offset-2"
                        >
                            Start Your Journey
                        </button>

                        <button
                        onClick={() => navigate("/login")}
                        className="rounded-full border border-[#355C43] px-7 py-3.5 font-medium text-[#355C43] transition hover:bg-[#355C43] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#355C43] focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </div>

                </div>

                {/* Right Image  */}
                <div className="relative">
                    <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85" 
                        alt="Majestic mountains surrounded by clouds" 
                        className="h-[350px] w-full rounded-3xl object-cover shadow-xl sm:h-[450px] lg:h-[550px]"
                    />

                    <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-5 py-4 shadow-lg backdrop-blur-sm">
                        <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
                            Collects moments
                        </p>

                        <p className="mt-1 font-serif text-lg font-semibold text-[#243B2F]">
                            Not just destinations.
                        </p>
                    </div>
                </div>

            </section>
        </main>
    )
}

export default Home;