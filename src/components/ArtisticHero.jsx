import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ArtisticHero.css';

// Create custom ease function as alternative to CustomEase plugin
const customEase = "power2.inOut";

const ArtisticHero = () => {
  const gridContainerRef = useRef(null);
  const centerCardRef = useRef(null);
  const centerImageRef = useRef(null);
  const categoriesMenuRef = useRef(null);
  const interactiveAreaRef = useRef(null);
  const mysteriousMessageRef = useRef(null);
  const logoContainerRef = useRef(null);
  const flipCardRef = useRef(null);
  const cardInnerRef = useRef(null);

  // Hair transformation images - using the same structure but with hair-related content
  const hairImages = [
    {
      src: "images/textured-messy-quiff.jpg",
      title: "TEXTURED QUIFF",
      subtitle: "Voluminous style, natural texture"
    },
    {
      src: "images/messy-fringe-new.jpg",
      title: "MESSY FRINGE",
      subtitle: "Effortless texture, modern appeal"
    },
    {
      src: "images/slick-back.jpg",
      title: "SLICK BACK",
      subtitle: "Classic sophistication, timeless appeal"
    },
    {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=430&h=610&fit=crop&crop=face",
      title: "CLASSIC ELEGANCE",
      subtitle: "Timeless beauty redefined"
    },
    {
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=430&h=610&fit=crop&crop=face",
      title: "STYLE TRANSFORMATION",
      subtitle: "Your journey begins here"
    },
    {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=430&h=610&fit=crop&crop=face",
      title: "CHIC SOPHISTICATION",
      subtitle: "Refined beauty in motion"
    },
    {
      src: "https://images.unsplash.com/photo-1548783307-f63adc3f200b?w=430&h=610&fit=crop",
      title: "LAYERED LUXURY",
      subtitle: "Depth in every strand"
    },
    {
      src: "https://images.unsplash.com/photo-1570158268183-d296b2892211?w=430&h=610&fit=crop",
      title: "FLOWING GRACE",
      subtitle: "Movement meets artistry"
    },
    {
      src: "https://images.unsplash.com/photo-1587653263995-422546a7a569?w=430&h=610&fit=crop",
      title: "NATURAL HARMONY",
      subtitle: "Beauty in its purest form"
    }
  ];

  const categories = [
    "Trending",
    "Classic", 
    "Professional",
    "Casual",
    "Formal",
    "Textured",
    "Sleek",
    "Voluminous"
  ];

  useEffect(() => {
    // Use custom ease for all animations

    // Animation durations
    const duration = 0.64;
    const menuInDuration = 0.64;
    const menuOutDuration = 0.48;
    const charDuration = 0.15;
    const finalMergeDuration = 0.5;
    const flipDuration = 0.8;

    // Get all elements
    const gridContainer = gridContainerRef.current;
    const centerCard = centerCardRef.current;
    const centerImage = centerImageRef.current;
    const categoriesMenu = categoriesMenuRef.current;
    const interactiveArea = interactiveAreaRef.current;
    const allCards = gridContainer?.querySelectorAll(".card:not(.card-5)");
    const allCategories = categoriesMenu?.querySelectorAll(".category");
    const mysteriousMessage = mysteriousMessageRef.current;
    const logoContainer = logoContainerRef.current;
    const logoChars = logoContainer?.querySelectorAll(".char");
    const vChar = logoContainer?.querySelector(".v-char");
    const sChar = logoContainer?.querySelector(".s-char");
    const spacer = logoContainer?.querySelector(".spacer");
    const flipCard = flipCardRef.current;
    const cardInner = cardInnerRef.current;

    if (!gridContainer || !centerCard || !categoriesMenu) return;

    // Create timelines
    const expandTimeline = gsap.timeline({ paused: true });
    const centerImageZoom = gsap.timeline({ paused: true });
    const logoTimeline = gsap.timeline({ paused: true });
    const flipTimeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        isFlipping = false;
        isFlipped = true;
      }
    });
    const flipBackTimeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        isFlipping = false;
        isFlipped = false;
      }
    });

    // Center image zoom animation
    centerImageZoom.to(centerImage, {
      scale: 1.08,
      duration: duration,
      ease: "customEase"
    });

    // Logo animation setup
    const hideSequence = [13, 5, 12, 4, 11, 3, 10, 2, 9, 1, 8];
    
    hideSequence.forEach((index, i) => {
      const char = logoContainer?.querySelector(`.char[data-index="${index}"]`);
      if (char) {
        logoTimeline.to(char, {
          opacity: 0,
          filter: "blur(8px)",
          duration: charDuration,
          ease: customEase
        }, i * 0.05);
      }
    });

    if (spacer) {
      logoTimeline.to(spacer, {
        opacity: 0,
        filter: "blur(8px)",
        duration: charDuration,
        ease: customEase
      }, hideSequence.length * 0.05);
    }

    if (sChar && vChar) {
      logoTimeline.to(sChar, {
        x: function() {
          const vRect = vChar.getBoundingClientRect();
          const sRect = sChar.getBoundingClientRect();
          return -(sRect.left - vRect.right);
        },
        duration: finalMergeDuration,
        ease: customEase
      }, hideSequence.length * 0.05 + 0.05);
    }

    // Flip animations
    if (cardInner && flipCard) {
      flipTimeline
        .to(cardInner, {
          rotationY: 900,
          duration: flipDuration,
          ease: "power2.inOut"
        })
        .to(flipCard, {
          filter: "blur(8px)",
          duration: 0.2,
          ease: "power1.in"
        }, 0)
        .to(flipCard, {
          filter: "blur(0px)",
          duration: 0.2,
          ease: "power1.out"
        }, flipDuration - 0.2);

      flipBackTimeline
        .to(cardInner, {
          rotationY: 0,
          duration: flipDuration,
          ease: "power2.inOut"
        })
        .to(flipCard, {
          filter: "blur(8px)",
          duration: 0.2,
          ease: "power1.in"
        }, 0)
        .to(flipCard, {
          filter: "blur(0px)",
          duration: 0.2,
          ease: "power1.out"
        }, flipDuration - 0.2);
    }

    // Grid expansion animations
    const cardPositions = [
      { selector: ".card-1", top: 0, left: 0, xPercent: 0, yPercent: 0, delay: 0.05 },
      { selector: ".card-2", top: 0, left: "50%", xPercent: -50, yPercent: 0, delay: 0.1 },
      { selector: ".card-3", top: 0, left: "100%", xPercent: -100, yPercent: 0, delay: 0.15 },
      { selector: ".card-4", top: "50%", left: 0, xPercent: 0, yPercent: -50, delay: 0.2 },
      { selector: ".card-6", top: "50%", left: "100%", xPercent: -100, yPercent: -50, delay: 0.25 },
      { selector: ".card-7", top: "100%", left: 0, xPercent: 0, yPercent: -100, delay: 0.3 },
      { selector: ".card-8", top: "100%", left: "50%", xPercent: -50, yPercent: -100, delay: 0.35 },
      { selector: ".card-9", top: "100%", left: "100%", xPercent: -100, yPercent: -100, delay: 0.4 }
    ];

    cardPositions.forEach(pos => {
      expandTimeline.to(pos.selector, {
        top: pos.top,
        left: pos.left,
        xPercent: pos.xPercent,
        yPercent: pos.yPercent,
        opacity: 1,
        scale: 1,
        visibility: "visible",
        ease: customEase,
        duration: duration,
        delay: pos.delay
      }, 0);
    });

    // Show mysterious message
    if (mysteriousMessage) {
      expandTimeline.to(mysteriousMessage, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.6
      }, 0);
    }

    // Initialize GSAP settings
    if (allCategories) {
      gsap.set(allCategories, {
        opacity: 0,
        y: 20,
        visibility: "hidden"
      });
    }

    if (logoChars) {
      gsap.set(logoChars, {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)"
      });
    }

    if (mysteriousMessage) {
      gsap.set(mysteriousMessage, {
        opacity: 0
      });
    }

    // State tracking
    let isExpanded = false;
    let isHoveringGrid = false;
    let isHoveringMenu = false;
    let isHoveringFlipCard = false;
    let menuAnimation = null;
    let isFlipping = false;
    let isFlipped = false;

    // Menu animation functions
    function showMenu() {
      if (menuAnimation) menuAnimation.kill();
      menuAnimation = gsap.timeline();
      
      if (allCategories) {
        menuAnimation.staggerTo(Array.from(allCategories).reverse(), menuInDuration, {
          opacity: 1,
          y: 0,
          visibility: "visible",
          ease: customEase,
          stagger: 0.08
        });
      }
      menuAnimation.play();
    }

    function hideMenu() {
      if (menuAnimation) menuAnimation.kill();
      menuAnimation = gsap.timeline();
      
      if (allCategories) {
        menuAnimation.staggerTo(allCategories, menuOutDuration, {
          opacity: 0,
          y: 20,
          visibility: "hidden",
          ease: customEase,
          stagger: 0.05
        });
      }
      menuAnimation.play();
    }

    function expandGrid() {
      if (!isExpanded) {
        isExpanded = true;
        expandTimeline.play();
        showMenu();
        centerImageZoom.play();
        logoTimeline.play();
      }
    }

    function collapseGrid() {
      if (!isHoveringGrid && !isHoveringMenu && isExpanded) {
        isExpanded = false;
        expandTimeline.reverse();
        hideMenu();
        centerImageZoom.reverse();
        logoTimeline.reverse();

        if (isFlipped || isFlipping) {
          flipTimeline.kill();
          flipBackTimeline.kill();
          gsap.to(cardInner, {
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              isFlipped = false;
              isFlipping = false;
            }
          });
          gsap.to(flipCard, { filter: "blur(0px)", duration: 0.1 });
        }
      }
    }

    // Check if device supports hover
    const supportsHover = window.matchMedia("(hover: hover)").matches;

    if (supportsHover) {
      // Mouse event listeners
      centerCard.addEventListener("mouseenter", () => {
        isHoveringGrid = true;
        expandGrid();
      });

      gridContainer.addEventListener("mouseenter", () => {
        isHoveringGrid = true;
      });

      gridContainer.addEventListener("mouseleave", () => {
        isHoveringGrid = false;
        setTimeout(() => collapseGrid(), 50);
      });

      categoriesMenu.addEventListener("mouseenter", () => {
        isHoveringMenu = true;
      });

      categoriesMenu.addEventListener("mouseleave", () => {
        isHoveringMenu = false;
        setTimeout(() => collapseGrid(), 50);
      });

      if (flipCard) {
        flipCard.addEventListener("mouseenter", () => {
          if (isExpanded && !isFlipping && !isFlipped) {
            isHoveringFlipCard = true;
            isFlipping = true;
            flipTimeline.restart();
          }
        });

        flipCard.addEventListener("mouseleave", () => {
          isHoveringFlipCard = false;
          if (isExpanded && (isFlipping || isFlipped)) {
            flipTimeline.kill();
            isFlipping = true;
            flipBackTimeline.restart();
          }
        });
      }

      // Global mouse tracking
      if (interactiveArea) {
        interactiveArea.addEventListener("mousemove", (e) => {
          const gridRect = gridContainer.getBoundingClientRect();
          const menuRect = categoriesMenu.getBoundingClientRect();
          const flipCardRect = flipCard?.getBoundingClientRect();

          const isOverGrid = e.clientX >= gridRect.left && e.clientX <= gridRect.right &&
                           e.clientY >= gridRect.top && e.clientY <= gridRect.bottom;
          const isOverMenu = e.clientX >= menuRect.left && e.clientX <= menuRect.right &&
                           e.clientY >= menuRect.top && e.clientY <= menuRect.bottom;
          const isOverFlipCard = flipCardRect && isExpanded &&
                               e.clientX >= flipCardRect.left && e.clientX <= flipCardRect.right &&
                               e.clientY >= flipCardRect.top && e.clientY <= flipCardRect.bottom;

          isHoveringGrid = isOverGrid;
          isHoveringMenu = isOverMenu;

          if (isOverFlipCard && !isHoveringFlipCard) {
            isHoveringFlipCard = true;
            if (!isFlipped && !isFlipping) {
              isFlipping = true;
              flipTimeline.restart();
            }
          } else if (!isOverFlipCard && isHoveringFlipCard) {
            isHoveringFlipCard = false;
            if (isFlipped || isFlipping) {
              flipTimeline.kill();
              isFlipping = true;
              flipBackTimeline.restart();
            }
          }

          if (isHoveringGrid || isHoveringMenu) {
            expandGrid();
          } else {
            collapseGrid();
          }
        });
      }
    } else {
      // Touch device interactions
      centerCard.addEventListener("click", () => {
        if (!isExpanded) {
          isExpanded = true;
          expandTimeline.play();
          showMenu();
          centerImageZoom.play();
          logoTimeline.play();
        } else {
          isExpanded = false;
          expandTimeline.reverse();
          hideMenu();
          centerImageZoom.reverse();
          logoTimeline.reverse();
        }
      });

      if (flipCard) {
        flipCard.addEventListener("click", () => {
          if (isExpanded && !isFlipping) {
            if (!isFlipped) {
              isFlipping = true;
              flipTimeline.restart();
            } else {
              isFlipping = true;
              flipBackTimeline.restart();
            }
          }
        });
      }
    }

    // Cleanup function
    return () => {
      expandTimeline.kill();
      centerImageZoom.kill();
      logoTimeline.kill();
      flipTimeline.kill();
      flipBackTimeline.kill();
      if (menuAnimation) menuAnimation.kill();
    };
  }, []);

  return (
    <div className="artistic-hero-container">
      <div className="grid-container" id="gridContainer" ref={gridContainerRef}>
        {hairImages.map((image, index) => (
          <div 
            key={index} 
            className={`card card-${index + 1} ${index === 4 ? 'card-5' : ''} ${index === 6 ? 'card-7' : ''}`}
            ref={index === 4 ? centerCardRef : index === 6 ? flipCardRef : null}
            id={index === 4 ? 'centerCard' : index === 6 ? 'flipCard' : undefined}
          >
            {index === 6 ? (
              <div className="card-inner" id="cardInner" ref={cardInnerRef}>
                <div className="card-front">
                  <img src={image.src} alt={`Hair style ${index + 1}`} />
                  <div className="card-content">
                    <h2>{image.title}</h2>
                    <p>{image.subtitle}</p>
                  </div>
                </div>
                <div className="card-back">
                  <div className="quote">
                    <p>"Transform your look, transform your confidence. Every hairstyle tells a story - what will yours say?"</p>
                    <span className="author">HEADZ</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <img 
                  src={image.src} 
                  alt={`Hair style ${index + 1}`}
                  ref={index === 4 ? centerImageRef : null}
                  id={index === 4 ? 'centerImage' : undefined}
                />
                <div className="card-content">
                  <h2>{image.title}</h2>
                  <p>{image.subtitle}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="categories" id="categoriesMenu" ref={categoriesMenuRef}>
        {categories.map((category, index) => (
          <div key={index} className="category">{category}</div>
        ))}
      </div>

      <div className="logo" id="logoContainer" ref={logoContainerRef}>
        <div className="logo-wrapper">
          <span className="char v-char" data-index="0">H</span>
          <span className="char" data-index="1">A</span>
          <span className="char" data-index="2">I</span>
          <span className="char" data-index="3">R</span>
          <span className="char spacer" data-index="4"> </span>
          <span className="char s-char" data-index="5">S</span>
          <span className="char" data-index="6">T</span>
          <span className="char" data-index="7">Y</span>
          <span className="char" data-index="8">L</span>
          <span className="char" data-index="9">E</span>
          <span className="char" data-index="10">S</span>
        </div>
      </div>

      <span className="mysterious-message" id="mysteriousMessage" ref={mysteriousMessageRef}>
        Discover the magic in every transformation...
      </span>

      <div className="interactive-area" id="interactiveArea" ref={interactiveAreaRef}></div>
    </div>
  );
};

export default ArtisticHero;
