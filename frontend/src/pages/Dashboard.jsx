import React from "react";

import {
Link,
useNavigate
} from "react-router-dom";

import {
logout
} from "../utils/token";

function Dashboard() {

const nav =
useNavigate();

const signout = () => {
logout();
nav("/");
};

return (
<div>

<div className="nav">

<h3>
AI InsightHub
</h3>

<div>

<Link to="/upload">
Upload
</Link>

{" | "}

<Link to="/chat">
Chat
</Link>

{" | "}

<Link to="/insights">
Insights
</Link>

{" | "}

<button
style={{
width:"auto",
padding:"8px 14px",
marginLeft:"10px"
}}
onClick={signout}
>
Logout
</button>

</div>

</div>

<div className="page">

<div className="grid">

<div className="panel">
<h2>Upload Content</h2>
<p>
Upload PDF, audio,
video files.
</p>
</div>

<div className="panel">
<h2>AI Chat</h2>
<p>
Ask questions from
processed files.
</p>
</div>

<div className="panel">
<h2>Insights</h2>
<p>
Get summaries,
topics, timestamps.
</p>
</div>

<div className="panel">
<h2>Premium Dashboard</h2>
<p>
Modern AI platform
experience.
</p>
</div>

</div>

</div>

</div>
);
}

export default Dashboard;