import axios from "axios";

const serverRequest = axios.create({
    baseURL:"http://localhost:3004/",
    headers:{
        'Conent-Type':'application/json' 
    }
})

export default serverRequest