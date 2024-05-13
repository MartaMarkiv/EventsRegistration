import {createBrowserRouter} from "react-router-dom";
import Events from "../pages/events/Events";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Events />
  }
]);

export default router;
