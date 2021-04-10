import React from "react";
import socket from "./socket";

function App() {
  const [parcels, setParcel] = React.useState([{}]);
  React.useEffect(() => {
    socket.on("parcel", (data) => setParcel(data));
  });
  return (
    <div>
      {parcels.map((parcel) => (
        <>
          <div>ID: {parcel._id}</div>
          <div>Name: {parcel.name}</div>
          <div>Status: {parcel.status}</div>
        </>
      ))}
    </div>
  );
}

export default App;
