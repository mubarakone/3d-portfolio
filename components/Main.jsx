import React, { useState } from 'react'

export default function SVGComponent({ onPathClick, onHoveredPath }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const paths = [
    { d: "M74 65H273.596L288 83.5263V109H85.3173L74 95.1053V65Z", text: "EXPERIENCE", imageSource: "nethermind_logo.png" },
    { d: "M74 112H273.596L288 130.526V156H85.3173L74 142.105V112Z", text: "PROJECTS", imageSource: "blue-wikipedia-logo.png" },
    { d: "M74 159H273.596L288 177.526V203H85.3173L74 189.105V159Z", text: "SKILLS", imageSource: "coming-soon.jpg" },
    { d: "M74 206H273.596L288 224.526V250H85.3173L74 236.105V206Z", text: "EDUCATION", imageSource: "coming-soon.jpg" },
    { d: "M74 253H273.596L288 271.526V297H85.3173L74 283.105V253Z", text: "LINKS", imageSource: "github-logo.png" },
    { d: "M74 300H273.596L288 318.526V344H85.3173L74 330.105V300Z", text: "CONTACT", imageSource: "coming-soon.jpg" },
  ];

  const handleClick = (pathText, index) => {
    if (index === 4) {
      if (onPathClick) {
        onPathClick(pathText)
      }
    }
    if (index > 1) return
    if (onPathClick) {
      onPathClick(pathText);  // Call the parent function with index and text
    }
  };

  const handleHover = (index) => {
    setHoveredIndex(index)
    if (onHoveredPath) {
      if (index === null) {
        onHoveredPath(null)
      } else {
        onHoveredPath(paths[index].imageSource)
      }
    }
  }

    const SVGImage = ({ children }) => {
      return (
        <svg width="725" height="466" viewBox="0 0 725 466" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M499.5 18.2462V73C499.5 75.4853 497.485 77.5 495 77.5H483.734H294.738C293.425 77.5 292.178 76.9269 291.323 75.931L278.492 60.9833C276.687 58.8807 274.054 57.6709 271.283 57.6709H75.8935C73.8456 57.6709 71.8526 58.3327 70.2115 59.5575L56.6915 69.6476C53.7236 71.8626 49.5 69.7446 49.5 66.0413V35.4939C49.5 34.0061 50.2354 32.6144 51.4646 31.7762L73.1936 16.9575C73.9409 16.4478 74.8245 16.1752 75.729 16.1752H327.017C328.317 16.1752 329.603 15.9085 330.795 15.3917L359.682 2.87115C360.247 2.62632 360.856 2.5 361.472 2.5H469.395C470.018 2.5 470.634 2.62936 471.204 2.87988L496.81 14.126C498.444 14.844 499.5 16.4607 499.5 18.2462Z" fill="#00BAD7" stroke="url(#paint0_linear_5_18)" stroke-width="5"/>
        <path d="M4.75464 57.9051L33.7546 41.2079C36.7546 39.4806 40.5 41.646 40.5 45.1077V125.396C40.5 128.933 42.4652 132.177 45.6001 133.815L65.0841 143.997C66.5691 144.773 67.5 146.31 67.5 147.985V342.191C67.5 343.721 66.7228 345.146 65.4366 345.974L27.4366 370.449C24.442 372.377 20.5 370.227 20.5 366.665V172.325C20.5 168.983 18.7444 165.887 15.8767 164.172L4.68999 157.48C3.33161 156.668 2.5 155.201 2.5 153.619V61.8049C2.5 60.1953 3.35972 58.7083 4.75464 57.9051Z" fill="#00BAD7" stroke="url(#paint1_linear_5_18)" stroke-width="5"/>
        <path d="M32.5183 377.69L74.1968 352.5H226.635L188.835 397.5H59.8116L32.5183 377.69Z" fill="#00BAD7" stroke="url(#paint2_linear_5_18)" stroke-width="5"/>
        <path d="M328 382.565H213.262L237.53 352.783H402H403.484L404.195 351.479L443.984 278.5H722.5V430.597L704.002 463H403.097L329.84 383.373L329.097 382.565H328Z" fill="#00BAD7" stroke="url(#paint3_linear_5_18)" stroke-width="5"/>
          {children}
        {/* <path d="M74 300H273.596L288 318.526V344H85.3173L74 330.105V300Z" fill="#00BAD7"/>
        <path d="M74 253H273.596L288 271.526V297H85.3173L74 283.105V253Z" fill="#00BAD7"/>
        <path d="M74 206H273.596L288 224.526V250H85.3173L74 236.105V206Z" fill="#00BAD7"/>
        <path d="M74 159H273.596L288 177.526V203H85.3173L74 189.105V159Z" fill="#00BAD7"/>
        <path d="M74 112H273.596L288 130.526V156H85.3173L74 142.105V112Z" fill="#00BAD7"/>
        <path d="M74 65H273.596L288 83.5263V109H85.3173L74 95.1053V65Z" fill="#00BAD7"/> */}
        <defs>
        <linearGradient id="paint0_linear_5_18" x1="274.5" y1="0" x2="274.5" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0.335" stop-color="#00BAD7"/>
        <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint1_linear_5_18" x1="35" y1="33" x2="35" y2="386" gradientUnits="userSpaceOnUse">
        <stop offset="0.335" stop-color="#00BAD7"/>
        <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint2_linear_5_18" x1="129" y1="350" x2="129" y2="400" gradientUnits="userSpaceOnUse">
        <stop offset="0.335" stop-color="#00BAD7"/>
        <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint3_linear_5_18" x1="466.5" y1="276" x2="466.5" y2="465.5" gradientUnits="userSpaceOnUse">
        <stop offset="0.335" stop-color="#00BAD7"/>
        <stop offset="1"/>
        </linearGradient>
        </defs>
        </svg>

      )
    }
    
  return (
    <div style={{ position: 'relative', top: 0, left: 0, opacity: 0.9 }}>
      <SVGImage>
      {paths.map((path, index) => (
          <path
            key={index}
            d={path.d}
            fill={hoveredIndex === index ? "#30F8FF" : "#00BAD7"} // Darken on hover
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
            onClick={() => handleClick(path.text, index)} // Handle click event
            style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
          />
        ))}
      </SVGImage>
      {paths.map((path, index) => (
        <div
          key={index}
          style={{
            fontFamily: 'Roboto, sans-serif',
            position: 'absolute',
            top: `${73 + index * 47.5}px`, // Adjust based on SVG element's position
            left: '100px', // Adjust to align with SVG path
            color: hoveredIndex === index ? "#000000" : "#FFFFFF", // Change color on hover
            pointerEvents: 'none', // So the text doesn't interfere with the hover effect on the SVG
            fontSize: '18px',
          }}
        >
          {path.text}
        </div>
      ))} 
      <div
        style={{
          fontFamily: 'Genos, sans-serif',
          position: 'absolute',
          top: '10px', // Adjust this to position it correctly (based on top red circle)
          left: '100px', // Adjust this to position it correctly
          color: '#FFFFFF',
          fontSize: '40px',
          fontWeight: 700,
        }}
      >
        MUBARAK USMANE
      </div>
      <div
          style={{
            fontFamily: 'Roboto, sans-serif',
            position: 'absolute',
            top: '290px', // Adjust this to position it correctly (based on bottom red circle)
            left: '455px', // Adjust this to position it correctly
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          WEB3 FULLSTACK ENGINEER
        </div>
        <div
          style={{
            fontFamily: 'Roboto, sans-serif',
            position: 'absolute',
            top: '320px', // Adjust this to position it correctly (based on bottom red circle)
            left: '455px', // Adjust this to position it correctly
            color: '#FFFFFF',
            fontSize: '14px',
          }}
        >
          Pacific Standard Time
        </div>
        <div
          style={{
            fontFamily: 'Roboto, sans-serif',
            position: 'absolute',
            top: '360px', // Adjust this to position it correctly (based on bottom red circle)
            left: '455px', // Adjust this to position it correctly
            color: '#FFFFFF',
            fontSize: '18px',
          }}
        >
          CREATED WITH:
        </div>
        <div
          style={{
            fontFamily: 'Roboto, sans-serif',
            position: 'absolute',
            top: '390px', // Adjust this to position it correctly (based on bottom red circle)
            left: '455px', // Adjust this to position it correctly
            color: '#FFFFFF',
            fontSize: '14px',
          }}
        >
          Next, Three, React Three Fiber, Rive, Framer Motion
        </div>
        <div
          style={{
            fontFamily: 'Roboto, sans-serif',
            position: 'absolute',
            top: '440px', // Adjust this to position it correctly (based on bottom red circle)
            left: '455px', // Adjust this to position it correctly
            color: '#FFFFFF',
            fontSize: '14px',
          }}
        >
          mubarakone@ymail.com
        </div>
      {/* {hoveredIndex !== null && (
        <>
        <img
          src={paths[hoveredIndex].imageSource}
          style={{
            height: '100px',
            width: '100px',
            position: 'absolute',
            top: '170px',  // Adjust based on where you want the text to appear
            left: '400px',
          }}
        />
        </>
        
      )} */}
    </div>
  )
}
