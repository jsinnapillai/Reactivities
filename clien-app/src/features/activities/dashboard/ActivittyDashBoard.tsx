import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponenet from "../../../app/layout/LoadingComponenet";
import ActivityFilter from "./ActivityFilter";

const ActivittyDashBoard = () => {
  const { activityStore } = useStore();

  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry, loadActivities]);

  if (activityStore.loadingInitial)
    return <LoadingComponenet content="Loading App" />;

  return (
    <Grid>
      <Grid.Column width="10">{<ActivityList />}</Grid.Column>
      <Grid.Column width="6">
        <ActivityFilter />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivittyDashBoard);
