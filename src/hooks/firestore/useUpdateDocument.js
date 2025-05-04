import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const useUpdateDocument = (collectionName) => {
  const updateDocument = async (docId, updatedData) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, updatedData);
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  };

  return { updateDocument };
};

export default useUpdateDocument;
