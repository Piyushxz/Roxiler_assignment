import { Edit, Search, Star } from "lucide-react"
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { StoreCard } from "../components/StoreCard"
import { EditPasswordModal } from "../components/EditPasswordModal"
import { useAuth } from "../context/AuthContext"

export const UserDashboard = ()=>{

    const {user,token} = useAuth()
    const [stores,setStores] = useState([])
    const [filteredStores,setFilteredStores] = useState([])
    const [searchQuery,setSearchQuery] = useState('')
    const [isEditPasswordModalOpen,setIsEditPasswordModalOpen] = useState(false)

    const fetchStores = async ()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/stores`,{
                headers:{
                    authorization:token
                }
            })
            setStores(response.data.stores)
            setFilteredStores(response.data.stores)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchStores()
    },[])

    useEffect(()=>{
        if(searchQuery.trim() === ''){
            setFilteredStores(stores)
        } else {
            const filtered = stores.filter((store:any) => 
                store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                store.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                store.address?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredStores(filtered)
        }
    },[searchQuery, stores])
    return(
        <div className="w-[100vw] h-screen bg-black">
            <Navbar/>
            <section className="w-[80%] mx-auto py-10">
                <div className="w-full flex justify-between items-center bg-[#191919] border border-white/15 rounded-md p-4">
                    <h1 className="text-2xl text-white font-satoshi font-bold tracking-tighter">
                        Welcome {user?.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <button onClick={()=>setIsEditPasswordModalOpen(true)} className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2">
                            <Edit className="text-black size-4"/>
                            Update Password
                        </button>
                    </div>
                </div>
            </section>

        <div className="flex justify-center ">
        <section className="w-[80%] ">
                <div className="w-full flex justify-between items-center bg-[#191919] border border-white/15 rounded-md p-4">
                <input 
                    type="text" 
                    placeholder="Search using Name, Address, Description" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-white/15 border py-2 px-4 rounded-md text-white"
                />
                </div>
            </section>
        </div>

            <section className=" py-4  flex justify-center px-10 ">
                
                    <div className="flex flex-wrap gap-4 ">
                        {
                    filteredStores.map((store:any)=>(
                        <StoreCard key={store.id} store={store} currentUserId={user?.id} onRefresh={fetchStores}/>
                    ))
                }
                    </div>

                
            </section>
            <EditPasswordModal isOpen={isEditPasswordModalOpen} onClose={()=>setIsEditPasswordModalOpen(false)}/>
        </div>
    )
}