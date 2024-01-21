import HttpService from "../../../repository/http.service"

class BannerService extends HttpService{
    bannerLists = async({page=1, limit=10, search=""})=>{
        try{
            const data = await this.getRequest(
                'v1/banner?page='+page+"&limit="+limit+"&search="+search,
                {auth: true}
            )
            return data;
        }
        catch(except){
            throw except;
        }
    }

    storeBanner = async(data)=>{
        try{
            let response = await this.postRequest(
                'v1/banner',
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
                'v1/banner/' + id,
                {auth: true}
            )
            return response
        }
        catch(except){
            
        }
    }

    updateBanner = async(id, data)=>{
        try{
            let response = await this.putRequest(
                'v1/banner/' + id,
                data,
                {file: true, auth: true}
            )
            return response
        }
        catch(except){
            
        }
    }

    getBannerById = async(id)=>{
        try{
            let response = await this.getRequest(
                'v1/banner/' + id,
                {auth: true}
            )
            return response
        }
        catch(except){
            
        }
    }
}

const bannerSvc = new BannerService();
export default bannerSvc