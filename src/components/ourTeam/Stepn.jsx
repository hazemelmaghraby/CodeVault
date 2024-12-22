


import React from 'react';
import { motion } from 'framer-motion';
import dre from './../../assets/dre.jpg';

const OurTeam = () => {
    return (
        <div className='base-comp text-white'>
            <motion.div
                className="max-w-7xl mx-auto text-center"
                initial="initial"
                animate="animate"

            >
                <motion.h1
                    className="text-5xl md:text-6xl font-bold mb-6 text-white"

                >
                    Meet <span className="gold-text">The Brains</span> Behind CodeVault
                </motion.h1>

                <motion.p
                    className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"

                >
                    Our team of dedicated professionals work tirelessly to bring you the best digital rewards and collectibles.
                </motion.p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 p-8">
                <div className="rounded-lg shadow-md p-8 text-center flex flex-wrap items-center gap-4 glass">
                    <img
                        src={dre} // Use a placeholder image
                        alt="Team Member"
                        className="w-32 h-32 object-cover rounded-full mx-auto mb-6"
                    />
                    <h2 className="text-xl font-semibold mb-2 text-black">John Doe</h2> {/* Name */}
                    <p className="text-gray-400 mb-4">CEO</p> {/* Position */}

                </div>
            </div>
        </div >
    )
}

export default OurTeam;