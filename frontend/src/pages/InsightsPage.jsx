import React,{
useEffect,
useState
} from "react";

import {
Link
} from "react-router-dom";

import {
getSummary,
getTimestamps
} from "../api/insightsApi";

import MediaPlayer from "../components/MediaPlayer";

import {
useToast
} from "../context/ToastContext";

function InsightsPage(){

const {
showToast
} = useToast();

const [summary,setSummary] =
useState("");

const [topics,setTopics] =
useState("");

const [timestamps,setTimestamps] =
useState([]);

useEffect(()=>{
loadData();
},[]);

const loadData =
async () => {

try{

const summaryRes =
await getSummary();

const timeRes =
await getTimestamps();

setSummary(
summaryRes.summary
);

setTopics(
summaryRes.topics
);

setTimestamps(
timeRes.timestamps
);

showToast(
"Insights loaded"
);

}catch{

showToast(
"Failed to load insights"
);

}

};

const jumpTo =
(sec) => {

if(window.seekMedia){
window.seekMedia(sec);
showToast(
`Jumped to ${sec}s`
);
}

};

return(

<div>

<div className="nav">

<h3>
AI InsightHub
</h3>

<div>

<Link to="/dashboard">
Dashboard
</Link>

{" | "}

<Link to="/chat">
Chat
</Link>

{" | "}

<Link to="/upload">
Upload
</Link>

</div>

</div>

<div
className="page"
style={{
maxWidth:"1000px",
margin:"auto"
}}
>

<h1>
Insights
</h1>

<MediaPlayer
src="sample.mp3"
type="audio"
/>

<div
className="panel"
style={{
marginTop:"20px"
}}
>

<h2>
Summary
</h2>

<p
style={{
whiteSpace:
"pre-wrap"
}}
>
{summary}
</p>

</div>

<div
className="panel"
style={{
marginTop:"20px"
}}
>

<h2>
Topics
</h2>

<p
style={{
whiteSpace:
"pre-wrap"
}}
>
{topics}
</p>

</div>

<div
className="panel"
style={{
marginTop:"20px"
}}
>

<h2>
Timestamps
</h2>

{timestamps.map(
(item,index)=>(

<div
key={index}
style={{
display:"flex",
justifyContent:
"space-between",
padding:"10px 0",
borderBottom:
"1px solid #222"
}}
>

<div>

<strong>
{item.time}
</strong>

<p>
{item.topic}
</p>

</div>

<button
style={{
width:"140px"
}}
onClick={()=>
jumpTo(
item.seconds
)
}
>
Play Here
</button>

</div>

))
}

</div>

</div>

</div>

);

}

export default InsightsPage;