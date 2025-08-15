import { Navigate } from "react-router-dom"

export const NavigateTo = (role:string)=>{
    let path = ''
    switch(role){
        case 'SYSTEM_ADMIN':
            path = '/admin'
            break
        case 'STORE_OWNER':
            path = '/owner'
            break
        case 'NORMAL_USER':
            path = '/user'
            break
        default:
            path = '/login'
            break
    }
    return(
        <Navigate to={path} />
    )
}