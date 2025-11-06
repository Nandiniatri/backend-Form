import React from "react";

const Input = ({
    label,
    type = "text",
    placeholder = "",
    value,
    onChange,
    className = ""
}) => {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={className}
            />
        </div>
    );
};

export default Input;
