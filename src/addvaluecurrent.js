import { useState } from "react";
import "./styles.css";

export default function App() {
    const [cur, setCur] = useState("");
    const [state, setState] = useState("");

    const handleChange = (e) => {
        setCur(e.target.selectionStart);
        setState(e.target.value);
        // gives cursor index
        // this only shows cursor position if user types
        // I need to track the position of the cursor and add dropVal there
        setCur(e.target.selectionEnd);
    };

    const onBlur = (e) => {
        setCur(e.target.selectionStart);
    };

    const handleOptionChange = (option) => {
        setState(state.slice(0, cur) + option + state.slice(cur));
    };

    const removeAtIndex = (state, index) => {
        return state?.substring(0, index - 1) + state?.substring(index);
    }


    const onkeydown = (event) => {
        if (event.key === "Delete" || event.key === "Backspace") {
            event.preventDefault();
            const { state, cur } = event.target;
            const index = event.key === "Delete" ? cur : cur + 1;
            setState(removeAtIndex(state, index));
        }
    }

    return (
        <div className="App">
            <input onBlur={onBlur} onChange={(e) => handleChange(e)} value={state} onKeyDown={onkeydown} />
            <select onChange={(e) => handleOptionChange(e.target.value)}>
                <option>ONE</option>
                <option>TWO</option>
            </select>
        </div>
    );
}







// import React, { useEffect, useRef, useState } from 'react';

// const ControlledInput = (props) => {
//    const { value, onChange, ...rest } = props;
//    const [cursor, setCursor] = useState(null);
//    const ref = useRef(null);

//    useEffect(() => {
//       const input = ref.current;
//       if (input) input.setSelectionRange(cursor, cursor);
//    }, [ref, cursor, value]);

//    const handleChange = (e) => {
//       setCursor(e.target.selectionStart);
//       onChange && onChange(e);
//    };

//    return <input ref={ref} value={value} onChange={handleChange} {...rest} />;
// };

// export default ControlledInput;