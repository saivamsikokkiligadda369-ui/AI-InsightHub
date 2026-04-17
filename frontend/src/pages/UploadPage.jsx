import React,{
useEffect,
useState
} from "react";

import {
Link
} from "react-router-dom";

import {
uploadFile,
getMyFiles,
processFile
} from "../api/uploadApi";

function UploadPage(){

const [file,setFile] =
useState(null);

const [files,setFiles] =
useState([]);

const [msg,setMsg] =
useState("");

const loadFiles =
async () => {
const data =
await getMyFiles();
setFiles(data);
};

useEffect(()=>{
loadFiles();
},[]);

const submit =
async () => {

if(!file){
setMsg("Choose file");
return;
}

try{

await uploadFile(file);

setMsg(
"Uploaded successfully"
);

setFile(null);

loadFiles();

}catch{
setMsg(
"Upload failed"
);
}
};

const runProcess =
async (id) => {
setMsg(
"Processing..."
);

try{

await processFile(id);

setMsg(
"Processed successfully"
);

}catch{
setMsg(
"Process failed"
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
</div>

</div>

<div className="page">

<div className="card">

<h2>
Upload Files
</h2>

<p>
PDF / DOCX /
MP3 / WAV /
MP4 / MOV
</p>

<input
type="file"
onChange={(e)=>
setFile(
e.target.files[0]
)}
/>

<button
onClick={submit}
>
Upload
</button>

{msg && <p>{msg}</p>}

</div>

<div
style={{
marginTop:"30px"
}}
>

<h2>
My Files
</h2>

{files.map((item)=>(
<div
key={item.id}
className="panel"
style={{
marginTop:"12px"
}}
>

<h3>
{item.filename}
</h3>

<p>
Type:
{item.filetype}
</p>

<button
onClick={()=>
runProcess(
item.id
)}
>
Process File
</button>

</div>
))}

</div>

</div>

</div>
);
}

export default UploadPage;