import React, { useState, useContext, forwardRef } from "react";
import { SearchContext } from "./SearchContext";

const SearchBar = forwardRef((props, ref) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (ref.current) {
            props.handleSearch(e, ref.current.value)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input ref={ref} type="text" placeholder="Enter a search term here" />
            <button type="submit">Submit</button>
        </form>
    );
});

export default SearchBar;