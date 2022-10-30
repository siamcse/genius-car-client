import React from 'react';
import img1 from '../../../assets/images/banner/1.jpg';
import img2 from '../../../assets/images/banner/2.jpg';
import img3 from '../../../assets/images/banner/3.jpg';
import img4 from '../../../assets/images/banner/4.jpg';
import img5 from '../../../assets/images/banner/5.jpg';
import img6 from '../../../assets/images/banner/6.jpg';
import BannerItem from './BannerItem';

const bannerData = [
    {
        img: img1,
        prev: 6,
        id: 1,
        next: 2
    },
    {
        img: img2,
        prev: 1,
        id: 2,
        next: 3
    },
    {
        img: img3,
        prev: 2,
        id: 3,
        next: 4
    },
    {
        img: img4,
        prev: 3,
        id: 4,
        next: 5
    },
    {
        img: img5,
        prev: 4,
        id: 5,
        next: 6
    },
    {
        img: img6,
        prev: 5,
        id: 6,
        next: 1
    }
]

const Banner = () => {
    return (
        <div className="carousel w-full mb-20">
            {
                bannerData.map(item=> <BannerItem
                    key={item.id}
                    slideItem= {item}
                ></BannerItem>)
            }
        </div>
    );
};

export default Banner;