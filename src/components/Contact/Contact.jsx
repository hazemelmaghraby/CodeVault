import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, User, Send } from 'lucide-react';
import { NotebookPen, TypeOutline, Lock } from 'lucide-react';
import { auth } from './../../constants/database/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import emailjs from 'emailjs-com';

export default function ContactForm() {
    document.title = "Contact Us";
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loggedIn, setLoggedIn] = useState(false);

    const form = useRef();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                setLoggedIn(true);
            } else {
                // No user is signed in.
                console.log('No user is signed in.');
                setLoggedIn(false);
            }
        });

        return unsubscribe;
    }, [])

    const sendEmail = (e) => {
        e.preventDefault();
        // Handle form submission



        emailjs.sendForm(
            'service_zl89275',
            'template_ivkta7n',
            form.current,
            'fOm9S9tQ6EdzzSllB'
        ).then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="">
            {loggedIn ? (
                <div className="base-comp">
                    <section className='flex flex-col items-center justify-center min-h-screen'>
                        <motion.div
                            className="max-w-7xl mx-auto text-center"
                            initial="initial"
                            animate="animate"

                        >
                            <motion.h1
                                className="text-5xl md:text-6xl font-bold mb-6 text-white"

                            >
                                You Can <span className="gold-text">Report & Suggest</span> Here
                            </motion.h1>

                            <motion.p
                                className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"

                            >
                                We are always open to your suggestions and feedback. Feel free to reach out to us.
                            </motion.p>
                        </motion.div>
                        <motion.form
                            onSubmit={handleSubmit}
                            className="glass rounded-xl p-8 max-w-md w-full mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            ref={form}
                        >
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">Sender :</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-200" />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={`${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}` || 'Please Login First'}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-gold-500 outline-none text-white transition duration-200"
                                            placeholder="Your name"
                                            required
                                            readOnly
                                        />
                                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-500" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-200" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={`${localStorage.getItem('email')}` || 'Please Login First'}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 glass rounded-lg text-white focus:ring-2 focus:ring-gold-500 outline-none transition duration-200"
                                            placeholder="your@email.com"
                                            required
                                            readOnly
                                        />
                                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-500" />
                                    </div>
                                </div>


                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">Message Topic</label>
                                    <div className="relative">
                                        <TypeOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-200" />
                                        <select
                                            type="dropdown"
                                            id="email"
                                            name="dropdown"
                                            onChange={``}
                                            className="w-full pl-10 pr-4 py-2 glass rounded-lg text-gray-400 focus:ring-2 focus:ring-gold-500 outline-none focus:bg-black focus:text-white transition duration-200"
                                            required

                                        >
                                            <option value="">Select Your Message Topic</option>
                                            <option value="report">Report</option>
                                            <option value="suggestion">Suggestion</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="text" className="block text-sm font-medium mb-2 text-white">Topic</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-200" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 glass rounded-lg text-white focus:ring-2 focus:ring-gold-500 outline-none transition duration-200"
                                            placeholder="Write The Subject Of Your Message"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">Message</label>
                                    <div className="relative">
                                        <NotebookPen className="absolute left-3 top-3 w-5 h-5 text-gold-200" />
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 text-white focus:ring-gold-500 outline-none transition duration-200"
                                            placeholder="Your message"
                                            required
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="w-full py-3 gold-gradient rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Send className="w-5 h-5" />
                                    <span>Send Message</span>
                                </motion.button>
                            </div>
                        </motion.form>
                    </section>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <div className="flex flex-col items-center justify-center mt-28 glass p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-white">You must be logged in to report.</h2>
                        <a to="/login" className="mt-4 px-6 py-3 bg-gold-400 text-black rounded-lg hover:bg-gold-600 cursor-pointer no-underline">
                            Go to Login
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}