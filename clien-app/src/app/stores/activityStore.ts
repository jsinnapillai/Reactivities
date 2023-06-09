import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/Agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  //   activities: Activity[] = [];
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // these are computed functions
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  get GroupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.setLoadingInitial(false);
        });
      }
    }
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    // this.activities.push(activity);
    this.activityRegistry.set(activity.id, activity);
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  //   //Selecting Activity
  //   selectActivity = (id: string) => {
  //     this.selectedActivity = this.activityRegistry.get(id);
  //   };
  //   cancelSelectedActivity = () => {
  //     this.selectedActivity = undefined;
  //   };

  //   openForm = (id?: string) => {
  //     id ? this.selectActivity(id) : this.cancelSelectedActivity();
  //     this.editMode = true;
  //   };
  //   closeForm = () => {
  //     this.editMode = false;
  //   };

  createAcivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        // this.activities.push(activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.editMode = false;
        this.loading = false;
      });
    }
  };
  updateActivity = async (activity: Activity) => {
    this.loading = true;
    console.log("update:" + activity);
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        // this.activities = [
        //   ...this.activities.filter((x) => x.id !== activity.id),
        //   activity,
        // ];
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;

        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.editMode = false;
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        // this.activities = [...this.activities.filter((x) => x.id !== id)];
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
