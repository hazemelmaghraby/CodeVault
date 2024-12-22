import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { Search, Filter, ChevronDown, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 },
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function Marketplace() {
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const cartCount = useSelector((state) => state.cart.value);
    const dispatch = useDispatch();

    const items = [
        {
            id: 1,
            name: "Exclusive Game Code",
            description: "Unlock rare in-game items for popular titles.",
            price: "$19.99",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Crypto Reward",
            description: "Earn 0.01 BTC instantly.",
            price: "$299.99",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "Limited Edition NFT",
            description: "Get exclusive access to a premium NFT.",
            price: "$499.99",
            image: "https://via.placeholder.com/150",
        },
    ];

    return (
        <div className="min-h-screen">
            <header className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 text-white"
                        variants={fadeInUp}
                    >
                        Explore the <span className="gold-text">Marketplace</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                        variants={fadeIn}
                    >
                        Discover exclusive digital rewards, gaming codes, and crypto assets tailored just for you.
                    </motion.p>
                </motion.div>
            </header>

            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Filters and Search */}
                    <div className="flex flex-wrap justify-between items-center mb-8">
                        <div className="relative w-full md:w-auto">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search items"
                                className="glass w-full md:w-96 pl-10 py-3 rounded-lg text-gray-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="relative mt-4 md:mt-0">
                            <button
                                className="glass py-3 px-6 rounded-lg flex items-center space-x-2 text-gray-200"
                                onClick={() => setFilter(filter === "All" ? "Popular" : "All")}
                            >
                                <span>{filter}</span>
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items
                            .filter((item) =>
                                item.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((item) => (
                                <motion.div
                                    key={item.id}
                                    className="glass rounded-lg p-6 flex flex-col items-center hover:bg-black/60 transition-colors"
                                    variants={fadeInUp}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-32 h-32 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold mb-2 text-white">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-400 mb-4 text-center">
                                        {item.description}
                                    </p>
                                    <span className="text-lg font-bold gold-text mb-4">
                                        {item.price}
                                    </span>
                                    <button className="gold-gradient px-6 py-3 rounded-lg font-medium text-black">
                                        Add to Cart <ShoppingCart className="w-5 h-5 ml-2 inline-block" />
                                    </button>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
