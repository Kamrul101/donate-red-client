import { useEffect, useState } from 'react';

const useGeoLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setLoading(false);
          },
          (error) => {
            console.error("Error getting user's location:", error);
            setLoading(false);
          }
        );
      } else {
        console.error('Geolocation not supported by the browser.');
        setLoading(false);
      }
    };

    getLocation();
    
    
  }, []);
  

  return [ latitude, longitude,loading ];
};

export default useGeoLocation;
