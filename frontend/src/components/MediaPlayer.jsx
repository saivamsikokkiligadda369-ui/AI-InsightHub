import React,{
useRef
} from "react";

function MediaPlayer({
src,
type
}){

const ref = useRef();

const seekTo = (sec)=>{
if(ref.current){
ref.current.currentTime =
sec;
ref.current.play();
}
};

window.seekMedia =
seekTo;

return(
<div
className="panel"
style={{
marginTop:"20px"
}}
>

<h2>
Media Preview
</h2>

{type === "video" ? (

<video
ref={ref}
controls
width="100%"
src={src}
/>

) : (

<audio
ref={ref}
controls
style={{
width:"100%"
}}
src={src}
/>

)}

</div>
);
}

export default MediaPlayer;