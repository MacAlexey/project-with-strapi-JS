import React, { useEffect, useMemo } from "react";
import HeaderLogged from "components/Header/HeaderLogged";
import Header from "components/Header/Header";
import Header2 from "components/Header/Header2";
import { useLocation } from "react-router-dom";

const SiteHeader = () => {
  let pathname = useLocation().pathname;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const headerComponent = useMemo(() => {
    let HeadComponent = HeaderLogged;

    switch (pathname) {
      case "/home-2":
        HeadComponent = Header;
        break;
      case "/home-3":
        HeadComponent = Header2;
        break;

      default:
        break;
    }

    return <HeadComponent />;
  }, [pathname]);

  return <>{headerComponent}</>;
};
export default SiteHeader;
