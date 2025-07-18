// import React, { useState } from 'react';

// export default function FaceTrainer({ onTrainComplete }) {
//   const [name, setName] = useState('');
//   const [files, setFiles] = useState([]);
//   const [status, setStatus] = useState('');
//   const [isTraining, setIsTraining] = useState(false);

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!name || files.length === 0) {
//       setStatus('❌ Please enter a name and select images.');
//       return;
//     }

//     setIsTraining(true);
//     setStatus('⏳ Training in progress...');

//     const formData = new FormData();
//     formData.append('name', name);
//     for (let i = 0; i < files.length; i++) {
//       formData.append('images', files[i]);
//     }

//     try {
//       const res = await fetch('http://localhost:8000/facereco/upload/', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.message && data.message.toLowerCase().includes('done')) {
//         setStatus('✅ Training complete!');
//         onTrainComplete();
//       } else {
//         setStatus(`⚠️ ${data.error || data.message}`);
//       }
//     } catch (err) {
//       setStatus('❌ Something went wrong.');
//     } finally {
//       setIsTraining(false);
//     }
//   };

//   return (
//     <div className="mb-6">
//       <form onSubmit={handleUpload} className="flex flex-col gap-2">
//         <input
//           className="text-black px-2 py-1 rounded"
//           type="text"
//           placeholder="Enter Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           className="text-black px-2 py-1 rounded"
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={(e) => setFiles(e.target.files)}
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 px-4 py-2 rounded text-white"
//           disabled={isTraining}
//         >
//           Upload & Train
//         </button>
//         {isTraining && (
//           <div className="flex items-center gap-2 mt-2">
//             <div className="loader"></div>
//             <span>Training your model...</span>
//           </div>
//         )}
//         <p className="mt-2">{status}</p>
//       </form>
//     </div>
//   );
// }
