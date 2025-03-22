import React, { useContext } from "react";
import BreamCrumb from "../components/Global/breadcrumb/BreamCrumb";
import AboutHero from "../components/about/AboutHero";
import OurMission from "../components/about/OurMission";
import AboutQuota from "../components/about/AboutQuota";
import AboutWho from "../components/about/AboutWho";
import OurCommunity from "../components/about/OurCommunity";
import { LanguageContext } from "../context/LanguageProvider";

const About = () => {
  const {t} = useContext(LanguageContext);
  return (
    <div className="about-page">
      <BreamCrumb />
      <div className="about-title">
        <h3>{t("about.head")}</h3>
      </div>
      <AboutHero />
      <OurMission />
      <AboutQuota />
      <AboutWho />
      <OurCommunity />
    </div>
  );
};

export default About;
