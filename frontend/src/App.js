import React from "react";

import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import UploadPage from "./pages/UploadPage";
import InsightsPage from "./pages/InsightsPage";

import ProtectedRoute from "./components/ProtectedRoute";

import {
ToastProvider
} from "./context/ToastContext";

function App() {

return (

<ToastProvider>

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Login />}
/>

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard />
</ProtectedRoute>
}
/>

<Route
path="/chat"
element={
<ProtectedRoute>
<ChatPage />
</ProtectedRoute>
}
/>

<Route
path="/upload"
element={
<ProtectedRoute>
<UploadPage />
</ProtectedRoute>
}
/>

<Route
path="/insights"
element={
<ProtectedRoute>
<InsightsPage />
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

</ToastProvider>

);

}

export default App;