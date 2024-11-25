import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';

const userDataRef = collection(db, 'users'); // Reference to the 'users' collection

// Fetch all user data from Firestore
export const getUserCreds = async () => {
    try {
        const userDataSnapshot = await getDocs(userDataRef);
        const filteredUserData = userDataSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return filteredUserData; // Return data to be handled by the caller
    } catch (error) {
        console.log('Error fetching user data:', error);
        throw error; // Propagate the error to the caller
    }
};

// Subscribe to auth state changes and fetch the username
export const subscribeToAuthState = (setUsername) => {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUsername(userData.username || 'No username found');
                    console.log(`USERNAME: ${userData.username}`);
                } else {
                    console.log('No user document found in Firestore.');
                }
            } catch (error) {
                console.error('Error fetching username from Firestore:', error);
            }
        } else {
            console.log('No user is signed in.');
            setUsername(null);
        }
    });
};
