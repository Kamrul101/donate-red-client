import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const useProfile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const url = `https://donate-red-server.vercel.app/singleUsers/${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUserProfile(data);
        setLoading(false);
      });
  }, [url]);
  return [userProfile, loading];
};

export default useProfile;
