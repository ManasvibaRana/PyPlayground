// import React, { useRef, useState, useEffect } from 'react';

// export default function FaceTester() {
//   const [faces, setFaces] = useState([]);
//   const [isTesting, setIsTesting] = useState(false);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const intervalRef = useRef(null);

//   const startTesting = () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         setIsTesting(true);
//         setTimeout(() => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         }, 100);
//         intervalRef.current = setInterval(captureFrame, 1000);
//       })
//       .catch(err => console.error('Camera error:', err));
//   };

//   const stopTesting = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     clearInterval(intervalRef.current);
//     setIsTesting(false);
//     setFaces([]);
//   };

//   const captureFrame = () => {
//     if (!videoRef.current) return;
//     const canvas = document.createElement('canvas');
//     canvas.width = 640;
//     canvas.height = 480;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     canvas.toBlob(sendFrame, 'image/jpeg');
//   };

//   const sendFrame = async (blob) => {
//     const formData = new FormData();
//     formData.append('frame', blob);

//     const res = await fetch('http://localhost:8000/facereco/recognize_live/', {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await res.json();
//     setFaces(data.faces || []);
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext('2d');
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     faces.forEach(face => {
//       const { top, right, bottom, left, name } = face;
//       ctx.strokeStyle = 'lime';
//       ctx.lineWidth = 2;
//       ctx.strokeRect(left, top, right - left, bottom - top);

//       ctx.fillStyle = 'lime';
//       ctx.font = '16px Arial';
//       ctx.fillText(name || 'Unknown', left, top - 10);
//     });
//   }, [faces]);

//   useEffect(() => {
//     return () => {
//       stopTesting();
//     };
//   }, []);

//   return (
//     <div>
//       {!isTesting && (
//         <button
//           onClick={startTesting}
//           className="bg-green-600 px-4 py-2 rounded text-white mb-4"
//         >
//           Start Test (Open Webcam)
//         </button>
//       )}

//       {isTesting && (
//         <div style={{ position: 'relative', width: 640, height: 480 }}>
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             width="640"
//             height="480"
//             style={{ position: 'absolute', top: 0, left: 0 }}
//           />
//           <canvas
//             ref={canvasRef}
//             width="640"
//             height="480"
//             style={{ position: 'absolute', top: 0, left: 0 }}
//           />
//           <button
//             onClick={stopTesting}
//             style={{
//               position: 'absolute',
//               top: 10,
//               right: 10,
//               zIndex: 2,
//               background: 'red',
//               color: 'white',
//               padding: '8px 12px',
//               borderRadius: '4px',
//             }}
//           >
//             Stop Test
//           </button>
//         </div>
//       )}

//       {isTesting && (
//         <div className="mt-4 text-white">
//           <h3 className="text-lg font-semibold">Detected Faces:</h3>
//           {faces.length > 0 ? (
//             <ul>
//               {faces.map((face, idx) => (
//                 <li key={idx}>{face.name || 'Unknown'}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>No face detected</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
