importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js");

//Firebase Config values imported from .env file
self.addEventListener("install", async (event) => {
    event.waitUntil(
        fetch("/api/firebase-config")
            .then((response) => response.json())
            .then((firebaseConfig) => {
                firebase.initializeApp(firebaseConfig);
                const messaging = firebase.messaging();

                messaging.onBackgroundMessage((payload) => {
                    const notificationTitle = payload.notification.title;
                    const notificationOptions = {
                        body: payload.notification.body,
                        icon: "/icons/icon-192x192.png",
                    };

                    self.registration.showNotification(notificationTitle, notificationOptions);
                });

                onMessage(messaging, (payload) => {
                    console.log("Message received. ", payload);
                    // ...
                });
            })
            .catch((error) => console.error("[Service Worker] Failed to load Firebase config:", error))
    );
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
    event.waitUntil(clients.openWindow("<https://your-website.com>"));
});
