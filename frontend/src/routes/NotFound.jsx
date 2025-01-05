import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    const handleBtnClicked = () => {
        navigate("/");
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e6e6ff] to-[#d1d1e6]">
            <div className="relative">
                <h1 className="text-[150px] font-black text-gray-400 md:text-[200px] animate-pulse">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 md:text-4xl">
                        Page Not Found
                    </h2>
                </div>
            </div>

            <p className="mt-8 text-gray-600 text-center max-w-md px-4">
                Oops! Looks like you've wandered into the void.
                The page you're searching for might have been moved or doesn't exist.
            </p>

            <button className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full 
          font-medium transition-transform duration-200 hover:scale-105 hover:shadow-lg
          active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleBtnClicked}>
                Back to Homepage
            </button>

            <div className="mt-12 flex gap-3">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full bg-blue-500 animate-bounce`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                    />
                ))}
            </div>

            {/* Custom Footer Text */}
            <p className="mt-8 text-sm text-gray-500">
                Lost? Don't worry, happens to the best of us!
            </p>
        </div>
    )
}