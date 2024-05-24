
export default async function fetchActivityTypes() {
  try {
    const response = await fetch("http://localhost:8080/activityTypes");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const activityTypes = await response.json();
    console.log("ActivityTypes: ", activityTypes);
    
    return activityTypes;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
