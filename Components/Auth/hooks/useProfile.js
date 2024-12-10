import axios from "axios";
import api from "../../../api/api";



const useProfile = () => {
    const LoadProfile = async (id)=>{
        try {
            const profile = await axios.get(`profile/${id}/`)
        } catch (error) {
            
        }
    }
}
export default useProfile
