import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import EventListings from "./components/EventListings";

function App() {
  const [eventType, setEventType] = useState("");
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <Header setSearchText={setSearchText} showSearch={true} />

      <main>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Meetup Events</h1>
          <select
            className="form-select w-auto"
            value={eventType}
            onChange={(e) => {
              setEventType(e.target.value);
            }}
          >
            <option value="" disabled>
              Select Event Type
            </option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <EventListings eventFilterValue={eventType} searchText={searchText} />
      </main>
    </div>
  );
}

export default App;
