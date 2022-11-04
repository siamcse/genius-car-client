import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://genius-car-server-one.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div>
            <div className='w-1/2 mx-auto text-center mb-12'>
                <p className='text-xl font-bold text-orange-700'>Services</p>
                <h2 className='text-5xl font-bold'>Our Service Area</h2>
                <p>The majority have suffered alteration in some form, by injected humour, or randomised Words which don't look even slightly believable. </p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
            <div className="text-center my-12">
                <button className="btn btn-outline btn-warning">More Services</button>
            </div>
        </div>
    );
};

export default Services;