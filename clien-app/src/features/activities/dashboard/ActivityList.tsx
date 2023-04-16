import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import React from "react";

const ActivityList = () => {
  const { activityStore } = useStore();
  const { GroupedActivities } = activityStore;

  return (
    <>
      {GroupedActivities.map(([group, activities]) => {
        return (
          <React.Fragment key={group}>
            <Header sub color="teal">
              {group}
            </Header>
            {activities.map((activity) => {
              return <ActivityListItem key={activity.id} activity={activity} />;
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default observer(ActivityList);
