import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrdersRow from './OrdersRow';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user?.email])

    const handleDelete = id => {
        const agree = window.confirm("Are you sure to cancel this order?");
        if (agree) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Order cancel successfully.');
                        const remaining = orders.filter(ordr=> ordr._id!== id);
                        setOrders(remaining);
                    }
                })
        }
    }

    const handleStatusUpdate = id=>{
        fetch(`http://localhost:5000/orders/${id}`,{
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'Approved'})
        })
        .then(res=>res.json())
        .then(data=> {
            console.log(data);
            if (data.modifiedCount){
                const remaining = orders.filter(ordr => ordr._id!==id);
                const approved = orders.find(ordr=>ordr._id ===id);
                approved.status= "Approved";
                const newOrders = [approved,...remaining];
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