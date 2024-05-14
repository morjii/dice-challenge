import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Winner } from '../types/apiTypes';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'importer useHistory de 'react-router-dom'

const HomeView: React.FC = () => {

    const navigate = useNavigate();
    const[ isStockEmpty, setIsStockEmpty] = useState(false);

    function register(){ 
        navigate('/register')
     }

     function login(){ 
        navigate('/login')
     }

     useEffect(() => {
        fetch('http://localhost:3001/pastries-left')
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                if(result.totalLeft == 0){ 
                    navigate('/board') ;}
            }
        )
    }, []);


    return (
        <div>
           
            
                    <h1>Welcome</h1>
            
                        <button onClick={register}> Register </button>
                        <button onClick={login}> Login </button>
              
        
        </div>
    );
};

export default HomeView;