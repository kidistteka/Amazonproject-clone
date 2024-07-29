import React,{useContext,useEffect} from 'react';
import Routeing from './Router'
import { DataContext } from './Components/DataProvider/DataProvider';
import { Type } from './utility/action.type';
import { auth } from './utility/firebase';


function App() {
  const [ {user}, dispatch ] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
     
      <Routeing/>
      
      
    </>
  )
}

export default App
