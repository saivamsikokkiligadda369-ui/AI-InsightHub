import api from "./axios";

export async function uploadFile(file){

const formData =
new FormData();

formData.append(
"file",
file
);

const res =
await api.post(
"/upload/",
formData,
{
headers:{
"Content-Type":
"multipart/form-data"
}
}
);

return res.data;
}

export async function getMyFiles(){

const res =
await api.get(
"/upload/my-files"
);

return res.data;
}

export async function processFile(id){

const res =
await api.post(
`/process/${id}`
);

return res.data;
}