import React from "react";
import { useTranslation } from "react-i18next";
import "./translations/i18n";
 
const ExampleComponent = () => {
const { t } = useTranslation();
 
 return (
   <div>
      <p>
        {t("welcome")}
      </p>
   </div>
 );
};

export default ExampleComponent;