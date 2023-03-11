import React from "react";
import { useParams } from "react-router-dom";
import { useLoginState } from "../LoginState";

function Home() {
  let [loginState, setLoginState] = useLoginState();
  return <>{loginState}</>;
}

export default Home;
