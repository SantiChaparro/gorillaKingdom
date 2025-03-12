import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper'; // Importar Navigation correctamente desde 'swiper'

const ImageCarousel = ({ images }) => {
  return (
    <Swiper
    spaceBetween={1}
    slidesPerView={1}
    navigation={{ clickable: true }} 
    loop
     style={{width:'100%',height:'300px'}}
    >
      {images.map((url, index) => (
        <SwiperSlide key={index}>
          <img
            src={url}
            alt={`Image ${index}`}
            style={{ height: '100%', width: '100%', display:'flex' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;