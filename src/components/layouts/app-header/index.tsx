import { Button } from "antd";
import { FC } from "react";
import { Redirect, useHistory, withRouter } from "react-router";
import { useAppDispatch } from "../../../hooks";
import { logout } from "../../../store/accountSlice";


const AppHeader:FC = () =>{
    const dispatch =useAppDispatch();
    const history = useHistory();

    const handleLogout = () =>{
         dispatch(logout())
        return <Redirect to="/" />
    }
    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default AppHeader;