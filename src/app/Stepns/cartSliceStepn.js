import { createSlice } from "@reduxjs/toolkit";
import { db } from './../../constants/database/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from './../../constants/database/firebase';

// Save cart items to Firestore
const saveCartToFirestore = async (state) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const cartRef = doc(db, 'cart', user.uid);
            await setDoc(cartRef, { items: state.items });
        }
    } catch (e) {
        console.warn("Could not save cart to Firestore", e);
    }
};

// Load cart items from Firestore
const loadCartFromFirestore = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            const cartRef = doc(db, 'cart', user.uid);
            const cartDoc = await getDoc(cartRef);
            if (cartDoc.exists()) {
                return cartDoc.data().items;
            }
        }
        return [];
    } catch (e) {
        console.warn("Could not load cart from Firestore", e);
        return [];
    }
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
            saveCartToFirestore(state);
        },
        incrementCart: (state, action) => {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) {
                item.quantity += 1;
            }
            saveCartToFirestore(state);
        },
        decrementCart: (state, action) => {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(i => i.id !== id);
            }
            saveCartToFirestore(state);
        },
        removeItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(i => i.id !== id);
            saveCartToFirestore(state);
        },
    },
});

// Export actions
export const { setCart, addToCart, incrementCart, decrementCart, removeItem } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;