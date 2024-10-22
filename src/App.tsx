import { Routes, Route } from 'react-router-dom';

import AuthLayout from './_auth/Forms/AuthLayout';
import SigninForm from './_auth/Forms/SigninForm';
import SignupForm from './_auth/Forms/SignupForm';
import RootLayout from './_root/pages/RootLayout';
import { Allusers, CreatePost,  EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile} from './_root/pages';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"







const App = () => {
  return (
   

    <main className="flex h-screen"> 
    <Routes>


        <Route element={<AuthLayout/>}>
        {/* public routes */}
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
        </Route>






         {/* private routes */}
         <Route element={<RootLayout/>}>
         <Route index element={<Home />} />
         <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<Allusers/>} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
         </Route>
         </Routes>
         <Toaster />

    </main>



  )
}

export default App