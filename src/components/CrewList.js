import React from "react";

const crewConfig = [
    {title: "Directed by", job: "Director"},
    {title: "Screenplay by", job: "Screenplay"},
    {title: "Story by", job: "Story"},
    {title: "Characters by", job: "Characters"},
    {title: "Produced by", job: "Producer"},
    {title: "Edited by", job: "Editor"},
    {title: "Music by", job: "Original Music Composer"},
]

const maxCrew = 4;

export default function CrewList({crew}) {

    const filteredConfigs = crewConfig.filter(config =>
        (crew || []).some(crewMember => crewMember.job === config.job)
    ).slice(0, maxCrew);

    console.log(filteredConfigs)

    return (
        <>
            {filteredConfigs.map((config) => (
                <Crew key={config.job} crew={crew} config={config} />
            ))}
        </>
    );
}

function Crew({ crew, config }) {
    const { title, job } = config;

    const filteredCrew = (crew || []).filter((crewMember) => crewMember.job === job);

    if (filteredCrew.length === 0) {
        return null;
    }

    return (
        <ul>
            <li><h4>{title}</h4></li>
            {filteredCrew.map((crewMember) => (
                <li key={crewMember.id}>{crewMember.name}</li>
            ))}
        </ul>
    );
}