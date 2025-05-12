import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import {
  Canvas, Path, Fill, Skia, Paint, PaintStyle, Rect,
} from "@shopify/react-native-skia";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const L = (windowWidth * 400) / 600;
const frameX = (windowWidth - L) / 2;
const frameY = (windowHeight - L) / 2;

const SNAP_THRESHOLD = 50;

const PuzzleFrame = () => {
  const paint = Skia.Paint();
  paint.setStyle(PaintStyle.Stroke);
  paint.setStrokeWidth(3);
  paint.setColor(Skia.Color("black"));

  return <Rect x={frameX} y={frameY} width={L} height={L} paint={paint} />;
};

function makePath(points) {
  const path = Skia.Path.Make();
  path.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    path.lineTo(...points[i]);
  }
  path.close();
  return path;
}

function normalizePath(points) {
  const minX = Math.min(...points.map(([x]) => x));
  const minY = Math.min(...points.map(([_, y]) => y));
  const shifted = points.map(([x, y]) => [x - minX, y - minY]);
  return { points: shifted, offsetX: minX, offsetY: minY };
}

const rawShapes = [
  {
    id: "big1",
    rawPoints: [[0, 0], [L, 0], [L / 2, L / 2]],
    color: "blue",
    baseX: frameX,
    baseY: frameY,
    initialX: -100,
    initialY: 550,
  },
  {
    id: "big2",
    rawPoints: [[0, 0], [0, L], [-L / 2, L / 2]],
    color: "red",
    baseX: frameX + L,
    baseY: frameY,
    initialX: 100,
    initialY: -80,
  },
  {
    id: "mid",
    rawPoints: [[0, 0], [L / 2, L / 2], [0, L / 2]],
    color: "purple",
    baseX: frameX,
    baseY: frameY + L / 2,
    initialX: 400,
    initialY: -500,
  },
  {
    id: "square",
    rawPoints: [[0, 0], [L / 4, L / 4], [0, L / 2], [-L / 4, L / 4]],
    color: "skyblue",
    baseX: frameX + L / 2,  
    baseY: frameY + L / 2,
    initialX: -200,
    initialY: -500,
  },
  {
    id: "para",
    rawPoints: [[0, 0], [L / 4, L / 4], [L / 4, L * 3 / 4], [0, L / 2]],
    color: "yellow",
    baseX: frameX,
    baseY: frameY,
    initialX: -80,
    initialY: -100,
  },
  {
    id: "small1",
    rawPoints: [[0, 0], [L / 4, L / 4], [0, L / 2]],
    color: "pink",
    baseX: frameX + L / 4,
    baseY: frameY + L / 4,
    initialX: 130,
    initialY: 80,
  },
  {
    id: "small2",
    rawPoints: [[0, 0], [L / 4, -L / 4], [L / 2, 0]],
    color: "lightgreen",
    baseX: frameX + L / 2,
    baseY: frameY + L,
    initialX: -90,
    initialY: 90,
  },
];

const initialShapes = rawShapes.map(({ id, rawPoints, color, baseX, baseY, initialX, initialY }) => {
  const { points, offsetX, offsetY } = normalizePath(rawPoints);
  return {
    id,
    path: makePath(points),
    color,
    initialX: baseX + offsetX + initialX,
    initialY: baseY + offsetY + initialY,
    correctX: baseX + offsetX,
    correctY: baseY + offsetY,
  };
});

const TangramPuzzleScreen = () => {
  const [shapeOrder, setShapeOrder] = useState(initialShapes.map((s) => s.id));

  const shapes = initialShapes.map((item) => {
    const tx = useSharedValue(item.initialX);
    const ty = useSharedValue(item.initialY);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const isInside = useSharedValue(false);

    const bounds = item.path.computeTightBounds();
    const width = bounds.width;
    const height = bounds.height;
    const pathOffsetX = bounds.x;
    const pathOffsetY = bounds.y;

    const bringToFront = () => {
      setShapeOrder((prev) => {
        const filtered = prev.filter((id) => id !== item.id);
        return [...filtered, item.id];
      });
    };

    const gesture = Gesture.Pan()
      .onBegin((e) => {
        "worklet";
        const localX = e.absoluteX - (tx.value + pathOffsetX);
        const localY = e.absoluteY - (ty.value + pathOffsetY);
        const inside = item.path.contains(localX, localY);
        if (!inside) {
          isInside.value = false;
          console.log("무시됨");
          return;
        }
        isInside.value = true;
        offsetX.value = tx.value;
        offsetY.value = ty.value;
        runOnJS(bringToFront)();
      })
      .onChange((e) => {
        "worklet";
        if (!isInside.value) return;
        tx.value = offsetX.value + e.translationX;
        ty.value = offsetY.value + e.translationY;
        runOnJS(bringToFront)();
      })
      .onEnd(() => {
        isInside.value = false;
        const dx = tx.value - item.correctX;
        const dy = ty.value - item.correctY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < SNAP_THRESHOLD) {
          tx.value = item.correctX;
          ty.value = item.correctY;
        }
      });

    const animatedStyle = useAnimatedStyle(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width,
      height,
      transform: [
        { translateX: tx.value + pathOffsetX },
        { translateY: ty.value + pathOffsetY },
      ],
      backgroundColor: "rgba(255,0,0,0.0)",
    }));

    const translatedPath = useDerivedValue(() => {
      const m = Skia.Matrix();
      m.translate(tx.value, ty.value);
      return item.path.copy().transform(m);
    }, [tx, ty]);

    return {
      id: item.id,
      color: item.color,
      gesture,
      style: animatedStyle,
      path: translatedPath,
    };
  });

  const getShapeById = (id) => shapes.find((s) => s.id === id);

  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <Canvas style={{ flex: 1 }}>
          <Fill color="white" />
          <PuzzleFrame />
          {shapeOrder.map((id) => {
            const shape = getShapeById(id);
            return <Path key={id} path={shape.path} color={shape.color} />;
          })}
        </Canvas>

        {shapeOrder.map((id) => {
          const shape = getShapeById(id);
          return (
            <GestureDetector key={id} gesture={shape.gesture}>
              <Animated.View style={shape.style} />
            </GestureDetector>
          );
        })}
      </GestureHandlerRootView>
    </View>
  );
};

export default TangramPuzzleScreen;