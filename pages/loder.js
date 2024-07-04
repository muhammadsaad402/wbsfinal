// const { useState } = require("react");
import Loders from "@/components/Loader/Loder";
import React, { useEffect, useState } from "react";

function loder() {
  //   const [loader, setLoader] = useState(true);

  return (
    <div>
      loader
      <Loders />
    </div>
  );
}
export default loder;
