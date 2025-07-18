// import React, { useState } from 'react';
// import FaceInfo from './FaceInfo';
// import FaceTrainer from './FaceTrainer';
// import FaceTester from './FaceTester';
// import '../App.css';

// export default function FaceMain() {
//   const [isTrained, setIsTrained] = useState(false);

//   return (
//     <div className="p-8 bg-gray-900 min-h-screen">
//       <FaceInfo />
//       {!isTrained && (
//         <FaceTrainer onTrainComplete={() => setIsTrained(true)} />
//       )}
//       {isTrained && (
//         <FaceTester />
//       )}

//       {/* Spinner style once for all */}
//       <style>{`
//         .loader {
//           border: 4px solid #f3f3f3;
//           border-top: 4px solid #4B8BBE;
//           border-radius: 50%;
//           width: 20px;
//           height: 20px;
//           animation: spin 1s linear infinite;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg);}
//           100% { transform: rotate(360deg);}
//         }
//       `}</style>
//     </div>
//   );
// }
