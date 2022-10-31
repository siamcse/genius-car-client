import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const ServiceCard = ({service}) => {
    const {title, img,price} = service;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl border-8">
            <figure><img className='h-64' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className='text-xl font-semibold text-orange-600'>Price: ${price}</p>
                <div className="card-actions justify-end">
                    <button className="p-2 transform ease-in-out duration-300 hover:translate-x-2">
                        <FaArrowRight className='text-orange-600 text-2xl'></FaArrowRight>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;