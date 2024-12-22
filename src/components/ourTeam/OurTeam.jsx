import React from "react";
import dre from './../../assets/dre.jpg';
import maleTeam from './../../assets/maleTeam.jpg';
import maleTeam2 from './../../assets/maleTeam2.jpg';
import femaleTeam from './../../assets/femaleTeam.jpg';
import { Linkedin, Twitter, Facebook, LinkedinIcon, Instagram } from "lucide-react";
import { motion } from "framer-motion";
const OurTeam = () => {
    const teamMembers = [
        {
            name: "Hazem Mohamed",
            role: "Founder - Website Developer",
            description:
                "I've established pagedone in 2022 and it was one of the best ideas I've had in my life.",
            image: dre, // Replace with actual image path
            social: {
                x: "#",
                instagram: "#",
                linkedin: "#",
            },
            cv: '#'
        },
        {
            name: "Rams Lesli ( Virtual )",
            role: "Sales Executive",
            description:
                "I'm the chief executive of sales and closed valuable deals that helped pagedone in growth.",
            image: maleTeam, // Replace with actual image path
            social: {
                x: "#",
                instagram: "#",
                linkedin: "#",
            },
        },
        {
            name: "Harshita Patel ( Virtual )",
            role: "CEO",
            description:
                "I am the co-founder of pagedone, and we've pushed our limits so far to make it successful.",
            image: maleTeam2, // Replace with actual image path
            social: {
                x: "#",
                instagram: "#",
                linkedin: "#",
                btn: '#'
            },
        },
        {
            name: "Alexa Kimberly ( Virtual )",
            role: "Tester",
            description:
                "I've been the lead designer for pagedone since the beginning of it and enjoyed every bit.",
            image: femaleTeam, // Replace with actual image path
            social: {
                x: "#",
                instagram: "#",
                linkedin: "#",
            },
        },
    ];

    return (
        <section className="bg-gray-900 text-gray-300 py-16 px-8 mt-5 glass">
            <motion.div
                className="max-w-7xl mx-auto text-center"
                initial="initial"
                animate="animate"
            >
                <motion.h1
                    className="text-5xl md:text-6xl font-bold mb-6 text-white"
                >
                    Meet <span className="gold-text">The Brains</span>
                </motion.h1>
                <motion.p
                    className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
                >
                    Our team of dedicated professionals work tirelessly to bring you the best digital rewards and collectibles.
                </motion.p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center md:flex-row p-6 rounded-lg text-left glass2"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-32 h-32 rounded-full border-4 border-gold-100"
                        />
                        <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                            <h3 className="text-xl font-semibold text-white text-left">
                                {member.name}
                            </h3>
                            <p className="text-sm gold-text text-left">{member.role}</p>
                            <hr />
                            <p className="mt-2 text-gray-400 text-sm">{member.description}</p>
                            <div className="flex justify-center md:justify-start space-x-4 mt-4">
                                <a
                                    href={member.social.x}
                                    className="text-gray-400 hover:text-gold-400"
                                >
                                    <i className="icon-x"><Twitter /></i> {/* Add X icon */}
                                </a>
                                <a
                                    href={member.social.instagram}
                                    className="text-gray-400 hover:text-pink-400"
                                >
                                    <i className="icon-instagram"><Instagram /></i> {/* Add Instagram icon */}
                                </a>
                                <a
                                    href={member.social.linkedin}
                                    className="text-gray-400 hover:text-blue-500"
                                >
                                    <i className="icon-linkedin"><Linkedin /></i> {/* Add LinkedIn icon */}
                                </a>

                                {member.cv && (
                                    <a
                                        href={member.cv}
                                        className="inline-block px-6 py-1 gold-gradient rounded-lg font-medium text-black hover:opacity-90 transition-opacity no-underline cursor-pointer"
                                    >
                                        Portfolio
                                    </a>
                                )}


                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurTeam;