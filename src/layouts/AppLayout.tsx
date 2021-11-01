import AppHeader from "../components/layouts/app-header";
import { withRouter } from 'react-router-dom'
const AppLayout = ({children}:any) =>{
    return (
        <div>
            <AppHeader></AppHeader>
            {children}</div>
    )
}

export default AppLayout;