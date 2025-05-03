import { Slot } from "expo-router";
import CustomTabBar from "@/components/CustomTabBar";
import { usePathname } from "expo-router";

export default function RootLayout() {
  const pathname = usePathname();
  const showTabBar = pathname.startsWith('/board') || pathname.startsWith('/expert-guide');

  return (
    <>
      <Slot />
      {showTabBar && <CustomTabBar />}
    </>
  );
}
