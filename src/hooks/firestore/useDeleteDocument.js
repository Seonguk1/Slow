import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const useDeleteDocument = (collectionName) => {
  const deleteDocument = async (docId) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  };

  return { deleteDocument };
};

export default useDeleteDocument;
