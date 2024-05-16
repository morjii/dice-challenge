import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Winner } from '../../types/apiTypes';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeView.css'


const HomeView: React.FC = () => {

    const navigate = useNavigate();
    const[ isStockEmpty, setIsStockEmpty] = useState(false);

    const pastries = [
        { name: "Fondant Suprême", image: "/assets/fondant.jpeg" },
        { name: "Cake tout Chocolat", image: "/assets/cake-choco.jpeg" },
        { name: "Cake Framboise", image: "/assets/cake-framboise.jpeg" },
        { name: "Brioche pain perdu", image: "/assets/brioche-pain-perdu.jpeg" },
        { name: "Glaces vanille", image: "/assets/glaces-vanille.jpeg" },
        { name: "Éclair au chocolat", image: "/assets/eclair.jpeg" },
        { name: "Tarte aux poires", image: "/assets/tarte-poire.jpeg" },
        { name: "Banana split", image: "/assets/banana-split.jpeg" }
    ];





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
                // redirection board
                if(result.totalLeft == 0){ 
                    navigate('/board') ;}
            }
        )
    }, []);


    return (
        <div className="home-view-container">
            <h1 className="home-view-title">Tentez de gagner de délicieuses pâtisseries</h1>
            <div className="home-view-buttons">
                <button className="btn btn-primary btn-lg" onClick={register}>Register</button>
                <button className="btn btn-secondary btn-lg" onClick={login}>Login</button>
            </div>
            <div className="row home-view-cards">
                {pastries.map(pastry => (
                    <div className="col-md-3 mb-4" key={pastry.name}>
                        <div className="card h-100">
                            <img src={pastry.image} alt={pastry.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{pastry.name}</h5>                           
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );











};

export default HomeView;