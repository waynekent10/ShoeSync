// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import SneakerCard from '../../components/SneakerCard';

// export default function ViewColorway() {
//   const [colorway, setColorway] = useState({});
//   const router = useRouter();

//   const { firebaseKey } = router.query;
//   const viewOtherColors = () => {
//     viewSneakerColors(firebaseKey).then(setColorway);
//   };
//   useEffect(() => {
//     viewSneakerColors(firebaseKey).then(setColorway);
//   }, [firebaseKey]);
//   return (
//     <>
//       <div className="mt-5 d-flex flex-wrap">
//         <div className="d-flex flex-column">
//           <img src={colorway.image} alt={colorway.nickname} style={{ width: '300px' }} />
//         </div>

//         <div className="text-white ms-5 details">
//           <h5>{colorway.nickname}</h5>
//           <h5>{colorway.primary_color}</h5>
//           <p>{colorway.secondary_color}</p>
//         </div>
//       </div>
//       <hr />
//       <div className="d-flex flex-wrap">
//         {colorway.sneakers?.map((color) => (
//           <SneakerCard key={color.firebaseKey} colorObj={color} onUpdate={viewOtherColors} />
//         ))}
//       </div>
//     </>
//   );
// }
