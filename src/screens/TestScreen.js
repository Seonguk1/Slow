import fontSource from "@/assets/fonts/HakgyoansimBareondotumB.ttf";
import React, { useState } from "react";
import { View, Button } from "react-native";
import {
  Canvas,
  Path,
  Skia,
  Text,
  useFont,
} from "@shopify/react-native-skia";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

export default function TestScreen() {
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const characters = ["가", "나", "다", "라", "마"]; // 연습할 글자 리스트
  const font = useFont(fontSource, 120); // 글자 크기

  const pathValue = useSharedValue(Skia.Path.Make());

  const tap = Gesture.Tap().onStart((e) => {
    const newPath = pathValue.value.copy();
    newPath.moveTo(e.x, e.y);
    newPath.lineTo(e.x, e.y);
    pathValue.value = newPath;
  });

  const pan = Gesture.Pan()
    .onStart((e) => {
      const newPath = pathValue.value.copy();
      newPath.moveTo(e.x, e.y);
      newPath.lineTo(e.x, e.y);
      pathValue.value = newPath;
    })
    .onUpdate((e) => {
      const newPath = pathValue.value.copy();
      newPath.lineTo(e.x, e.y);
      pathValue.value = newPath;
    });

  const gesture = Gesture.Simultaneous(tap, pan);

  // 버튼 이벤트
  const handleNextChar = () => {
    setCurrentCharIndex((prev) => (prev + 1) % characters.length);
    pathValue.value = Skia.Path.Make(); // Path 초기화
  };

  const handleClear = () => {
    pathValue.value = Skia.Path.Make(); // Path 초기화
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <GestureDetector gesture={gesture}>
          <Canvas style={{ flex: 1, backgroundColor: "white" }}>
            {font && (
              <Text
                x={100}
                y={300}
                text={characters[currentCharIndex]}
                font={font}
                color="rgba(0,0,0,0.1)"
              />
            )}
            <Path
              path={pathValue}
              style="stroke"
              strokeWidth={3}
              color="black"
            />
          </Canvas>
        </GestureDetector>

        {/* 버튼 UI */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 10,
            backgroundColor: "#eee",
          }}
        >
          <Button title="지우기" onPress={handleClear} />
          <Button title="다음 글자" onPress={handleNextChar} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
