import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'
import { API_BASE_URL } from '../config'

const Account = () => {
  const [orders, setOrders] = useState([])
  const [userDetails, setUserDetails] = useState(null)
  const user = useSelector(state => state.user)

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/details`, {
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

  const fetchOrders = async () => {
    try {
      const response = await fetch(SummaryApi.userOrders.url, {
        method: SummaryApi.userOrders.method,
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setOrders(data.data)
      }
    } catch (err) {
      console.error('Error fetching orders:', err)
    }
  }

  useEffect(() => {
    fetchUserDetails()
    fetchOrders()
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
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">Order #{order._id}</p>
                  <p className="text-gray-600">{moment(order.createdAt).format('MMM DD, YYYY')}</p>
                </div>
                <div className="space-y-2">
                  {order.items.map(item => (
                    <div key={item._id} className="flex justify-between">
                      <p>{item.product.name} x {item.quantity}</p>
                      <p>{displayINRCurrency(item.price)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t">
                  <p className="text-right font-semibold">
                    Total: {displayINRCurrency(order.totalAmount)}
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