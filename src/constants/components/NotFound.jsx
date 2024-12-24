import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';


const NotFound = () => {

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


    return (
        <>
            <div className='pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-white min-h-screen'>

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
                        Page Not <span className="gold-text">Found</span>
                    </h1>
                    <p className="text-lg text-gray-400 mb-8">
                        The page you are looking for does not exist. Please check the URL or report the issue to us
                    </p>
                    <div className="btns flex justify-center sm:block sm:items-center">
                        <a
                            href="/contact"
                            className="gold-gradient px-6 py-3 rounded-lg font-medium text-black no-underline mr-4 mb-4 sm:mb-0"
                        >
                            Report Issue
                        </a>

                        <a
                            href="/"
                            className="gold-gradient px-6 py-3 rounded-lg font-medium text-black no-underline sm:ml-4"
                        >
                            Go Back to Homepage
                        </a>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default NotFound