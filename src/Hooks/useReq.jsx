import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';

const useReq = () => {
const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [req, setReq] = useState([]);
  const url = `https://donate-red-server.vercel.app/request`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setReq(data);
       
        setLoading(false);
      });
  }, [url]);
  return [req,loading];
};

export default useReq;