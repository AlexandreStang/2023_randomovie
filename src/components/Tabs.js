import React, {useState} from "react";

export default function Tabs({categories, onSelectCategory}) {

    const [activeTab, setActiveTab] = useState(categories[0].value);

    function handleTabClick(timeWindow) {
        setActiveTab(timeWindow)
        onSelectCategory(timeWindow)
    }

    return (
        <div className="button-container">
            {categories.map(category => (
                <button onClick={() => handleTabClick(category.value)}
                        className={"small-btn " + (activeTab === category.value ? "selected-btn" :
                            "unselected-btn")}>{category.label}
                </button>
            ))}
        </div>
    )
}