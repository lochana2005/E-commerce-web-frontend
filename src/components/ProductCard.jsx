// src/components/ProductCard.jsx
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

// This is the 3D scene for a single product card image.
function ProductImage({ imageUrl }) {
  const imageRef = useRef();
  const [hovered, setHover] = useState(false);

  // useFrame is a hook that runs on every rendered frame.
  useFrame((state, delta) => {
    if (imageRef.current) {
      // On hover, we make it gently float up and down.
      const t = state.clock.getElapsedTime();
      imageRef.current.position.y = hovered ? Math.sin(t * 2) / 8 : 0;

      // On hover, we also make it rotate slightly towards the mouse pointer.
      if (hovered) {
        imageRef.current.rotation.x = THREE.MathUtils.lerp(imageRef.current.rotation.x, state.mouse.y * -0.2, 0.1);
        imageRef.current.rotation.y = THREE.MathUtils.lerp(imageRef.current.rotation.y, state.mouse.x * 0.2, 0.1);
      } else {
        // When not hovered, it smoothly returns to its original rotation.
        imageRef.current.rotation.x = THREE.MathUtils.lerp(imageRef.current.rotation.x, 0, 0.1);
        imageRef.current.rotation.y = THREE.MathUtils.lerp(imageRef.current.rotation.y, 0, 0.1);
      }
    }
  });

  return (
    <group onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <Image
        ref={imageRef}
        url={imageUrl}
        scale={[5, 4, 1]}
        transparent
        opacity={0.9}
      />
      {/* This adds a soft, glowing backdrop effect on hover */}
      {hovered && (
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[6, 5]} />
          <meshBasicMaterial color="indigo" toneMapped={false} fog={false} />
        </mesh>
      )}
    </group>
  );
}


const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="relative group border border-gray-200/50 rounded-lg p-4 bg-white shadow-sm overflow-hidden"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-64 w-full cursor-pointer">
        <Canvas camera={{ fov: 15, position: [0, 0, 25] }}>
          <ambientLight intensity={1} />
          <ProductImage imageUrl={product.imageUrl} />
        </Canvas>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-500">${product.price.toFixed(2)}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => addToCart(product)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full transform scale-75 group-hover:scale-100 transition-transform"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
