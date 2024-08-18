import React from "react";
import { useState, CSSProperties } from "react";
import RiseLoader from "react-spinners/RiseLoader";

const override: CSSProperties = {
    display: "flex",
    justifyContent: 'center',
    margin: "10px auto",
    borderColor: "red",
};

const SpinnerLoader = () => {
    let [loading, setLoading] = useState(true);
    return (
        <RiseLoader
            color={`var(--bg-header)`}
            loading={loading}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default SpinnerLoader;