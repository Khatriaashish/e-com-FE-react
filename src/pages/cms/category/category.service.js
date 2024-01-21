import HttpService from "../../../repository/http.service"

class CategoryService extends HttpService{
    categoryLists = async({page=1, limit=10, search=""})=>{
        try{
            const data = await this.getRequest(
                'v1/category?page='+page+"&limit="+limit+"&search="+search,
                {auth: true}
            )
            return data;
        }
        catch(except){
            throw except;
        }
    }

    storeCategory = async(data)=>{
        try{
            let response = await this.postRequest(
                'v1/category',
                data,
                {file: true, auth: true}
            )
            return response
        }
        catch(except){
            throw except
        }
    }

    deleteById =async(id)=>{
        try{
            let response = await this.deleteRequest(
                'v1/category/' + id,
                {auth: true}
            )
            return response
        }
        catch(except){
            
        }
    }

    updateCategory = async(id, data)=>{
        try{
            let response = await this.putRequest(
                'v1/category/' + id,
                data,
                {file: true, auth: true}
            )
            console.log(response)
            return response
        }
        catch(except){
            
        }
    }

    getCategoryById = async(id)=>{
        try{
            let response = await this.getRequest(
                'v1/category/' + id,
                {auth: true}
            )
            return response
        }
        catch(except){
            
        }
    }
}

const categorySvc = new CategoryService();
export default categorySvc