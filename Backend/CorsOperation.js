const whiteList = ["http://localhost:5173","http://localhost:5175"]
const Operations ={
     origin:(origin,callBack)=>{
        if(whiteList.indexOf(origin)!=-1 || !origin){
            callBack(null,true)
        }
        else{
            callBack(new Error("This API's Not Available For You!'"))
        }
     },
      originsSuccessStatus:200
}
export default Operations;