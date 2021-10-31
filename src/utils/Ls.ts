export const ls ={
    $get:(key:string)=>{
        if(!typeof window)return;
        return localStorage.getItem(key);
    },
    $set:(key:string,value:string)=>{
        if(!typeof window)return;
        localStorage.setItem(key,value);
        return true 
    },
    $remove:(key:string)=>{
        if(!typeof window)return;
        localStorage.removeItem(key);
        return true; 
    }

}