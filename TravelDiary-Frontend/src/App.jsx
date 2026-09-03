import './App.css'
import Register from "./pages/Register";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import MyPosts from './pages/MyPosts';
import Profile from './pages/Profile';
import EditPost from './pages/EditPost';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
      <Route path='/create-post' element={ <PrivateRoute><CreatePost /></PrivateRoute> } />
      <Route path="/my-posts"element={<PrivateRoute><MyPosts /></PrivateRoute>}/>
      <Route path='/profile' element={<PrivateRoute><Profile /> </PrivateRoute>} />
      <Route path='/edit-post/:id' element={ <PrivateRoute><EditPost /> </PrivateRoute>} />
    </Routes>
  );
}

export default App


