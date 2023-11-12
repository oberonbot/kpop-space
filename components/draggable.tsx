'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface DraggableProps {
  index: number;
  isDone: boolean;
  onStateChange: (index: number, newState: boolean) => void;
}

const Draggable: React.FC<DraggableProps> = ({
  index,
  isDone,
  onStateChange,
}) => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  // const [isDone, setIsDone] = useState(false);

  const handleToggleState = () => {
    const newState = !isDone;
    onStateChange(index, newState);
  };

  useEffect(() => {
    const setRandomPosition = () => {
      const screenWidth = window.innerWidth;
      let newRandomTop = 0;
      let newRandomLeft = 0;

      if (screenWidth < 500) {
        newRandomTop = getRandomNumberInRange(-100, -50, 50, 100);
        newRandomLeft = getRandomNumberInRange(0, 0, 10, 100);
      } else if (screenWidth < 768) {
        newRandomTop = getRandomNumberInRange(-110, -60, 60, 110);
        newRandomLeft = getRandomNumberInRange(0, 0, 10, 200);
      } else if (screenWidth < 1024) {
        newRandomTop = getRandomNumberInRange(-130, -100, 100, 130);
        newRandomLeft = getRandomNumberInRange(0, 0, 10, 200);
      } else {
        newRandomTop = getRandomNumberInRange(-160, -150, 150, 160);
        newRandomLeft = getRandomNumberInRange(0, 0, 10, 200);
      }

      draggableRef.current!.style.left = newRandomLeft + 'px';
      draggableRef.current!.style.top = newRandomTop + 'px';
    };

    setRandomPosition();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDone) return;

    isDraggingRef.current = true;

    const offsetX = e.clientX - draggableRef.current!.offsetLeft;
    const offsetY = e.clientY - draggableRef.current!.offsetTop;

    const computedStyle = window.getComputedStyle(draggableRef.current!);

    const backgroundColor = computedStyle.backgroundColor;
    const transformValue = computedStyle.transform;

    draggableRef.current!.style.zIndex = '2';
    draggableRef.current!.style.cursor = 'grabbing';

    draggableRef.current!.style.boxShadow =
      backgroundColor === 'rgb(0, 0, 0)'
        ? '0 0 30px 5px rgba(0, 0, 0, 0.7)'
        : '0 0 40px 5px rgba(113, 156, 255, 1)';
    draggableRef.current!.style.transition =
      'transform 0.5s ease, box-shadow 0.5s ease';

    // Extract the matrix values from the transform property
    const matrixRegex = /matrix\((.+)\)/;
    const matrixMatch = transformValue.match(matrixRegex);

    // Extract the matrix values and convert them to an array of numbers
    const matrixValues = matrixMatch![1]
      .split(',')
      .map((value) => parseFloat(value.trim()));

    // Extract translateX and translateY values
    const translateX = matrixValues[4];
    const translateY = matrixValues[5];

    // Calculate the rotation angle
    const angle =
      Math.atan2(matrixValues[1], matrixValues[0]) * (180 / Math.PI);

    draggableRef.current!.style.transform = `translate(${translateX}px, ${translateY}px) scale(1) rotate(${angle}deg)`;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    function handleMouseMove(e: MouseEvent) {
      if (!isDraggingRef.current) return;

      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      // Apply easing function to the drag element
      const ease = 0.2;
      const deltaX = (x - draggableRef.current!.offsetLeft) * ease;
      const deltaY = (y - draggableRef.current!.offsetTop) * ease;

      draggableRef.current!.style.left =
        draggableRef.current!.offsetLeft + deltaX + 'px';
      draggableRef.current!.style.top =
        draggableRef.current!.offsetTop + deltaY + 'px';

      const centerX =
        draggableRef.current!.offsetLeft +
        draggableRef.current!.offsetWidth / 2;
      const centerY =
        draggableRef.current!.offsetTop +
        draggableRef.current!.offsetHeight / 2;

      const targetCenterX =
        targetRef.current!.offsetLeft + targetRef.current!.offsetWidth / 2;
      const targetCenterY =
        targetRef.current!.offsetTop + targetRef.current!.offsetHeight / 2;

      const distance = Math.sqrt(
        (centerX - targetCenterX) ** 2 + (centerY - targetCenterY) ** 2
      );

      if (distance < 15) {
        const computedStyle = window.getComputedStyle(draggableRef.current!);
        const transformValue = computedStyle.transform;

        // Extract the matrix values from the transform property
        const matrixRegex = /matrix\((.+)\)/;
        const matrixMatch = transformValue.match(matrixRegex);

        // Extract the matrix values and convert them to an array of numbers
        const matrixValues = matrixMatch![1]
          .split(',')
          .map((value) => parseFloat(value.trim()));

        // Extract translateX and translateY values
        const translateX = matrixValues[4];
        const translateY = matrixValues[5];

        // Calculate the rotation angle
        const angle =
          Math.atan2(matrixValues[1], matrixValues[0]) * (180 / Math.PI);
        draggableRef.current!.style.transform = `translate(${translateX}px, ${translateY}px) scale(1) rotate(${angle}deg)`;

        draggableRef.current!.style.cursor = 'default';

        const bezierTimingFunction = 'cubic-bezier(0.42, 0, 0.58, 1)';
        draggableRef.current!.style.transition = `left 0.3s ${bezierTimingFunction}, top 0.3s ${bezierTimingFunction}`;

        draggableRef.current!.style.left = targetRef.current!.offsetLeft + 'px';
        draggableRef.current!.style.top = targetRef.current!.offsetTop + 'px';

        draggableRef.current!.style.boxShadow = 'none';

        isDraggingRef.current = false;

        handleToggleState();
      }
    }

    function handleMouseUp() {
      isDraggingRef.current = false;

      draggableRef.current!.style.zIndex = '1';
      draggableRef.current!.style.cursor = 'pointer';
      draggableRef.current!.style.boxShadow = 'none';
      draggableRef.current!.style.transition =
        'transform 0.3s ease, box-shadow 0.3s ease';

      const computedStyle = window.getComputedStyle(draggableRef.current!);
      const transformValue = computedStyle.transform;

      // Extract the matrix values from the transform property
      const matrixRegex = /matrix\((.+)\)/;
      const matrixMatch = transformValue.match(matrixRegex);

      // Extract the matrix values and convert them to an array of numbers
      const matrixValues = matrixMatch![1]
        .split(',')
        .map((value) => parseFloat(value.trim()));

      // Extract translateX and translateY values
      const translateX = matrixValues[4];
      const translateY = matrixValues[5];

      // Calculate the rotation angle
      const angle =
        Math.atan2(matrixValues[1], matrixValues[0]) * (180 / Math.PI);

      draggableRef.current!.style.transform = `translate(${translateX}px, ${translateY}px) scale(1) rotate(${angle}deg)`;

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  };

  const getRandomNumberInRange = (
    a: number,
    b: number,
    c: number,
    d: number
  ) => {
    const randomSelector = Math.random();

    if (randomSelector < 0.5) {
      return Math.floor(Math.random() * (b - a + 1)) + a;
    } else {
      return Math.floor(Math.random() * (d - c + 1)) + c;
    }
  };

  return (
    <>
      <div
        ref={draggableRef}
        className={`draggable-bar-${index}`}
        onMouseDown={handleMouseDown}
      ></div>
      <div ref={targetRef} className={`target-bar-${index}`}></div>
    </>
  );
};

export default Draggable;
