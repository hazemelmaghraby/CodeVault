import React, { useEffect, useState } from 'react';
import { auth, db } from './../../../constants/database/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { User, Crown } from 'lucide-react';
import male from './../../../assets/male.png';
import female from './../../../assets/female.png';
import maleAdmin from './../../../assets/maleAdmin.png';
import femaleAdmin from './../../../assets/femaleAdmin.png';
import defaultImg from './../../../assets/default.png';
import './profile.css';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [firstname, setFirstName] = useState(null); // State for username
    const [lastname, setLastName] = useState(null); // State for username   // const [userData, setUserData] = useState(null);
    const [gender, setGender] = useState(null); // State for username   // const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState(null); // State for username   // const [userData, setUserData] = useState(null);
    const [createdAt, setCreatedAt] = useState(); // State for username   // const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profilePic, setProfilePic] = useState();

    document.title = "Profile";


    const loginRedirect = () => {
        window.location.href = '/login';
    }

    useEffect(() => {
        // Fetch the signed-in user's data
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUser(userData.username)
                    setFirstName(userData.firstName)
                    setLastName(userData.lastName)
                    setEmail(userData.email)
                    setGender(userData.gender)
                    setCreatedAt(userData.createdAt);
                    if (userData.createdAt) {
                        const createdAtDate = userData.createdAt.toDate(); // Convert Firestore Timestamp to JS Date
                        const formattedDate = createdAtDate.toLocaleDateString(); // Format as a readable date
                        setCreatedAt(formattedDate); // Set the formatted date
                    } else {
                        setCreatedAt('Unknown'); // Fallback if no createdAt is present
                    }
                    if (userData.isAdmin) {
                        setProfilePic(userData.gender === 'Male' ? maleAdmin : femaleAdmin);
                    } else {
                        setProfilePic(userData.gender === 'Male' ? male : female);
                    }
                    // setUserGender(userData.gender)
                    // }else if(userDoc.exists() && userData.isAdmin) {
                    //     setUserGender(userData.gender)
                } else {
                    console.log('No user document found in Firestore.');
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading ....</p>
        </div>
    }

    if (!user) {
        return (
            <div className='glass flex flex-col items-center justify-center'>
                <motion.div
                    className="not-authorized p-4 mt-24 text-center rounded shadow-lg w-100 flex justify-center items-center"
                    style={{ height: '10vh', width: '100%' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-gold-300">Please Login To View Your Profile.</h2>
                </motion.div>

                <button onClick={loginRedirect} className="gold-gradient px-6 py-3 rounded-lg font-medium text-black mb-5 flex justify-center items-center">
                    Login
                </button>
            </div>
        );
    }


    // const { firstName, lastName, email, gender, isAdmin, createdAt, username } = userData;

    // Select profile picture based on gender
    // const profilePicture =
    //     gender === 'male'
    //         ? '/path-to-male-avatar.png'
    //         : gender === 'female'
    //             ? '/path-to-female-avatar.png'
    //             : '/path-to-other-avatar.png';

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 mt-5 mb-0 glass">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass bg-black shadow-lg p-5 rounded-xl text-white"
                style={{ width: '100%', maxWidth: '450px' }}
            >
                <div className="text-center mb-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="gold-gradient bg-primary text-white rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3"
                        style={{ width: '96px', height: '96px', overflow: 'hidden' }}
                    >
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                    </motion.div>
                    <h2 className="fw-bold gold-text">{firstname} {lastname}</h2>
                    <p className="text-gray-400">
                        {/* <Crown className="text-gold-500 ml-20" size={16} /> */}
                        Admin
                    </p>
                </div>

                <div className="text-left">
                    <p>
                        <strong>Username:</strong> {user}
                    </p>
                    <p>
                        <strong>Email:</strong> {email}
                    </p>
                    <p>
                        <strong>Gender:</strong> {gender}
                    </p>
                    <p>
                        <strong>Joined:</strong> {createdAt || 'Unknown'}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
