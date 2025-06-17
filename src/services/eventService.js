const fetchEventsData = async () => {
  try {
    const res = await fetch(
      "https://meetup-app-backend-three.vercel.app/events"
    );
    const eventsData = await res.json();

    if (eventsData.events && eventsData.events.length > 0) {
      return eventsData.events;
    } else {
      console.log("No events found.");
      return [];
    }
  } catch (error) {
    console.log("Error fetching events:", error);
    return [];
  }
};

export default fetchEventsData;