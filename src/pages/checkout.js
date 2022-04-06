import { useState } from 'react';
import { Layout } from '../components';
import useAppContext from '../context/useAppContext';

const Checkout = () => {
    const { product } = useAppContext();
    console.log('🚀 ~ file: checkout.js ~ line 6 ~ Checkout ~ products', product);

    return (
        <Layout>
            <div>{product.price}</div>
        </Layout>
    );
};

export default Checkout;
