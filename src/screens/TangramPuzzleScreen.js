import React from "react";
import { View } from "react-native";
import { Canvas, Group, Path, Skia } from "@shopify/react-native-skia";
import {
  GestureDetector,
  GestureHandlerRootView,
  Gesture,
} from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

export default function TangramPuzzleScreen() {
  // 퍼즐 조각 정의
  const pieces = [
    {
      id: "triangle1",
      points: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 0, y: 100 },
      ],
      fill: "#fdd835",
      translateX: useSharedValue(50),
      translateY: useSharedValue(50),
      rotation: 0,
    },
    {
      id: "square1",
      points: [
        { x: 0, y: 0 },
        { x: 80, y: 0 },
        { x: 80, y: 80 },
        { x: 0, y: 80 },
      ],
      fill: "#4db6ac",
      translateX: useSharedValue(200),
      translateY: useSharedValue(50),
      rotation: 0,
    },
  ];

  // 현재 드래그 중인 조각 추적
  const activePieceRef = React.useRef(null);
  let startX = 0;
  let startY = 0;

  // 바운딩 박스 체크 함수
  const isInsidePiece = (x, y, piece) => {
    const localX = x - piece.translateX.value;
    const localY = y - piece.translateY.value;

    const minX = Math.min(...piece.points.map((p) => p.x));
    const maxX = Math.max(...piece.points.map((p) => p.x));
    const minY = Math.min(...piece.points.map((p) => p.y));
    const maxY = Math.max(...piece.points.map((p) => p.y));

    return (
      localX >= minX &&
      localX <= maxX &&
      localY >= minY &&
      localY <= maxY
    );
  };

  // 제스처 정의 (하나만 만들어 전체에서 공통 사용)
  const pan = Gesture.Pan()
    .onStart((e) => {
      // 어떤 조각을 눌렀는지 찾기
      for (const piece of pieces) {
        if (isInsidePiece(e.x, e.y, piece)) {
          activePieceRef.current = piece;
          startX = piece.translateX.value;
          startY = piece.translateY.value;
          console.log(piece)
          return;
        }
      }
      activePieceRef.current = null; // 아무 조각도 아님
    })
    .onUpdate((e) => {
      if (activePieceRef.current) {
        const piece = activePieceRef.current;
        piece.translateX.value = startX + e.translationX;
        piece.translateY.value = startY + e.translationY;
      }
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 1 }}>
          <Canvas style={{ flex: 1 }}>
            {pieces.map((piece) => {
              // 도형 경로 생성
              const path = Skia.Path.Make();
              path.moveTo(piece.points[0].x, piece.points[0].y);
              piece.points.slice(1).forEach((pt) =>
                path.lineTo(pt.x, pt.y)
              );
              path.close();

              return (
                <Group
                  key={piece.id}
                  transform={[
                    { translateX: piece.translateX.value },
                    { translateY: piece.translateY.value },
                    { rotate: piece.rotation },
                  ]}
                >
                  <Path path={path} color={piece.fill} />
                </Group>
              );
            })}
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
