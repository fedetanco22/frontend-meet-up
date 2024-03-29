import {useState, useEffect} from "react";
import {useTranslations} from "next-intl";

import router from "next/router";
import axios from "axios";
import {LayoutPanel, TitlePanel, Card, Loading, CourseEdit} from "../components";
import useAppContext from "../context/useAppContext";

// import styles from "../styles/Setup.module.scss";

const AddCourse = () => {
  const t = useTranslations("addCourse");
  const {user, getUser} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user !== null) {
      if (user?.data?.role !== "Administrator") {
        router.push("/dashboard");
      } else {
      }
    } else {
      router.push("/");
    }
  }, []);

  const child = {
    path: "../all-courses",
    name: t("child"),
  };

  return (
    <LayoutPanel pageTitle={t("title")}>
      {isLoading && <Loading />}
      <div>
        <TitlePanel title={t("title")} child={child} />
        <CourseEdit edit={false}/>
      </div>
    </LayoutPanel>
  );
};

export default AddCourse;

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
