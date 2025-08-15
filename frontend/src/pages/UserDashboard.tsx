import { Edit, Search, Star } from "lucide-react"
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { StoreCard } from "../components/StoreCard"
import { EditPasswordModal } from "../components/EditPasswordModal"

export const UserDashboard = ()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZWE0MzI2NC1iNTJhLTRkZjMtODI1NS03YzYzNzNjMzJkMjUiLCJlbWFpbCI6InBpeXV1c2VyMkBnbWFpbC5jb20iLCJyb2xlIjoiTk9STUFMX1VTRVIiLCJpYXQiOjE3NTUyNjQ4MDF9.jLIiIJfCPQBcxFmcMozciBT8_aElRYV_4-jhJTZosxM'
    const testUserId = '6ea43264-b52a-4df3-8255-7c6373c32d25'

    const [stores,setStores] = useState([])
    const [isEditPasswordModalOpen,setIsEditPasswordModalOpen] = useState(false)

    const fetchStores = async ()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/stores`,{
                headers:{
                    authorization:token
                }
            })
            setStores(response.data.stores)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{

        fetchStores()
    },[])
    return(
        <div className="w-screen h-screen bg-black">
            <Navbar/>
            <section className="w-[80%] mx-auto py-10">
                <div className="w-full flex justify-between items-center bg-[#191919] border border-white/15 rounded-md p-4">
                    <h1 className="text-2xl text-white font-satoshi font-bold tracking-tighter">
                        Welcome 
                    </h1>
                    <div className="flex items-center gap-2">
                        <button onClick={()=>setIsEditPasswordModalOpen(true)} className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2">
                            <Edit className="text-black size-4"/>
                            Update Password
                        </button>
                    </div>
                </div>
            </section>

            <section className="w-[80%] mx-auto ">
                <div className="w-full flex justify-between items-center bg-[#191919] border border-white/15 rounded-md p-4">
                <input type="text" placeholder="Search using Name , Address" className="w-full bg-transparent border-white/15 border py-2 px-4 rounded-md text-white"/>

                </div>
            </section>
            <section className="w-[80%] mx-auto py-4 ">
                
                    <div className="flex flex-wrap gap-4">
                        {
                    stores.map((store:any)=>(
                        <StoreCard key={store.id} store={store} currentUserId={testUserId} onRefresh={fetchStores}/>
                    ))
                }
                    </div>

                
            </section>
            <EditPasswordModal isOpen={isEditPasswordModalOpen} onClose={()=>setIsEditPasswordModalOpen(false)}/>
        </div>
    )
}