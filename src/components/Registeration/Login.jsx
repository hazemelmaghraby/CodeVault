import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, LogIn, Eye, EyeOff } from 'lucide-react';
import { auth, db } from './../../constants/database/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDocs, collection, doc, getDoc, deleteDoc } from 'firebase/firestore';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    document.title = "Login";


    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // Set a timeout for redirection
                setTimeout(() => {
                    window.location.href = '/profile';
                }, 1000); // Delay of 2000 milliseconds (2 seconds)
            }
        });

        return () => unsubscribe();
    }, []);

    // export default AuthRedirect;



    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully:', userCredential.user);
            // Fetch user details from Firestore
            const userId = userCredential.user.uid; // Get the user ID
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                // Store user details in local storage
                localStorage.setItem('username', userData.username);
                localStorage.setItem('firstName', userData.firstName);
                localStorage.setItem('lastName', userData.lastName);
                localStorage.setItem('email', userData.email);
                localStorage.setItem('gender', userData.gender);
            }
            // navigate('/dashboard'); // Redirect after successful login
        } catch (authError) {
            // setError(authError.message);
            switch (authError.code) {
                case 'auth/invalid-credential':
                    setError('Invalid Email Or Password.')
                    break;
                default:
                    setError('Error Occured Please Try Again Later.')
                    break;
            }
        } finally {
            setLoading(false);
        }
    };


    const handleLogOut = async () => {
        try {
            await signOut(auth);
            console.log('User logged out successfully.');
        } catch (err) {
            console.error(`Error during logout: ${err.message}`);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 glass">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass shadow-lg p-8 rounded-xl"
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <div className="text-center mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="gold-gradient text-white rounded-circle d-flex justify-content-center align-items-center mx-auto mb-4"
                        style={{ width: '64px', height: '64px' }}
                    >
                        <LogIn size={32} />
                    </motion.div>
                    <h2 className="fw-bold text-white">Welcome Back</h2>
                    <p className="text-gray-200">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && <p className="text-red-400 text-lg bg-black border-r-2">{error}</p>}

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-3"
                    >
                        <label className="block text-white mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-200" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="glass w-full pl-10 py-2 text-white rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-3"
                    >
                        <label className="block text-white mb-1">Password</label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-200" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="glass w-full pl-10 py-2 text-white rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-gold-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`gold-gradient w-full py-3 rounded-lg font-medium transition-all ${loading ? 'text-gray-400' : 'text-black'}`}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </motion.button>
                </form>

                <button
                    onClick={handleLogOut}
                    className="w-full py-3 mt-4 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-all"
                >
                    Log Out
                </button>

                <p className="text-center text-gray-200 mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-gold-500 underline">
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </div>

    );
}
