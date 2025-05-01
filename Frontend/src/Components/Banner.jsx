import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Banner = () => {
const arr = [
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746332/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Mobile_sdtrdf.png?tr=w-720",
    path: "/mobile",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746346/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/TV_vdemgc.png?tr=w-720",
    path: "/television",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746308/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Air_Conditioner_a4hg1z.png?tr=w-720",
    path: "/air-conditioner",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1739259222/Croma%20Assets/CMS/LP%20Page%20Banners/2025/LP_Cooler_ak2tjf.png?tr=w-720",
    path: "/coolers",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746331/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Laptops_pzewpv.png?tr=w-720",
    path: "/laptops",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746312/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Head_set_xjj934.png?tr=w-720",
    path: "/headphones-earphones",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1726131595/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Sept/Water_Purifiers_Desktop_phji31.png?tr=w-720",
    path: "/water-purifiers",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746333/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Ref_biysg7.png?tr=w-720",
    path: "/refrigerators",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746308/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Accessories_kefony.png?tr=w-720",
    path: "/accessories",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746346/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Washing_machines_izyrnd.png?tr=w-720",
    path: "/washing-machines",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746345/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Tablets_yzod4f.png?tr=w-720",
    path: "/tablets",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1718616448/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/June/17th/Desktop/Wearables_iunu7h.png?tr=w-720",
    path: "/wearables",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746312/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Kitchen_Appliances_yhzevo.png?tr=w-720",
    path: "/kitchen-appliances",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746311/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Home_theatres_kpwvft.png?tr=w-720",
    path: "/home-theatres",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746310/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Grooming_vvxudd.png?tr=w-720",
    path: "/grooming",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1718616447/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/June/17th/Desktop/Microwaves_otd6qq.png?tr=w-720",
    path: "/microwaves",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1718616447/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/June/17th/Desktop/Speaker_g2mbgn.png?tr=w-720",
    path: "/speakers",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1718616445/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/June/17th/Desktop/Cameras_a6n2jy.png?tr=w-720",
    path: "/cameras",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746309/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Fans_ecnoxj.png?tr=w-720",
    path: "/fans",
  },
  {
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1726907827/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Sept/D_Geyser_i5frr1.png?tr=w-720",
    path: "/geyser",
  },
];


  return (
    <div>
      <section className="relative bg-gradient-to-r from-indigo-50 to-white overflow-hidden">
        <div className="w-full flex mx-auto   gap-8">
          <Carousel
            autoPlay
            infiniteLoop
            swipeable={true}
            showStatus={false}
            interval={2000}
            showThumbs={false}
          >
            <div>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1745298309/Croma%20Assets/CMS/LP%20Page%20Banners/2025/Sanity/HP/April/22042025/HP_Rotating_iPhone_22April2025_jb5uq5.jpg"
                className="w-full shadow-lg"
              />
            </div>
            <div>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1745298307/Croma%20Assets/CMS/LP%20Page%20Banners/2025/Sanity/HP/April/22042025/HP_Rotating_AC_22April2025_ydtw8w.jpg"
                className="w-full  shadow-lg"
              />
            </div>
            <div>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1745236456/Croma%20Assets/CMS/LP%20Page%20Banners/2025/HP%20Rotating%20Banners/April/22042025/Desktop/HP_Rotating_TV_22April2025_eyrayi.jpg"
                className="w-full shadow-lg"
              />
            </div>
            <div>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1745236455/Croma%20Assets/CMS/LP%20Page%20Banners/2025/HP%20Rotating%20Banners/April/22042025/Desktop/HP_Rotating_sony_22April2025_jltpfp.jpg"
                className="w-full shadow-lg"
              />
            </div>
            <div>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1745298308/Croma%20Assets/CMS/LP%20Page%20Banners/2025/Sanity/HP/April/22042025/HP_Rotating_AD_22April2025_qj6ewu.jpg"
                className="w-full shadow-lg"
              />
            </div>
            <div>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1745298308/Croma%20Assets/CMS/LP%20Page%20Banners/2025/Sanity/HP/April/22042025/HP_Rotating_Acc_22April2025_fsseln.jpg"
                className="w-full shadow-lg"
              />
            </div>
          </Carousel>
        </div>
      </section>

      <div className="relative bg-black py-8 px-12 sm:px-10 md:px-15 lg:px-28 overflow-hidden">
        {/* Custom Navigation Buttons */}
        <div
          className="absolute left-2 sm:left-4 lg:left-10 top-1/2 transform -translate-y-1/2 z-10"
          id="swiper-prev"
        >
          <button className="text-white text-3xl">&#10094;</button>
        </div>
        <div
          className="absolute right-2 sm:right-4 lg:right-10 top-1/2 transform -translate-y-1/2 z-10"
          id="swiper-next"
        >
          <button className="text-white text-3xl">&#10095;</button>
        </div>

        <Swiper
          navigation={{
            nextEl: "#swiper-next",
            prevEl: "#swiper-prev",
          }}
          modules={[Navigation]}
          spaceBetween={-10}
          speed={700}
          breakpoints={{
            320: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: -5,
            },
            480: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: -5,
            },
            640: {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: -5,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 2,
              spaceBetween: -28,
            },
            1024: {
              slidesPerView: 6,
              slidesPerGroup: 3,
              spaceBetween: -10,
            },
            1280: {
              slidesPerView: 8,
              slidesPerGroup: 4,
              spaceBetween: -10,
            },
          }}
          className="mySwiper"
        >
          {arr.map((item, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <Link to={item.path}>
                <img
                  src={item.image}
                  alt=""
                  className="w-[100px] sm:w-[120px] md:w-[140px] h-[100px] object-contain rounded"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Banner