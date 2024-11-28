import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
    { name: 'Hazem Elmaghraby', role: 'Team Leader', image: 'https://via.placeholder.com/150' },
    { name: 'Maria W Mailler', role: 'Front-end Developer', image: 'https://via.placeholder.com/150' },
    { name: 'Ahmed', role: 'Back-end Developer', image: 'https://via.placeholder.com/150' },
    { name: 'Moharam', role: 'UI/UX Designer', image: 'https://via.placeholder.com/150' },
    { name: 'Salma Eldosoky', role: 'Tester', image: 'https://via.placeholder.com/150' },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const OurTeam = () => {
    return (
        <section className="py-12 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
                <p className="text-gray-400 mb-12">
                    A team of dedicated professionals working together to deliver the best results.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={cardVariants}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <img
                                src={member.image}
                                alt={`${member.name}'s profile`}
                                className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-yellow-400"
                            />
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-gray-400">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurTeam;
