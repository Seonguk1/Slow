import { useEffect, useState } from "react";
import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const useUserInfo = ()=>{
  const [userInfo, setUserInfo] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          navigation.replace('Intro');
          return;
        }

        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserInfo({
            uid: currentUser.uid,
            email: currentUser.email,
            nickname: userDoc.data().nickname,
            createdAt: currentUser.metadata.creationTime,
          });
        } else {
            navigation.replace('Home');
        }
      } catch (err) {
        console.error("userInfo 가져오기 실패", err);
        navigation.replace('Home');
      } finally {
        setUserLoading(false);
      } 
    };

    fetchUserInfo();
  }, []);

  return { userInfo, userLoading };
}

export default useUserInfo;