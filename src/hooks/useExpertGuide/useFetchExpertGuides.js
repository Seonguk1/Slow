import { useGetCollection } from "../firestore"

const useFetchExpertGuides = () => {
    const { getCollection } = useGetCollection('expert-guides');
    const fetchExpertGuides = async () => {
        const expertGuides = await getCollection();
        return expertGuides;
    }
    return {fetchExpertGuides};
};

export default useFetchExpertGuides;