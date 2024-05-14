import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Winner } from '../types/apiTypes';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'importer useHistory de 'react-router-dom'

const HomeView: React.FC = () => {

    const navigate = useNavigate();

    function register(){ 
        navigate('/register')
     }

     function login(){ 
        navigate('/login')
     }


    return (
        <div>
            <h1>Winners Board</h1>
                <button onClick={register}> Register </button>
                <button onClick={login}> Login </button>
        </div>
    );
};

export default HomeView;