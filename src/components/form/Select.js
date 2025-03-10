import React, {useCallback, useEffect, useState} from "react";

export default function Select({data, config, onChangeOption, isDisabled = false, maxOptions = undefined}) {

    // VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const {title, value, name} = config
    const custom_id = title.toLowerCase().replace(/\s+/g, "-").concat("-select")

    const [selectValue, setSelectValue] = useState("");

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const updateValue = useCallback((value) => {
        setSelectValue(value)
        onChangeOption(value)
    }, [onChangeOption])

    useEffect(() => {
        updateValue("")
    }, [data, updateValue])

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <div className="form-item">
            <label htmlFor={custom_id}>{title}</label>
            <div className={`select-container ${isDisabled ? "disabled" : ""}`}>
                <select
                    id={custom_id}
                    value={selectValue}
                    onChange={(e) => updateValue(e.target.value)}
                    disabled={isDisabled}>
                    <option value=""></option>
                    {data.slice(0, maxOptions).map((item) => (
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