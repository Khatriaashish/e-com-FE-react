import HttpService from "../../../repository/http.service"

class ProductService extends HttpService{
    productLists = async({page=1, limit=10, search=""})=>{
        try{
            const data = await this.getRequest(
                'v1/product?page='+page+"&limit="+limit+"&search="+search,
                {auth: true}
            )
            return data;
        }
        catch(except){
            throw except;
        }
    }

    storeProduct = async(data)=>{
        try{
            let response = await this.postRequest(
                'v1/product',
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
                'v1/product/' + id,
                {auth: true}
            )
            return response
        }
        catch(except){
            
        }
    }

    updateProduct = async(id, data)=>{
        try{
            let response = await this.putRequest(
                'v1/product/' + id,
                data,
                {file: true, auth: true}
            )
            console.log(response)
            return response
        }
        catch(except){
            
        }
    }

    getProductById = async(id)=>{
        try{
            let response = await this.getRequest(
                'v1/product/' + id,
                {auth: true}
            )
            return response
        }
        catch(except){
            
        }
    }
}

const productSvc = new ProductService();
export default productSvc