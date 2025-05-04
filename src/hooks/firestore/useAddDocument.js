import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase'; 

const useAddDocument = (collectionName) => {
  const addDocument = async (data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
      });
      return { id: docRef.id };
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  };

  return { addDocument };
};

export default useAddDocument;
