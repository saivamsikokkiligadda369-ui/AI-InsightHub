import api from "./axios";

export async function askQuestion(question){

const res =
await api.post(
"/chat/",
{
question
}
);

return res.data;
}

export async function getHistory(){

const res =
await api.get(
"/chat/history"
);

return res.data;
}