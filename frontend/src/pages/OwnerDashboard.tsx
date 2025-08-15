import axios from "axios"
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import { Edit, Star, User } from "lucide-react"
import { EditPasswordModal } from "../components/EditPasswordModal"

export const OwnerDashboard = ()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NmI0M2IyMC0xZmI5LTRlZDAtOGIzMy1kOGYyOTk4YTA0NDkiLCJlbWFpbCI6InBpeXVzaDIyMjIyQGdtYWlsLmNvbSIsInJvbGUiOiJTVE9SRV9PV05FUiIsImlhdCI6MTc1NTI3NTc1OH0.LIhHY1meOu2Nh6rbZjoBLbShe0uMKdTgt5OINKLWufE'
    const storeId = '01380526-8f2d-49f5-ade2-0011c82d043a'
    const [dashboardData,setDashboardData] = useState({}) as any
    const [storeRatings,setStoreRatings] = useState([]) as any
    const [isEditPasswordModalOpen,setIsEditPasswordModalOpen] = useState(false)
    async function getDashboardData(){
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/store-owner/dashboard`,{
                headers:{
                    authorization:token
                }
            })
            console.log(response.data)
            setDashboardData(response.data.store)
        }catch(err){
            console.log(err)
        }
    }
    async function getStoreRatings(){
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/store-owner/store/ratings/${storeId}`,{
                headers:{
                    authorization:token
                }
            })
            setStoreRatings(response.data.ratings)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getDashboardData()
        getStoreRatings()

    },[])

    return(
        <div className="w-screen h-screen bg-black">
            <Navbar/>
            <section className="w-[80%] mx-auto py-10">
                <div className="flex justify-between items-center bg-[#191919] border border-white/15 rounded-md p-4">
                <div className="w-full flex flex-col  ">
                    <h1 className="text-2xl text-white font-satoshi font-bold tracking-tighter">
                        {dashboardData?.storeName}
                    </h1>
                    <h2 className="text-white font-satoshi font-medium tracking-tighter">
                        {dashboardData?.storeDescription}
                    </h2>
                </div>
                <div className="flex items-center gap-2">

                        <button onClick={()=>setIsEditPasswordModalOpen(true)} className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2 whitespace-nowrap">
                            <Edit className="text-black size-4"/>
                            <span className="font-satoshi ">Update Password</span>
                        </button>
                    </div>
                </div>

            </section>
            <section className="w-[80%] mx-auto ">
                <div className="w-full flex justify-between items-center gap-4">
                <div className="flex-1 border rounded-md bg-[#191919] border-white/15 px-2 py-2">
                                <div className="flex gap-2 items-center">
                                    <div className="border rounded-md p-2 border-white/15 size-10">
                                        <User className="text-white "/>
                                    </div>
                                    <div className="flex flex-col">
                                    <h2 className="text-white text-md font-satoshi tracking-tighter">Total Ratings</h2>
                                    <h3 className="text-white text-md font-satoshi font-semibold tracking-tighter">{dashboardData?.totalRatings}</h3>
                                    </div>
                                </div>
                </div>
                <div className="flex-1 border rounded-md bg-[#191919] border-white/15 px-2 py-2">
                                <div className="flex gap-2 items-center">
                                    <div className="border rounded-md p-2 border-white/15 size-10">
                                        <Star className="text-white "/>
                                    </div>
                                    <div className="flex flex-col">
                                    <h2 className="text-white text-md font-satoshi tracking-tighter">Average Rating</h2>
                                    <h3 className="text-white text-md font-satoshi font-semibold tracking-tighter">{dashboardData?.averageRating}</h3>
                                    </div>
                                </div>
                </div>

                                 </div>
             </section>

             <section className="w-[80%] mx-auto py-6">
                 <div className="w-full bg-[#191919] border border-white/15 rounded-md p-4">
                     <h2 className="text-white text-xl font-satoshi font-bold tracking-tighter mb-4">
                         Customer Ratings
                     </h2>
                     
                     {storeRatings.length > 0 ? (
                         <div className="space-y-4">
                             {storeRatings.map((rating: any) => (
                                 <div key={rating.id} className="bg-black border border-white/10 rounded-md p-4">
                                     <div className="flex justify-between items-start mb-3">
                                         <div className="flex items-center gap-3">
                                             <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                                 <User className="text-white size-5" />
                                             </div>
                                             <div>
                                                 <h3 className="text-white text-sm font-satoshi font-semibold tracking-tighter">
                                                     {rating.user.name}
                                                 </h3>
                                                 <p className="text-white/60 text-xs font-satoshi tracking-tighter">
                                                     {rating.user.email}
                                                 </p>
                                             </div>
                                         </div>
                                         <div className="flex items-center gap-2">
                                             <Star className="text-yellow-300 size-4 fill-yellow-300" />
                                             <span className="text-white text-sm font-satoshi font-semibold">
                                                 {rating.rating}
                                             </span>
                                         </div>
                                     </div>
                                     
                                     {rating.comment && (
                                         <div className="mt-3">
                                             <p className="text-white/80 text-sm font-satoshi tracking-tighter">
                                                 "{rating.comment}"
                                             </p>
                                         </div>
                                     )}
                                     
                                     <div className="mt-3 pt-3 border-t border-white/10">
                                         <p className="text-white/40 text-xs font-satoshi tracking-tighter">
                                             {new Date(rating.createdAt).toLocaleDateString('en-US', {
                                                 year: 'numeric',
                                                 month: 'long',
                                                 day: 'numeric',
                                                 hour: '2-digit',
                                                 minute: '2-digit'
                                             })}
                                         </p>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     ) : (
                         <div className="text-center py-8">
                             <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                 <Star className="text-white/40 size-8" />
                             </div>
                             <p className="text-white/60 text-sm font-satoshi tracking-tighter">
                                 No ratings yet
                             </p>
                         </div>
                     )}
                 </div>
             </section>
             <EditPasswordModal 
                isOpen={isEditPasswordModalOpen} 
                onClose={()=>setIsEditPasswordModalOpen(false)}
                mode="store-owner"
             />
         </div>
    )
}