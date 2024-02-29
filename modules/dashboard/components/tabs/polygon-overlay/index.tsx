/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";

interface Props {
  imageUrl: string;
  polygonData: string;
}

const ImageWithPolygon: React.FC<Props> = ({ imageUrl, polygonData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Split polygon data into lines
      const lines = polygonData.trim().split("\n");

      // Iterate over each line (polygon)
      lines.forEach((line) => {
        const [classIndex, ...coords] = line.split(" ").map(parseFloat);
        if (coords.length % 2 !== 0) return;

        ctx.beginPath();
        ctx.moveTo(coords[0] * image.width, coords[1] * image.height);

        // Draw lines connecting the vertices
        for (let i = 2; i < coords.length; i += 2) {
          ctx.lineTo(coords[i] * image.width, coords[i + 1] * image.height);
        }

        ctx.closePath();
        ctx.strokeStyle = "#ffd75c";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    image.src = imageUrl;
  }, [imageUrl, polygonData]);

  return (
    <>
      <canvas ref={canvasRef} className="h-full w-full" />
    </>
  );
};

export default ImageWithPolygon;
