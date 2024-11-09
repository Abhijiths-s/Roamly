// ScrollReveal.js
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ScrollReveal = ({ children, delay = 0, y = 50 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
