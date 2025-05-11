import fontSource from "@/assets/fonts/HakgyoansimBareondotumB.ttf";
import React, { useState } from "react";
import { View, Button } from "react-native";
import {
  Canvas,
  Path,
  Skia,
  Text,
  useFont,
  notifyChange
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
  const font = useFont(fontSource, 120);

  const currentPath = useSharedValue(Skia.Path.Make().moveTo(0, 0));

  const pan = Gesture.Pan()
    .averageTouches(true)
    .maxPointers(1)
    .onBegin(e => {
      currentPath.value.moveTo(e.x, e.y);
      currentPath.value.lineTo(e.x, e.y);
      notifyChange(currentPath);
    })
    .onChange(e => {  
      currentPath.value.lineTo(e.x, e.y);
      notifyChange(currentPath);
    });


  const handleNextChar = () => {
    setCurrentCharIndex((prev) => (prev + 1) % characters.length);
    currentPath.value = Skia.Path.Make();
  };

  const handleClear = () => {
    currentPath.value = Skia.Path.Make();
  };

  const targetBox = {
    x: 100,
    y: 200,
    width: 200,
    height: 200,
  };

  const getPathPoints = (path) => {
    const cmds = path.toCmds(); // [[0, x, y], [1, x, y], ...]
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
    return Math.round((inside / (total + weight)) * 100);
  };

  const handleCheckScore = () => {
    const score = calculateScore(currentPath.value);
    alert(`점수는 ${score}점입니다!`);
  };

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <Canvas
          style={{ flex: 1 }}
        >
          {font && (
            <Text
              x={targetBox.x}
              y={targetBox.y + targetBox.height / 2}
              text={characters[currentCharIndex]}
              font={font}
              color="rgba(0,0,0,0.1)" // 연하게
            />
          )}
          <Path
            path={currentPath}
            style="stroke"
            strokeWidth={20}
            strokeCap="round"
            strokeJoin="round"
          />
        </Canvas>
      </GestureDetector>
      <View
        style={{
          flexDirection: "row",
          justifyContent:"space-around",
        }}
      >
        <Button title="지우기" onPress={handleClear} />
        <Button title="다음 글자" onPress={handleNextChar} />
        <Button title="점수 확인" onPress={handleCheckScore} />
      </View>
    </GestureHandlerRootView >
  )
}
