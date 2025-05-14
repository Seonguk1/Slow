

import { Canvas, PaintStyle, Path, Rect, Skia } from "@shopify/react-native-skia";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, Dimensions } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue, runOnJS } from "react-native-reanimated";
import { useAudioPlayer } from 'expo-audio';

const audioSource = require('@/assets/sounds/snap.wav');

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const L = (windowWidth * 400) / 600;
const frameX = (windowWidth - L) / 2;
const frameY = (windowHeight - L) / 2;

const SNAP_THRESHOLD = 50;

const PuzzleFrame = () => {
    const STROKE_WIDTH = 20;
    const paint = Skia.Paint();
    paint.setStyle(PaintStyle.Stroke);
    paint.setStrokeWidth(STROKE_WIDTH);
    paint.setColor(Skia.Color("orange"));

    return <Rect x={frameX - STROKE_WIDTH / 2} y={frameY - STROKE_WIDTH / 2} width={L + STROKE_WIDTH} height={L + STROKE_WIDTH} paint={paint} />;
};

const getRandomPosition = () => {
    const padding = 20;
    const minX = padding;
    const maxX = windowWidth - L / 2 - padding;
    const minY = padding;
    const maxY = windowHeight - L / 2 - padding;

    const randX = Math.random() * (maxX - minX) + minX;
    const randY = Math.random() * (maxY - minY) + minY;

    return { x: randX, y: randY };
};


export default function TestScreen() {
    const shapes = useRef([
        {
            id: "big1",
            color: "blue",
            x: useSharedValue(frameX),
            y: useSharedValue(frameY),
            correctX: frameX,
            correctY: frameY,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                "worklet";
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x + L, y)
                    .lineTo(x + L / 2, y + L / 2)
                    .close();
            },
            contains: (px, py, x, y) => {
                "worklet";
                return (
                    (px > x && px < x + L / 2 && py > y && py < px - x + y) ||
                    (px > x + L / 2 && px < x + L && py > y && py < -px + x + y + L)
                );
            },
        },
        {
            id: "big2",
            color: "red",
            x: useSharedValue(frameX + L / 2),
            y: useSharedValue(frameY + L / 2),
            correctX: frameX + L / 2,
            correctY: frameY + L / 2,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                "worklet";
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x + L / 2, y - L / 2)
                    .lineTo(x + L / 2, y + L / 2)
                    .close();
            },
            contains: (px, py, x, y) => {
                "worklet";
                return px > x && px < x + L / 2 && py > -px + x + y && py < px - x + y;
            },
        },
        {
            id: "mid",
            color: "purple",
            x: useSharedValue(frameX),
            y: useSharedValue(frameY + L / 2),
            correctX: frameX,
            correctY: frameY + L / 2,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                "worklet";
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x, y + L / 2)
                    .lineTo(x + L / 2, y + L / 2)
                    .close();
            },
            contains: (px, py, x, y) => {
                "worklet";
                return px > x && px < x + L / 2 && py > px - x + y && py < y + L / 2;
            },
        },
        {
            id: "square",
            color: "skyblue",
            x: useSharedValue(frameX + L / 4),
            y: useSharedValue(frameY + (L * 3) / 4),
            correctX: frameX + L / 4,
            correctY: frameY + (L * 3) / 4,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                "worklet";
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x + L / 4, y + L / 4)
                    .lineTo(x + L / 2, y)
                    .lineTo(x + L / 4, y - L / 4)
                    .close();
            },
            contains: (px, py, x, y) => {
                "worklet";
                return (
                    (px > x && px < x + L / 4 && py > -px + x + y && py < px - x + y) ||
                    (px > x + L / 4 &&
                        px < x + L / 2 &&
                        py > px - x + y - L / 2 &&
                        py < -px + x + y + L / 2)
                );
            },
        },
        {
            id: "para",
            color: "yellow",
            x: useSharedValue(frameX),
            y: useSharedValue(frameY),
            correctX: frameX,
            correctY: frameY,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                "worklet";
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x, y + L / 2)
                    .lineTo(x + L / 4, y + (L * 3) / 4)
                    .lineTo(x + L / 4, y + L / 4)
                    .close();
            },
            contains: (px, py, x, y) => {
                "worklet";
                return (
                    px > x &&
                    px < x + L / 4 &&
                    py > px - x + y &&
                    py < px - x + y + L / 2
                );
            },
        },
        {
            id: "small1",
            color: "pink",
            x: useSharedValue(frameX + L / 4),
            y: useSharedValue(frameY + L / 4),
            correctX: frameX + L / 4,
            correctY: frameY + L / 4,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                "worklet";
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x, y + L / 2)
                    .lineTo(x + L / 4, y + L / 4)
                    .close();
            },
            contains: (px, py, x, y) => {
                "worklet";
                return (
                    px > x &&
                    px < x + L / 4 &&
                    py > px - x + y &&
                    py < -px + x + y + L / 2
                );
            },
        },
        {
            id: "small2",
            color: "lightgreen",
            x: useSharedValue(frameX + L / 2),
            y: useSharedValue(frameY + L),
            correctX: frameX + L / 2,
            correctY: frameY + L,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                "worklet";
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x + L / 4, y - L / 4)
                    .lineTo(x + L / 2, y)
                    .close();
            },
            contains: (px, py, x, y) => {
                "worklet";
                return (
                    (px > x &&
                        px < x + L / 4 &&
                        py > -px + x + y &&
                        py < y) ||
                    (px > x + L / 4 &&
                        px < x + L / 2 &&
                        py > px - x + y - L / 2 &&
                        py < y)
                );
            },
        },
    ]);
    const [activeId, setActiveId] = useState(null);
    const [shapeOrder, setShapeOrder] = useState(shapes.current.map((s) => s.id)); // z-index 순서만 관리
    const player = useAudioPlayer(audioSource);
    useEffect(() => {
        shapes.current.forEach((shape) => {
            const { x, y } = getRandomPosition();

            shape.x.value = x;
            shape.y.value = y;

            shape.path.value = shape.updatePath(x, y);
        });
    }, []);

    const bringToFront = (id) => {
        setShapeOrder((prev) => {
            const filtered = prev.filter((x) => x !== id);
            return [...filtered, id];
        });
    };


    const activeShape = useSharedValue(null);

    const distance = (x1, y1, x2, y2) => {
        'worklet';
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    };

    const orderedShapes = shapeOrder
        .map((id) => shapes.current.find((s) => s.id === id))
        .filter(Boolean); // 혹시라도 null 방지

    const playSound = () => {
        player.seekTo(0.3);
        player.play();
    };

    const gesture = Gesture.Pan()
        .onBegin((e) => {
            for (let i = orderedShapes.length - 1; i >= 0; i--) {
                const shape = orderedShapes[i];
                if (shape.contains(e.x, e.y, shape.x.value, shape.y.value)) {
                    activeShape.value = shape;
                    runOnJS(setActiveId)(shape.id);
                    runOnJS(bringToFront)(shape.id); // JSX 렌더 순서 변경
                    break;
                }
            }
        })
        .onChange((e) => {
            if (activeShape.value) {
                const shape = activeShape.value;
                shape.x.value += e.changeX;
                shape.y.value += e.changeY;
                shape.path.value = shape.updatePath(shape.x.value, shape.y.value);
            }
        })
        .onEnd(() => {
            if (activeShape.value) {
                const shape = activeShape.value;
                const { x, y, correctX, correctY } = shape;

                if (distance(x.value, y.value, correctX, correctY) < SNAP_THRESHOLD) {
                    x.value = correctX;
                    y.value = correctY;
                    runOnJS(playSound)();
                    shape.path.value = shape.updatePath(correctX, correctY);
                }

                activeShape.value = null;
                runOnJS(setActiveId)(null);
            }
        });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GestureDetector gesture={gesture}>
                <Canvas
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                >
                    <PuzzleFrame />
                    {shapeOrder.map((id) => {
                        const shape = shapes.current.find((s) => s.id === id);
                        const isActive = activeId === id;

                        return (
                            <>
                                {/* 도형 채우기 */}
                                <Path path={shape.path} color={shape.color} />

                                {/* 외곽선 강조 (활성 도형일 때만) */}
                                {isActive && (
                                    <Path
                                        path={shape.path}
                                        color="black"
                                        style="stroke"
                                        strokeWidth={4}
                                    />
                                )}
                            </>
                        );
                    })}

                </Canvas>
            </GestureDetector>

        </GestureHandlerRootView>
    );
}
