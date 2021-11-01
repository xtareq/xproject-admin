import { Divider } from "antd"
import { withRouter } from 'react-router-dom'


const AuthLayout = ({children}:any) =>{
    return (
        <div
        style={{

          backgroundColor: "#063158",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
        {children}
        </div>
      
    )
}

export default withRouter(AuthLayout);