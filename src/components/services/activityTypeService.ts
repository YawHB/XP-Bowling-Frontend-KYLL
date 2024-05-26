export interface ActivityType {
  id: number;
  type: string;
  hourlyPrice: number;
  maxCapacity: number;
}

export default async function fetchActivityType(): Promise <ActivityType[]> {
  try {
    const response = await fetch("http://localhost:8080/activityTypes");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("activityType: ", data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
