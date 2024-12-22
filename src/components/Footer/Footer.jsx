import React from 'react';
import { Trophy } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 px-4 sm:px-6 lg:px-8 glass mt-20 text-white no-underline">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Trophy className="w-6 h-6 text-gold-400" />
                            <span className="font-bold gold-text">CodeVault</span>
                        </div>
                        <p className="text-sm text-gray-400">Your trusted source for digital rewards and collectibles.</p>
                    </div>
                    {[
                        {
                            title: "Product",
                            links: ["Features", "Pricing", "FAQ", "Support"]
                        },
                        {
                            title: "Company",
                            links: ["About", "Blog", "Careers", "Press"]
                        },
                        {
                            title: "Legal",
                            links: ["Privacy", "Terms", "Security", "Cookies"]
                        }
                    ].map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a href="#" className="text-sm text-gray-400 hover:text-gold-400 transition-colors no-underline">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="pt-8 border-t border-gray-800">
                    <p className="text-sm text-gray-400 text-center">
                        © 2024 CodeVault. All rights reserved to <span className='glass3 gold-text p-2'>Hazem Elmaghraby</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer