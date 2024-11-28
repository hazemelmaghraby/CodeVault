import React from "react";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";


const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 },
};

const bounce = {
    initial: { y: 0 },
    animate: {
        y: [0, -10, 0],
        transition: {
            repeat: Infinity,
            duration: 1.5,
        },
    },
};

const UnderDev = () => {
    return (
        <div className='pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-white'>

            <motion.div
                initial="initial"
                animate="animate"
                variants={fadeIn}
                className="text-center mt-32"
            >
                <motion.div variants={bounce} className="inline-block">
                    <Wrench className="w-16 h-16 text-gold mb-6" />
                </motion.div>
                <h1 className="text-5xl font-bold mb-4">
                    Page Under <span className="gold-text">Development</span>
                </h1>
                <p className="text-lg text-gray-400 mb-8">
                    We're working hard to bring you this feature. Stay tuned!
                </p>
                <a
                    href="/"
                    className="gold-gradient px-6 py-3 rounded-lg font-medium text-black no-underline"
                >
                    Go Back to Homepage
                </a>
            </motion.div></div>
    )
}

export default UnderDev;