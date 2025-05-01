import React from 'react'

const IconsCard = () => {
  return (
    <div>
        <div className="flex flex-wrap gap-4 justify-center">
  {/* Card 1 */}
  <div className="flex flex-col items-center bg-white rounded-xl shadow hover:shadow-md transition p-4 w-28">
    <img src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1713269877/Croma%20Assets/CMS/LP%20Page%20Banners/2024/Testing/Hybrid%20Homepage/16th%20April/Croma_Collections_aer8cq.png?tr=w-1000" alt=" smartphones" className="w-10 h-10 mb-2" />
    <span className="text-sm text-gray-700 text-center">Smartphones</span>
  </div>
  {/* Card 2 */}
  <div className="flex flex-col items-center bg-white rounded-xl shadow hover:shadow-md transition p-4 w-28">
    <img src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1713269877/Croma%20Assets/CMS/LP%20Page%20Banners/2024/Testing/Hybrid%20Homepage/16th%20April/Croma_Collections_aer8cq.png?tr=w-1000" alt=" laptops" className="w-10 h-10 mb-2" />
    <span className="text-sm text-gray-700 text-center">Laptops</span>
  </div>
  {/* Card 3 */}
  <div className="flex flex-col items-center bg-white rounded-xl shadow hover:shadow-md transition p-4 w-28">
    <img src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1713269877/Croma%20Assets/CMS/LP%20Page%20Banners/2024/Testing/Hybrid%20Homepage/16th%20April/Croma_Collections_aer8cq.png?tr=w-1000" alt=" accessories" className="w-10 h-10 mb-2" />
    <span className="text-sm text-gray-700 text-center">Accessories</span>
  </div>
  {/* Add more cards as needed */}
</div>

    </div>
  )
}

export default IconsCard