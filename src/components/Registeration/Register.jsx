import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, UserPlus, Eye, EyeOff, User } from 'lucide-react';
import { auth } from './../../constants/database/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './../../constants/database/firebase';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('Male'); // State for gender
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    document.title = "Registeration";




    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };
    const formattedFirstName = capitalizeFirstLetter(firstName);
    const formattedLastName = capitalizeFirstLetter(lastName);



    const navigate = useNavigate();
    const usersDatabase = collection(db, 'users'); // Firestore users collection

    // const handleRegistere = async (e) => {
    //     e.preventDefault();
    //     setError('');
    //     setLoading(true);

    //     try {
    //         // Step 1: Create user with Firebase Authentication
    //         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //         const user = userCredential.user;
    //         console.log('User registered successfully:', user);

    //         // Step 2: Create user profile in Firestore
    //         await setDoc(doc(usersDatabase, user.uid), {
    //             email,
    //             username,
    //             gender, // Save gender to Firestore
    //             createdAt: serverTimestamp(),
    //             isAdmin: false,
    //         });

    //         // Step 3: Redirect to dashboard after successful registration

    //     } catch (authError) {
    //         setError(authError.message); // Display authentication error
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Step 1: Create the user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Firebase Auth user object
            console.log('User registered successfully:', user);

            try {
                // Step 2: Query existing users to calculate the next user ID
                // const userSnapshot = await getDocs(usersDatabase);
                // const userCount = userSnapshot.size; // Total number of documents
                // const customId = `user${userCount + 1}`; // Generate custom ID

                // Step 3: Write to Firestore
                await setDoc(doc(usersDatabase, user.uid), {
                    email,
                    username,
                    firstName: formattedFirstName,
                    lastName: formattedLastName,
                    gender, // Save gender to Firestore
                    createdAt: serverTimestamp(),
                    isAdmin: false,
                });

                localStorage.setItem('username', username);
                localStorage.setItem('firstName', firstName);
                localStorage.setItem('lastName', lastName);
                localStorage.setItem('gender', gender);
                navigate('/profile');
            } catch (firestoreError) {
                // Step 4: Rollback Authentication if Firestore fails
                await user.delete();
                console.error(`Firestore write failed. Authentication rolled back: ${firestoreError.message}`);
            }
        } catch (authError) {
            // Handle authentication errors
            setError(authError.message); // Display authentication error
        } finally {
            setLoading(false);
        }
    };


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
                        style={{ width: '64px', height: '64px' }}
                    >
                        <UserPlus size={32} />
                    </motion.div>
                    <h2 className="fw-bold gold-text">Create an Account</h2>
                    <p className="text-gray-400">Sign up to join our community</p>
                </div>

                <form onSubmit={handleRegister} className="mb-4">
                    {error && <p className="text-danger small">{error}</p>}

                    {/* First Name and Last Name */}
                    <div className="flex space-x-4">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mb-3 flex-1"
                        >
                            <label className="form-label">First Name</label>
                            <div className="input-group">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-200" size={20} />
                                <input
                                    type="mail"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="glass w-full pl-10 py-2 text-white rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                                    placeholder="Your Firstname"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mb-3 flex-1"
                        >
                            <label className="form-label">Last Name</label>
                            <div className="input-group">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-200" size={20} />
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="glass w-full pl-10 py-2 text-white rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                                    placeholder="Your Lastname"
                                    required
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Username */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-3"
                    >
                        <label className="form-label">Username</label>

                        <div className="input-group">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-200" size={20} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="glass w-full pl-10 py-2 text-white rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-3"
                    >
                        <label className="form-label">Email</label>
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

                    {/* Gender */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mb-3"
                    >
                        <label className="form-label">Gender</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-200" size={20} />
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="glass w-full pl-10 py-2 text-white rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                                required
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </motion.div>

                    {/* Password */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-3"
                    >
                        <label className="form-label">Password</label>
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

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`gold-gradient w-full py-3 rounded-lg font-medium transition-all ${loading ? 'text-gray-400' : 'text-black'}`}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </motion.button>
                </form>

                <p className="text-center small">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary">
                        Log in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}