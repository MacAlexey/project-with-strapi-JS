import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../authContext/authContextProps";
import HeaderLogged from "components/Header/HeaderLogged";
import Header2 from "components/Header/Header2";

const SiteHeader = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  {
    /*Если Юзер не авторизировался мы перекидываем его на home-3 (для не авторизированных) Header тоже меняется */
  }
  useEffect(() => {
    if (!user && pathname === "/") {
      navigate("/home-3", { replace: true }); // Redirecting an unregistered user to unauthorized users's page
    } else if (user && pathname === "/home-3") {
      navigate("/", { replace: true }); // if an authorized user visits the page for unauthorized users, he is redirected to the main page
    }
  }, [user, pathname, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const headerComponent = user ? <HeaderLogged /> : <Header2 />; //Header choose for auth and unAuth users

  return <>{headerComponent}</>;
};

export default SiteHeader;
