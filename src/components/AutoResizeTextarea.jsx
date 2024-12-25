import React, {useEffect, useRef} from "react";

const AutoResizeTextarea = ({value, onChange}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        const adjustHeight = () => {
            if (textareaRef.current) {
                textareaRef.current.style.height = '1rem' || "auto"; // Скидання висоти
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Встановлення нової
            }
        };

        adjustHeight();

    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            style={{
                height: '1rem',
                width: "100%",
                resize: "none",
                overflow: "hidden",
            }}
        />
    );
};

export default AutoResizeTextarea;