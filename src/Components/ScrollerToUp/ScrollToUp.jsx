import { useState } from "react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(window.scrollY > 300);

    function handleScroll() {
        setVisible(window.scrollY> 300);
    }

    document.onscroll = handleScroll;

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 md:bottom-7 md:right-7 bg-green-600 text-white p-2 md:p-3 rounded-full shadow-lg transition-all focus:outline-none duration-300 hover:bg-green-700 hover:scale-110 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
            }`}
        >
            <i className="fa-solid fa-arrow-up  "></i>
        </button>
    );
}
