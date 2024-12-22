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

const AddProductTest = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        type: '',
        price: '',
        img: '',
        category: '',
        platform: '',
        region: '',
        stock: 1
    });

    useEffect(() => {
        const checkAdminStatus = async () => {
            setLoading(true);
            try {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                if (userDoc.exists() && userDoc.data().isAdmin) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, []);

    const handleAddProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            await setDoc(doc(collection(db, 'products')), {
                ...newProduct,
                createdAt: serverTimestamp()
            });
            setModalOpen(false);
            setNewProduct({
                name: '',
                description: '',
                type: '',
                price: '',
                img: '',
                category: '',
                platform: '',
                region: '',
                stock: 1
            });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {isAdmin && (
                <>
                    <button className='mt-20' onClick={() => setModalOpen(true)}>Add Product</button>
                    {modalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                                <h2>Add New Product</h2>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Type"
                                    value={newProduct.type}
                                    onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={newProduct.price}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        if (!isNaN(value) && value >= 0) {
                                            setNewProduct({ ...newProduct, price: value });
                                        }
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={newProduct.img}
                                    onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Category"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Platform"
                                    value={newProduct.platform}
                                    onChange={(e) => setNewProduct({ ...newProduct, platform: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Region"
                                    value={newProduct.region}
                                    onChange={(e) => setNewProduct({ ...newProduct, region: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    value={newProduct.stock}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        if (!isNaN(value) && value >= 0) {
                                            setNewProduct({ ...newProduct, stock: value });
                                        }
                                    }}
                                />
                                <button onClick={handleAddProduct}>Submit</button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AddProductTest;