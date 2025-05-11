// components/TangramPiece.js

import React from "react";
import { Skia, useDrawCallback } from "@shopify/react-native-skia";

export const TangramPiece = ({ piece }) => {
  const { points, position, rotation, fill } = piece;

  const path = Skia.Path.Make();
  const rad = (rotation * Math.PI) / 180;

  const transformedPoints = points.map(p => {
    const x = p.x * Math.cos(rad) - p.y * Math.sin(rad);
    const y = p.x * Math.sin(rad) + p.y * Math.cos(rad);
    return {
      x: x + position.x,
      y: y + position.y
    };
  });

  path.moveTo(transformedPoints[0].x, transformedPoints[0].y);
  transformedPoints.slice(1).forEach(p => path.lineTo(p.x, p.y));
  path.close();

  return (
    <Paint path={path} color={fill} />
  );
};
