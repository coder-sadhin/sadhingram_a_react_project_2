import {Routes,Route} from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import RegisterForm from './_auth/forms/RegisterForm';
import { Home } from './_root/pages';


const App = () => {
  return (
    
    <main className="flex h-screen">
      <Routes>
        {/* public */}
        <Route path="/sign_in" element={<SigninForm />}/>
        <Route path="/sign_up" element={<RegisterForm />}/>

        {/* private route */}
        <Route index element={<Home />}/>
      </Routes>
    </main>

  )
}

export default App