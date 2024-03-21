import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useState } from 'react';
import useSwipe from "./useSwipe"

export default function Slider(images: StaticImageData[]) {
  const [image_view, setImage_view] = useState(0);

  const Mini_image_displayer = () => {
    return (
      <div>
        {images.map((image: StaticImageData, index: number) => (
          <div
            className={`mb-2 w-[200px] ${
              index === image_view && 'border-2 border-black'
            }
        `}
            key={index}
            onClick={() => setImage_view(index)}
          >
            <Image src={image} alt='plant image' />
          </div>
        ))}
      </div>
    );
  };

  const Image_dots_selector = () => {
    return (
      <div>
        {images.map((pic, index) => (
          <div
            className={`h-5 w-5 rounded-full mr-2 ${
              index === image_view ? 'bg-aloe_green' : 'bg-aloe_white border-2 '
            }`}
            onClick={() => setImage_view(index)}
          ></div>
        ))}
      </div>
    );
  };

  const Display_image = () => {
    const swipeHandlers = useSwipe({
      onSwipedLeft: () => {
        if (image_view < images.length - 1) {
          console.log(images.length);

          setImage_view((previous) => previous + 1);
        }
        console.log('left');
      },
      onSwipedRight: () => {
        if (image_view !== 0) {
          setImage_view((previous) => previous - 1);
        }
        console.log('right');
      },
    });
    return (
      <div
        className='bg-aloe_light_green h-[60vh] sm:h-[70vh] md:h-[100vh] overflow-hidden'
        {...swipeHandlers}
      >
        <Image
          src={images[image_view]}
          alt='plant image'
          className='h-full w-full object-cover object-center'
        />
      </div>
    );
  };

  return {
    Mini_image_displayer,
    Image_dots_selector,
    Display_image,
  };
}
