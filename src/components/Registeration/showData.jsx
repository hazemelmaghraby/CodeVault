import React, { useState, useEffect } from 'react';
import { auth, db } from './../../constants/database/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion'; // Make sure this is imported


const ShowData = () => {
    const [showUserCreds, setShowUserCred] = useState([]); // Initialize state as an empty array
    const [username, setUsername] = useState(null); // Store the current user's username
    const [isAdmin, setIsAdmin] = useState(false); // Store if the current user is an admin
    const userDataRef = collection(db, 'users'); // Reference to the 'users' collection

    // Fetch all user data from Firestore
    const getUserCreds = async () => {
        try {
            const userDataSnapshot = await getDocs(userDataRef);
            const filteredUserData = userDataSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setShowUserCred(filteredUserData);
            console.log(filteredUserData);
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };

    // Check if the user is an admin
    const fetchAdminData = async (user) => {
        if (user) {
            const currentUserDataRef = doc(db, 'users', user.uid);
            const currentUserDataSnap = await getDoc(currentUserDataRef);

            if (currentUserDataSnap.exists() && currentUserDataSnap.data().isAdmin) {
                setIsAdmin(true); // Set the state to true if the user is an admin
                getUserCreds(); // Fetch user data if the user is an admin
            } else {
                setIsAdmin(false); // Set the state to false if the user is not an admin
            }
        }
    };

    const accountDeletion = async () => {
        const user = auth.currentUser;

        if (!user) {
            alert('No user is signed in');
            return;
        }

        try {
            // Deleting the user account
            await user.delete();
            alert('Account Deleted Successfully');
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                alert('Please log in again to delete your account.');
            } else {
                console.error('Error deleting account:', error);
                alert('An error occurred while deleting your account. Please try again.');
            }
        }
    };

    // Check the authentication state and fetch the username from Firestore
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Fetch the username of the currently signed-in user
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUsername(userData.username || 'No username found');
                        console.log(`USERNAME: ${userData.username}`);
                        console.log(`GENDER: ${userData.gender}`);
                        console.log(`MAIL: ${userData.email}`);
                        fetchAdminData(user); // Check if the user is an admin
                    } else {
                        console.log('No user document found in Firestore.');
                    }
                } catch (error) {
                    console.error('Error fetching username from Firestore:', error);
                }
            } else {
                console.log('No user is signed in.');
                setUsername(null);
                setIsAdmin(false); // Reset admin state when no user is signed in
            }
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="container py-5">
            <motion.div
                className="glass rounded-xl p-5 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h2
                    className="text-center mb-4 text-gold-500"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Current User
                </motion.h2>
                <p className="text-center text-lg text-white">
                    {username ? (
                        <>
                            Signed in as: <span className="text-gold-400 font-semibold">{username}</span>
                        </>
                    ) : (
                        <span className="text-danger">No user is signed in or username not found.</span>
                    )}
                </p>

                {isAdmin ? (
                    <motion.div
                        className="mt-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.h2
                            className="text-center mb-4 text-gold-500"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            All Users Data
                        </motion.h2>
                        {showUserCreds.length > 0 ? (
                            <motion.div
                                className="table-responsive glass rounded shadow-lg p-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <table className="table table-hover align-middle text-center">
                                    <thead className="bg-gold-300 text-white">
                                        <tr>
                                            <th>Email</th>
                                            <th>Created At</th>
                                            <th>Username</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Admin</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showUserCreds.map((user) => (
                                            <tr key={user.id} className="hover:bg-gold-50 transition-colors">
                                                <td>{user.email}</td>
                                                <td>{user.createdAt?.toDate().toLocaleString()}</td>
                                                <td>{user.username}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>
                                                    <span
                                                        className={`badge ${user.isAdmin
                                                            ? 'bg-success text-white'
                                                            : 'bg-secondary text-dark'
                                                            }`}
                                                    >
                                                        {user.isAdmin ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <motion.button
                                                        onClick={accountDeletion}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="btn btn-danger btn-sm rounded shadow-sm"
                                                    >
                                                        Delete Account From Database
                                                    </motion.button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        ) : (
                            <motion.p
                                className="text-center text-muted mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                No user data available.
                            </motion.p>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        className="not-authorized glass p-4 mt-5 text-center rounded shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-danger">You are not authorized to access this page.</h2>
                    </motion.div>
                )}
            </motion.div>
        </div>

    );
};

export default ShowData;
