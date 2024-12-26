import './App.css'
import StudentRegistration from '@/components/StudentRegistration'
import { Toaster} from '@/components/ui/toaster'
import ChapaPaymentButton from './components/ChapaPaymentButton'
export default function App() {
  return (
    <>
    {/* <StudentRegistration /> */}
    {/* <Toaster /> */}
    <ChapaPaymentButton
        amount={1000} // Amount in cents
        currency="ETB"
        email="customer@example.com"
        firstName="John"
        lastName="Doe"
        tx_ref={`tx-${Date.now()}`} // Generate a unique transaction reference
      />
    </>
  )
}
