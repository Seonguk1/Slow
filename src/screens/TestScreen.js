import React, { useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { Skia, Canvas, Path, Circle, Group, useCanvasRef } from "@shopify/react-native-skia";
import { SafeAreaView } from "react-native";


const TestScreen = () => {
    const canvasRef = useCanvasRef();
    const activePath = useRef(Skia.Path.Make());
    const width = 256;
    const height = 900;

    useEffect(() => {
        return () => {
          activePath.current.reset();
        };
      }, []);
    
      

    

    return (
            <Canvas
                ref={canvasRef}
                style={{ height, width, backgroundColor: 'white' }}
                onTouchStart={(e) => {
                    activePath.current.moveTo(e.nativeEvent.locationX, e.nativeEvent.locationY);
                    canvasRef.current?.redraw();
                }}
                onTouchMove={(e) => {
                    activePath.current.lineTo(e.nativeEvent.locationX, e.nativeEvent.locationY);
                    console.log(`x : ${e.nativeEvent.locationX}, y: ${e.nativeEvent.locationY}`)
                    
                    canvasRef.current?.redraw();
                    
                }}
            >
                <Path path={activePath} style='stroke' strokeWidth={5} color="black"/>
            </Canvas>
    );
};

export default TestScreen;