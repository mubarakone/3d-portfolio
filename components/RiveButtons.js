"use client"
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { motion } from "framer-motion";

export default function RiveButtons() {
    const buttonSources = Array.from({ length: 6 }, (_, i) => `button${i + 1}.riv`);
    const StateMachine = 'State Machine 1'

    const RiveButton = ({ src, w, h, delay }) => {
      const canvasRef = useRef(null);
      const [shouldPlay, setShouldPlay] = useState(false);
  
      const { rive, setCanvasRef } = useRive({
          src: src,
          stateMachines: StateMachine,
          autoplay: false, // Do not autoplay, control manually
          layout: new Layout({
              fit: Fit.Cover, 
              alignment: Alignment.Center,
          }),
      });

      // Define inputs within the State Machine
      const entranceInput = useStateMachineInput(rive, StateMachine, 'isEntered');
      const isHoveredInput = useStateMachineInput(rive, StateMachine, 'isHovered');
      const isClickedInput = useStateMachineInput(rive, StateMachine, 'isClicked');
      const isIdleInput = useStateMachineInput(rive, StateMachine, 'isIdle');
  
      useEffect(() => {
          // Set the canvas reference for Rive to render the animation
          setCanvasRef(canvasRef.current);
  
          // Manually adjust canvas size
          if (canvasRef.current) {
            canvasRef.current.width = w;
            canvasRef.current.height = h;
        }

        // // Trigger the entrance animation on component mount
        // if (entranceInput) {
        //     entranceInput.value = true; // Fire the entrance trigger or set it to true
        // }
  
          const timeoutId = setTimeout(() => {
            setShouldPlay(true);
          }, delay);
  
          return () => {
            clearTimeout(timeoutId);
            if (rive) {
                rive.cleanup();
            }
          };
      }, [setCanvasRef, w, h, src, rive, delay, entranceInput]);
  
      useEffect(() => {
        if (rive && shouldPlay && entranceInput) {
            // rive.play(); // Start the Rive animation when shouldPlay is true
            entranceInput.value = true;
        }
        // if (rive) {
        //   rive.on('statechange', (event) => {
        //     console.log(event.data[0]);
        //   });
        // }
      }, [shouldPlay, rive, entranceInput]);

      const handleMouseEnter = useCallback(() => {
        if (rive && isHoveredInput && isIdleInput) {
            isHoveredInput.value = true;
            isIdleInput.value = false;
          }
      }, [rive, isHoveredInput, isIdleInput])

      const handleMouseLeave = useCallback(() => {
        if (rive && isHoveredInput && isIdleInput) {
            isHoveredInput.value = false;
            isIdleInput.value = true;
          }
      }, [rive, isHoveredInput, isIdleInput])

      const handleClick = useCallback(() => {
        if (isClickedInput && isIdleInput) {
            isClickedInput.value = true; // Trigger the click animation
            isIdleInput.value = false;
            setTimeout(() => {
                isIdleInput.value = true; // Return to idle after click animation
            }, 500); // Adjust timing as needed
          }
      }, [rive, isClickedInput, isIdleInput])
  
      return (
              <canvas onClick={handleClick} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} ref={canvasRef}></canvas>
      );
    };  
  return (
    <div style={{display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem", maxHeight: "100vh"}}>
        {buttonSources.map((src, index) => (
          <motion.div 
            key={index} 
            className="w-fit h-fit" 
            style={{ display: 'inline-block'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.5 }}
          >
            <RiveButton src={src} w={300} h={200} delay={index * 500} />
          </motion.div>
        ))}
      </div>
  )
}
