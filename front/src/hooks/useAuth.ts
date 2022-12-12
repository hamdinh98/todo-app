
const useAuth = () => {

    const username:string | null = localStorage.getItem('username');
   if(username){
       return JSON.parse(username).username.split("@")[0];
   }
    return username;
}


export default useAuth;