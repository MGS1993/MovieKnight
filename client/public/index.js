
const publicVapidKey =
  "BMpDn2OE8BJUwSi4G7ub6KsBGRAyPFD0ae52D9wV70mS672c5tkBCnPGNeEKQZGxVoPirJchLE74js_W4dB6R9U";

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./serviceworker.js')
        .then((reg) => console.log('Success:', reg.scope))
        .catch((err) => console.log('Error:', err));
    })
  }

  // Copied from the web-push documentation
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

// function as IIFE - asks permission automatically
window.subscribe = (async () => {
  const userId = localStorage.getItem('userId');
  // exit function if serviceworker isn't supported
  if (!('serviceWorker' in navigator)) return;


  if ( userId !== null ) {
    const registration = await navigator.serviceWorker.ready;

    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    
    // Add userId to object in order to easily pass info in one variable
    let dataBody = { 
      endPoint: subscription.endpoint,
      expirationTime: subscription.expirationTime,
      userId
    }

    await fetch('api/subscribe', {
      method: 'PATCH',
      body: JSON.stringify(dataBody),
      headers: {
        'content-type': 'application/json',
      },
    });
  }
  
})();

