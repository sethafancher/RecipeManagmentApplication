import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const sessionCookieName = "session";

function useLoginState(): [string | undefined, (session: string) => void] {
  let [loginToken, setLoginToken] = useState<string>();

  useEffect(() => {
    if (
      loginToken == undefined &&
      Cookies.get(sessionCookieName) != undefined
    ) {
      setLoginToken(Cookies.get(sessionCookieName));
    }
  }, []);

  const setValue = (session: string) => {
    Cookies.set(sessionCookieName, session);
    setLoginToken(session);
  };

  return [loginToken, setValue];
}

export { useLoginState };
