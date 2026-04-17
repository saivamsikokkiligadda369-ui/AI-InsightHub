import React,{
useEffect,
useState
} from "react";

import {
Link
} from "react-router-dom";

import {
askQuestion,
getHistory
} from "../api/chatApi";

function ChatPage(){

const [question,setQuestion] =
useState("");

const [messages,setMessages] =
useState([]);

const [loading,setLoading] =
useState(false);

const loadHistory =
async () => {
try{
const data =
await getHistory();

const list =
data.map((item)=>({
question:
item.question,
answer:
item.answer
}));

setMessages(list);

}catch{}
};

useEffect(()=>{
loadHistory();
},[]);

const send =
async () => {

if(!question.trim()){
return;
}

const userQuestion =
question;

setMessages((prev)=>[
...prev,
{
question:userQuestion,
answer:"..."
}
]);

setQuestion("");
setLoading(true);

try{

const res =
await askQuestion(
userQuestion
);

setMessages((prev)=>{
const copy=[...prev];
copy[
copy.length-1
].answer =
res.answer;
return copy;
});

}catch{

setMessages((prev)=>{
const copy=[...prev];
copy[
copy.length-1
].answer =
"Failed to get response";
return copy;
});

}

setLoading(false);
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

<Link to="/upload">
Upload
</Link>
</div>

</div>

<div
className="page"
style={{
maxWidth:"900px",
margin:"auto"
}}
>

<h1>
AI Chat
</h1>

<div
style={{
marginTop:"20px"
}}
>

{messages.map(
(item,index)=>(
<div
key={index}
style={{
marginBottom:"18px"
}}
>

<div
className="panel"
style={{
background:"#1f1f1f"
}}
>
<strong>
You:
</strong>
<p>
{item.question}
</p>
</div>

<div
className="panel"
style={{
marginTop:"8px"
}}
>
<strong>
AI:
</strong>
<p
style={{
whiteSpace:
"pre-wrap"
}}
>
{item.answer}
</p>
</div>

</div>
))}

</div>

<div
style={{
marginTop:"30px"
}}
>

<textarea
rows="4"
placeholder="Ask a question about uploaded files..."
value={question}
onChange={(e)=>
setQuestion(
e.target.value
)}
/>

<button
onClick={send}
disabled={loading}
>
{loading
? "Thinking..."
: "Send"}
</button>

</div>

</div>

</div>
);
}

export default ChatPage;