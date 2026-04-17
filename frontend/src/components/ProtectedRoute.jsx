import React from "react";
import {
Navigate
} from "react-router-dom";

import {
getToken
} from "../utils/token";

function ProtectedRoute({
children
}){

if(!getToken()){
return <Navigate to="/" />;
}

return children;
}

export default ProtectedRoute;