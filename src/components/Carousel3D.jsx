import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './Carousel3D.css';

gsap.registerPlugin(Draggable);

const Carousel3D = ({ images = [] }) => {
  const carouselRef = useRef(null);
  const carouselItemsRef = useRef(null);
  const draggableInstance = useRef(null);
  const activeAnimations = useRef([]);
  const currentAnimation = useRef('circle');
  const isTransitioning = useRef(false);
  const originalZIndices = useRef([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Configuration
  const CONFIG = {
    totalCards: Math.min(images.length, 24),
    animations: {
      transitionDuration: 1.5,
      waveDuration: 8,
      staggerDelay: 0.1
    }
  };

  // Utility functions
  const getViewportSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const killActiveAnimations = () => {
    activeAnimations.current.forEach(anim => {
      if (anim && anim.kill) anim.kill();
    });
    activeAnimations.current = [];
  };

  const updateMenuState = (pattern) => {
    const buttons = document.querySelectorAll('.switch-button');
    buttons.forEach(btn => btn.classList.remove('switch-button-current'));
    
    const targetButton = document.getElementById(`${pattern}Btn`);
    if (targetButton) {
      targetButton.classList.add('switch-button-current');
    }
  };

  // Generate cards
  const generateCards = () => {
    if (!carouselItemsRef.current) return;
    
    carouselItemsRef.current.innerHTML = '';
    
    for (let i = 0; i < CONFIG.totalCards; i++) {
      const card = document.createElement('div');
      card.className = 'carousel-item';
      
      const imageData = images[i] || images[i % images.length];
      if (imageData) {
        card.style.backgroundImage = `url(${imageData.after || imageData.image})`;
        
        // Add card number
        const cardNumber = document.createElement('div');
        cardNumber.className = 'card__number';
        cardNumber.textContent = i + 1;
        card.appendChild(cardNumber);
        
        // Add title overlay
        if (imageData.title) {
          const titleOverlay = document.createElement('div');
          titleOverlay.className = 'card__title';
          titleOverlay.textContent = imageData.title;
          card.appendChild(titleOverlay);
        }
      }
      
      carouselItemsRef.current.appendChild(card);
      originalZIndices.current[i] = 100 + i;
    }
  };

  // Setup circle positions
  const setupCirclePositions = (animate = false) => {
    const cards = gsap.utils.toArray('.carousel-item');
    const viewport = getViewportSize();
    const radius = Math.min(viewport.width, viewport.height) * 0.35;
    const angleStep = (2 * Math.PI) / CONFIG.totalCards;

    if (animate) {
      const timeline = gsap.timeline();
      
      cards.forEach((card, index) => {
        if (index >= CONFIG.totalCards) return;
        
        const angle = index * angleStep;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        timeline.to(card, {
          x: x,
          y: y,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 0.8,
          duration: CONFIG.animations.transitionDuration,
          ease: "power2.inOut"
        }, 0);
      });
      
      return timeline;
    } else {
      cards.forEach((card, index) => {
        if (index >= CONFIG.totalCards) return;
        
        const angle = index * angleStep;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        gsap.set(card, {
          x: x,
          y: y,
          rotation: 0,
          scale: 0.8
        });
      });
    }
  };

  // Setup draggable
  const setupDraggable = () => {
    if (!carouselItemsRef.current) return;
    
    carouselItemsRef.current.classList.add('draggable');
    
    draggableInstance.current = Draggable.create(carouselItemsRef.current, {
      type: "rotation",
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing"
    })[0];
  };

  // Setup wave positions
  const setupWavePositions = () => {
    const cards = gsap.utils.toArray('.carousel-item');
    const viewport = getViewportSize();
    const timeline = gsap.timeline();
    
    cards.forEach((card, index) => {
      if (index >= CONFIG.totalCards) return;
      
      const progress = index / (CONFIG.totalCards - 1);
      const x = (progress - 0.5) * viewport.width * 0.8;
      const y = Math.sin(progress * Math.PI * 2) * 100;
      
      timeline.to(card, {
        x: x,
        y: y,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 0.7,
        duration: CONFIG.animations.transitionDuration,
        ease: "power2.inOut"
      }, 0);
    });
    
    return timeline;
  };

  // Start wave animation
  const startWaveAnimation = () => {
    const cards = gsap.utils.toArray('.carousel-item');
    
    return gsap.to(cards, {
      y: "+=20",
      duration: 2,
      ease: "sine.inOut",
      stagger: {
        each: 0.1,
        repeat: -1,
        yoyo: true
      }
    });
  };

  // Setup grid positions
  const setupGridPositions = () => {
    const cards = gsap.utils.toArray('.carousel-item');
    const viewport = getViewportSize();
    const cols = Math.ceil(Math.sqrt(CONFIG.totalCards));
    const rows = Math.ceil(CONFIG.totalCards / cols);
    const timeline = gsap.timeline();
    
    const cardWidth = Math.min(300, viewport.width / cols * 0.8);
    const cardHeight = cardWidth * 1.4;
    const totalWidth = cols * cardWidth;
    const totalHeight = rows * cardHeight;
    
    cards.forEach((card, index) => {
      if (index >= CONFIG.totalCards) return;
      
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      const x = (col * cardWidth) - (totalWidth / 2) + (cardWidth / 2);
      const y = (row * cardHeight) - (totalHeight / 2) + (cardHeight / 2);
      
      timeline.to(card, {
        x: x,
        y: y,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 0.6,
        duration: CONFIG.animations.transitionDuration,
        ease: "power2.inOut"
      }, 0);
    });
    
    return timeline;
  };

  // Setup stagger positions
  const setupStaggerPositions = () => {
    const cards = gsap.utils.toArray('.carousel-item');
    const viewport = getViewportSize();
    const timeline = gsap.timeline();
    
    cards.forEach((card, index) => {
      if (index >= CONFIG.totalCards) return;
      
      const progress = index / (CONFIG.totalCards - 1);
      const x = (progress - 0.5) * viewport.width * 0.6;
      const y = (index % 2 === 0 ? -1 : 1) * 50;
      
      timeline.to(card, {
        x: x,
        y: y,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 0.7,
        duration: CONFIG.animations.transitionDuration,
        ease: "power2.inOut"
      }, index * 0.1);
    });
    
    return timeline;
  };

  // Setup stagger mouse tracking
  const setupStaggerMouseTracking = () => {
    const viewport = getViewportSize();
    
    carouselRef.current.onmousemove = (e) => {
      if (currentAnimation.current !== 'stagger' || isTransitioning.current) return;
      
      const mouseX = e.clientX / viewport.width - 0.5;
      const mouseY = e.clientY / viewport.height - 0.5;
      
      gsap.to('.carousel-item', {
        rotationY: mouseX * 10,
        rotationX: -mouseY * 10,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.02
      });
    };
  };

  // Setup fan positions
  const setupFanPositions = () => {
    const cards = gsap.utils.toArray('.carousel-item');
    const timeline = gsap.timeline();
    const totalAngle = 120; // Total spread in degrees
    const startAngle = -totalAngle / 2;
    
    cards.forEach((card, index) => {
      if (index >= CONFIG.totalCards) return;
      
      const progress = CONFIG.totalCards > 1 ? index / (CONFIG.totalCards - 1) : 0;
      const angle = startAngle + (progress * totalAngle);
      const distance = 200 + (index * 20);
      
      const x = Math.sin(angle * Math.PI / 180) * distance;
      const y = Math.cos(angle * Math.PI / 180) * distance * 0.3;
      
      timeline.to(card, {
        x: x,
        y: y,
        rotation: angle * 0.5,
        rotationX: 0,
        rotationY: 0,
        scale: 0.8 - (index * 0.05),
        duration: CONFIG.animations.transitionDuration,
        ease: "power2.inOut"
      }, 0);
    });
    
    return timeline;
  };

  // Setup 3D depth positions
  const setup3DDepthPositions = () => {
    const cards = gsap.utils.toArray('.carousel-item');
    const viewport = getViewportSize();

    const positions = [
      { x: -viewport.width * 0.25, y: -viewport.height * 0.2, z: -200, scale: 0.9, rotX: -5, rotY: 5 },
      { x: viewport.width * 0.25, y: -viewport.height * 0.25, z: -300, scale: 0.85, rotX: -3, rotY: -4 },
      { x: -viewport.width * 0.3, y: viewport.height * 0.2, z: -400, scale: 0.8, rotX: 4, rotY: 6 },
      { x: viewport.width * 0.3, y: viewport.height * 0.25, z: -500, scale: 0.75, rotX: 5, rotY: -5 },
      { x: 0, y: -viewport.height * 0.3, z: -700, scale: 0.7, rotX: -6, rotY: 0 },
      { x: -viewport.width * 0.35, y: 0, z: -800, scale: 0.65, rotX: 0, rotY: 7 },
      { x: viewport.width * 0.35, y: 0, z: -900, scale: 0.6, rotX: 0, rotY: -7 },
      { x: 0, y: viewport.height * 0.3, z: -1000, scale: 0.55, rotX: 6, rotY: 0 },
      { x: -viewport.width * 0.2, y: -viewport.height * 0.15, z: -1200, scale: 0.5, rotX: -3, rotY: 3 },
      { x: viewport.width * 0.2, y: -viewport.height * 0.15, z: -1300, scale: 0.45, rotX: -3, rotY: -3 },
      { x: -viewport.width * 0.2, y: viewport.height * 0.15, z: -1400, scale: 0.4, rotX: 3, rotY: 3 },
      { x: viewport.width * 0.2, y: viewport.height * 0.15, z: -1500, scale: 0.35, rotX: 3, rotY: -3 }
    ];

    const timeline = gsap.timeline();

    cards.forEach((card, index) => {
      if (index >= positions.length) return;
      const pos = positions[index];

      const zIndex = 1000 - Math.round(Math.abs(pos.z));
      gsap.set(card, { zIndex: zIndex });

      timeline.to(card, {
        x: pos.x,
        y: pos.y,
        z: pos.z,
        rotationX: pos.rotX,
        rotationY: pos.rotY,
        scale: pos.scale,
        duration: CONFIG.animations.transitionDuration,
        ease: "power2.inOut"
      }, 0);
    });

    return timeline;
  };

  // Setup 3D depth mouse tracking
  const setup3DDepthMouseTracking = () => {
    const viewport = getViewportSize();

    carouselRef.current.onmousemove = (e) => {
      if (currentAnimation.current !== 'depth' || isTransitioning.current) return;

      const mouseX = e.clientX / viewport.width - 0.5;
      const mouseY = e.clientY / viewport.height - 0.5;

      gsap.to(carouselItemsRef.current, {
        rotationY: mouseX * 3,
        rotationX: -mouseY * 3,
        duration: 1.2,
        ease: "power1.out"
      });
    };
  };

  // Transition to pattern
  const transitionToPattern = (newPattern) => {
    if (isTransitioning.current) return;

    isTransitioning.current = true;
    updateMenuState(newPattern);
    killActiveAnimations();

    if (draggableInstance.current) {
      draggableInstance.current.kill();
      draggableInstance.current = null;
    }

    carouselItemsRef.current.classList.remove('draggable');
    carouselRef.current.onmousemove = null;

    const prevAnimation = currentAnimation.current;
    currentAnimation.current = newPattern;

    const timeline = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;

        if (newPattern === 'circle' || newPattern === 'fan') {
          setupDraggable();
        } else if (newPattern === 'wave') {
          const waveAnim = startWaveAnimation();
          if (waveAnim) activeAnimations.current.push(waveAnim);
        } else if (newPattern === 'stagger') {
          setupStaggerMouseTracking();
        } else if (newPattern === 'depth') {
          setup3DDepthMouseTracking();
        }
      }
    });

    activeAnimations.current.push(timeline);

    // Reset rotations if coming from fan
    if (prevAnimation === 'fan') {
      const cards = gsap.utils.toArray('.carousel-item');
      const normalizeTimeline = gsap.timeline();

      cards.forEach((card) => {
        normalizeTimeline.to(card, {
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          duration: CONFIG.animations.transitionDuration / 2,
          ease: "power2.inOut"
        }, 0);
      });

      timeline.add(normalizeTimeline);
      timeline.to({}, { duration: 0.1 });
    }

    let patternTimeline;

    if (newPattern !== 'circle' && newPattern !== 'fan') {
      if (prevAnimation === 'circle' || prevAnimation === 'fan') {
        timeline.set(carouselItemsRef.current, {
          rotationX: 0,
          rotationY: 0
        });
      } else {
        timeline.set(carouselItemsRef.current, {
          rotation: 0,
          rotationX: 0,
          rotationY: 0
        });
      }
    }

    switch (newPattern) {
      case 'circle':
        patternTimeline = setupCirclePositions(true);
        break;
      case 'wave':
        patternTimeline = setupWavePositions();
        if (prevAnimation === 'circle' || prevAnimation === 'fan') {
          timeline.to(carouselItemsRef.current, {
            rotation: 0,
            duration: CONFIG.animations.transitionDuration,
            ease: "power2.inOut"
          }, 0);
        }
        break;
      case 'stagger':
        patternTimeline = setupStaggerPositions();
        if (prevAnimation === 'circle' || prevAnimation === 'fan') {
          timeline.to(carouselItemsRef.current, {
            rotation: 0,
            duration: CONFIG.animations.transitionDuration,
            ease: "power2.inOut"
          }, 0);
        }
        break;
      case 'grid':
        patternTimeline = setupGridPositions();
        if (prevAnimation === 'circle' || prevAnimation === 'fan') {
          timeline.to(carouselItemsRef.current, {
            rotation: 0,
            duration: CONFIG.animations.transitionDuration,
            ease: "power2.inOut"
          }, 0);
        }
        break;
      case 'fan':
        patternTimeline = setupFanPositions();
        if (prevAnimation === 'circle') {
          timeline.to(carouselItemsRef.current, {
            rotation: 0,
            duration: CONFIG.animations.transitionDuration,
            ease: "power2.inOut"
          }, 0);
        }
        break;
      case 'depth':
        patternTimeline = setup3DDepthPositions();
        if (prevAnimation === 'circle' || prevAnimation === 'fan') {
          timeline.to(carouselItemsRef.current, {
            rotation: 0,
            duration: CONFIG.animations.transitionDuration,
            ease: "power2.inOut"
          }, 0);
        }
        break;
    }

    if (patternTimeline) timeline.add(patternTimeline, 0);
  };

  // Initialize carousel
  const initializeCarousel = () => {
    const cards = gsap.utils.toArray('.carousel-item');
    const totalCards = cards.length;

    gsap.set(cards, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 0,
      opacity: 0
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
        setIsLoading(false);
        setupDraggable();
      }
    });

    // Intro animation
    for (let i = 0; i < totalCards; i++) {
      const card = cards[i];
      const delay = (totalCards - 1 - i) * 0.1;

      gsap.set(card, {
        zIndex: 100 + (totalCards - 1 - i)
      });

      timeline.to(card, {
        opacity: 1,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.out"
      }, delay);
    }

    timeline.to({}, { duration: 0.3 });

    const circleTimeline = setupCirclePositions(true);
    timeline.add(circleTimeline);

    currentAnimation.current = 'circle';
    activeAnimations.current.push(timeline);
    updateMenuState('circle');

    return timeline;
  };

  // Reset carousel
  const resetCarousel = () => {
    killActiveAnimations();

    if (draggableInstance.current) {
      draggableInstance.current.kill();
      draggableInstance.current = null;
    }

    carouselRef.current.onmousemove = null;

    gsap.set(carouselItemsRef.current, {
      rotation: 0,
      rotationX: 0,
      rotationY: 0
    });

    generateCards();
    initializeCarousel();

    currentAnimation.current = 'circle';
    isTransitioning.current = false;
    updateMenuState('circle');
  };

  // Handle resize
  const handleResize = () => {
    if (!isTransitioning.current) {
      transitionToPattern(currentAnimation.current);
    }
  };

  useEffect(() => {
    if (images.length === 0) return;

    generateCards();
    initializeCarousel();

    // Add event listeners
    const resetBtn = document.getElementById('resetBtn');
    const circleBtn = document.getElementById('circleBtn');
    const waveBtn = document.getElementById('waveBtn');
    const staggerBtn = document.getElementById('staggerBtn');
    const gridBtn = document.getElementById('gridBtn');
    const fanBtn = document.getElementById('fanBtn');
    const depthBtn = document.getElementById('depthBtn');

    if (resetBtn) resetBtn.addEventListener('click', resetCarousel);
    if (circleBtn) circleBtn.addEventListener('click', () => transitionToPattern('circle'));
    if (waveBtn) waveBtn.addEventListener('click', () => transitionToPattern('wave'));
    if (staggerBtn) staggerBtn.addEventListener('click', () => transitionToPattern('stagger'));
    if (gridBtn) gridBtn.addEventListener('click', () => transitionToPattern('grid'));
    if (fanBtn) fanBtn.addEventListener('click', () => transitionToPattern('fan'));
    if (depthBtn) depthBtn.addEventListener('click', () => transitionToPattern('depth'));

    window.addEventListener('resize', handleResize);

    return () => {
      killActiveAnimations();
      if (draggableInstance.current) {
        draggableInstance.current.kill();
      }

      // Remove event listeners
      if (resetBtn) resetBtn.removeEventListener('click', resetCarousel);
      if (circleBtn) circleBtn.removeEventListener('click', () => transitionToPattern('circle'));
      if (waveBtn) waveBtn.removeEventListener('click', () => transitionToPattern('wave'));
      if (staggerBtn) staggerBtn.removeEventListener('click', () => transitionToPattern('stagger'));
      if (gridBtn) gridBtn.removeEventListener('click', () => transitionToPattern('grid'));
      if (fanBtn) fanBtn.removeEventListener('click', () => transitionToPattern('fan'));
      if (depthBtn) depthBtn.removeEventListener('click', () => transitionToPattern('depth'));

      window.removeEventListener('resize', handleResize);
    };
  }, [images]);

  return (
    <div className={`carousel-container ${isLoading ? 'loading' : ''}`} ref={carouselRef}>
      <div className="carousel-items" ref={carouselItemsRef}></div>

      <div className="switch" id="controls" style={{ opacity: isLoading ? 0 : 1, visibility: isLoading ? 'hidden' : 'visible' }}>
        <button className="switch-button" id="resetBtn">
          <span className="indicator-dot"></span>
          RESET
        </button>
        <button className="switch-button switch-button-current" id="circleBtn">
          <span className="indicator-dot"></span>
          CIRCLE
        </button>
        <button className="switch-button" id="waveBtn">
          <span className="indicator-dot"></span>
          WAVE
        </button>
        <button className="switch-button" id="staggerBtn">
          <span className="indicator-dot"></span>
          STAGGER
        </button>
        <button className="switch-button" id="gridBtn">
          <span className="indicator-dot"></span>
          GRID
        </button>
        <button className="switch-button" id="fanBtn">
          <span className="indicator-dot"></span>
          FAN
        </button>
        <button className="switch-button" id="depthBtn">
          <span className="indicator-dot"></span>
          3D DEPTH
        </button>
      </div>
    </div>
  );
};

export default Carousel3D;
