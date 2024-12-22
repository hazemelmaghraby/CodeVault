import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../constants/database/firebase";

const TestFirestore = () => {
    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(db, "products");
            const snapshot = await getDocs(productsCollection);
            const products = snapshot.docs.map(doc => doc.data());
            console.log("Test Firestore Products:", products); // Debugging
        };

        fetchProducts();
    }, []);

    return <div>Testing Firestore</div>;
};

export default TestFirestore;
