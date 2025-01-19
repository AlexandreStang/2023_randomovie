import React, {useState} from "react";

export default function Tabs({categories, onSelectCategory}) {

    const [activeTab, setActiveTab] = useState(categories[0].value);

    function handleTabClick(category) {
        setActiveTab(category)
        onSelectCategory(category)
    }

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