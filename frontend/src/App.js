import { useEffect } from "react";

import api from "./services/api";

function App() {
  const getData = async () => {
    const response = await api.get("/new");
    console.log(response);
  };
  useEffect(() => {
    getData();
  }, []);

  return <div></div>;
}

export default App;
