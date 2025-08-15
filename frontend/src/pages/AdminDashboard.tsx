import { LayoutDashboard, PlusIcon, Store, StoreIcon, Users, UserStar, ChevronDown } from "lucide-react"
import { Navbar } from "../components/Navbar"
import { useState } from "react"

export const AdminDashboard = ()=>{
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'stores'>('overview')
    const [selectedRole, setSelectedRole] = useState<string>('All Roles')
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
    const [selectedRating, setSelectedRating] = useState<string>('All Ratings')
    const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false)
    
    const roles = ['All Roles', 'SYSTEM_ADMIN', 'NORMAL_USER', 'STORE_OWNER']
    const ratings = ['All Ratings', '1', '2', '3', '4', '5']

    return(
        <div className="w-screen h-screen bg-black">
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

                {/* Conditional rendering based on active tab */}
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
                                    <h3 className="text-white text-md font-satoshi font-semibold tracking-tighter">100</h3>
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
                                    <h3 className="text-white text-md font-satoshi font-semibold tracking-tighter">100</h3>
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
                                    <h3 className="text-white text-md font-satoshi font-semibold tracking-tighter">100</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex items-center gap-4 my-4">
                            <div className="flex-1 border rounded-md bg-[#191919] border-white/15 px-2 py-2">
                                <button className="w-full hover:opacity-80 cursor-pointer transition-all duration-300 bg-white text-black px-4 py-2 rounded-md flex items-center gap-2 ">
                                    <PlusIcon className="size-4 text-black"/>
                                    <h3 className="text-black text-md font-satoshi font-semibold tracking-tighter">
                                        Add User
                                    </h3>
                                </button>
                            </div>
                            <div className="flex-1 border rounded-md bg-[#191919] border-white/15 px-2 py-2">
                            <button className="w-full hover:opacity-80 transition-all cursor-pointer duration-300 bg-white text-black px-4 py-2 rounded-md flex items-center gap-2">
                                        <PlusIcon className="size-4 text-black"/>
                                    <h3 className="text-black text-md font-satoshi font-semibold tracking-tighter">
                                        Add Store
                                    </h3>
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'users' && (
                    <>
                                        <div className="w-full bg-[#191919] rounded-md border border-white/15 p-2">
                        <div className="flex  justify-end">
                            <button className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2">
                                <PlusIcon className="size-4 text-black"/>
                                <h3 className="text-black text-md font-satoshi font-semibold tracking-tighter">
                                    Add User
                                </h3>
                            </button>



                        </div>
                                                 <div className="flex gap-4 pt-4">
                             <input type="text" placeholder="Filter By Name" className="flex-1 bg-white border border-black/15 rounded-md p-2" />
                             <input type="text" placeholder="Filter By Email" className="flex-1 bg-white border border-black/15 rounded-md p-2" />
                             <input type="text" placeholder="Filter By Address" className="flex-1 bg-white border border-black/15 rounded-md p-2" />
                             
                             {/* Role Dropdown */}
                             <div className="relative">
                                 <button 
                                     onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                     className="flex items-center justify-between bg-white border border-black/15 rounded-md p-2 min-w-[150px]"
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
                             <table className="w-full">
                                 <thead>
                                     <tr className="border-b border-white/15">
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4">
                                             Name
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4">
                                             Email
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4">
                                             Address
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4">
                                             Role
                                         </th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {/* Sample data - replace with actual API data */}
                                     <tr className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             John Doe
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             john.doe@example.com
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             123 Main St, City, State
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-xs">
                                                 NORMAL_USER
                                             </span>
                                         </td>
                                     </tr>
                                     <tr className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             Jane Smith
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             jane.smith@example.com
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             456 Oak Ave, Town, State
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-md text-xs">
                                                 SYSTEM_ADMIN
                                             </span>
                                         </td>
                                     </tr>
                                     <tr className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             Mike Johnson
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             mike.johnson@example.com
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             789 Pine Rd, Village, State
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-md text-xs">
                                                 STORE_OWNER
                                             </span>
                                         </td>
                                     </tr>
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
                             <button className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2">
                                 <PlusIcon className="size-4 text-black"/>
                                 <h3 className="text-black text-md font-satoshi font-semibold tracking-tighter">
                                     Add Store
                                 </h3>
                             </button>
                         </div>
                         <div className="flex gap-4 pt-4">
                             <input type="text" placeholder="Filter By Store Name" className="flex-1 bg-white border border-black/15 rounded-md p-2" />
                             <input type="text" placeholder="Filter By Description" className="flex-1 bg-white border border-black/15 rounded-md p-2" />
                             
                             {/* Rating Dropdown */}
                             <div className="relative">
                                 <button 
                                     onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
                                     className="flex items-center justify-between bg-white border border-black/15 rounded-md p-2 min-w-[150px]"
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
                         
                         {/* Table */}
                         <div className="overflow-x-auto">
                             <table className="w-full">
                                 <thead>
                                     <tr className="border-b border-white/15">
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4">
                                             Name
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4">
                                             Email
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4">
                                             Address
                                         </th>
                                         <th className="text-left text-white text-sm font-satoshi font-semibold tracking-tighter py-3 px-4">
                                             Rating
                                         </th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {/* Sample data - replace with actual API data */}
                                     <tr className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             TechMart Electronics
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             techmart@example.com
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             123 Tech Street, Silicon Valley, CA
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             <div className="flex items-center gap-1">
                                                 <span className="text-yellow-400">★</span>
                                                 <span className="text-white">4.5</span>
                                             </div>
                                         </td>
                                     </tr>
                                     <tr className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             Fashion Forward
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             fashion@example.com
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             456 Style Avenue, Fashion District, NY
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             <div className="flex items-center gap-1">
                                                 <span className="text-yellow-400">★</span>
                                                 <span className="text-white">3.8</span>
                                             </div>
                                         </td>
                                     </tr>
                                     <tr className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             Gourmet Delights
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             gourmet@example.com
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             789 Food Court, Culinary Quarter, TX
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             <div className="flex items-center gap-1">
                                                 <span className="text-yellow-400">★</span>
                                                 <span className="text-white">4.9</span>
                                             </div>
                                         </td>
                                     </tr>
                                     <tr className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             Home & Garden Plus
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             homegarden@example.com
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             321 Garden Lane, Suburban Heights, FL
                                         </td>
                                         <td className="text-white text-sm font-satoshi py-3 px-4">
                                             <div className="flex items-center gap-1">
                                                 <span className="text-yellow-400">★</span>
                                                 <span className="text-white">4.2</span>
                                             </div>
                                         </td>
                                     </tr>
                                 </tbody>
                             </table>
                         </div>
                         
                         {/* No data message */}
                         {/* <div className="text-center text-white/60 text-sm font-satoshi py-8">
                             No stores found
                         </div> */}
                     </div>
                    </>
                )}
            </section>
        </div>
    )
}