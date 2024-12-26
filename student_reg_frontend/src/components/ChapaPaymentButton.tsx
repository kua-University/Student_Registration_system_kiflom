'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ChapaPaymentButtonProps {
  amount: number
  currency: string
  email: string
  firstName: string
  lastName: string
  tx_ref: string
}

export default function ChapaPaymentButton({
  amount,
  currency,
  email,
  firstName,
  lastName,
  tx_ref,
}: ChapaPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const initializePayment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/users/initialize-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          email,
          first_name: firstName,
          last_name: lastName,
          tx_ref,
        }),
      })

      if (!response.ok) {
        throw new Error('Payment initialization failed')
      }

      const data = await response.json()
      window.location.href = data.data.checkout_url
    } catch (error) {
      console.error('Error initializing payment:', error)
      alert('Failed to initialize payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={initializePayment} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Pay with Chapa'}
    </Button>
  )
}

