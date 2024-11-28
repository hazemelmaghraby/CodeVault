import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const icons = [
    { Icon: Facebook, link: 'https://facebook.com' },
    { Icon: Twitter, link: 'https://twitter.com' },
    { Icon: Instagram, link: 'https://instagram.com' },
    { Icon: Youtube, link: 'https://youtube.com' },
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function SocialMedia() {
    return (
        <>

        </>
    );
}
