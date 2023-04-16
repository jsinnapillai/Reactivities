import React from "react";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  return (
    <React.Fragment>
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src="/assets/user.png" />
              <Item.Content>
                <Item.Header as={Link} to={`/activities/${activity.id}`}>
                  {activity.title}
                </Item.Header>
                <Item.Description>Hosted by Jay</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />
            {activity.date}
            <Icon name="marker" />
            {activity.venue}
          </span>
        </Segment>
        <Segment secondary>Attendies go here</Segment>
      </Segment.Group>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="view"
        />
      </Segment>
    </React.Fragment>
  );
};

export default ActivityListItem;
