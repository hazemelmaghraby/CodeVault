import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from './../../constants/database/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Trophy, ChevronRight } from 'lucide-react';
import male from './../../assets/male.png';
import female from './../../assets/female.png';
import maleAdmin from './../../assets/maleAdmin.png';
import femaleAdmin from './../../assets/femaleAdmin.png';
import defaultImg from './../../assets/default.png';
import './Navbar.css';

export default function Navbar() {
    const [username, setUsername] = useState(null); // State for username
    const [firstname, setFirstName] = useState(null); // State for username
    const [lastname, setLastName] = useState(null); // State for username
    const [profilePic, setProfilePic] = useState(); // State for username

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Fetch user data from Firestore
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUsername(userData.username || 'User');
                        setFirstName(userData.firstName || 'User');
                        setLastName(userData.lastName || 'User');
                        if (userData.isAdmin) {
                            setProfilePic(userData.gender?.toLowerCase() === 'male' ? maleAdmin : femaleAdmin);
                        } else {
                            setProfilePic(userData.gender?.toLowerCase() === 'male' ? male : female);
                        }
                        // setUserGender(userData.gender)
                        // }else if(userDoc.exists() && userData.isAdmin) {
                        //     setUserGender(userData.gender)
                    } else {
                        console.log('No user document found in Firestore.');
                    }
                } catch (error) {
                    console.error('Error fetching user data from Firestore:', error);
                }
            } else {
                console.log('No user is signed in.');
                setUsername(null);
                setFirstName(null);
                setLastName(null);
                setProfilePic(defaultImg); // Reset to default image on logout
            }
        });

        // useEffect(() => {
        //     const 
        //     try {
        //         const userDoc = await getDoc(doc(db, 'users', user.uid));
        //         if (userDoc.exists()) {

        //         }

        //     } catch (err) {

        //     }

        // }, [])

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    // const profilePic = userGender === 'female' ? female : male;

    // const profilepicc = async () => {
    //     try {
    //         const userDoc = await getDoc(doc(db, 'users', user.uid));

    //         // Check if document exists
    //         if (!userDoc.exists()) {
    //             console.error("User document does not exist.");
    //             return defaultImg; // Fallback to default image
    //         }

    //         const userData = userDoc.data();

    //         // Check if the user is an admin and determine the admin profile picture
    //         if (userData.isAdmin) {
    //             return userData.gender?.toLowerCase() === "male" ? maleAdmin : femaleAdmin;
    //         }

    //         // Determine the regular profile picture based on gender
    //         if (userData.gender?.toLowerCase() === "male") {
    //             return male;
    //         } else if (userData.gender?.toLowerCase() === "female") {
    //             return female;
    //         }

    //         // Default fallback image for undefined gender
    //         return defaultImg;
    //     } catch (error) {
    //         console.error("Error fetching user document:", error);
    //         return defaultImg; // Return default image in case of an error
    //     }
    // };


    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out successfully.');
            setUsername(null); // Clear username after logout
        } catch (err) {
            console.error('Error during logout:', err.message);
        }
    };

    return (
        <nav className="absolute top-0 w-full z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Left Section */}
                    <div className="flex items-center space-x-2">
                        <Trophy className="w-8 h-8 text-gold-400" />
                        <span className="text-xl font-bold gold-text">CodeVault</span>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {username ? (
                            // If user is signed in, show username dropdown
                            // Dropdown for signed-in user
                            <div className="relative group">
                                {/* Dropdown Trigger */}
                                <button className="text-sm font-semibold text-white hover:text-gold-400 transition-colors flex items-center space-x-2">
                                    <span>{username}</span>
                                    <ChevronRight className="w-4 h-4 transform group-hover:rotate-90 transition-transform" />
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute hidden group-hover:block right-0 mt-2 w-56 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg shadow-lg border border-gray-700 z-50 overflow-hidden transition-all duration-300 ease-out">
                                    {/* User Info */}
                                    <img src={profilePic} alt="User profile" className='w-20 h-15 mx-auto my-2' />
                                    <div className="px-4 py-3 bg-gray-900 border-b border-gray-700">
                                        <h5 className="text-sm font-bold truncate">
                                            {firstname} {lastname}
                                        </h5>
                                        <p className="text-xs text-gray-400 truncate">
                                            {username}
                                        </p>
                                    </div>

                                    {/* Dropdown Links */}
                                    <div className="py-2">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition-colors no-underline"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition-colors no-underline"
                                        >
                                            Pricing
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition-colors no-underline"
                                        >
                                            Help Center
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-700 rounded-md transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            // If no user is signed in, show Sign In and Register buttons
                            <>
                                <Link
                                    to="/login"
                                    className="text-sm hover:text-gold-400 transition-colors text-white no-underline"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 gold-gradient rounded-lg text-sm hover:opacity-90 transition-opacity text-black no-underline"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}



// import React, { useEffect, useState } from 'react';
// import { auth, db } from './../../constants/database/firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     const [username, setUsername] = useState(null); // State for username

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (user) => {
//             if (user) {
//                 try {
//                     // Fetch user data from Firestore
//                     const userDoc = await getDoc(doc(db, 'users', user.uid));
//                     if (userDoc.exists()) {
//                         const userData = userDoc.data();
//                         setUsername(userData.username || 'User');
//                     } else {
//                         console.log('No user document found in Firestore.');
//                     }
//                 } catch (error) {
//                     console.error('Error fetching user data from Firestore:', error);
//                 }
//             } else {
//                 console.log('No user is signed in.');
//                 setUsername(null);
//             }
//         });

//         // Cleanup listener on component unmount
//         return () => unsubscribe();
//     }, []);

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             console.log('User logged out successfully.');
//             setUsername(null); // Clear username after logout
//         } catch (err) {
//             console.error('Error during logout:', err.message);
//         }
//     };

//     return (
//         <>
//             <nav className="navbar navbar-expand-lg bg-body-tertiary">
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="#">
//                         Navbar
//                     </a>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <a className="nav-link active" aria-current="page" href="#">
//                                     Home
//                                 </a>
//                             </li>
//                         </ul>
//                         <div className="d-flex align-items-center">
//                             {username ? (
//                                 // Show username and logout option if signed in
//                                 <div className="dropdown">
//                                     <button
//                                         className="btn btn-secondary dropdown-toggle"
//                                         type="button"
//                                         id="userMenu"
//                                         data-bs-toggle="dropdown"
//                                         aria-expanded="false"
//                                     >
//                                         {username}
//                                     </button>
//                                     <ul className="dropdown-menu" aria-labelledby="userMenu">
//                                         <li>
//                                             <a className="dropdown-item" href="/profile">
//                                                 Profile
//                                             </a>
//                                         </li>
//                                         <li>
//                                             <a
//                                                 className="dropdown-item text-danger"
//                                                 onClick={handleLogout}
//                                                 href="#"
//                                             >
//                                                 Logout
//                                             </a>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             ) : (
//                                 // Show Login and Register buttons if no user is signed in
//                                 <div>
//                                     <Link to="/login" className="btn btn-primary me-2">
//                                         Login
//                                     </Link>
//                                     <Link to="/register" className="btn btn-secondary">
//                                         Register
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     );
// };

// export default Navbar;


// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import {
//     Gamepad2,
//     Bitcoin,
//     Gift,
//     Shield,
//     Zap,
//     Users,
//     ChevronRight,
//     Star,
//     Trophy,
//     Target,
//     Sparkles
// } from 'lucide-react';
// // import ContactForm from './ContactForm';

// const fadeInUp = {
//     initial: { opacity: 0, y: 50 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
// };

// const fadeIn = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1 },
//     transition: { duration: 0.8 }
// };

// const stagger = {
//     animate: {
//         transition: {
//             staggerChildren: 0.1
//         }
//     }
// };

// const scaleIn = {
//     initial: { scale: 0.9, opacity: 0 },
//     animate: { scale: 1, opacity: 1 },
//     transition: { duration: 0.5 }
// };

// const [username, setUsername] = useState(null); // State for username

// useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//         if (user) {
//             try {
//                 // Fetch user data from Firestore
//                 const userDoc = await getDoc(doc(db, 'users', user.uid));
//                 if (userDoc.exists()) {
//                     const userData = userDoc.data();
//                     setUsername(userData.username || 'User');
//                 } else {
//                     console.log('No user document found in Firestore.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data from Firestore:', error);
//             }
//         } else {
//             console.log('No user is signed in.');
//             setUsername(null);
//         }
//     });

//     // Cleanup listener on component unmount
//     return () => unsubscribe();
// }, []);

// const handleLogout = async () => {
//     try {
//         await signOut(auth);
//         console.log('User logged out successfully.');
//         setUsername(null); // Clear username after logout
//     } catch (err) {
//         console.error('Error during logout:', err.message);
//     }
// };

// export default function Navbar() {
//     return (
//         <nav className="absolute top-0 w-full z-50 glass">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//                 <div className="flex justify-between items-center">
//                     <div className="flex items-center space-x-2">
//                         <Trophy className="w-8 h-8 text-gold-400" />
//                         <span className="text-xl font-bold gold-text">CodeVault</span>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <Link to="/login" className="text-sm hover:text-gold-400 transition-colors text-white no-underline">Sign In</Link>
//                         <Link to="/register" className="px-4 py-2 gold-gradient rounded-lg text-sm hover:opacity-90 transition-opacity text-black no-underline">
//                             Get Started
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }