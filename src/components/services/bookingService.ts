async function fetchBookingData() {
  try {
    const response = await fetch("your-backend-api-endpoint");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export { fetchBookingData };
