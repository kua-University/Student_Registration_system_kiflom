import { useState } from 'react'
import { Button } from '@/components/ui/button' 

interface ChapaPaymentButtonProps {
  amount: number
  currency: string
  email: string
  firstName: string
  lastName: string
  tx_ref: string
  phoneNumber:string
}

export default function ChapaPaymentButton({
  amount,
  currency,
  email,
  firstName,
  lastName,
  tx_ref,
  phoneNumber
}: ChapaPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const initializePayment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api1/users/initpayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          email,
          first_name: firstName,
          last_name: lastName,
          tx_ref,
          phone_number:phoneNumber
        }),
      })
      const responseData = await response.json()
      if (!responseData.payment_url) {
        throw new Error('Payment initialization failed')
      }

      window.location.href = responseData.payment_url
      console.log(responseData.payment_url)
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

