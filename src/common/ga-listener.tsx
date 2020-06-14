// // https://github.com/react-ga/react-ga/issues/122#issuecomment-521781395

// import { useEffect } from "react";
// import ReactGA from "react-ga";
// import { withRouter, RouteComponentProps } from "react-router";
// import { Location, LocationListener, UnregisterCallback } from "history";
// import { isProd } from "./get-env";

// const sendPageView: LocationListener = (location: Location): void => {
//   ReactGA.set({ page: location.pathname });
//   ReactGA.pageview(location.pathname);
// };

// type Props = RouteComponentProps & {
//   readonly children: JSX.Element;
//   readonly trackingId?: string;
// };
// const GAListener = ({ children, trackingId, history }: Props): JSX.Element => {
//   useEffect((): UnregisterCallback | void => {
//     if (trackingId && isProd()) {
//       ReactGA.initialize(trackingId);
//       sendPageView(history.location, "REPLACE");
//       return history.listen(sendPageView);
//     }
//   }, [history, trackingId]);

//   return children;
// };

// // eslint-disable-next-line import/no-default-export
// export default withRouter(GAListener);
