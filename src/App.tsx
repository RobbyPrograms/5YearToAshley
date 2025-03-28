import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  overflow: hidden;
  position: relative;
  max-width: 100%;
`;


const NightSky = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  z-index: 0;
`;


const Star = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50%;
  opacity: 0.3;
  animation: twinkle 2s infinite;
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
`;


const Letter = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: relative;
  width: 300px;
  text-align: center;
  z-index: 10;
`;


const Message = styled(motion.div)`
  font-family: 'Dancing Script', cursive;
  font-size: 24px;
  color: #1a202c;
  margin-top: 20px;
`;


const Flower = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 0 15px rgba(155, 230, 213, 0.3));
  transform-origin: bottom center;
  bottom: 0;
`;


const FlowerHead = styled(motion.div)`
  position: relative;
  width: 100px;
  height: 100px;
`;


interface FlowerPetalProps {
  color?: string;
  shadowColor?: string;
}

interface FlowerCenterProps {
  color?: string;
  shadowColor?: string;
}

const FlowerPetal = styled(motion.div)<FlowerPetalProps>`
  position: absolute;
  width: 50px;
  height: 50px;
  background: ${props => props.color || '#9BE6D5'};
  border-radius: 50% 50% 0 50%;
  top: 25px;
  left: 25px;
  transform-origin: 0% 100%;
  box-shadow: 0 0 20px ${props => props.shadowColor || 'rgba(155, 230, 213, 0.6)'};
`;

const FlowerCenter = styled(motion.div)<FlowerCenterProps>`
  position: absolute;
  width: 35px;
  height: 35px;
  background: ${props => props.color || '#FCD34D'};
  border-radius: 50%;
  top: 32.5px;
  left: 32.5px;
  z-index: 2;
  box-shadow: 0 0 15px ${props => props.shadowColor || 'rgba(252, 211, 77, 0.6)'};
`;


const Stem = styled(motion.div)`
  width: 6px;
  height: 200px;
  background: #48BB78;
  margin-top: -20px;
  box-shadow: 0 0 12px rgba(72, 187, 120, 0.4);
`;


const Leaf = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 45px;
  background: #48BB78;
  border-radius: 0 50% 0 50%;
  transform-origin: 0 0;
  top: 140px;
  box-shadow: 0 0 12px rgba(72, 187, 120, 0.4);
  &.left {
    left: -28px;
    transform: rotate(-45deg);
  }
  &.right {
    right: -28px;
    transform: rotate(45deg) scaleX(-1);
  }
`;


const GrassLeaf = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 6px;
  height: 100px;
  background: #48BB78;
  transform-origin: bottom;
  box-shadow: 0 0 8px rgba(72, 187, 120, 0.3);
`;


const Title = styled(motion.h1)`
  font-family: 'Dancing Script', cursive;
  font-size: 36px;
  color: #1a202c;
  margin-bottom: 20px;
`;


const SmallFlower = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 0 10px rgba(155, 230, 213, 0.2));
  transform-origin: bottom center;
  bottom: 0;
  z-index: 1;
`;


const SmallFlowerHead = styled(motion.div)`
  position: relative;
  width: 50px;
  height: 50px;
`;


const SmallFlowerPetal = styled(motion.div)<FlowerPetalProps>`
  position: absolute;
  width: 25px;
  height: 25px;
  background: ${props => props.color || '#9BE6D5'};
  border-radius: 50% 50% 0 50%;
  top: 12.5px;
  left: 12.5px;
  transform-origin: 0% 100%;
  box-shadow: 0 0 15px ${props => props.shadowColor || 'rgba(155, 230, 213, 0.4)'};
  opacity: 0.8;
`;


const SmallFlowerCenter = styled(motion.div)<FlowerCenterProps>`
  position: absolute;
  width: 17.5px;
  height: 17.5px;
  background: ${props => props.color || '#FCD34D'};
  border-radius: 50%;
  top: 16.25px;
  left: 16.25px;
  z-index: 2;
  box-shadow: 0 0 10px ${props => props.shadowColor || 'rgba(252, 211, 77, 0.4)'};
`;


const SmallStem = styled(motion.div)`
  width: 3px;
  height: 100px;
  background: #48BB78;
  margin-top: -10px;
  box-shadow: 0 0 8px rgba(72, 187, 120, 0.3);
`;


const Firework = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: white;
  z-index: 0;
  will-change: transform;
`;

const FireworkParticle = styled(motion.div)`
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: white;
  transform-origin: center;
  will-change: transform, opacity;
`;


const FireworksContainer = memo(({ isOpen, windowSize }: { isOpen: boolean; windowSize: { width: number; height: number } }) => {
  const [fireworks, setFireworks] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
  }>>([]);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const shouldCreateFirework = Math.random() < 0.4;
      
      if (shouldCreateFirework) {
        const newFirework = {
          id: Date.now(),
          x: Math.random() * windowSize.width,
          y: Math.random() * (windowSize.height * 0.6),
          color: ['#FED7E2', '#B794F4', '#9BE6D5', '#FCD34D'][Math.floor(Math.random() * 4)],
        };
        
        setFireworks(prev => {
          const filtered = prev.filter(fw => Date.now() - fw.id < 1500);
          return [...filtered, newFirework];
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen, windowSize]);

  return (
    <>
      {fireworks.map((firework) => (
        <AnimatePresence key={firework.id} mode="popLayout">
          <Firework
            initial={{ opacity: 1, x: firework.x, y: windowSize.height }}
            animate={{ y: firework.y }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <FireworkParticle
                key={i}
                style={{ background: firework.color }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 3],
                  opacity: [1, 0],
                  x: [0, Math.cos(i * 45 * (Math.PI / 180)) * 50],
                  y: [0, Math.sin(i * 45 * (Math.PI / 180)) * 50],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.5,
                }}
              />
            ))}
          </Firework>
        </AnimatePresence>
      ))}
    </>
  );
});

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: Math.min(typeof window !== 'undefined' ? window.innerWidth : 1920, 1920),
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: Math.min(window.innerWidth, 1920),
        height: window.innerHeight,
      });
    };


    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const stars = Array.from({ length: 50 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 2,
  }));


  const flowers = Array.from({ length: 12 }).map((_, i) => {
    const padding = 100;
    const usableWidth = windowSize.width - (padding * 2);
    const flowerCount = 12 - 1;
   
    const x = padding + (usableWidth * (i / flowerCount));
   
    return {
      id: i,
      x,
      y: windowSize.height + 100,
      rotation: Math.random() * 10 - 5,
      swayDelay: Math.random() * 2,
      growDelay: i * 0.1,
      isSecondType: i % 2 === 1,
    };
  });


  const grassLeaves = Array.from({ length: 400 }).map((_, i) => ({
    x: Math.random() * windowSize.width,
    height: 20 + Math.random() * 60,
    rotation: Math.random() * 20 - 10,
    delay: (i / 400) * 1.5,
    swayDelay: Math.random() * 2,
  }));


  const smallFlowers = Array.from({ length: 24 }).map((_, i) => {
    const mainFlowerIndex = Math.floor(i / 2);
    const mainFlower = flowers[mainFlowerIndex % flowers.length];
    const offset = i % 2 === 0 ? -70 : 70;
    
    return {
      id: i,
      x: mainFlower.x + offset + (Math.random() * 20 - 10),
      rotation: Math.random() * 10 - 5,
      swayDelay: Math.random() * 2,
      growDelay: mainFlower.growDelay + 0.2 + (Math.random() * 0.3),
      isSecondType: Math.random() > 0.5,
    };
  });


  const handleClick = () => {
    setIsOpen(true);
    setTimeout(() => setShowTitle(true), 2000);
  };

  return (
    <Container>
      <NightSky>
        {stars.map((star, i) => (
          <Star
            key={i}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
        
        <FireworksContainer isOpen={isOpen} windowSize={windowSize} />
      </NightSky>
     
      {!isOpen ? (
        <Letter
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleClick}
        >
          <p style={{ fontSize: '18px', color: '#4A5568' }}>
            With love, on our special day
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            style={{
              background: '#FED7E2',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              marginTop: '20px',
              cursor: 'pointer',
            }}
          >
            Open Letter
          </motion.button>
        </Letter>
      ) : (
        <>
          <AnimatePresence>
            {grassLeaves.map((grass, index) => (
              <GrassLeaf
                key={`grass-${index}`}
                style={{
                  left: grass.x,
                  height: grass.height,
                }}
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: 1,
                  rotate: [grass.rotation - 2, grass.rotation + 2, grass.rotation - 2],
                }}
                transition={{
                  scaleY: {
                    duration: 1,
                    delay: grass.delay,
                    ease: "easeOut"
                  },
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: grass.swayDelay,
                  }
                }}
              />
            ))}
            {smallFlowers.map((flower) => (
              <SmallFlower
                key={`small-${flower.id}`}
                style={{
                  left: flower.x,
                }}
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: 1,
                  rotate: [flower.rotation - 3, flower.rotation + 3, flower.rotation - 3],
                }}
                transition={{
                  scaleY: {
                    duration: 1.5,
                    delay: flower.growDelay,
                    ease: "easeOut"
                  },
                  rotate: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: flower.swayDelay,
                  }
                }}
              >
                <SmallFlowerHead>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SmallFlowerPetal
                      key={i}
                      style={{
                        transform: `rotate(${i * 45}deg)`,
                      }}
                      color={flower.isSecondType ? '#FED7E2' : '#98F5E1'}
                      shadowColor={flower.isSecondType ? 'rgba(254, 215, 226, 0.6)' : 'rgba(152, 245, 225, 0.6)'}
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        filter: [
                          'brightness(1)',
                          'brightness(1.2)',
                          'brightness(1)'
                        ]
                      }}
                      transition={{
                        scale: {
                          delay: 1.5 + flower.growDelay + 0.1 * i,
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        filter: {
                          delay: 1.5 + flower.growDelay + 0.1 * i,
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      }}
                    />
                  ))}
                  <SmallFlowerCenter
                    color={flower.isSecondType ? '#F687B3' : '#34D399'}
                    shadowColor={flower.isSecondType ? 'rgba(246, 135, 179, 0.6)' : 'rgba(52, 211, 153, 0.6)'}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      filter: [
                        'brightness(1)',
                        'brightness(1.3)',
                        'brightness(1)'
                      ]
                    }}
                    transition={{
                      scale: {
                        delay: 2.3 + flower.growDelay,
                        duration: 0.3
                      },
                      filter: {
                        delay: 2.3 + flower.growDelay,
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    }}
                  />
                </SmallFlowerHead>
                <SmallStem
                  initial={{ height: 0 }}
                  animate={{ height: 120 }}
                  transition={{
                    duration: 1,
                    delay: flower.growDelay,
                    ease: "easeOut"
                  }}
                />
              </SmallFlower>
            ))}
            {flowers.map((flower, index) => (
              <Flower
                key={flower.id}
                style={{
                  left: flower.x,
                }}
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: 1,
                  rotate: [flower.rotation - 3, flower.rotation + 3, flower.rotation - 3],
                }}
                transition={{
                  scaleY: {
                    duration: 2,
                    delay: flower.growDelay,
                    ease: "easeOut"
                  },
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: flower.swayDelay,
                  }
                }}
              >
                <FlowerHead>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <FlowerPetal
                      key={i}
                      style={{
                        transform: `rotate(${i * 45}deg)`,
                      }}
                      color={flower.isSecondType ? '#B794F4' : '#9BE6D5'}
                      shadowColor={flower.isSecondType ? 'rgba(183, 148, 244, 0.6)' : 'rgba(155, 230, 213, 0.6)'}
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        filter: [
                          'brightness(1)',
                          'brightness(1.2)',
                          'brightness(1)'
                        ]
                      }}
                      transition={{
                        scale: {
                          delay: 1.5 + flower.growDelay + 0.1 * i,
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        filter: {
                          delay: 1.5 + flower.growDelay + 0.1 * i,
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      }}
                    />
                  ))}
                  <FlowerCenter
                    color={flower.isSecondType ? '#DDD6FE' : '#FCD34D'}
                    shadowColor={flower.isSecondType ? 'rgba(221, 214, 254, 0.6)' : 'rgba(252, 211, 77, 0.6)'}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      filter: [
                        'brightness(1)',
                        'brightness(1.3)',
                        'brightness(1)'
                      ]
                    }}
                    transition={{
                      scale: {
                        delay: 2.3 + flower.growDelay,
                        duration: 0.4
                      },
                      filter: {
                        delay: 2.3 + flower.growDelay,
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    }}
                  />
                </FlowerHead>
                <Stem
                  initial={{ height: 0 }}
                  animate={{ height: 220 }}
                  transition={{
                    duration: 1.2,
                    delay: flower.growDelay,
                    ease: "easeOut"
                  }}
                >
                  <Leaf className="left" />
                  <Leaf className="right" />
                </Stem>
              </Flower>
            ))}
          </AnimatePresence>
         
          <Letter
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {showTitle && (
              <Title
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Happy 5 Year Anniversary
              </Title>
            )}
            <Message
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Ashley, these five years have bloomed into something beautiful.
              <br /><br />
              I love you more than words can express.
            </Message>
          </Letter>
        </>
      )}
    </Container>
  );
};


export default App;
