import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../constants/database/firebase';
import {
    collection,
    setDoc,
    doc,
    serverTimestamp,
    getDocs,
    getDoc
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import { BadgePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const AddProduct = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        img: '',
        platform: '',
        productType: '',
        region: '',
        value: '',
        price: '',
        productCode: '',
    });
    const [regions, setRegions] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setIsAdmin(userData.isAdmin || false);
                } else {
                    console.error('User document not found.');
                    setIsAdmin(false);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setProducts(productsList);
    };

    const handleAddProduct = async () => {
        if (!newProduct.category || !newProduct.platform || !newProduct.productType || !newProduct.price || !newProduct.productCode) {
            alert('All fields are required!');
            return;
        }

        try {
            const productRef = doc(collection(db, 'products'));

            await setDoc(productRef, {
                ...newProduct,
                addedBy: user.email,
                addedByUID: user.uid,
                timestamp: serverTimestamp(),
            });

            alert('Product added successfully!');
            setModalOpen(false);
            setNewProduct({
                name: '',
                category: '',
                img: '',
                platform: '',
                productType: '',
                region: '',
                value: '',
                price: '',
                productCode: '',
            });

            fetchProducts();
        } catch (error) {
            console.error('Error adding product: ', error);
            alert('Failed to add product.');
        }
    };

    // const handleCategoryChange = (e) => {
    //     const category = e.target.value;
    //     setNewProduct((prevState) => ({
    //         ...prevState,
    //         category,
    //         platform: '',
    //         productType: '',
    //         region: '',
    //         value: '',
    //     }));

    //     if (category === 'gaming') {
    //         setRegions(['US', 'Argentina', 'Egypt', 'Turkey', 'Ukraine', 'Russia', 'Global']);
    //     } else if (category === 'financial') {
    //         setRegions(['US', 'Europe', 'Asia', 'Global']);
    //     } else if (category === 'trading') {
    //         setRegions(['Forex', 'Crypto', 'Stocks', 'Global']);
    //     } else {
    //         setRegions([]);
    //     }
    // };

    const handlePlatformChange = (e) => {
        const platform = e.target.value;
        setNewProduct((prevState) => ({
            ...prevState,
            platform,
            productType: '',
            region: '',
            value: '',
        }));
    };

    const handleProductTypeChange = (e) => {
        const productType = e.target.value;
        setNewProduct((prevState) => ({
            ...prevState,
            productType,
            region: '',
            value: '',
        }));
    };

    return (
        <div className="min-h-screen">
            {!isAdmin && (
                <motion.div
                    className="not-authorized glass p-4 mt-5 text-center rounded shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-danger">You are not authorized to access this page.</h2>
                </motion.div>
            )}

            {isAdmin && (
                <>
                    <div>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="flex items-center mt-20 gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform"
                        >
                            <BadgePlus className="w-5 h-5 block" />
                            Add Product
                        </button>
                    </div>

                    {modalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <motion.div
                                className="bg-black/60 glass p-8 rounded-xl shadow-lg text-white w-full max-w-lg"
                                initial="initial"
                                animate="animate"
                                variants={fadeInUp}
                            >
                                <h3 className="text-3xl font-bold mb-6 text-white">
                                    Add New Product
                                </h3>

                                <div className="space-y-4">
                                    <label>
                                        <span>Name</span>
                                        <input
                                            type="text"
                                            value={newProduct.name}
                                            onChange={(e) =>
                                                setNewProduct({ ...newProduct, name: e.target.value })
                                            }
                                            className="w-full bg-black/40 text-white p-2 rounded-lg"
                                        />
                                    </label>

                                    <label>
                                        <span>Category</span>
                                        <select
                                            value={newProduct.category}
                                            className="w-full bg-black/40 text-white p-2 rounded-lg"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="gaming">Gaming</option>
                                            <option value="financial">Financial</option>
                                            <option value="trading">Trading</option>
                                        </select>
                                    </label>

                                    {regions.length > 0 && (
                                        <label>
                                            <span>Region</span>
                                            <select
                                                value={newProduct.region}
                                                onChange={(e) =>
                                                    setNewProduct({ ...newProduct, region: e.target.value })
                                                }
                                                className="w-full bg-black/40 text-white p-2 rounded-lg"
                                            >
                                                <option value="">Select Region</option>
                                                {regions.map((region) => (
                                                    <option key={region} value={region}>
                                                        {region}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    )}

                                    <label>
                                        <span>Price</span>
                                        <input
                                            type="number"
                                            value={newProduct.price}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value);
                                                if (!isNaN(value) && value >= 0) {
                                                    setNewProduct({ ...newProduct, price: value });
                                                }
                                            }}
                                            className="w-full bg-black/40 text-white p-2 rounded-lg"
                                        />
                                    </label>

                                    <label>
                                        <span>Product Code</span>
                                        <input
                                            type="text"
                                            value={newProduct.productCode}
                                            onChange={(e) =>
                                                setNewProduct({ ...newProduct, productCode: e.target.value })
                                            }
                                            className="w-full bg-black/40 text-white p-2 rounded-lg"
                                        />
                                    </label>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="px-6 py-3 bg-gray-600 rounded-lg hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddProduct}
                                        className="px-6 py-3 bg-green-500 gold-gradient text-black rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AddProduct;
