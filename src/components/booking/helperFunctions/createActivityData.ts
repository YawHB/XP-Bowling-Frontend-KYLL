import {
  AcitivtyMicroData,
  PreBookingDataInterface,
} from "../bookingInterfaces";
import {
  kidsBowlingLanesArray,
  bowlingLanesArray,
  airhockyTablesArray,
  dinnerTablesArray,
} from "./HardCodedActivitesTable";

// Nu laver jeg noget micro-data for hver activity som skal postes.
// jeg skal tage en liste. tage højde for tidspunk this det er bowling....

export default function createActivityObject(
  activityData: PreBookingDataInterface
) {
  let activityAmount: number | undefined;
  let releventActivitiesList;

  console.log("createActivityObject");

  // checks the type of the activity. Sets activity amount to lanes or tables and relevntActivites to the hardcoded list of actvities
  if (activityData.activity === "BOWLING_ADULT") {
    activityAmount = activityData.lanes;
    releventActivitiesList = bowlingLanesArray;
  } else if (activityData.activity === "BOWLING_CHILD") {
    activityAmount = activityData.lanes;
    releventActivitiesList = kidsBowlingLanesArray;
  } else if (activityData.activity === "RESTAURANT") {
    activityAmount = activityData.tables;
    releventActivitiesList = dinnerTablesArray;
  } else if (activityData.activity === "AIR_HOCKEY") {
    activityAmount = activityData.tables;
    releventActivitiesList = airhockyTablesArray;
  }

  if (activityAmount === undefined || releventActivitiesList === undefined) {
    console.error(`Activity amount or relevant activities list were undefined`);
    return;
  }

  const nestedActivitDataArray: AcitivtyMicroData[] = [];

  // Loops for every lane or table - makes a new activity object
  for (let i = 0; i < activityAmount; i++) {
    let availableActivityObject;

    // "checks for bowling lessons"
    if (activityData.activity === "BOWLING_ADULT") {
        availableActivityObject = releventActivitiesList[i + 14];
    } else {
      // Each of the objects needs unique ID from the list of activities!
      availableActivityObject = releventActivitiesList[i];
    }

    // we need a micro-data interface.
    const newActivity: AcitivtyMicroData = {
      startTime: activityData.time,
      endTime: activityData.endTime,
      numberParticipants: 0,
      activity: {
        id: availableActivityObject.id,
      },
    };

    nestedActivitDataArray.push(newActivity);
  }
  console.log(nestedActivitDataArray);
  return nestedActivitDataArray;
}
