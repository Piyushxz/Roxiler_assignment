import { Star, Edit, X } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

export const StoreCard = ({ store, currentUserId, onRefresh }: any) => {
    const [isLoading, setIsLoading] = useState(false)
    const {token} = useAuth()
    const [error, setError] = useState('')
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editFormData, setEditFormData] = useState({
        rating: 5,
        comment: ""
    })
    
    const userReview = store.ratings.find((rating: any) => rating.userId === currentUserId)
    console.log(error)
    const handleAddReview = async () => {
        setIsLoading(true)
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/store/rating/${store.id}`, {
                rating: editFormData.rating, 
                comment: editFormData.comment
            }, {
                headers: {
                    authorization: token
                }
            })
            
            if (response.status === 201) {
                onRefresh() 
                setIsEditModalOpen(false)
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add review')
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleEditReview = () => {
        setEditFormData({
            rating: userReview.rating,
            comment: userReview.comment || ""
        })
        setIsEditModalOpen(true)
    }
    
    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/store/rating/${userReview.id}`, {
                rating: editFormData.rating,
                comment: editFormData.comment
            }, {
                headers: {
                    authorization: token
                }
            })
            
            if (response.status === 200) {
                setIsEditModalOpen(false)
                onRefresh() 
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update review')
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setEditFormData(prev => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value
        }))
    }
    
    return (
        <>
            <div className="w-80 h-64 bg-[#191919] border border-white/15 rounded-md p-4 flex flex-col">
                <div className="flex justify-between items-center">
            <h1 className="text-white text-lg font-satoshi font-bold tracking-tighter">
                        {store.name}
            </h1>
            <div className="flex gap-1 items-center">
                <Star className="text-yellow-300 size-6 fill-yellow-300"/>
                <p className="text-white text-lg font-satoshi font-normal tracking-tighter">
                            {store.averageRating || 0}
                </p>
            </div>
        </div>

                <p className="text-white text-sm font-satoshi font-normal tracking-tighter py-2 flex-1">
                    {store.description}
                </p>
                
                            <p className="text-white text-sm font-satoshi font-normal tracking-tighter py-1">
                {store.owner?.address || 'No address available'}
            </p>

            <div className="mt-auto pt-2">
                    {userReview ? (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-white text-sm font-satoshi">
                                    Your rating:
                                </span>
                                <div className="flex items-center gap-1">
                                    <Star className="text-yellow-300 size-4 fill-yellow-300"/>
                                    <span className="text-white text-sm font-satoshi">
                                        {userReview.rating}
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={handleEditReview}
                                disabled={isLoading}
                                className="bg-white text-black px-3 py-2 rounded-md flex items-center gap-2 hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Edit className="size-4"/>
                                <span className="text-sm font-satoshi">{isLoading ? 'Updating...' : 'Edit Rating'}</span>
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={()=>setIsEditModalOpen(true)}
                            disabled={isLoading}
                            className="w-full bg-white text-black px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Star className="size-4"/>
                            <span className="font-satoshi font-semibold">{isLoading ? 'Adding...' : 'Add Review'}</span>
                        </button>
                    )}
                </div>
                
                {userReview?.comment && (
                    <div className="mt-3 p-2 bg-white/5 rounded-md">
                        <p className="text-white text-xs font-satoshi font-medium tracking-tighter mb-1">
                            Your Comment:
                        </p>
                        <p className="text-white/80 text-xs font-satoshi font-normal tracking-tighter">
                            {userReview.comment}
                        </p>
                    </div>
                )}
            </div>
            
            {isEditModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-black border border-white/15 rounded-lg p-6 w-96">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-white text-xl font-satoshi font-bold tracking-tighter">
                            Edit Review for {store.name}
                        </h2>
                        <button 
                            onClick={() => setIsEditModalOpen(false)}
                            className="text-white hover:text-gray-300 transition-colors duration-200"
                        >
                            <X className="size-6" />
                        </button>
                    </div>
                    
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                            <label className="block text-white text-sm font-satoshi mb-2">
                                Rating
                            </label>
                            <select
                                name="rating"
                                value={editFormData.rating}
                                onChange={handleInputChange}
                                className="w-full bg-white border border-black/15 rounded-md p-2 text-black"
                                required
                            >
                                <option value={1}>1 Star</option>
                                <option value={2}>2 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={5}>5 Stars</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-white text-sm font-satoshi mb-2">
                                Comment
                            </label>
                            <textarea
                                name="comment"
                                value={editFormData.comment}
                                onChange={handleInputChange}
                                placeholder="Write your review..."
                                className="w-full bg-white border border-black/15 rounded-md p-2 text-black resize-none"
                                rows={4}
                                required
                            />
                        </div>

                        
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md font-satoshi font-semibold hover:bg-gray-700 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={userReview ? handleEditSubmit : handleAddReview}
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md font-satoshi font-semibold hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Updating...' : userReview ? 'Update Review' : 'Add Review'}
                            </button>
                        </div>
                    </form>
                </div>
    </div>
        )}
        </>
    )
}