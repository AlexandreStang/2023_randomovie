import React, {useState} from "react";

export default function Tabs({categories, onSelectCategory}) {

    // VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [activeTab, setActiveTab] = useState(categories[0].value);

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function handleTabClick(category) {
        setActiveTab(category)
        onSelectCategory(category)
    }

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <div className="button-container">
            {categories.map(category => (
                <button onClick={() => handleTabClick(category.value)}
                        className={"small-btn " + (activeTab === category.value ? "selected-btn" :
                            "unselected-btn")}
                        key={category.value}>
                    {category.label}
                </button>
            ))}
        </div>
    )
}