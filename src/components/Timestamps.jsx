import React from "react";
import "../index.css";

function Timestamps ({articleID, createOn, updateOn}) {
    console.log("[Title] rendering......");
    console.log({articleID, createOn, updateOn});

    return (
        <div className="ml-2 grid grid-cols-3 text-sm ">
            <div className="font-semibold">ID:</div>
            <div className="col-span-2">{articleID}</div> 
            <div className="font-semibold">Created:</div>
            <div className="col-span-2">{createOn}</div> 
            <div className="font-semibold">Updated:</div>
            <div className="col-span-2">{updateOn}</div> 
        </div>
    )
}

export default Timestamps;