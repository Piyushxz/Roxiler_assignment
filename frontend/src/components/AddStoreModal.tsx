import { useState, useEffect } from "react"
import { X, Search, ChevronDown } from "lucide-react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

interface AddStoreModalProps {
    isOpen: boolean
    onClose: () => void
    onStoreAdded: () => void
}

interface StoreOwner {
    id: string
    name: string
    email: string
    role: string
}

export const AddStoreModal = ({ isOpen, onClose, onStoreAdded }: AddStoreModalProps) => {
    const { token } = useAuth()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        userId: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [storeOwners, setStoreOwners] = useState<StoreOwner[]>([])
    const [filteredOwners, setFilteredOwners] = useState<StoreOwner[]>([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOwner, setSelectedOwner] = useState<StoreOwner | null>(null)

    useEffect(() => {
        if (isOpen) {
            fetchStoreOwners()
        }
    }, [isOpen])

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredOwners(storeOwners)
        } else {
            const filtered = storeOwners.filter(owner =>
                owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                owner.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredOwners(filtered)
        }
    }, [searchTerm, storeOwners])

    const fetchStoreOwners = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, {
                headers: {
                    authorization: token
                }
            })
            
            const storeOwnersOnly = response.data.users.filter((user: StoreOwner) => user.role === 'STORE_OWNER')
            setStoreOwners(storeOwnersOnly)
            setFilteredOwners(storeOwnersOnly)
        } catch (err) {
            console.error('Error fetching store owners:', err)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (!selectedOwner) {
            setError('Please select a store owner')
            setIsLoading(false)
            return
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/create-store`, {
                name: formData.name,
                description: formData.description,
                userId: selectedOwner.id
            }, {
                headers: {
                    authorization: token
                }
            })

            if (response.status === 201) {
                onStoreAdded()
                onClose()
                setFormData({
                    name: '',
                    description: '',
                    userId: ''
                })
                setSelectedOwner(null)
                setSearchTerm('')
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create store')
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleOwnerSelect = (owner: StoreOwner) => {
        setSelectedOwner(owner)
        setSearchTerm(`${owner.name} (${owner.email})`)
        setIsDropdownOpen(false)
        setFormData({
            ...formData,
            userId: owner.id
        })
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setIsDropdownOpen(true)
        if (!e.target.value) {
            setSelectedOwner(null)
            setFormData({
                ...formData,
                userId: ''
            })
        }
    }

    if (!isOpen) return null

    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center z-50">
            <div className="w-[500px] bg-black border border-white/15 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-satoshi font-bold tracking-tighter">
                        Add New Store
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition-colors duration-200"
                    >
                        <X className="size-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            Store Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white border border-black/15 rounded-md p-3 text-black font-satoshi"
                            placeholder="Enter store name"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={3}
                            className="w-full bg-white border border-black/15 rounded-md p-3 text-black font-satoshi resize-none"
                            placeholder="Enter store description"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-satoshi mb-2">
                            Store Owner *
                        </label>
                        <div className="relative">
                            <div className="flex items-center bg-white border border-black/15 rounded-md">
                                <Search className="size-4 text-gray-500 ml-3" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    onFocus={() => setIsDropdownOpen(true)}
                                    placeholder="Search store owners..."
                                    className="flex-1 p-3 text-black font-satoshi bg-transparent outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="p-3 text-gray-500 hover:text-gray-700"
                                >
                                    <ChevronDown className={`size-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                            </div>

                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 bg-white border border-black/15 rounded-md mt-1 z-10 max-h-40 overflow-y-auto">
                                    {filteredOwners.length > 0 ? (
                                        filteredOwners.map((owner) => (
                                            <button
                                                key={owner.id}
                                                type="button"
                                                onClick={() => handleOwnerSelect(owner)}
                                                className="w-full text-left px-3 py-2 text-sm font-satoshi hover:bg-gray-100 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                            >
                                                <div className="font-medium text-black">{owner.name}</div>
                                                <div className="text-gray-600 text-xs">{owner.email}</div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-3 py-2 text-sm text-gray-500">
                                            No store owners found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-400 text-sm font-satoshi">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-md font-satoshi font-semibold tracking-tighter hover:bg-gray-700 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-white text-black px-4 py-3 rounded-md font-satoshi font-semibold tracking-tighter hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating...' : 'Create Store'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}