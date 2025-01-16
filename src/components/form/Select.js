import React from "react";

export default function Select({data, config, onChangeOption}) {
    const {title, value, name} = config
    const custom_id = title.toLowerCase().replace(/\s+/g, '-')

    return (
        <div className="form-item">
            <label htmlFor={custom_id}>{title}</label>
            <div className="select-container">
                <select
                    onChange={(e) => onChangeOption(e.target.value)}
                    id={custom_id}>
                    <option value={null}>{""}</option>
                    {data.map((item) => (<option value={item[value]}>{item[name]}</option>))}
                </select>
            </div>
        </div>
    )
}