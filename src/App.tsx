import {Routes,Route} from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import { Home } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { RegisterForm } from './_auth/forms/RegisterForm';
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public */}
        <Route element={<AuthLayout/>}>
          <Route path="/sign_in" element={<SigninForm />}/>
          <Route path="/sign_up" element={<RegisterForm />}/>
        </Route>
        

        {/* private route */}
        <Route element={<RootLayout/>}>
          <Route index element={<Home />}/>
        </Route>
        
      </Routes>

      <Toaster />
    </main>

  )
}

export default App