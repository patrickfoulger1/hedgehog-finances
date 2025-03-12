importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js");

self.addEventListener("fetch", () => {
    const urlParams = new URLSearchParams(location.search);
    self.firebaseConfig = Object.fromEntries(urlParams);
});

const defaultConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true,
};

firebase.initializeApp(self.firebaseConfig || defaultConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/icons/icon-192x192.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("push", function (event) {
    const messageData = event.data ? event.data.json() : {};
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
            client.postMessage({
                type: "PUSH",
                payload: messageData,
            });
        });
    });

    event.waitUntil(
        self.registration.showNotification(event.notification.title, {
            body: event.notification.body,
            icon: "/icon.png",
        })
    );
});

self.addEventListener("pushsubscriptionchange", function (event) {
    console.log("Push subscription change event:", event);
});

self.addEventListener("notificationclick", function (event) {
    console.log("Notification click received.");
    event.notification.close();
    event.waitUntil(clients.openWindow("https://hedgehog-finances-nine.vercel.app/"));
});
