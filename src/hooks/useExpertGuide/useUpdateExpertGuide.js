import { useUpdateDocument } from '@/hooks/firestore';

const useUpdateExpertGuide = () => {
  const { updateDocument } = useUpdateDocument('expert-guides');

  const updateExpertGuide = async (id, updatedData) => {
    await updateDocument(id, updatedData);
  };

  return { updateExpertGuide };
};

export default useUpdateExpertGuide;
