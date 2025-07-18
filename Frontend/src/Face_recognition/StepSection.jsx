// // StepSection.jsx
// import React from "react";
// import { motion } from "framer-motion";

// export default function StepSection({ stepNumber, title, description, image, children }) {
//   return (
//     <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-8 py-12 gap-8">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="max-w-lg"
//       >
//         <h2 className="text-4xl font-bold mb-4 text-neon">
//           {stepNumber}. {title}
//         </h2>
//         <p className="text-gray-300 mb-4">{description}</p>
//         {children}
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         {image && (
//           <img src={image} alt={title} className="w-full max-w-md rounded-lg shadow-lg" />
//         )}
//       </motion.div>
//     </section>
//   );
// }
