import React, {useEffect, useState} from "react";

export default function Select({data, config, onChangeOption, isDisabled}) {

    // VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const {title, value, name} = config
    const custom_id = title.toLowerCase().replace(/\s+/g, "-")

    const [selectValue, setSelectValue] = useState("");

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        updateValue("")
    }, [data])

    function updateValue(value) {
        setSelectValue(value)
        onChangeOption(value)
    }

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <div className="form-item">
            <label htmlFor={custom_id}>{title}</label>
            <div className="select-container">
                <select
                    id={custom_id}
                    value={selectValue}
                    onChange={(e) => updateValue(e.target.value)}
                    disabled={isDisabled}>
                    <option value=""></option>
                    {data.map((item) => (
                        <option value={item[value]}
                                key={item[value]}>
                            {item[name]}
                        </option>)
                    )}
                </select>
            </div>
        </div>
    )
}