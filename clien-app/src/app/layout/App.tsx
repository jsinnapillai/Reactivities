import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivittyDashBoard from "../../features/activities/dashboard/ActivittyDashBoard";
import LoadingComponenet from "./LoadingComponenet";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponenet content="Loading App" />;

  return (
    <React.Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivittyDashBoard />
      </Container>
    </React.Fragment>
  );
}

export default observer(App);
