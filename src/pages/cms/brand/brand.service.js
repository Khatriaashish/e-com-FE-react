import HttpService from "../../../repository/http.service"

class BrandService extends HttpService{
    brandLists = async({page=1, limit=10, search=""})=>{
        try{
            const data = await this.getRequest(
                'v1/brand?page='+page+"&limit="+limit+"&search="+search,
                {auth: true}
            )
            return data;
        }
        catch(except){
            throw except;
        }
    }

    storeBrand = async(data)=>{
        try{
            let response = await this.postRequest(
                'v1/brand',
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
                'v1/brand/' + id,
                {auth: true}
            )
            return response
        }
        catch(except){
            
        }
    }

    updateBrand = async(id, data)=>{
        try{
            let response = await this.putRequest(
                'v1/brand/' + id,
                data,
                {file: true, auth: true}
            )
            return response
        }
        catch(except){
            
        }
    }

    getBrandById = async(id)=>{
        try{
            let response = await this.getRequest(
                'v1/brand/' + id,
                {auth: true}
            )
            return response
        }
        catch(except){
            
        }
    }
}

const brandSvc = new BrandService();
export default brandSvc