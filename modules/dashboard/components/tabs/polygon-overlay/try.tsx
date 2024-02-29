import React, { useRef, useEffect } from "react";

interface Polygon {
  classIndex: number;
  vertices: number[];
}

const PolygonOnImage: React.FC<{ imageUrl: string; polygons: Polygon[] }> = ({
  imageUrl,
  polygons,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const drawPolygons = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!ctx) return;

      const image = imageRef.current;
      if (!image || !image.complete) return; // Check if image is loaded

      ctx.drawImage(image, 0, 0);

      polygons.forEach((polygon) => {
        // ... existing polygon drawing logic ...
      });
    },
    [polygons]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      drawPolygons(ctx);
    }
  }, [canvasRef, drawPolygons]); // Only trigger on canvas changes

  return (
    <div>
      <img src={imageUrl} alt="Image" ref={imageRef} />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PolygonOnImage;
