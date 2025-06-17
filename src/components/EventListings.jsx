import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import displayDateAndTime from "../utils/DateUtils";
import fetchEventsData from "../services/eventService";

const EventListings = ({ eventFilterValue, searchText }) => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchEventsData();
      setEventsData(events);
      setLoading(false);
    };

    getEvents();
  }, []);

  const filteredEvents = eventsData
    .filter((data) => {
      const eventType = data.eventType.split(" ")[0];
      return (
        eventFilterValue === "" ||
        eventFilterValue === "Both" ||
        eventType === eventFilterValue
      );
    })
    .filter((event) => {
      if (!searchText) return true;
      const searchTextInLowerCase = searchText.toLowerCase();
      return (
        event.title.toLowerCase().includes(searchTextInLowerCase) ||
        event.eventTags.some((tag) =>
          tag.toLowerCase().includes(searchTextInLowerCase)
        )
      );
    });

  return (
    <div className="row my-3">
      {loading ? (
        <p>Loading Events...</p>
      ) : (
        filteredEvents.map((event) => (
          <div key={event._id} className="col-12 col-sm-6 col-md-4 mb-4">
            <Link to={`/events/${event._id}`} className="text-decoration-none">
              <div className="card">
                <div className="position-relative">
                  <img
                    className="card-img-top rounded"
                    src={event.posterImage}
                    alt={`Poster of ${event.title}`}
                  />
                  <span className="badge position-absolute top-0 start-0 m-2 bg-light text-dark">
                    {event.eventType}
                  </span>
                </div>

                <div className="card-body">
                  <p className="text-muted mb-1 text-center">
                    {displayDateAndTime(event.eventStartDateAndTime)}
                  </p>
                  <h3 className="card-title text-center">{event.title}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default EventListings;
