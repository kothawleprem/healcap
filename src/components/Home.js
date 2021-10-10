import React,{useState,useEffect} from 'react';
import useDocumentTitle from './useDocumentTitle';


const Home = () => {
   

    const [userName, setUserName] = useState('');
    
    const userHome = async () => {

        try{
            const res = await fetch('/getdata', {
                method:"GET",
                headers: {
                    "Content-Type": "application/json"
                     
                },
                credentials:"include"
            });
            const data = await res.json();
            console.log(data);
            setUserName(data.name);
          

          

        } catch (err) {
         console.log(err);
        
        }
    }
   


        useEffect(() => {
          userHome();
           // eslint-disable-next-line react-hooks/exhaustive-deps
           
         },[]);
         
         useDocumentTitle(userName)
       
        
    return (
        <div>
        <p className="pt-5">Welcome</p>
        <h1>{userName}</h1>
            
        </div>
    )
}

export default Home
