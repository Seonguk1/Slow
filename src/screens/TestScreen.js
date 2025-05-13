import { Canvas, PaintStyle, Path, point, Rect, Skia } from "@shopify/react-native-skia";
import { useState } from "react";
import { Button, Dimensions, Text, View } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"



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

export default TestScreen = () => {

    const shapes = [
        {
            id: "big1",
            color: "blue",
            x: useSharedValue(frameX),
            y: useSharedValue(frameY),
            correctX: frameX,
            correctY: frameY,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                'worklet';
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x + L, y)
                    .lineTo(x + L / 2, y + L / 2)
                    .close();
            },
            contains: (px, py, x, y) => {
                'worklet';
                return (
                    (px > x && px < x + L / 2 && py > y && py < px - x + y) ||
                    (px > x + L / 2 && px < x + L && py > y && py < -px + x + y + L)
                )
            }
        },
        {
            id: "big2",
            color: "red",
            x: useSharedValue(frameX + L / 2),
            y: useSharedValue(frameY + L / 2),
            correctX: frameX+L/2,
            correctY: frameY+L/2,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                'worklet';
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x + L / 2, y - L / 2)
                    .lineTo(x + L / 2, y + L / 2)
                    .close();
            },
            contains: (px, py, x, y) => {
                'worklet';
                return (
                    (px > x && px < x + L / 2) &&
                    (py > -px + x + y && py < px - x + y)
                );
            }
        },
        {
            id: "mid",
            color: "purple",
            x: useSharedValue(frameX),
            y: useSharedValue(frameY + L / 2),
            correctX: frameX,
            correctY: frameY+L/2,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                'worklet';
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x, y + L / 2)
                    .lineTo(x + L / 2, y + L / 2)
                    .close();
            },
            contains: (px, py, x, y) => {
                'worklet';
                return (
                    (px > x && px < x + L / 2) &&
                    (py > px - x + y && py < y + L / 2)
                );
            }
        },
        {
            id: "square",
            color: "skyblue",
            x: useSharedValue(frameX + L / 4),
            y: useSharedValue(frameY + L * 3 / 4),
            correctX: frameX+L/4,
            correctY: frameY+L*3/4,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                'worklet';
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x + L / 4, y + L / 4)
                    .lineTo(x + L / 2, y)
                    .lineTo(x + L / 4, y - L / 4)
                    .close();
            },
            contains: (px, py, x, y) => {
                'worklet';
                return (
                    ((px > x && px < x + L / 4) && (py > -px + x + y && py < px - x + y)) ||
                    ((px > x + L / 4 && px < x + L / 2) && (py > px - x + y - L / 2 && py < -px + x + y + L / 2))

                );
            }
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
                'worklet';
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x, y + L / 2)
                    .lineTo(x + L / 4, y + L * 3 / 4)
                    .lineTo(x + L / 4, y + L / 4)
                    .close();
            },
            contains: (px, py, x, y) => {
                'worklet';
                return (
                    (px > x && px < x + L / 4) &&
                    (py > px - x + y && py < px - x + y + L / 2)
                );
            }
        },
        {
            id: "small1",
            color: "pink",
            x: useSharedValue(frameX + L / 4),
            y: useSharedValue(frameY + L / 4),
            correctX: frameX+L/4,
            correctY: frameY+L/4,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                'worklet';
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x, y + L / 2)
                    .lineTo(x + L / 4, y + L / 4)
                    .close();
            },
            contains: (px, py, x, y) => {
                'worklet';
                return (
                    (px > x && px < x + L / 4) &&
                    (py > px - x + y && py < -px + x + y + L / 2)
                );
            }
        },
        {
            id: "small2",
            color: "lightgreen",
            x: useSharedValue(frameX + L / 2),
            y: useSharedValue(frameY + L),
            correctX: frameX+L/2,
            correctY: frameY+L,
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                'worklet';
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x + L / 4, y - L / 4)
                    .lineTo(x + L / 2, y)
                    .close();
            },
            contains: (px, py, x, y) => {
                'worklet';
                return (
                    ((px > x && px < x + L / 4) && (py > -px + x + y && py < y)) ||
                    ((px > x + L / 4 && px < x + L / 2) && (py > px - x + y - L / 2 && py < y))
                );
            }
        },
    ];

    shapes.forEach((shape) => {
        shape.path.value = shape.updatePath(shape.x.value, shape.y.value);
    });

    const activeShape = useSharedValue(null);

    const distance = (x1, y1, x2, y2) => {
        'worklet';
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    };

    const gesture = Gesture.Pan()
        .onBegin((e) => {
            for (let i = shapes.length - 1; i >= 0; i--) {
                const shape = shapes[i];
                if (shape.contains(e.x, e.y, shape.x.value, shape.y.value)) {
                    activeShape.value = shape;
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
                    shape.path.value = shape.updatePath(correctX, correctY);
                }

                activeShape.value = null;
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
                    {shapes.map((shape) => (
                        <Path key={shape.id} path={shape.path} color={shape.color} />
                    ))}
                </Canvas>
            </GestureDetector>
        </GestureHandlerRootView>
    )
}