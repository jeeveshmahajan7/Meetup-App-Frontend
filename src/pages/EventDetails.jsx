import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import fetchEventsData from "../services/eventService";
import Header from "../components/Header";
import displayDateAndTime from "../utils/dateUtils";
import "../App.css";

const EventDetails = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchEventsData();
      const clickedEvent = await events.find((event) => event._id === id);
      setEventData(clickedEvent);
      setLoading(false);
    };

    getEvents();
  }, []);

  return (
    <>
      <Header />

      <main>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-start g-4 row">
              <div className="col-md-5">
                <h1 className="py-3">{eventData.title}</h1>
                <p>
                  Hosted by: <br />
                  <strong>{eventData.hostName}</strong>
                </p>
                <img
                  className="event-image py-2 img-fluid"
                  src={eventData.posterImage}
                  alt={`Image of ${eventData.title}`}
                />
                <h5 className="py-2">Details:</h5>
                <p>{eventData.details}</p>
                <h5 className="py-2">Additional Information:</h5>
                <p>
                  {eventData.additionalInformation.map((info, index) => (
                    <span key={index}>
                      <strong>{info.key}</strong>: {info.value} <br />
                    </span>
                  ))}
                </p>
                <h5>Event Tags:</h5>
                <p>
                  {eventData.eventTags.map((tag, index) => (
                    <span key={index} className="btn btn-danger me-4">
                      {tag}
                    </span>
                  ))}
                </p>
              </div>

              <div className="col-md-5">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <div style={{ marginRight: "10px" }}>🕓</div>
                      <div>
                        {displayDateAndTime(eventData.eventStartDateAndTime)} to{" "}
                        <br />
                        {displayDateAndTime(eventData.eventEndDateAndTime)}
                      </div>
                    </div>
                    <br />
                    <p>📍 {eventData.eventAddress}</p>
                    <br />
                    <p>₹ {eventData.eventCost}</p>
                  </div>
                </div>
                <div>
                  <h5 className="mt-5">
                    {eventData.speakers.length === 1 ? (
                      <span>Speaker</span>
                    ) : (
                      <span>Speakers</span>
                    )}
                    : ({eventData.speakers.length})
                  </h5>
                  <br />
                  <div className="row">
                    {eventData.speakers.map((speaker) => (
                      <div
                        className="col-12 col-sm-6 col-md-6"
                        key={speaker._id}
                      >
                        <div className="card mt-3">
                          <div className="speaker-img-wrapper">
                            <img
                              className="img-fluid speaker-img"
                              src={speaker.speakerProfileImage}
                              alt="Speaker Image"
                            />
                          </div>
                          <div className="card-body text-center">
                            <p className="card-title">
                              <strong>{speaker.speakerName}</strong>
                            </p>
                            <p>{speaker.speakerDesignation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default EventDetails;
