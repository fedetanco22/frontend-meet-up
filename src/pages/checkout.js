import {useTranslations} from "next-intl";
import router from "next/router";
import {useState} from "react";
import {Button, Layout, Card, TitlePanel} from "../components";
import useAppContext from "../context/useAppContext";

const Checkout = () => {
  const {courseCart, user} = useAppContext();
  const t = useTranslations("checkout");
  console.log("object cart", courseCart);

  const handleCheckoutButton = async () => {
    const url = "http://164.92.76.51:3000/payment";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({schedule_id: `${courseCart.schedule_id}`}),
      });
      const data = await response.json();
      router.push("https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1098669172-8afb42a3-565e-47a4-9ce4-f9a932352385");
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
      <div className="container py-5">
        <Card>
          <div className="p-4 pb-0">
            <TitlePanel title="Checkout" />
            <h5 className="pt-3">{t("subtitle")}</h5>
            <table className="table responsive">
              <thead>
                <tr>
                  <th scope="col">{t("table.course")}</th>
                  <th scope="col">{t("table.schedule")}</th>
                  <th scope="col" className="text-end">{t("table.price")}</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>{courseCart?.course.title}</td>
                      <td>{(courseCart?.schedules.filter((i)=> i.schedule_id === courseCart?.schedule_id)[0].title)}</td>
                      <td className="text-end">{courseCart?.course.price}</td>
                  </tr>
              </tbody>
            </table>
            <h5 className="pt-3">{t("subtitle2")}</h5>
            <p>{t("description")}</p>

           <div className="d-flex justify-content-end">
           <Button text={t("button")} asSubmit callback={handleCheckoutButton} buttonType="blue_small" />
            </div>
            
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Checkout;

export function getStaticProps({locale}) {
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
