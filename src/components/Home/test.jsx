import React, { useState, useEffect } from 'react';  // Added useEffect import
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import {
    Gamepad2,
    Bitcoin,
    Gift,
    Shield,
    Zap,
    Users,
    ChevronRight,
    Star,
    Trophy,
    Target,
    Sparkles
} from 'lucide-react';
import ContactForm from './ContactForm';

// Firebase imports
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Make sure you export `auth` and `db` from your Firebase config

const Test = () => {
    const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setIsAdmin(userData.isAdmin || false); // Set admin status
                    }
                } catch (error) {
                    console.error('Error fetching user data from Firestore:', error);
                }
            } else {
                setIsAdmin(false); // Reset admin status on logout
            }
        });

        return () => unsubscribe();
    }, []); // Empty dependency array to run once on mount and unmount

    const fadeInUp = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8 }
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const scaleIn = {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.5 }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <header className="relative overflow-hidden min-h-screen flex items-center">
                <Navbar />

                <motion.div
                    className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                >
                    <motion.div
                        variants={fadeInUp}
                        className="text-center space-y-8"
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white"
                            variants={scaleIn}
                        >
                            Unlock Digital
                            <span className="gold-text"> Treasures</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-400 max-w-3xl mx-auto"
                            variants={fadeIn}
                        >
                            Your premier destination for gaming codes, crypto rewards, and digital assets.
                            Join our exclusive community of digital collectors.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap justify-center gap-4"
                            variants={fadeIn}
                        >
                            <Link
                                to="/register"
                                className="px-8 py-4 gold-gradient rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
                            >
                                <span className='text-black no-underline'>Start Your Collection</span>
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                            <button className="px-8 py-4 glass rounded-lg font-medium hover:bg-black/60 transition-colors text-white">
                                Watch Demo
                            </button>
                            {isAdmin && (
                                <button className="block w-full px-4 py-2 text-sm text-blue-500 hover:bg-gray-700 rounded-md transition-colors">
                                    View Database
                                </button>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={stagger}
                    >
                        {[
                            { number: "10K+", label: "Active Users" },
                            { number: "50K+", label: "Codes Redeemed" },
                            { number: "99.9%", label: "Success Rate" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="glass p-6 rounded-xl text-center"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-3xl font-bold gold-text mb-2">{stat.number}</h3>
                                <p className="text-gray-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                    {[Gamepad2, Bitcoin, Gift, Shield, Star].map((Icon, index) => (
                        <motion.div
                            key={index}
                            animate={{
                                y: [0, Math.random() * 20 - 10],
                                x: [0, Math.random() * 20 - 10],
                                rotate: 360
                            }}
                            transition={{
                                duration: 20 + Math.random() * 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute text-gold-500/10"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                transform: `scale(${1 + Math.random()})`,
                            }}
                        >
                            <Icon className="w-24 h-24" />
                        </motion.div>
                    ))}
                </div>
            </header>

            {/* Features Section */}
            <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    className="max-w-7xl mx-auto"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={stagger}
                >
                    <motion.div
                        className="text-center mb-20"
                        variants={fadeInUp}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white no-underline">
                            Why Choose <span className="gold-text">CodeVault</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Experience the future of digital rewards with our comprehensive platform
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: <Gamepad2 className="w-8 h-8" />, title: "Premium Gaming Codes", description: "Access exclusive codes for AAA games, DLCs, and rare in-game items" },
                            { icon: <Bitcoin className="w-8 h-8" />, title: "Crypto Rewards", description: "Earn and redeem cryptocurrency tokens and exclusive NFT activation codes" },
                            { icon: <Shield className="w-8 h-8" />, title: "Maximum Security", description: "Military-grade encryption and multi-factor authentication for every transaction" },
                            { icon: <Zap className="w-8 h-8" />, title: "Lightning Fast", description: "Instant code delivery and automated verification system" },
                            { icon: <Users className="w-8 h-8" />, title: "Trusted Community", description: "Join thousands of verified traders and collectors" },
                            { icon: <Star className="w-8 h-8" />, title: "VIP Benefits", description: "Exclusive access to pre-releases and limited edition codes" }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="glass rounded-xl p-8 hover:bg-black/60 transition-colors text-white no-underline"
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                            >
                                <div className="w-16 h-16 gold-gradient rounded-lg flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Contact Section */}
            <ContactForm />
        </div>
    );
};

export default Test;
