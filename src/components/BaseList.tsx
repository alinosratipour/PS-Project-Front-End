// // BaseList.tsx
// import React, { useState, useEffect } from "react";
// import { useQuery } from "@apollo/client";
// import { GET_ALL_SIZES_WITH_RELATED_BASES } from "../queries/queries";
// import BaseRadioButtons from "./BaseRadioButtons";

// interface BaseListProps {
//   onBaseChange: (base: string, price: number) => void; // Pass both base and price
//   selectedBase: string | undefined;
//   selectedSize: number;
// }

// type BaseWithPrice = {
//   base: string;
//   price: number;
//   id_base: number;
// };

// type SizeWithRelatedBases = {
//   bases: BaseWithPrice[];
// };

// const BaseList: React.FC<BaseListProps> = ({ onBaseChange, selectedSize }) => {
//   const { loading, error, data } = useQuery(GET_ALL_SIZES_WITH_RELATED_BASES);
//   const [availableBases, setAvailableBases] = useState<
//     { base: string; price: number }[]
//   >([]);

//   // Watch for changes in selectedSize and update available bases
//   useEffect(() => {
//     if (!data || selectedSize === undefined) return;
//     const selectedSizeData = data.getSizesWithBases.find(
//       (sizeWithBases: SizeWithRelatedBases) =>
//         sizeWithBases.bases.some(
//           (base: BaseWithPrice) => base.id_base === selectedSize
//         )
//     );

//     if (selectedSizeData) {
//       const bases = selectedSizeData.bases.map((base: BaseWithPrice) => ({
//         base: base.base,
//         price: base.price,
//       }));
//       setAvailableBases(bases);
//     }
//   }, [data, selectedSize]);



//   if (loading) return <p>Loading bases...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Select a Base</h1>
//     <BaseRadioButtons bases={availableBases} onBaseChange={onBaseChange} selectedSize={selectedSize}/>
//     </div>
//   );
// };

// export default BaseList;
