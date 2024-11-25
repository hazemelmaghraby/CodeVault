import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, User, Send } from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

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
        <motion.form
            onSubmit={handleSubmit}
            className="glass rounded-xl p-8 max-w-md w-full mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-200" />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                            placeholder="Your name"
                            required
                        />
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
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">Message</label>
                    <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gold-200" />
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
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
    );
}