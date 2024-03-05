import { useState, useEffect } from "react"
import { getOrder } from "../utils/api"

export interface Order {
  products: Array<{ name: string }>
}

const getOrderId = () => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get("orderId")
}

export const useOrder = () => {
  const [order, setOrder] = useState<Order>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const orderId = getOrderId()
      if (!orderId) {
        return
      }
      const { order } = await getOrder(orderId)
      if (order) {
        const orderArray = order.split(",").map(name => ({ name }))
        setOrder({
          products: orderArray
        })
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return { order, isLoading }
}
