import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import './App.css';
import conf from './conf/conf';
import authService from "./appwrite/auth";
import { login, logout } from "./store/features/authSlice";
import { Header, Footer, Container, Loading } from "./components/index";
import databaseService from './appwrite/config';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.userData);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [])


  const uploadPosts = (posts) => {
    posts.forEach((post, index) => {
      try {
        databaseService.createPost({ ...post, userId: user.$id})
          .then((dbPost) => {
            console.log(`${index + 1}. Post Created`, dbPost);
          }).catch((err) => console.log("There is an error."))
      } catch (error) {
        console.log(`${index + 1}. Post Not Created`)
      }
    })
  }




  return (

    <>
      {!loading ? (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      ) : (
        <Container>
          <Loading />
        </Container>
      )}
    </>
  )
}

export default App