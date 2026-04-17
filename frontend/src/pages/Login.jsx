import React, {
useState
} from "react";

import {
useNavigate
} from "react-router-dom";

import api from "../api/axios";
import {
saveToken
} from "../utils/token";

function Login(){

const nav =
useNavigate();

const [email,setEmail] =
useState("");

const [password,setPassword] =
useState("");

const [error,setError] =
useState("");

const login = async () => {
try{

const res =
await api.post(
"/auth/login",
{
email,
password
}
);

saveToken(
res.data.access_token
);

nav("/dashboard");

}catch(err){
setError(
"Invalid login"
);
}
};

return(
<div className="page">
<div className="card">

<h1>
AI InsightHub
</h1>

<p>
Login to continue
</p>

<input
placeholder="Email"
value={email}
onChange={(e)=>
setEmail(
e.target.value
)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>
setPassword(
e.target.value
)}
/>

<button
onClick={login}
>
Login
</button>

{error && (
<p>{error}</p>
)}

</div>
</div>
);
}

export default Login;