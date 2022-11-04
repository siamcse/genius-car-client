import React, { useEffect, useState } from 'react';

const OrdersRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, service, serviceName, cutomer, phone, price, message, status } = order;
    const [orderService, setOrderService] = useState({});

    useEffect(() => {
        fetch(`https://genius-car-server-one.vercel.app/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
    }, [service])


    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-outline btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-28 h-24">
                            {
                                orderService?.img &&
                                <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{cutomer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">${price}</span>
            </td>
            <td><button onClick={() => handleStatusUpdate(_id)} className='btn btn-ghost btn-sm'>{status ? status : "Pending"}</button></td>
            <th>
                <p className="font-normal">{message}</p>
            </th>
        </tr>
    );
};

export default OrdersRow;