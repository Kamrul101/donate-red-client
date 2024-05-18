// src/Notifications.js
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProviders';

const publicVapidKey = "BDwQKLpIQjAZoxDA42ABRBwpiR6Ba2IYyQ0SeH5BVt1WqMRMFEbmsshMtaiSfpIRjz90kpn2O1fqNWhwQO50RNI";

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const Notifications = () => {
const { user} = useContext(AuthContext);
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        const registration = await navigator.serviceWorker.register('/worker.js');
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });
        const subscriptionWithEmail = { subscription , email: user?.email};
        await fetch('http://localhost:5000/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscriptionWithEmail),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    };

    registerServiceWorker();
  }, [user?.email]);


  return <div className='py-3 bg-yellow-300 flex justify-center text-lg mt-6 rounded-lg font-semibold border-white border-2 shadow-slate-400 shadow-2xl'> Please enable notifications</div>;
};

export default Notifications;
