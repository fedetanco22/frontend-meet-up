import { useTranslations } from 'next-intl';
import router from 'next/router';
import { useState } from 'react';
import { Button, Layout } from '../components';
import useAppContext from '../context/useAppContext';

const Checkout = () => {
    const { courseCart, user } = useAppContext();
    const t = useTranslations('checkout');
    console.log('object USER', user);

    const handleCheckoutButton = async () => {
        const url = 'http://164.92.76.51:3000/payment';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ schedule_id: `${courseCart.schedule_id}` }),
            });
            const data = await response.json();
            router.push(
                'https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1098669172-8afb42a3-565e-47a4-9ce4-f9a932352385'
            );
        } catch (error) {
            console.log(error);
        }

        // llamar el endpoint /payment
        //devuelve un objeto en url con el id_mp y el url
        //mandar el schedule_id en el body
        // redirect a la url loctaion.push(url) esto va a mercadopago
        // 3 paginas en el front SUCCESS, FAILED y PENDING
    };
    return (
        <Layout>
            <div>{courseCart?.course.price}</div>
            <Button
                text={t('button')}
                asSubmit
                callback={handleCheckoutButton}
                buttonType='blue_small'
            />
        </Layout>
    );
};

export default Checkout;

export function getStaticProps({ locale }) {
    return {
        props: {
            // You can get the messages from anywhere you like, but the recommended
            // pattern is to put them in JSON files separated by language and read
            // the desired one based on the `locale` received from Next.js.
            messages: require(`../lang/${locale}.json`),
        },
    };
}

/* import { useState } from 'react';
import useAppContext from '../context/useAppContext';

const Checkout = ({ item }) => {
    const handleCheckoutButton = async () => {
        const url = 'http://164.92.76.51:3000/payment';
        const response = await fetch(url, {
            method: 'POST',
            headers: { Authorization: `Bearer ${user.token}` },
            body: `${item.schedule_id}`,
        });
        // llamar el endpoint /payment
        //devuelve un objeto en url con el id_mp y el url
        //mandar el schedule_id en el body
        // redirect a la url loctaion.push(url) esto va a mercadopago
    };
    return (
        <div>
            <div>Checkout</div>
        </div>
    );
};

export default Checkout; */
