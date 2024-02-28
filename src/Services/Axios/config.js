import axios from "axios";


const apiRequest = axios.create({
    baseURL:"https://restaurant-6a1aa-default-rtdb.firebaseio.com",
    headers:{
        'Conent-Type':'application/json' 
    }
})


export default apiRequest