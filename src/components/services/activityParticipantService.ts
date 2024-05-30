

interface activityBooking{
  id: number
}

interface activityParticipants {
  name: string;
  activityBooking: activityBooking;
}


async function postParticipant (
  newParticipant: activityParticipants
): Promise<activityParticipants> {
  console.log("post-route-data", newParticipant);
  const response = await fetch(`http://localhost:8080/activityParticipants`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newParticipant),
  });
  if (!response.ok) {
    throw new Error("An error occured when posting participants");
  }
  return await(response.json() as Promise<activityParticipants>);
}

export { postParticipant };
