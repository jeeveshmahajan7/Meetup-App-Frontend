// function to extract the date and time in local string format from the date object
const displayDateAndTime = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  return `${formattedDate} • ${formattedTime}`;
};

export default displayDateAndTime;
