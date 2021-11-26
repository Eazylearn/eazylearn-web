import { makeStyles } from "@material-ui/styles";
import { FC } from "react";


const classes = makeStyles({
    tabButton: {
        
    }
});

const HeaderTabButton:FC = () => {
    const className = classes();

    return (
        <button className={className.tabButton}>
            
        </button>
    )
}

export default HeaderTabButton;