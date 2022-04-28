import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useAppContext from '../context/useAppContext';

const Success = () => {
    const { user } = useAppContext();
    const { query } = useRouter();
    console.log(query);
    //llamar params de la url y llamar endpoint
    // method PATCH y enviar preffered_id, payment_id y status
    const handleData = async () => {
        const url = 'http://164.92.76.51:3000/payment';
        //-/-- ?collection_id=1247686373&collection_status=approved&payment_id=1247686373&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=4583091257&preference_id=1098669172-8afb42a3-565e-47a4-9ce4-f9a932352385&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    preference_id: `${query.preference_id}`,
                    payment_id: `${query.payment_id}`,
                    status: `${query.status}`,
                }),
            });
            const data = await response?.json();
            console.log('DATA SUCCESS', data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleData();
    }, []);

    // desp hacerlo laburar a DARI

    return <div>Tu compra fu existosa gracias RAton</div>;
};

export default Success;
