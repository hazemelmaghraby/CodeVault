import React from 'react';
import { auth, db } from './../../../constants/database/firebase.js';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userDoc);
                const userData = userSnap.data();
                setIsAdmin(userData.isAdmin);
                setLoading(false);
                // console.log(userData.isAdmin);
            }
            else {
                setIsAdmin(false);
            }
        });

    }, [])

    if (loading) {
        return <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading ....</p>
        </div>
    }

    return (
        <section className="dashboard-section base-comp shadow rounded">
            <motion.div
                className="glass rounded-xl p-5 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h2
                    className="text-center mb-4 text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Signed In As : <span className='text-gold-500'>{localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</span>
                </motion.h2>
            </motion.div>
            {isAdmin ? (<div className="admin-dashboard p-4">
                <header className="dashboard-header mb-4">
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                </header>
                <main className="dashboard-main grid grid-cols-1 md:grid-cols-3 gap-4">
                    <section className="dashboard-section p-4 glass text-white shadow rounded">
                        <h2 className="text-2xl font-semibold mb-2">Users Database</h2>
                        <ul>
                            <li><Link className='text-2xl gold-text hover:text-gold-200 hover:no-underline mb-5' to="usersData">View Users Accounts Details</Link></li>
                        </ul>
                    </section>
                    <section className="dashboard-section p-4 glass text-white shadow rounded">
                        <h2 className="text-2xl font-semibold mb-2">Settings</h2>
                        <ul>
                            <li><Link className='text-2xl gold-text hover:text-gold-200 hover:no-underline' to="productAdd">Add Product</Link></li>
                            <li><Link className='text-2xl gold-text hover:text-gold-200 hover:no-underline' to="productRemove">Remove Product</Link></li>
                            <li><Link className='text-2xl gold-text hover:text-gold-200 hover:no-underline' to="/underDev">View Products As Admin</Link></li>
                        </ul>
                    </section>
                    <section className="dashboard-section p-4 glass text-white shadow rounded">
                        <h2 className="text-2xl font-semibold mb-2">Reports</h2>
                        No Reports To Be Shown
                    </section>
                </main>
            </div>) : (<div className="flex flex-col items-center justify-center min-h-screen glass text-center p-4">
                <h1 className="text-3xl font-bold mb-4">You are not an admin!</h1>
            </div>)
            }

        </section>
    );
};

export default AdminDashboard;