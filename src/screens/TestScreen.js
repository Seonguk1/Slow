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
  const characters = ["가", "나", "다", "라", "마"];
  const font = useFont(fontSource, 120); // 글씨 크기

  const pathValue = useSharedValue(Skia.Path.Make());

  const tap = Gesture.Tap().onStart((e) => {
    const newPath = pathValue.value.copy();
    newPath.moveTo(e.x, e.y);
    newPath.lineTo(e.x+2, e.y);
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

  const handleNextChar = () => {
    setCurrentCharIndex((prev) => (prev + 1) % characters.length);
    pathValue.value = Skia.Path.Make();
  };

  const handleClear = () => {
    pathValue.value = Skia.Path.Make();
  };

  const targetBox = {
    x: 100,
    y: 200,
    width: 200,
    height: 200,
  };

  const getPathPoints = (path) => {
    const cmds = path.toCmds(); 
    const points = [];
  
    for (const cmd of cmds) {
      const [type, x, y] = cmd;
      if (type === 0 || type === 1) {
        points.push({ x, y });
      }
    }
  
    return points;
  };

  const isInBox = (pt, box) => {
    return (
      pt.x >= box.x &&
      pt.x <= box.x + box.width &&
      pt.y >= box.y &&
      pt.y <= box.y + box.height
    );
  };

  const calculateScore = (path) => {
    const weight = 10
    const points = getPathPoints(path);
    const total = points.length;
    if (total === 0) return 0;
    const inside = points.filter((pt) => isInBox(pt, targetBox)).length;
    return Math.round((inside / (total+weight)) * 100);
  };

  const handleCheckScore = () => {
    const score = calculateScore(pathValue.value);
    alert(`점수는 ${score}점입니다!`);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <GestureDetector gesture={gesture}>
          <Canvas style={{ flex: 1, backgroundColor: "white" }}>
            {/* 연습할 글자 (배경용) */}
            {font && (
              <Text
                x={targetBox.x}
                y={targetBox.y + targetBox.height / 2}
                text={characters[currentCharIndex]}
                font={font}
                color="rgba(0,0,0,0.1)" // 연하게
              />
            )}
            {/* 유저가 그린 Path */}
            <Path
              path={pathValue}
              style="stroke"
              strokeWidth={5}
              color="black"
            />
          </Canvas>
        </GestureDetector>

        {/* 버튼 영역 */}
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
          <Button title="점수 확인" onPress={handleCheckScore} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
