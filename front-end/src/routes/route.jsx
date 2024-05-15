import {createBrowserRouter} from "react-router-dom";
import Events from "../pages/events/Events";
import Registration from "../pages/registration/Registration";
import { MAIN_ROUTE, REGISTRATION_ROUTE } from "./routes";

const router = createBrowserRouter([
  {
    path: MAIN_ROUTE,
    element: <Events />
  },
  {
    path: `${REGISTRATION_ROUTE}/:eventId`,
    element: <Registration />
  }
]);

export default router;
