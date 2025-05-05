import React from "react";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

export default function TestScreen() {
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ flex: 1, backgroundColor: "white" }}>
          <Path
            path={pathValue}
            style="stroke"
            strokeWidth={3}
            color="black"
          />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
