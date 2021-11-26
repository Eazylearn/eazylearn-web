import { Container } from '@material-ui/core';
import React from 'react';

interface Props {
    current_tab: "course" | "lecturer" | "student";
}

const HeaderAdmin: React.FC<Props> = () => {

    return (
        <>
            <h1>EAZYLEARN</h1>
            <div className="nav_tabs">
                
            </div>
        </>
    );
}


export default HeaderAdmin;