import React, {useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';


const About = () => {

    const history = useHistory();
    const [userData, setUserData] = useState({});
    
    const callAboutPage = async () => {

        try{
            const res = await fetch('/about', {
                method:"GET",
                headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json"
                     
                },
                credentials:"include"
            });
            const data = await res.json();
            console.log(data);
            setUserData(data);

            if(!res.sataus === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
         console.log(err);
         history.push('/login');
        }
    }

        useEffect(() => {
           callAboutPage();
           // eslint-disable-next-line react-hooks/exhaustive-deps
         },[]);
    
    
    return (
        <div>
        <form method="GET">
     
            <h1>about us</h1>
            <h2>name: {userData.name}</h2>
            <h2>phone: {userData.phone}</h2>
            <h2> email:{userData.email}</h2>
            <h2> work:{userData.work}</h2>
            </form>
        </div>
    )
}

export default About;
