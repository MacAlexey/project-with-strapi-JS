import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "./types";
import Footer from "components/Footer/Footer";
import MusicPlayer from "components/MusicPlayer/MusicPlayer";
import PageHome from "app/(home)/MainPages/MyHomePage/page";
import PageArchive from "app/(archives)/archive/page";
import PageArchiveVideo from "app/(archives)/archive-3/page";
import PageArchiveAudio from "app/(archives)/archive-2/page";
import PageAuthor from "app/author/page";
import PageSingle from "app/(singles)/(default)/single/page";
import PageSingleTemplate2 from "app/(singles)/(default)/single-2/page";
import PageSingleTemplate3 from "app/(singles)/(has-sidebar)/single-3/page";
import PageSingleGallery from "app/(singles)/(default)/single-gallery/page";
import PageSingleAudio from "app/(singles)/(default)/single-audio/page";
import PageSingleVideo from "app/(singles)/(default)/single-video/page";
import PageSearch from "app/(search)/search/page";
import PageSearchV2 from "app/(search)/search-2/page";
import PageAbout from "app/about/page";
import PageContact from "app/(others)/contact/page";
import Page404 from "app/not-found";
import PageLogin from "app/(others)/login/MyLogIn/page";
import PageSignUp from "app/(others)/signup/MySingUp/page";
import PageForgotPass from "app/(others)/forgot-pass/page";
import PageSubcription from "app/(others)/subscription/page";
import PageHomeDemo2 from "app/(home)/home-2/page";
import PageHomeDemo3 from "app/(home)/home-3/page";
import PageHomeDemo4 from "app/(home)/home-4/page";
import PageHomeDemo6 from "app/(home)/home-6/page";
import SiteHeader from "app/SiteHeader/MySiteHeader/MySiteHeader";
import PageSingleTemplate4 from "app/(singles)/(has-sidebar)/single-4/page";
import DashboardSubmitPost from "app/(others)/dashboard/submit-post/page";
import DashboardPosts from "app/(others)/dashboard/posts/page";
import DashboardEditProfile from "app/(others)/dashboard/edit-profile2/page";
import DashboardSubcription from "app/(others)/dashboard/subscription/page";
import DashboardBilingAddress from "app/(others)/dashboard/billing-address/page";

//mine
import ArticlePage from "app/MyArticlePage/articlePage/page";
import MyAuthorPage from "app/MyAuthor/page";
import CategoryPage from "app/(archives)/MyCategory/page";
import { AuthProvider } from "app/authContext/authContextProps";
import ProtectedRoute from "app/authContext/protectedRoute";
import PublicRoute from "app/authContext/publicRoute";

export const pages: Page[] = [
  //My routers
  { path: "/article-1/*", component: ArticlePage },
  { path: "/author-1/*", component: MyAuthorPage },
  { path: "/category/*", component: CategoryPage },
  { path: "/login", component: PageLogin },
  { path: "/signup", component: PageSignUp },

  { path: "/author-1", component: MyAuthorPage, protected: true },

  { path: "/", component: PageHome },
  { path: "/", component: PageHome },
  { path: "/home-2", component: PageHomeDemo2 },
  { path: "/home-3", component: PageHomeDemo3 }, //page for not authorized users
  { path: "/home-4", component: PageHomeDemo4 },
  { path: "/home-6", component: PageHomeDemo6 },

  // archives page -------------------------------------------------------
  { path: "/archive/*", component: PageArchive },
  { path: "/archive-2/*", component: PageArchiveAudio },
  { path: "/archive-3/*", component: PageArchiveVideo },
  { path: "/author/*", component: PageAuthor },

  // single page -------------------------------------------------------
  { path: "/single/*", component: PageSingle },
  { path: "/single-2/*", component: PageSingleTemplate2 },
  { path: "/single-audio/*", component: PageSingleAudio },
  { path: "/single-video/*", component: PageSingleVideo },
  { path: "/single-gallery/*", component: PageSingleGallery },
  { path: "/single-3/*", component: PageSingleTemplate3 },
  { path: "/single-4/*", component: PageSingleTemplate4 },
  { path: "/single-5/*", component: PageSingleTemplate2 },

  // search -------------------------------------------------------
  { path: "/search", component: PageSearch },
  { path: "/search-2", component: PageSearchV2 },

  // other pages -------------------------------------------------------
  { path: "/about", component: PageAbout },
  { path: "/contact", component: PageContact },
  { path: "/page404", component: Page404 },
  // { path: "/login", component: PageLogin },
  // { path: "/singup", component: PageSignUp },
  { path: "/forgot-pass", component: PageForgotPass },
  { path: "/subscription", component: PageSubcription },
  { path: "/dashboard", component: DashboardSubmitPost },
  { path: "/dashboard/posts", component: DashboardPosts },
  { path: "/dashboard/edit-profile", component: DashboardEditProfile },
  { path: "/dashboard/subscription", component: DashboardSubcription },
  { path: "/dashboard/billing-address", component: DashboardBilingAddress },
  { path: "/dashboard/submit-post", component: DashboardSubmitPost },
];

const MyRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SiteHeader />

        <Routes>
          {pages.map(
            ({ component: Component, path, protected: isProtected }, index) => {
              if (isProtected) {
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <ProtectedRoute>
                        <Component />
                      </ProtectedRoute>
                    }
                  />
                );
              }

              if (path === "/login" || path === "/signup") {
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <PublicRoute>
                        <Component />
                      </PublicRoute>
                    }
                  />
                );
              }

              return <Route key={index} element={<Component />} path={path} />;
            }
          )}
          <Route element={<Page404 />} />
        </Routes>

        <Footer />
        <MusicPlayer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default MyRoutes;
