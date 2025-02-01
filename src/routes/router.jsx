import { createBrowserRouter } from "react-router-dom";

import BasketDetail from "../pages/basket-detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasketDetail />,
  },
]);

export default router;
