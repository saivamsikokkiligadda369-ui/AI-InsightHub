import React,{
createContext,
useContext,
useState
} from "react";

const ToastContext =
createContext();

export function ToastProvider({
children
}){

const [toast,setToast] =
useState("");

const showToast =
(msg)=>{
setToast(msg);

setTimeout(()=>{
setToast("");
},2500);
};

return(
<ToastContext.Provider
value={{showToast}}
>
{children}

{toast && (
<div
style={{
position:"fixed",
top:"20px",
right:"20px",
background:"#fff",
color:"#000",
padding:"12px 18px",
borderRadius:"10px",
zIndex:999
}}
>
{toast}
</div>
)}

</ToastContext.Provider>
);
}

export function useToast(){
return useContext(
ToastContext
);
}