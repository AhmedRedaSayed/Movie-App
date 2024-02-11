import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Movies from './Components/Movies/Movies';
import People from './Components/People/People';
import Tv from './Components/Tv/Tv';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { useState ,useEffect } from 'react';
import jwtDecode from "jwt-decode";
import MovieDetails from './Components/MovieDetails/MovieDetails';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';






function App() {


  useEffect(() => {
    if(localStorage.getItem('userToken')!==null)
    {
      saveUserData()
    }
  
    
  }, [])
  

  const [userData, setUserData] = useState(null);
  

  function saveUserData()
  {
    let encodedToken = localStorage.getItem('userToken');
   let decodedToken =  jwtDecode(encodedToken);
   setUserData(decodedToken);

  }





  let routers = createBrowserRouter([
    {path:'/' , element:<Layout setUserData={setUserData} userData={userData}/> , children:[
      {path:"home" , element: <ProtectedRoute userData={userData} ><Home/></ProtectedRoute>},
      {path:"profile" , element:<ProtectedRoute userData={userData}><Profile  userData={userData}/></ProtectedRoute>},
      {path:'movies' , element:<ProtectedRoute userData={userData}><Movies/></ProtectedRoute>},
      {path:'people' , element:<ProtectedRoute userData={userData}><People/></ProtectedRoute>},
      {path:'tv' , element:<Tv/>},
      {path:'movieDetails/:id/:media_type' , element:<MovieDetails/>},
      {path:'register' , element:<Register/>},
      {index:true , element:<Login saveUserData={saveUserData}/>},
    ]}
  ]);
  return <RouterProvider router={routers}/>
}

export default App;
