import React from "react";

export default function Select({data, config, onChangeOption}) {
    const {title, value, name} = config

    return (
        <div className="form-item">
            <label htmlFor="streaming-select">{title}</label>
            <div className="select-container">
                <select onChange={(e) => onChangeOption(e.target.value)}>
                    <option value={null}>{""}</option>
                    {data.map((item) => (<option value={item[value]}>{item[name]}</option>))}
                </select>
            </div>
        </div>
    )
}