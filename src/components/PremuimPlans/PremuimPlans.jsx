import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './PremuimPlans.css';
import {
    Star,
    Crown,
    BadgeCheck,
    Shield,
    DollarSign
} from 'lucide-react';

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
            staggerChildren: 0.2,
        },
    },
};

export default function PremiumPlans() {
    document.title = "Premuim";

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-7xl mx-auto text-center"
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-6 text-white"
                        variants={fadeInUp}
                    >
                        Explore Our <span className="gold-text">Premium Plans</span>
                    </motion.h1>
                    <motion.h3
                        className="text-3xl md:text-6xl font-bold mb-6 commingSoon"
                        variants={fadeIn}
                    >
                        Coming Soon
                    </motion.h3>
                    <motion.p
                        className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
                        variants={fadeInUp}
                    >
                        Unlock exclusive features, higher rewards, and unparalleled perks with our premium plans.
                        Choose the one that best suits your needs.
                    </motion.p>

                    {/* Plan Cards */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
                        variants={stagger}
                    >
                        {[
                            {
                                title: "Pro",
                                price: "$5/mo",
                                features: ["5% Cashback on Gaming Codes", "Community Support", "Additional Rewards", "Pro Role In Our Disocrd Server"],
                                icon: <BadgeCheck className="w-8 h-8" />,
                                gradient: "glass",
                            },
                            {
                                title: "Elite",
                                price: "$15/mo",
                                features: ["Priority support", "Access To Exclusive codes", "Premium rewards", "Up to 15% cashback", "Elite Role In Our Disocrd Server"],
                                icon: <Star className="w-8 h-8" />,
                                gradient: "glass2",
                            },
                            {
                                title: "Vault",
                                price: "$30/mo",
                                features: [
                                    "All Previous features",
                                    "Dedicated account manager",
                                    "VIP rewards, Code",
                                    "Admin Straight Contacting",
                                    "Special Role In Your Profile",
                                    "Special Vault Role In Disocrd Server"
                                ],
                                icon: <Crown className="w-8 h-8" />,
                                gradient: "glass3",
                            },
                        ].map((plan, index) => (
                            <motion.div
                                key={index}
                                className={`p-8 rounded-xl shadow-lg text-white glass bg-gradient-to-br ${plan.gradient} hover:scale-105 transition-transform flex flex-col justify-between`}
                                variants={fadeInUp}
                            >
                                <div>
                                    <div className="mb-6 flex justify-center items-center">
                                        <div className="w-16 h-16 rounded-lg bg-black/20 flex items-center justify-center">
                                            {plan.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                                    <p className="text-4xl font-bold mb-6">{plan.price}</p>
                                    <ul className="space-y-2 text-gray-200">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center space-x-2">
                                                <Shield className="w-5 h-5 text-gold-400" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-8 self-center">
                                    <Link
                                        to={`/subscribe/${plan.title.toLowerCase()}`}
                                        className="inline-block px-6 py-3 gold-gradient rounded-lg font-medium text-black hover:opacity-90 transition-opacity no-underline"
                                    >
                                        Subscribe
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Added flex flex-col justify-between to the card container to make it a vertical flexbox.
Moved the Link component into a div with self-center and consistent margin for alignment.
This ensures all "Subscribe" buttons align regardless of content height. */}
            </section>

            {/* Call-to-Action Section */}
            <section className="py-32 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto glass rounded-2xl p-12 text-center relative overflow-hidden"
                    initial="initial"
                    whileInView="animate"
                    variants={fadeInUp}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="relative z-10"
                        variants={stagger}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold mb-6 text-white"
                            variants={fadeInUp}
                        >
                            Upgrade to <span className="gold-text">Premium</span> Today!
                        </motion.h2>
                        <motion.p
                            className="text-xl text-gray-300 mb-8"
                            variants={fadeInUp}
                        >
                            Maximize your experience with exclusive benefits and tailored rewards.
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                        >
                            <Link
                                to="/register"
                                className="inline-flex items-center px-8 py-4 gold-gradient rounded-lg font-medium hover:opacity-90 transition-opacity text-black no-underline"
                            >
                                Get Started Now
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Background Decorations */}
                    <div className="absolute inset-0 -z-0">
                        <div className="absolute top-0 left-0 w-32 h-32 opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 rounded-full blur-3xl"></div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
