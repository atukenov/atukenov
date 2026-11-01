import { motion } from "framer-motion";

//variants
const stairAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
};

const reverseIndex = (index: number) => {
  const totalSteps = 6;
  return totalSteps - index - 1;
};

// neon bars wipe the screen between routes
const barColors = [
  "bg-accent-default",
  "bg-neon-cyan",
  "bg-accent-default",
  "bg-neon-magenta",
  "bg-accent-default",
  "bg-neon-cyan",
];

const Stairs = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => {
        return (
          <motion.div
            key={index}
            variants={stairAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: reverseIndex(index) * 0.1,
            }}
            className={`h-full w-full relative ${barColors[index]}`}
          />
        );
      })}
    </>
  );
};

export default Stairs;
