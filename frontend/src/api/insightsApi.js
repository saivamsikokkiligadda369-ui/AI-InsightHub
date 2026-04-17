import api from "./axios";

export async function getSummary(){
const res =
await api.get("/summary/");
return res.data;
}

export async function getTimestamps(){
const res =
await api.get("/timestamps/");
return res.data;
}