import axios from "axios";

export const hanldeErrors = (error:unknown) => {
    if(axios.isAxiosError(error)){
        if(error.response){
            if(error.response.data){
                return (error.response.data as {message: Array<string>}).message[0]
            }else{
                return error.message;
            }
        }else{
            return error.message;
        }
        
    }else{
        return 'ERROR NO CONTROLADO'
    }
}