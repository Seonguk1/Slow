import { Canvas, Path, point, Skia } from "@shopify/react-native-skia";
import { Button, Text, View } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"


export default TestScreen = () => {
    const L = 150;

    const shapes = [
        {
            id: "triangle1",
            color: "skyblue",
            x: useSharedValue(100),
            y: useSharedValue(100),
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x + L, y)
                    .lineTo(x + L, y + L)
                    .close();
            },
            contains: (px, py, x, y) => (
                px > x && px < x + L &&
                py > y && py < px - x + y
            ),
        },
        {
            id: "triangle2",
            color: "green",
            x: useSharedValue(200),
            y: useSharedValue(200),
            path: useSharedValue(Skia.Path.Make()),
            updatePath: (x, y) => {
                return Skia.Path.Make()
                    .moveTo(x, y)
                    .lineTo(x + L, y)
                    .lineTo(x + L, y + L)
                    .close();
            },
            contains: (px, py, x, y) => (
                px > x && px < x + L &&
                py > y && py < px - x + y
            ),
        },
    ]

    shapes.forEach((shape) => {
        shape.path.value = shape.updatePath(shape.x.value, shape.y.value);
    });

    const gesture = Gesture.Pan().onChange((e) => {
        shapes.forEach((shape) => {
            if (
                (e.x > shape.x.value && e.x < shape.x.value + L) &&
                (e.y > shape.y.value && e.y < e.x - shape.x.value + shape.y.value)
            ) {
                shape.x.value += e.changeX;
                shape.y.value += e.changeY;
                shape.path.value = Skia.Path.Make()
                    .moveTo(shape.x.value, shape.y.value)
                    .lineTo(shape.x.value + L, shape.y.value)
                    .lineTo(shape.x.value + L, shape.y.value + L)
                    .close();
            }
        });
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
                    {shapes.map((shape) => (
                        <Path key={shape.id} path={shape.path} color={shape.color} />
                    ))}
                </Canvas>
            </GestureDetector>
        </GestureHandlerRootView>
    )
}