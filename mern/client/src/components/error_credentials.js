// Authors: Joe Reiser (100%)

import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
 
export default function NonprofitErrorCredentials() {
 
 const navigate = useNavigate();
 
 return(
   <div>
     <h5>
       Incorrect credentials. Please try again.
     </h5>
   </div>
 )

}