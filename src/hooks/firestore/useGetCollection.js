import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';

const useGetCollection = (collectionName) => {
  const getCollection = async () => {
    try {
      const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (error) {
      console.error('Error fetching collection:', error);
      throw error;
    }
  };

  return { getCollection };
};

export default useGetCollection;
