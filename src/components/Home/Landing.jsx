import React, { useState, useEffect } from 'react';
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
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from './../../constants/database/firebase';
import { useNavigate } from 'react-router-dom'; // Make sure you export `auth` and `db` from your Firebase config
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Footer from '../Footer/Footer';

const icons = [
    { Icon: Facebook, link: 'https://facebook.com' },
    { Icon: Twitter, link: 'https://twitter.com' },
    { Icon: Instagram, link: 'https://instagram.com' },
    { Icon: Youtube, link: 'https://youtube.com' },
];

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


export default function Landing() {

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

    const navigate = useNavigate();

    const handleStartCollection = (e) => {
        e.preventDefault();

        // Check the auth state directly
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/pro'); // Redirect to market if logged in
            } else {
                navigate('/login'); // Redirect to login if not logged in
            }
        });
    };
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <header className="relative overflow-hidden min-h-screen flex items-center">

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
                            <a
                                onClick={handleStartCollection}
                                className="px-8 py-4 gold-gradient rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center space-x-2 cursor-pointer"
                            >
                                <span className='text-black no-underline'>Start Your Collection</span>
                                <ChevronRight className="w-5 h-5" />
                            </a>
                            <a className="px-8 py-4 glass rounded-lg font-medium hover:bg-black/60 transition-colors text-white no-underline cursor-pointer" href='/premium'>
                                Premium Plans
                            </a>
                            {isAdmin && (
                                <a className="px-8 py-4 glass rounded-lg font-medium hover:bg-black/60 transition-colors text-white no-underline" href='/data'>
                                    View Database
                                </a>
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
                            {
                                icon: <Gamepad2 className="w-8 h-8" />,
                                title: "Premium Gaming Codes",
                                description: "Access exclusive codes for AAA games, DLCs, and rare in-game items"
                            },
                            {
                                icon: <Bitcoin className="w-8 h-8" />,
                                title: "Crypto Rewards",
                                description: "Earn and redeem cryptocurrency tokens and exclusive NFT activation codes"
                            },
                            {
                                icon: <Shield className="w-8 h-8" />,
                                title: "Maximum Security",
                                description: "Military-grade encryption and multi-factor authentication for every transaction"
                            },
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: "Lightning Fast",
                                description: "Instant code delivery and automated verification system"
                            },
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: "Trusted Community",
                                description: "Join thousands of verified traders and collectors"
                            },
                            {
                                icon: <Star className="w-8 h-8" />,
                                title: "VIP Benefits",
                                description: "Exclusive access to pre-releases and limited edition codes"
                            }
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

            {/* =========================== */}

            <motion.div
                className="flex justify-center gap-6 mt-10"
                initial="initial"
                animate="animate"
                variants={stagger}
            >
                {icons.map(({ Icon, link }, index) => (
                    <motion.a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gold-gradient p-4 rounded-full text-black hover:scale-110 transition-transform shadow-lg"
                        variants={fadeInUp}
                    >
                        <Icon className="w-6 h-6" />
                    </motion.a>
                ))}
            </motion.div>

            {/* =========================== */}

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
                            className="text-4xl md:text-5xl font-bold mb-6 text-white no-underline"
                            variants={fadeInUp}
                        >
                            Upgrade to
                            <span className="gold-text">Premium Today !</span>
                        </motion.h2>
                        <motion.p
                            className="text-xl text-gray-400 mb-8"
                            variants={fadeInUp}
                        >
                            Join thousands of users discovering new daily rewards
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                        >
                            <Link
                                to="/premium"
                                className="inline-flex items-center px-8 py-4 gold-gradient rounded-lg font-medium hover:opacity-90 transition-opacity text-black no-underline"
                            >
                                Discover Premium
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Link>
                        </motion.div>
                    </motion.div>


                    {/* Background Decorations */}
                    <div className="absolute inset-0 -z-0">
                        <div className="absolute top-0 left-0 w-32 h-32 gold-gradient opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 gold-gradient opacity-10 rounded-full blur-3xl"></div>
                    </div>
                </motion.div>
            </section>

            {/* Contact Section */}
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
                            Get in <span className="gold-text">Touch</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Have questions? We're here to help you 24/7
                        </p>
                    </motion.div>

                    <ContactForm />
                </motion.div>
            </section>

            {/* CTA Section */}
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
                            className="text-4xl md:text-5xl font-bold mb-6 text-white no-underline"
                            variants={fadeInUp}
                        >
                            Ready to Start Your
                            <span className="gold-text"> Collection?</span>
                        </motion.h2>
                        <motion.p
                            className="text-xl text-gray-300 mb-8"
                            variants={fadeInUp}
                        >
                            Join thousands of users discovering new rewards daily
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                        >
                            <Link
                                to="/register"
                                className="inline-flex items-center px-8 py-4 gold-gradient rounded-lg font-medium hover:opacity-90 transition-opacity text-black no-underline"
                            >
                                Create Free Account
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Background Decorations */}
                    <div className="absolute inset-0 -z-0">
                        <div className="absolute top-0 left-0 w-32 h-32 gold-gradient opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 gold-gradient opacity-10 rounded-full blur-3xl"></div>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
        </div>
    );
}

// 