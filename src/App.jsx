import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import UserInput from "./components/UserInput";

function App() {
  const [host, setHost] = useState("");

  useEffect(() => {
    fetch("/config.json")
      .then((response) => response.json())
      .then((data) => {
        setHost(data.backend_url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <UserInput host={host} />
    </>
  );
}

export default App;
