import React from "react";
import { motion } from "framer-motion";

const AnimatedNode = ({ x, y, value, currentNode }) => {
  return (
    <motion.g
      initial={false}
      animate={{ scale: currentNode === value ? 1.2 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.circle cx={x} cy={y} r={20} fill={currentNode === value ? "#e74c3c" : "#3498db"} />
      <text x={x} y={y + 5} fill="white" textAnchor="middle" fontSize="15px">
        {value}
      </text>
    </motion.g>
  );
};

export default AnimatedNode;
