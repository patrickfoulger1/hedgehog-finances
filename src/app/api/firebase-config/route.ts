async function handler(req: Request) {
    return Response.json({
        apiKey: "AIzaSyBEVzdMO2RQhzE9mPlsif-TkrUH51PPYW4",
        authDomain: "web-notifications-d9bf1.firebaseapp.com",
        projectId: "web-notifications-d9bf1",
        storageBucket: "web-notifications-d9bf1.firebasestorage.app",
        messagingSenderId: "1070244670584",
        appId: "1:1070244670584:web:ef2dcf096eb17457b6d18d",
    });
}

export { handler as GET };
