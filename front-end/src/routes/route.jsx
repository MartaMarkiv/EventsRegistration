import {createBrowserRouter} from "react-router-dom";
import Events from "../pages/events/Events";
import Registration from "../pages/registration/Registration";
import Participants from "../pages/participants/Participants";
import { MAIN_ROUTE, REGISTRATION_ROUTE, PARTICIPANTS_ROUTE } from "./routes";
import { fetchParticipants } from "../api/requests";

const router = createBrowserRouter([
  {
    path: MAIN_ROUTE,
    element: <Events />
  },
  {
    path: `${REGISTRATION_ROUTE}/:eventId`,
    element: <Registration />
  },
  {
    path: `${PARTICIPANTS_ROUTE}/:eventId`,
    element: <Participants />,
    loader: ({ params }) => fetchParticipants(params.eventId)
  }
]);

export default router;
