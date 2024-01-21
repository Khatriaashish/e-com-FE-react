import HttpService from "../../../repository/http.service";

class UserService extends HttpService{
    userLists = async({role, page=1, limit=1000})=>{
        try{
            let response = await this.getRequest(
                'user/by-role/'+role+"/page="+page+"limit="+limit,
                {auth: true}
            )
            return response
        }
        catch(except){
            throw except
        }
    }
}

const userSvc = new UserService();
export default userSvc