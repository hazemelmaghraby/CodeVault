import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MinusCircle, PlusCircle, Trash2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../../constants/database/firebase';
import { motion } from 'framer-motion';
import { incrementCart, decrementCart, removeItem, setCart } from '../../../app/Slices/cartSlice';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Cart = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    document.title = "Cart";

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            const user = auth.currentUser;
            if (user) {
                const cartRef = doc(db, 'cart', user.uid);
                const cartDoc = await getDoc(cartRef);
                if (cartDoc.exists()) {
                    dispatch(setCart(cartDoc.data().items));
                }
            }
        };

        fetchCartItems();
    }, [dispatch]);

    const handleIncrement = (id) => {
        dispatch(incrementCart(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementCart(id));
    };

    const handleRemoveItem = (id) => {
        dispatch(removeItem(id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto mt-20">
            {loggedIn ? (
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2/3 p-4">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center bg-black/60 p-8 rounded-lg shadow-lg text-white space-y-4">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full p-4"
                                >
                                    <ShoppingCart size={48} className="text-black" />
                                </motion.div>
                                <h3 className="text-2xl font-semibold">Your cart is empty</h3>
                                <p className="text-gray-400">Looks like you haven't added anything to your cart yet.</p>
                                <Link
                                    to="/pro"
                                    className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-black font-bold hover:opacity-90 transition-opacity"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 border-b glass rounded-lg mb-3">
                                    <div className="flex items-center">
                                        <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                                            <p className="text-gray-500">${item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => handleDecrement(item.id)} className="text-gray-500 hover:text-gray-700">
                                            <MinusCircle size={24} />
                                        </button>
                                        <span className="mx-2 text-white">{item.quantity}</span>
                                        <button onClick={() => handleIncrement(item.id)} className="text-gray-500 hover:text-gray-700">
                                            <PlusCircle size={24} />
                                        </button>
                                        <button onClick={() => handleRemoveItem(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                                            <Trash2 size={24} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="w-full h-auto md:w-1/3 p-4 glass shadow-lg rounded-lg text-white mr-5 mt-4">
                        <h2 className="text-xl font-bold mb-4">Receipt</h2>
                        <div className="space-y-2">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <span>
                                        {item.name} x {item.quantity}
                                    </span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between mt-4 border-t pt-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">${calculateTotal()}</span>
                            </div>
                            <button className="mt-4 text-black w-full bg-yellow-500 py-2 rounded hover:bg-yellow-600">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-28 glass p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-white">You must be logged in to view your cart.</h2>
                    <Link to="/login" className="mt-4 px-6 py-3 bg-gold-400 text-black rounded-lg hover:bg-gold-600">
                        Go to Login
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;