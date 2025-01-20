import React from "react";

export default function Score({percentage}) {

    return (
        <span className={"min-score-percentage " + (percentage > 69 ? "green-txt" :
                (percentage > 39 ? "yellow-txt" : "red-txt"))}
            id="min-score-percentage">{percentage + "%"}</span>
    )
}