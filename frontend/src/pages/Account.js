import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'

const Account = () => {
  const [userDetails, setUserDetails] = useState(null)
  const user = useSelector(state => state.user)

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setUserDetails(data.data)
      }
    } catch (err) {
      console.error('Error fetching user details:', err)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Account Details</h2>
        <div className="flex items-center space-x-4 mb-4">
          {userDetails?.profilePic && (
            <img 
              src={userDetails.profilePic} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <div className="space-y-3">
            <p><span className="font-semibold">Name:</span> {userDetails?.name || user.name}</p>
            <p><span className="font-semibold">Email:</span> {userDetails?.email || user.email}</p>
            <p><span className="font-semibold">Role:</span> {userDetails?.role || 'User'}</p>
            <p><span className="font-semibold">Member Since:</span> {userDetails?.createdAt ? moment(userDetails.createdAt).format('MMMM YYYY') : 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Order History</h2>
        {!userDetails?.orderHistory || userDetails.orderHistory.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="space-y-4">
            {userDetails.orderHistory.map((order, index) => (
              <div key={index} className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">Order #{index + 1}</p>
                  <p className="text-gray-600">{moment(order.orderDate).format('MMM DD, YYYY')}</p>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={order.productImage} 
                    alt={order.productName}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{order.productName}</p>
                    <p className="text-gray-600">Quantity: {order.quantity}</p>
                    <p className="text-gray-600">Price: {displayINRCurrency(order.price)}</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t">
                  <p className="text-right font-semibold">
                    Total: {displayINRCurrency(order.price * order.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Account