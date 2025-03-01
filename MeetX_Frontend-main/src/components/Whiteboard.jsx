import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3001'}`);

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();

      if (!emit) return;
      socket.emit('drawing', { x0, y0, x1, y1, color });
    };

    const onMouseDown = (e) => {
      setIsDrawing(true);
      drawLine(e.clientX, e.clientY, e.clientX, e.clientY, 'black', true);
    };

    const onMouseMove = (e) => {
      if (!isDrawing) return;
      drawLine(e.clientX, e.clientY, e.clientX, e.clientY, 'black', true);
    };

    const onMouseUp = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);

    socket.on('drawing', (data) => {
      drawLine(data.x0, data.y0, data.x1, data.y1, data.color);
    });

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      socket.off('drawing');
    };
  }, [isDrawing]);

  return <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />;
};

export default Whiteboard;
