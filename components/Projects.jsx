import React, { useState } from 'react'

export default function SVGComponent({ onPathClick, onHoveredPath }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [lockHover, setLockHover] = useState(false)

  const paths = [
    { d: "M533 122H333.404L319 103.474V78H521.683L533 91.8947V122Z", text: "PROJCET ONCHAIN WIKIPEDIA", imageSource: "blue-wikipedia-logo.png", image: "projectonchainwikipedia.PNG" },
    { d: "M533 169H333.404L319 150.474V125H521.683L533 138.895V169Z", text: "NEWSPAPER.TIPS", imageSource: "news-4303.svg", image: "newspapertips.PNG" },
    { d: "M533 216H333.404L319 197.474V172H521.683L533 185.895V216Z", text: "WEB3PLAYER-NEXT", imageSource: "web3player-next logo(2).PNG", image: "web3playernext.PNG" },
    { d: "M533 263H333.404L319 244.474V219H521.683L533 232.895V263Z", text: "JUKEBOX", imageSource: "Instagram post - 1.png", image: "jukebox.PNG" },
    { d: "M580.073 271.5H392.483L408.869 320.018L409 320.407V320.818V360.886C409 368.622 418.493 372.336 423.743 366.655L467.664 319.122L468.406 318.318H469.5H534.446L580.073 271.5Z", text: "MAIN", imageSource: "", bottomText: "BACK" },
  ];

  const handleClick = (index) => {
    if (index === 4) {
      if (onPathClick) {
        onPathClick("MAIN");  // Call the parent function with index and text
      }
      return
    }
    handleHover(index)
    setLockHover((prevLockHover) => !prevLockHover)
  };

  const handleHover = (index) => {
    if (lockHover) return
    setHoveredIndex(index)
    if (onHoveredPath) {
      if (index === null) {
        onHoveredPath(null)
      } else {
        onHoveredPath(paths[index].imageSource)
      }
    }
  }

  const renderBottomText = () => {
    switch (hoveredIndex) {
      case 0:
        return (
          <>
            <div
              style={{
                fontFamily: 'Roboto, sans-serif',
                position: 'absolute',
                top: '340px', // Adjust this to position it correctly (based on bottom red circle)
                right: '210px',
                color: '#FFFFFF',
                fontSize: '14px',
                width: '350px', // Set a specific width to control text wrapping
                wordWrap: 'break-word', // Ensures words break to fit the width if necessary
              }}
            >
              Created in a month during Onchain Summer. You can read, edit, discuss articles immutably all onchain.
            </div>
            <img
              src={paths[hoveredIndex].image}
              style={{
                height: '100px',
                width: '300px',
                position: 'absolute',
                top: '380px',
                right: '225px',
                cursor: 'pointer',
              }}
              onClick={() => window.open('https://projectonchainwikipedia.vercel.app/', '_blank')}
            />
          </>
        );
      case 1:
        return (
          <>
            <div
              style={{
                fontFamily: 'Roboto, sans-serif',
                position: 'absolute',
                top: '340px', // Adjust this to position it correctly (based on bottom red circle)
                right: '210px',
                color: '#FFFFFF',
                fontSize: '14px',
                width: '350px', // Set a specific width to control text wrapping
                wordWrap: 'break-word', // Ensures words break to fit the width if necessary
              }}
            >
              Read your favorite articles by tipping a small amount to the publisher. Each read will just require a very small tip.
            </div>
            <img
              src={paths[hoveredIndex].image}
              style={{
                height: '100px',
                width: '300px',
                position: 'absolute',
                top: '380px',
                right: '225px',
                cursor: 'pointer',
              }}
              onClick={() => window.open('https://newspaper.tips/', '_blank')}
            />
          </>
        );
      case 2:
        return (
          <>
            <div
              style={{
                fontFamily: 'Roboto, sans-serif',
                position: 'absolute',
                top: '340px', // Adjust this to position it correctly (based on bottom red circle)
                right: '210px',
                color: '#FFFFFF',
                fontSize: '14px',
                width: '350px', // Set a specific width to control text wrapping
                wordWrap: 'break-word', // Ensures words break to fit the width if necessary
              }}
            >
              A Web3 enabled video player that utilizes microtransactions for users to only pay for what they consume.
            </div>
            <img
              src={paths[hoveredIndex].image}
              style={{
                height: '100px',
                width: '300px',
                position: 'absolute',
                top: '380px',
                right: '225px',
                cursor: 'pointer',
              }}
              onClick={() => window.open('https://web3player-next.vercel.app/', '_blank')}
            />
          </>
        );
      case 3:
          return (
            <>
              <div
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  position: 'absolute',
                  top: '340px', // Adjust this to position it correctly (based on bottom red circle)
                  right: '210px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  width: '350px', // Set a specific width to control text wrapping
                  wordWrap: 'break-word', // Ensures words break to fit the width if necessary
                }}
              >
                A Web3 enabled streaming service that utilizes microtransactions for payments. Uses web3player-next as its backend.
              </div>
              <img
                src={paths[hoveredIndex].image}
                style={{
                  height: '100px',
                  width: '300px',
                  position: 'absolute',
                  top: '380px',
                  right: '225px',
                  cursor: 'pointer',
                }}
                onClick={() => window.open('https://ethglobal.com/showcase/seceret-name-3gjhb', '_blank')}
              />
            </>
          )
      case 4:
          return (
            <div
              style={{
                fontFamily: 'Roboto, sans-serif',
                position: 'absolute',
                top: '340px', // Adjust this to position it correctly (based on bottom red circle)
                right: '500px', // Adjust this to position it correctly
                color: '#FFFFFF',
                fontSize: '16px',
              }}
            >
              BACK 
            </div>
          )
      default:
        return;
    }
  }

    const SVGImage = ({ children }) => {
      return (
        <svg width="604" height="489" viewBox="0 0 604 489" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46.5131 463.073L46.5435 463.114L46.5721 463.157L62.3287 486.5H402.5V322.376L385.209 271.5H357.873L342.899 322.665L342.373 324.463H340.5H129.5H127.822L127.186 322.91L120.322 306.13H30.5V441.327L46.5131 463.073Z" fill="#00BAD7" stroke="url(#paint0_linear_64_26)" stroke-width="5"/>
        {/* <path d="M580.073 271.5H392.483L408.869 320.018L409 320.407V320.818V360.886C409 368.622 418.493 372.336 423.743 366.655L467.664 319.122L468.406 318.318H469.5H534.446L580.073 271.5Z" fill="#00BAD7" stroke="url(#paint1_linear_64_26)" stroke-width="5"/> */}
        <path d="M601.5 79.9186L588.84 67.3623L539.5 107.765V264.5H586.591L601.5 252.014V79.9186Z" fill="#00BAD7" stroke="url(#paint2_linear_64_26)" stroke-width="5"/>
        <path d="M116.638 16.9233L96.7905 47.0988L69.4733 91.5H102.118H295.688C296.978 91.5 298.206 90.9461 299.06 89.9789L312.302 74.987C314.105 72.9452 316.698 71.7759 319.422 71.7759H517.728C520.542 71.7759 523.212 73.0239 525.017 75.1834L539.364 92.3492C540.951 94.2479 543.774 94.509 545.682 92.9335L582.185 62.7973C584.181 61.1492 584.379 58.1607 582.617 56.2642L534.001 3.9371C533.15 3.02068 531.955 2.5 530.704 2.5H391.003C389.932 2.5 388.895 2.88232 388.081 3.57817L375.121 14.6471C373.4 16.1162 371.213 16.9233 368.951 16.9233H228.737H116.638Z" fill="#00BAD7" stroke="url(#paint3_linear_64_26)" stroke-width="5"/>
        <path d="M64.3179 91.5L111.475 16.5H54.1683C52.621 16.5 51.1823 17.2949 50.3587 18.6047L8.86052 84.6047C6.97626 87.6015 9.13014 91.5 12.6701 91.5H64.3179Z" fill="#00BAD7" stroke="url(#paint4_linear_64_26)" stroke-width="5"/>
          {children}
        {/* <path d="M533 122H333.404L319 103.474V78H521.683L533 91.8947V122Z" fill="#00BAD7"/>
        <path d="M533 169H333.404L319 150.474V125H521.683L533 138.895V169Z" fill="#00BAD7"/>
        <path d="M533 216H333.404L319 197.474V172H521.683L533 185.895V216Z" fill="#00BAD7"/>
        <path d="M533 263H333.404L319 244.474V219H521.683L533 232.895V263Z" fill="#00BAD7"/> */}
        <defs>
        <linearGradient id="paint0_linear_64_26" x1="216.5" y1="269" x2="216.5" y2="489" gradientUnits="userSpaceOnUse">
        <stop/>
        <stop offset="1" stop-color="#00BAD7"/>
        </linearGradient>
        <linearGradient id="paint1_linear_64_26" x1="487.5" y1="269" x2="487.5" y2="389" gradientUnits="userSpaceOnUse">
        <stop/>
        <stop offset="1" stop-color="#00BAD7"/>
        </linearGradient>
        <linearGradient id="paint2_linear_64_26" x1="570.5" y1="76.6681" x2="570.5" y2="264.601" gradientUnits="userSpaceOnUse">
        <stop/>
        <stop offset="1" stop-color="#00BAD7"/>
        </linearGradient>
        <linearGradient id="paint3_linear_64_26" x1="316.265" y1="14.4233" x2="316.265" y2="94" gradientUnits="userSpaceOnUse">
        <stop offset="0.335" stop-color="#00BAD7"/>
        <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint4_linear_64_26" x1="18.4779" y1="29.5" x2="75.6173" y2="103.458" gradientUnits="userSpaceOnUse">
        <stop offset="0.315" stop-color="#00BAD7"/>
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
            onClick={() => handleClick(index)} // Handle click event
            style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
          />
        ))}
      </SVGImage>
      {paths.map((path, index) => (
        index !== 4 && ( // Exclude the element with index 4
          <div
            key={index}
            style={{
              fontFamily: 'Roboto, sans-serif',
              position: 'absolute',
              top: `${85 + index * 47.5}px`, // Adjust based on SVG element's position
              right: '85px', // Adjust to align with SVG path
              color: hoveredIndex === index ? "#000000" : "#FFFFFF", // Change color on hover
              pointerEvents: 'none', // So the text doesn't interfere with the hover effect on the SVG
              fontSize: index === 0 ? "13px" : '18px',
            }}
          >
            {path.text}
          </div>
        )
      ))}
      <div
        style={{
          fontFamily: 'Genos, sans-serif',
          position: 'absolute',
          top: '10px', // Adjust this to position it correctly (based on top red circle)
          right: '250px', // Adjust this to position it correctly
          color: '#FFFFFF',
          fontSize: '40px',
          fontWeight: 700,
        }}
      >
        PROJECTS
      </div>
      <div
        style={{
          fontFamily: 'Roboto, sans-serif',
          position: 'absolute',
          top: '285px', // Adjust this to position it correctly (based on bottom red circle)
          right: '100px', // Adjust this to position it correctly
          color: hoveredIndex === 4 ? "#000000" : "#FFFFFF", // Change color on hover
          pointerEvents: 'none', // So the text doesn't interfere with the hover effect on the SVG
          fontSize: '16px',
        }}
      >
        BACK
      </div>
      {hoveredIndex !== null && (
        <>
        {/* <div
          style={{
            fontFamily: 'Roboto, sans-serif',
            position: 'absolute',
            top: '190px',  // Adjust based on where you want the text to appear
            right: '450px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Background for visibility
            padding: '5px',
            borderRadius: '5px',
            color: '#000000',
            fontSize: '14px',
          }}
        >
          {paths[hoveredIndex].display}
        </div> */}
        {renderBottomText()}
        </>
        
      )}
    </div>
  )
}
