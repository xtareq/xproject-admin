import { Button } from "antd";
import { FC } from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../../hooks";
import { logout } from "../../../store/accountSlice";


const AppHeader:FC = () =>{
    const dispatch =useAppDispatch();
    const history = useHistory();

    const handleLogout = () =>{
        dispatch(logout())
        history.push("/login")
    }
    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default AppHeader;