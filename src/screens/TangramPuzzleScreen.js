import React, { useState } from "react";
import { View } from "react-native";
import { Canvas, Path, Fill, Skia } from "@shopify/react-native-skia";
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useDerivedValue,
    runOnJS,
} from "react-native-reanimated";

const L = 200;

function makePath(points) {
    const path = Skia.Path.Make();
    path.moveTo(...points[0]);
    for (let i = 1; i < points.length; i++) {
        path.lineTo(...points[i]);
    }
    path.close();
    return path;
}

const initialShapes = [
    { id: "big1", path: makePath([[0, 0], [L, 0], [0, L]]), color: "lightblue", initialX: 20, initialY: 20 },
    { id: "big2", path: makePath([[L, 0], [L, L], [0, L]]), color: "lightgreen", initialX: 120, initialY: 20 },
    { id: "mid", path: makePath([[0, 0], [100, 100], [0, 200]]), color: "orange", initialX: 220, initialY: 20 },
    { id: "small1", path: makePath([[0, 0], [L / 2, 0], [0, L / 2]]), color: "pink", initialX: 20, initialY: 180 },
    { id: "small2", path: makePath([[0, 0], [100, 0], [0, 100]]), color: "violet", initialX: 120, initialY: 180 },
    { id: "square", path: makePath([[L / 2, 0], [L, L / 2], [L / 2, L], [0, L / 2]]), color: "gray", initialX: 220, initialY: 180 },
    { id: "para", path: makePath([[0, L / 2], [L / 2, 0], [L, L / 2], [L / 2, L]]), color: "yellow", initialX: 150, initialY: 350 },
];

const TangramPuzzleScreen = () => {
    const [shapeOrder, setShapeOrder] = useState(initialShapes.map(s => s.id));

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
                const filtered = prev.filter(id => id !== item.id);
                return [...filtered, item.id];
            });
        };

        const gesture = Gesture.Pan()
            .onBegin((e) => {
                'worklet';
                const localX = e.absoluteX - (tx.value + pathOffsetX);
                const localY = e.absoluteY - (ty.value + pathOffsetY);
                const inside = item.path.contains(localX, localY);
                if (!inside) {
                    isInside.value = false;
                    console.log("무시됨")
                    return;
                }
                isInside.value = true;
                offsetX.value = tx.value;
                offsetY.value = ty.value;
                runOnJS(bringToFront)();
            })
            .onChange((e) => {
                'worklet';
                if (!isInside.value) return;
                tx.value = offsetX.value + e.translationX;
                ty.value = offsetY.value + e.translationY;
                runOnJS(bringToFront)();
            })
            .onEnd(() => {
                isInside.value = false;
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
                    {shapeOrder.map(id => {
                        const shape = getShapeById(id);
                        return <Path key={id} path={shape.path} color={shape.color} />;
                    })}
                </Canvas>

                {shapeOrder.map(id => {
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
