import {useRouter} from "next/router";
import React, {useEffect} from "react";
import useAppContext from "../context/useAppContext";
import {Button, Layout, Card, TitlePanel} from "../components";
import {useTranslations} from "next-intl";
import {FaCheckCircle, FaExclamationCircle, FaTimesCircle} from "react-icons/fa";
import styles from "../styles/OrderPage.module.scss";
const Success = () => {
  const t = useTranslations("checkout");
  const {user, courseCart} = useAppContext();
  const {query} = useRouter();
  console.log(query, 'resp');
  //llamar params de la url y llamar endpoint
  // method PATCH y enviar preffered_id, payment_id y status
  const handleData = async () => {
    const url = "http://164.92.76.51:3000/payment";
    //-/-- ?collection_id=1247686373&collection_status=approved&payment_id=1247686373&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=4583091257&preference_id=1098669172-8afb42a3-565e-47a4-9ce4-f9a932352385&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          preference_id: `${query.preference_id}`,
          payment_id: `${query.payment_id}`,
          status: `${query.status}`,
        }),
      });
      const data = await response?.json();
      console.log("DATA SUCCESS", data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleData();
  }, []);

  // desp hacerlo laburar a DARI

  return (
    <Layout>
      <div className="container py-5">
        <Card>
          <div className="p-4 pb-0">
            <TitlePanel title="Estado de la compra" />
            <div className={styles.statusIcon}>
                {query?.status === 'approved' && <FaCheckCircle className={styles.approved}/>}
                {query?.status === 'pending' && <FaExclamationCircle className={styles.pending}/>}
                {query?.status === 'failure' && <FaTimesCircle className={styles.failure}/>}
            </div>
            <h5 className="pt-3">{t("subtitle")}</h5>
            <table className="table responsive">
              <thead>
                <tr>
                  <th scope="col">{t("table.course")}</th>
                  <th scope="col">{t("table.schedule")}</th>
                  <th scope="col" className="text-end">
                    {t("table.status")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{courseCart?.course.title}</td>
                  <td>{courseCart?.schedules.filter((i) => i.schedule_id === courseCart?.schedule_id)[0].title}</td>
                  <td className="text-end">{query?.status}</td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              
              {query?.status === 'approved' && <Button text={t("coursesButton")} path={'/my-courses'} asLink buttonType="blue_small" />}
              {(query?.status === 'failure' || query?.status === 'pending') && <Button text={t("retryButton")} path={'/checkout'} asLink buttonType="blue_small" />}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Success;

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
