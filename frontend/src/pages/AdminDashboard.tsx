import { LayoutDashboard, PlusIcon, Store, StoreIcon, Users, UserStar, ChevronDown } from "lucide-react"
import { Navbar } from "../components/Navbar"
import { AddUserModal } from "../components/AddUserModal"
import { AddStoreModal } from "../components/AddStoreModal"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

export const AdminDashboard = ()=>{
    const { token } = useAuth()
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'stores'>('overview')
    
    // User filters
    const [selectedRole, setSelectedRole] = useState<string>('All Roles')
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
    const [userNameFilter, setUserNameFilter] = useState('')
    const [userEmailFilter, setUserEmailFilter] = useState('')
    const [userAddressFilter, setUserAddressFilter] = useState('')
    
    // Store filters
    const [selectedRating, setSelectedRating] = useState<string>('All Ratings')
    const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false)
    const [storeNameFilter, setStoreNameFilter] = useState('')
    const [storeDescriptionFilter, setStoreDescriptionFilter] = useState('')
    
    // Data states
    const [totalRatings,setTotalRatings] = useState(0)
    const [totalStores,setTotalStores] = useState(0)
    const [totalUsers,setTotalUsers] = useState(0)
    const [stores,setStores]= useState([])
    const [users,setUsers]= useState([])
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
    const [isAddStoreModalOpen, setIsAddStoreModalOpen] = useState(false)
    
    const roles = ['All Roles', 'SYSTEM_ADMIN', 'NORMAL_USER', 'STORE_OWNER']
    const ratings = ['All Ratings', '1', '2', '3', '4', '5']


    async function getDashboardData(){
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`,{
                headers:{
                    authorization: token
                }
            })
            setTotalRatings(response.data.totalRatings)
            setTotalStores(response.data.totalStores)
            setTotalUsers(response.data.totalUsers)
        }
        catch(err){
            console.log(err)
        }

    }

    async function getStores(){
        try{
            let url = `${import.meta.env.VITE_API_URL}/admin/stores?name=${storeNameFilter}&description=${storeDescriptionFilter}&rating=${selectedRating}`;
            
            
            const response = await axios.get(url,{
                headers:{
                    authorization: token
                }
            })
            console.log(response.data)
            setStores(response.data.stores)
        }catch(err){
            console.log(err)
        }
    }

    async function getUsers(){
        try{

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users?name=${userNameFilter}&email=${userEmailFilter}&address=${userAddressFilter}&role=${selectedRole}`,{
                headers:{
                    authorization: token
                }
            })
            console.log(response.data)
            setUsers(response.data.users)
            
        }catch(err){
            console.log(err)
        }
    }

    // Dashboard data effect
    useEffect(()=>{
        getDashboardData()
    },[])

    useEffect(()=>{
        getUsers()
    },[userNameFilter, userEmailFilter, userAddressFilter, selectedRole])

    useEffect(()=>{
        getStores()
    },[storeNameFilter, storeDescriptionFilter, selectedRating])

    return(
        <div className="min-h-screen bg-black">
            <Navbar/>
            <section className="w-[80%] mx-auto py-10">

                <h1 className="text-white text-4xl font-satoshi font-bold tracking-tighter">
                    Admin Dashboard
                </h1>

                <div className="w-full flex items-center gap-14 my-5 !bg-[#191919] py-3 border border-white/15 px-2 rounded-md relative">
                    <div 
                        className={`flex items-center gap-1 px-3 cursor-pointer  ${
                            activeTab === 'overview' ? 'bg-white text-black rounded-md font-bold transition-all duration-300' : 'text-white'
                        }`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <LayoutDashboard className="text-inherit  size-6"/>
                        <h3 className="text-inherit  text-lg font-satoshi tracking-tighter">Overview</h3>
                    </div>
                    <div 
                        className={`flex items-center gap-1 px-3 cursor-pointer  ${
                            activeTab === 'users' ? 'bg-white text-black rounded-md font-bold transition-all duration-300' : ' text-white'
                        }`}
                        onClick={() => setActiveTab('users')}
                    >
                        <Users className="text-inherit size-6"/>
                        <h3 className="text-inherit text-lg font-satoshi tracking-tighter">Users</h3>
                    </div>
                    <div 
                        className={`flex items-center gap-1 px-3 cursor-pointer  ${
                            activeTab === 'stores' ? 'bg-white text-black rounded-md font-bold transition-all duration-300' : 'text-white'
                        }`}
                        onClick={() => setActiveTab('stores')}
                    >
                        <Store className="text-inherit size-6"/>
                        <h3 className="text-inherit text-lg font-satoshi tracking-tighter">Stores</h3>
                    </div>
                </div>

                {activeTab === 'overview' && (
                    <>
                        <div className="w-full flex justify-between items-center gap-4">
                            <div className="flex-1 border rounded-md bg-[#191919] border-white/15 px-2 py-2">
                                <div className="flex gap-2 items-center">
                                    <div className="border rounded-md p-2 border-white/15 size-10">
                                        <Users className="text-white "/>
                                    </div>
                                    <div className="flex flex-col">
                                    <h2 className="text-white text-md font-satoshi tracking-tighter">Total Users</h2>
                                    <h3 className="text-white text-md font-satoshi font-semibold tracking-tighter">{totalUsers}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 border rounded-md bg-[#191919] border-white/15 px-2 py-2">
                                <div className="flex gap-2 items-center">
                                    <div className="border rounded-md p-2 border-white/15 size-10">
                                        <StoreIcon className="text-white "/>
                                    </div>
                                    <div className="flex flex-col">
                                    <h2 className="text-white text-md font-satoshi tracking-tighter">Total Stores</h2>
                                    <h3 className="text-white text-md font-satoshi font-semibold tracking-tighter">{totalStores}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 border rounded-md bg-[#191919] border-white/15 px-2 py-2">
                                <div className="flex gap-2 items-center">
                                    <div className="border rounded-md p-2 border-white/15 size-10">
                                        <UserStar className="text-white "/>
                                    </div>
                                    <div className="flex flex-col">
                                    <h2 className="text-white text-md font-satoshi tracking-tighter">Total Ratings</h2>
                                    <h3 className="text-white text-md font-satoshi font-semibold tracking-tighter">{totalRatings}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                )}

                {activeTab === 'users' && (
                    <>
                                        <div className="w-full bg-[#191919] rounded-md border border-white/15 p-2">
                        <div className="flex  justify-end">
                            <button 
                                onClick={() => setIsAddUserModalOpen(true)}
                                className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2"
                            >
                                <PlusIcon className="size-4 text-black"/>
                                <h3 className="text-black text-md font-satoshi font-semibold tracking-tighter">
                                    Add User
                                </h3>
                            </button>



                        </div>
                                                 <div className="flex flex-wrap gap-4 pt-4">
                             <input 
                                 type="text" 
                                 placeholder="Filter By Name" 
                                 value={userNameFilter}
                                 onChange={(e) => setUserNameFilter(e.target.value)}
                                 className="flex-1 min-w-[200px] bg-white border border-black/15 rounded-md p-2" 
                             />
                             <input 
                                 type="text" 
                                 placeholder="Filter By Email" 
                                 value={userEmailFilter}
                                 onChange={(e) => setUserEmailFilter(e.target.value)}
                                 className="flex-1 min-w-[200px] bg-white border border-black/15 rounded-md p-2" 
                             />
                             <input 
                                 type="text" 
                                 placeholder="Filter By Address" 
                                 value={userAddressFilter}
                                 onChange={(e) => setUserAddressFilter(e.target.value)}
                                 className="flex-1 min-w-[200px] bg-white border border-black/15 rounded-md p-2" 
                             />
                             
                             {/* Role Dropdown */}
                             <div className="relative min-w-[150px]">
                                 <button 
                                     onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                     className="flex items-center justify-between bg-white border border-black/15 rounded-md p-2 w-full"
                                 >
                                     <span className="text-black text-sm font-satoshi">{selectedRole}</span>
                                     <ChevronDown className={`text-black size-4 transition-transform duration-200 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                                 </button>
                                 
                                 {isRoleDropdownOpen && (
                                     <div className="absolute top-full left-0 right-0 bg-white border border-black/15 rounded-md mt-1 z-10 max-h-40 overflow-y-auto">
                                         {roles.map((role) => (
                                             <button
                                                 key={role}
                                                 onClick={() => {
                                                     setSelectedRole(role)
                                                     setIsRoleDropdownOpen(false)
                                                 }}
                                                 className={`w-full text-left px-3 py-2 text-sm font-satoshi hover:bg-gray-100 transition-colors duration-200 ${
                                                     selectedRole === role ? 'bg-gray-100 text-black' : 'text-black'
                                                 }`}
                                             >
                                                 {role}
                                             </button>
                                         ))}
                                     </div>
                                 )}
                             </div>
                         </div>
                    </div>

                                         <div className="w-full bg-[#191919] rounded-md border border-white/15 p-4 mt-4">
                         <h2 className="text-white text-xl font-satoshi font-bold tracking-tighter mb-4">
                             Users List
                         </h2>
                         
                         {/* Table */}
                         <div className="overflow-x-auto">
                             <table className="w-full min-w-full table-fixed">
                                 <thead>
                                     <tr className="border-b border-white/15">
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4 w-1/4">
                                             Name
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4 w-1/4">
                                             Email
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4 w-1/4">
                                             Address
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4 w-1/4">
                                             Role
                                         </th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {users.length > 0 ? (
                                         users.map((user: any) => (
                                             <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                                 <td className="text-white text-sm font-satoshi py-3 px-4">
                                                     {user.name}
                                                 </td>
                                                 <td className="text-white text-sm font-satoshi py-3 px-4">
                                                     {user.email}
                                                 </td>
                                                 <td className="text-white text-sm font-satoshi py-3 px-4">
                                                     {user.address || 'No address'}
                                                 </td>
                                                 <td className="text-white text-sm font-satoshi py-3 px-4">
                                                     <span className={`px-2 py-1 rounded-md text-xs ${
                                                         user.role === 'NORMAL_USER' ? 'bg-blue-500/20 text-blue-300' :
                                                         user.role === 'SYSTEM_ADMIN' ? 'bg-red-500/20 text-red-300' :
                                                         'bg-green-500/20 text-green-300'
                                                     }`}>
                                                         {user.role}
                                                     </span>
                                                 </td>
                                             </tr>
                                         ))
                                     ) : (
                                         <tr>
                                             <td colSpan={4} className="text-center text-white/60 text-sm font-satoshi py-8">
                                                 No users found
                                             </td>
                                         </tr>
                                     )}
                                 </tbody>
                             </table>
                         </div>
                         
                         {/* No data message */}
                         {/* <div className="text-center text-white/60 text-sm font-satoshi py-8">
                             No users found
                         </div> */}
                     </div>
                    </>

                )}

                {activeTab === 'stores' && (
                    <>
                        <div className="w-full bg-[#191919] rounded-md border border-white/15 p-2">
                                                 <div className="flex  justify-end">
                                                         <button 
                                onClick={() => setIsAddStoreModalOpen(true)}
                                className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2"
                            >
                                <PlusIcon className="size-4 text-black"/>
                                <h3 className="text-black text-md font-satoshi font-semibold tracking-tighter">
                                    Add Store
                                </h3>
                            </button>
                         </div>
                         <div className="flex flex-wrap gap-4 pt-4">
                             <input 
                                 type="text" 
                                 placeholder="Filter By Store Name" 
                                 value={storeNameFilter}
                                 onChange={(e) => setStoreNameFilter(e.target.value)}
                                 className="flex-1 min-w-[200px] bg-white border border-black/15 rounded-md p-2" 
                             />
                             <input 
                                 type="text" 
                                 placeholder="Filter By Description" 
                                 value={storeDescriptionFilter}
                                 onChange={(e) => setStoreDescriptionFilter(e.target.value)}
                                 className="flex-1 min-w-[200px] bg-white border border-black/15 rounded-md p-2" 
                             />
                             
                             <div className="relative min-w-[150px]">
                                 <button 
                                     onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
                                     className="flex items-center justify-between bg-white border border-black/15 rounded-md p-2 w-full"
                                 >
                                     <span className="text-black text-sm font-satoshi">{selectedRating}</span>
                                     <ChevronDown className={`text-black size-4 transition-transform duration-200 ${isRatingDropdownOpen ? 'rotate-180' : ''}`} />
                                 </button>
                                 
                                 {isRatingDropdownOpen && (
                                     <div className="absolute top-full left-0 right-0 bg-white border border-black/15 rounded-md mt-1 z-10 max-h-40 overflow-y-auto">
                                         {ratings.map((rating) => (
                                             <button
                                                 key={rating}
                                                 onClick={() => {
                                                     setSelectedRating(rating)
                                                     setIsRatingDropdownOpen(false)
                                                 }}
                                                 className={`w-full text-left px-3 py-2 text-sm font-satoshi hover:bg-gray-100 transition-colors duration-200 ${
                                                     selectedRating === rating ? 'bg-gray-100 text-black' : 'text-black'
                                                 }`}
                                             >
                                                 {rating === 'All Ratings' ? rating : `${rating} Star${rating !== '1' ? 's' : ''}`}
                                             </button>
                                         ))}
                                     </div>
                                 )}
                             </div>
                         </div>
                    </div>

                                         <div className="w-full bg-[#191919] rounded-md border border-white/15 p-4 mt-4">
                         <h2 className="text-white text-xl font-satoshi font-bold tracking-tighter mb-4">
                             Stores List
                         </h2>
                         
                         <div className="overflow-x-auto">
                             <table className="w-full min-w-full table-fixed">
                                 <thead>
                                     <tr className="border-b border-white/15">
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4 w-1/4">
                                             Name
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4 w-1/4">
                                             Email
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4 w-1/4">
                                             Address
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4 w-1/4">
                                             Rating
                                         </th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {stores.length > 0 ? (
                                         stores.map((store: any) => (
                                             <tr key={store.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                                 <td className="text-white text-sm font-satoshi py-3 px-4">
                                                     {store.name}
                                                 </td>
                                                 <td className="text-white text-sm font-satoshi py-3 px-4">
                                                     {store.owner?.email || 'No email'}
                                                 </td>
                                                 <td className="text-white text-sm font-satoshi py-3 px-4">
                                                     {store.owner?.address || 'No address'}
                                                 </td>
                                                 <td className="text-white text-sm font-satoshi py-3 px-4">
                                                     <div className="flex items-center gap-1">
                                                         <span className="text-yellow-400">★</span>
                                                         <span className="text-white">{store.averageRating || 0}</span>
                                                     </div>
                                                 </td>
                                             </tr>
                                         ))
                                     ) : (
                                         <tr>
                                             <td colSpan={4} className="text-center text-white/60 text-sm font-satoshi py-8">
                                                 No stores found
                                             </td>
                                         </tr>
                                     )}
                                 </tbody>
                             </table>
                         </div>

                     </div>
                    </>
                )}
            </section>

            <AddUserModal 
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                onUserAdded={() => {
                    getUsers()
                    getDashboardData()
                }}
            />

            <AddStoreModal 
                isOpen={isAddStoreModalOpen}
                onClose={() => setIsAddStoreModalOpen(false)}
                onStoreAdded={() => {
                    getStores()
                    getDashboardData()
                }}
            />
        </div>
    )
}