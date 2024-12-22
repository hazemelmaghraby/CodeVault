import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../constants/database/firebase';
import {
    collection,
    getDocs,
    setDoc,
    doc,
    getDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import { BadgePlus, ShoppingCart, NotebookTabs } from 'lucide-react';
import maleAdmin from './../../../assets/maleAdmin.png'

const AddProduct = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        type: '',
        value: '',
        price: '',
    });

    // Track the signed-in user
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Fetch user document from Firestore
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setIsAdmin(userData.isAdmin || false); // Check for `isAdmin` flag
                } else {
                    console.error('User document not found.');
                }
            }
        });

        return () => unsubscribe();
    }, []);

    // Fetch products from Firestore
    useEffect(() => {
        if (isAdmin) {
            const fetchProducts = async () => {
                const productsRef = collection(db, 'products');
                const querySnapshot = await getDocs(productsRef);
                const productList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productList);
            };
            fetchProducts();
        }
    }, [isAdmin]);

    // Add product to Firestore
    const handleAddProduct = async () => {
        if (!newProduct.type || !newProduct.value || !newProduct.price) {
            alert('All fields are required!');
            return;
        }

        try {
            const productRef = doc(collection(db, 'products'));
            await setDoc(productRef, {
                ...newProduct,
                addedBy: user.email,
                timestamp: serverTimestamp(),
            });
            alert('Product added successfully!');
            setModalOpen(false);
            setNewProduct({ type: '', value: '', price: '' });
        } catch (error) {
            console.error('Error adding product: ', error);
            alert('Failed to add product.');
        }
    };

    return (
        <div className="container min-h-screen h-10 w-100">
            {/* Check if user is admin */}
            {!isAdmin && <motion.div
                className="not-authorized glass p-4 mt-5 text-center rounded shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-danger">You are not authorized to access this page.</h2>
            </motion.div>}

            {isAdmin && (
                <>
                    {/* Display products
                    <div className="relative overflow-hidden min-h-screen  items-center glass pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                        <h2 className="text-xl font-bold text-gray-100">Products</h2>
                        {products.length > 0 ? (
                            <ul className="mt-4 space-y-4">
                                {products.map((product) => (
                                    <li
                                        key={product.id}
                                        className="p-4 bg-gray-800 rounded-lg shadow-md text-white"
                                    >
                                        <p>
                                            <strong>Type:</strong> {product.type}
                                        </p>
                                        <p>
                                            <strong>Value:</strong> {product.value}
                                        </p>
                                        <p>
                                            <strong>Price:</strong> {product.price}
                                        </p>
                                        <p>
                                            <strong>Added By:</strong> {product.addedBy}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No products found.</p>
                        )} */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-72">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    className="glass rounded-lg p-6 flex flex-col items-center hover:bg-black/60 transition-colors"
                                    initial="initial"
                                    animate="animate"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-32 h-32 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold mb-2 text-white">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-400 mb-4 text-center">
                                        {product.description}
                                    </p>
                                    <span className="text-lg font-bold gold-text mb-4">
                                        {product.price}
                                    </span>
                                    <button className="gold-gradient px-6 py-3 rounded-lg font-medium text-black">
                                        More Details
                                        <NotebookTabs className="w-5 h-5 ml-2 inline-block" />
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                className="not-authorized glass p-4 mt-5 text-center rounded shadow-lg mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-danger">No Products Found</h2>
                            </motion.div>
                        )}
                    </div>


                    <div>
                        {/* Add Product Button */}
                        <button
                            onClick={() => setModalOpen(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform"
                        >
                            <BadgePlus className="w-5 h-5 block" />
                            Add Product
                        </button>
                    </div>

                    {/* Modal for adding product */}
                    {modalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-row justify-between z-50 glass">
                            {/* First Div - On the Right */}
                            <div className="p-4 rounded shadow-lg flex flex-col justify-center items-center  glass self-center mr-8">
                                <img src={maleAdmin} alt="" className="w-[100px]" />
                                <h4 className="text-white text-center">Add Product As : username</h4>
                            </div>

                            {/* Second Div - On the Left */}
                            <div className="flex-1 second flex flex-col gap-4 p-4 w-1/4 glass self-center ml-8 mr-4">
                                <label htmlFor="">
                                    <h4 className="text-white">Category</h4>
                                    <input className="bg-transparent w-full p-2 border border-gray-500 rounded text-white" />
                                </label>

                                <label htmlFor="">
                                    <h4 className="text-white">Product Name</h4>
                                    <input className="bg-transparent w-full p-2 border border-gray-500 rounded text-white" />
                                </label>

                                <label htmlFor="">
                                    <h4 className="text-white">Product Name</h4>
                                    <input className="bg-transparent w-full p-2 border border-gray-500 rounded text-white" />
                                </label>

                                <label htmlFor="">
                                    <h4 className="text-white">Product Name</h4>
                                    <input className="bg-transparent w-full p-2 border border-gray-500 rounded text-white" />
                                </label>
                            </div>
                        </div>

                    )}
                </>
            )}
        </div>
    );
};

export default AddProduct;



{/* <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-80">
                                <h3 className="text-lg font-bold mb-4">Add New Product</h3>
                                <div className="space-y-3">
                                    
                                    <label className="block">
                                        <span>Type</span>
                                        <select
                                            value={newProduct.type}
                                            onChange={(e) =>
                                                setNewProduct({ ...newProduct, type: e.target.value })
                                            }
                                            className="w-full bg-gray-800 rounded-lg p-2 mt-1"
                                        >
                                            <option value="" disabled>
                                                Select a type
                                            </option>
                                            <option value="gaming">Gaming</option>
                                            <option value="trading">Trading</option>
                                            <option value="coding">Coding</option>
                                            <option value="designing">Designing</option>
                                            <option value="gift card">Gift Card</option>
                                            <option value="paypal">PayPal</option>
                                        </select>
                                    </label>

                                    
                                    <label className="block">
                                        <span>Value</span>
                                        <input
                                            type="text"
                                            placeholder="e.g., 5$"
                                            value={newProduct.value}
                                            onChange={(e) =>
                                                setNewProduct({ ...newProduct, value: e.target.value })
                                            }
                                            className="w-full bg-gray-800 rounded-lg p-2 mt-1"
                                        />
                                    </label>

                                    {/* Product Price 
                                    <label className="block">
                                        <span>Price</span>
                                        <input
                                            type="text"
                                            placeholder="e.g., 4.99$"
                                            value={newProduct.price}
                                            onChange={(e) =>
                                                setNewProduct({ ...newProduct, price: e.target.value })
                                            }
                                            className="w-full bg-gray-800 rounded-lg p-2 mt-1"
                                        />
                                    </label>
                                </div>

                                
                                <div className="mt-6 flex justify-end gap-2">
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddProduct}
                                        className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500"
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </div>
                        </motion.div> */}