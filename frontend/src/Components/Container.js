import React from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const Component = ({ children }) =>
{
    const isLargeScreen = useMediaQuery('(min-width:1500px)');
    const marginSize = isLargeScreen ? '0 15rem' : '0 2rem';

    return (
        <div style={{ margin: marginSize }}>
            {children}
        </div>
    );
}

export default Component;