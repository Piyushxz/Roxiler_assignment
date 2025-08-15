import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Eye, EyeOff } from "lucide-react"

export const Login = ()=>{
    const [activeTab, setActiveTab] = useState('login')
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        address: ''
    })

    const {login,signup} = useAuth()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData, 'Tab:', activeTab)
        if(activeTab === 'login'){
            login(formData.email,formData.password)
        }else{
            signup(formData)
        }
    }

    return(
        <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
            <div className="flex gap-4 rounded-md bg-[#191919] border border-white/15 justify-center py-2">
                <button 
                    onClick={() => setActiveTab('login')}
                    className={`mx-8 py-1 px-4 rounded-md transition-colors duration-200 ${
                        activeTab === 'login' 
                            ? 'bg-white text-black' 
                            : 'text-white hover:text-gray-300'
                    }`}
                >    
                    <h2 className="text-md font-satoshi font-bold tracking-tighter">Login</h2>
                </button>
                <button 
                    onClick={() => setActiveTab('signup')}
                    className={`mx-8 py-1 px-4 rounded-md transition-colors duration-200 ${
                        activeTab === 'signup' 
                            ? 'bg-white text-black' 
                            : 'text-white hover:text-gray-300'
                    }`}
                >    
                    <h2 className="text-md font-satoshi font-bold tracking-tighter">Signup</h2>
                </button>
            </div>
            
            <div className="w-96 bg-[#191919] border border-white/15 rounded-md p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {activeTab === 'signup' && (
                        <div>
                            <label className="block text-white text-sm font-satoshi mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                className="w-full bg-white border border-black/15 rounded-md p-2 text-black"
                                required
                            />
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="w-full bg-white border border-black/15 rounded-md p-2 text-black"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                className="w-full bg-white border border-black/15 rounded-md p-2 pr-10 text-black"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            >
                                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                            </button>
                        </div>
                    </div>

                    {activeTab === 'signup' && (
                        <div>
                            <label className="block text-white text-sm font-satoshi mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter your address"
                                className="w-full bg-white border border-black/15 rounded-md p-2 text-black"
                                required
                            />
                        </div>
                    )}
                    
                    <button
                        type="submit"
                        className="w-full bg-white text-black py-2 rounded-md font-satoshi font-semibold hover:bg-gray-100 transition-colors duration-200"
                    >
                        {activeTab === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    )
}