import React, { useState } from 'react';
import axios from 'axios';

const GameView = () => {
const [dices, setDices] = useState([]);
const [result, setResult] = useState('');
const [pastriesWon, setPastriesWon] = useState(0);
const [chancesLeft, setChancesLeft] = useState(3); 
const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false);

const rollDices = async () => {
setLoading(true);
setMessage('');
try {
const response = await axios.get('http://localhost:3001/api/game/roll-dices', {
headers: {
'Content-type': 'application/json',
'x-access-token': localStorage.getItem('token')
}
});
setDices(response.data.dices);
setResult(response.data.result);
setPastriesWon(response.data.pastriesWon);

setMessage(`You rolled: ${response.data.dices.join(', ')}. Result: ${response.data.result}. Pastries won: ${response.data.pastriesWon}`);
} catch (error) {
console.log(error);
setMessage('Failed to roll dices: ' + (error.response?.data?.message || error.message));
}
setLoading(false);
};

return (
<div>
<h1>Game View</h1>
<button onClick={rollDices} disabled={loading}>
{loading ? 'Rolling...' : 'Roll Dices'}
</button>
{dices.length > 0 && (
<div>
<h2>Dice Rolls: {dices.join(', ')}</h2>
<p>Result: {result}</p>
<p>Pastries won: {pastriesWon}</p>
</div>
)}
{message && <p>{message}</p>}
</div>
);
};

export default GameView;