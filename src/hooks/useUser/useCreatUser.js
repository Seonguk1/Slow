import createUser from "@/api/users";
import checkNicknameExists from "@/api/checkNickname";

const useCreateUser = () => {
    const handleCreateUser = async ({ id, nickname }) => {
        const isDuplicate = await checkNicknameExists(nickname);
        if (isDuplicate) {
            
        }
        return await createUser(id, {
            nickname,
        });
    };  
    return { handleCreateUser };
}

export default useCreateUser;
