import { Suspense, lazy } from "react";
import { useRoutes, useLocation } from "react-router-dom";

import Loading from "components/Loading";
import Home from "pages/Home";


const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Home/>,
    },
  ]);
}

// IMPORT COMPONENTS
