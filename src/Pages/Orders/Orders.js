import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrdersRow from './OrdersRow';

const Orders = () => {
    const { user, logOut } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`https://genius-car-server-one.vercel.app/orders?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json()
            })
            .then(data => {
                setOrders(data)
            })
    }, [user?.email, logOut])

    const handleDelete = id => {
        const agree = window.confirm("Are you sure to cancel this order?");
        if (agree) {
            fetch(`https://genius-car-server-one.vercel.app/orders/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Order cancel successfully.');
                        const remaining = orders.filter(ordr => ordr._id !== id);
                        setOrders(remaining);
                    }
                })
        }
    }

    const handleStatusUpdate = id => {
        fetch(`https://genius-car-server-one.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    const remaining = orders.filter(ordr => ordr._id !== id);
                    const approved = orders.find(ordr => ordr._id === id);
                    approved.status = "Approved";
                    const newOrders = [approved, ...remaining];
                    setOrders(newOrders);
                    alert('Your order is approved.')
                }
            })
    }
    return (
        <div className='max-w-screen-xl mx-auto my-12'>
            <h2 className="text-4xl">You have {orders.length} orders.</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrdersRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrdersRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;