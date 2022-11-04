import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const { _id, title, price } = useLoaderData();

    const handlePlaceOrder = event => {
        event.preventDefault();

        const form = event.target;
        const name = `${form.firstname.value} ${form.lastname.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            cutomer: name,
            email,
            phone,
            message
        }

        fetch('https://genius-car-server-one.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('Order place successfully.');
                    form.reset();
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='max-w-screen-xl mx-auto my-12'>
            <form onSubmit={handlePlaceOrder}>
                <h2>Service Name: {title}</h2>
                <p>Price: {price}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <input name='firstname' type="text" placeholder="First Name" className="input input-bordered w-full " />
                    <input name='lastname' type="text" placeholder="Last Name" className="input input-bordered w-full " />
                    <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered w-full " required />
                    <input name='email' type="text" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full " readOnly />
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full mt-6" placeholder="Your Message"></textarea>
                <input className='btn w-full bg-orange-600 hover:bg-orange-700 mt-6' type="submit" value="Order Confirm" />
            </form>
        </div>
    );
};

export default Checkout;