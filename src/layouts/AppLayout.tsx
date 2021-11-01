import AppHeader from "../components/layouts/app-header";

const AppLayout = ({children}:any) =>{
    return (
        <div>
            <AppHeader></AppHeader>
            {children}</div>
    )
}

export default AppLayout;