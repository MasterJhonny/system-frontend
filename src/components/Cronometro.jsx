import React, { useState, useEffect } from 'react';

const basePuntos = 100;

function Cronometro() {
  const [tiempo, setTiempo] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const [vueltas, setVueltas] = useState([]);
  
  const [vueltaActual, setVueltaActual] = useState(1);

  useEffect(() => {
    let interval;

    if (corriendo) {
      interval = setInterval(() => {
        setTiempo(tiempo + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [corriendo, tiempo]);

  const empezarCronometro = () => {
    if (!corriendo) {
      setCorriendo(true);
    }
  };

  const detenerCronometro = () => {
    if (corriendo) {
      setCorriendo(false);
    }
  };

  const calcPoints = (tiempo) => {
    if (vueltas.length === 0) {
        return basePuntos;
    }
    const firtReturn = vueltas[0].time; 
    const diferent = (firtReturn - (tiempo - firtReturn));
    const points = (diferent * basePuntos)/firtReturn; 
    return points.toFixed(2);
  }

  const reiniciarCronometro = () => {
    setTiempo(0);
    setCorriendo(false);
    setVueltas([]);
    setVueltaActual(1);
  };

  const tomarVuelta = () => {
    const vuelta = {
        time: tiempo,
        points: calcPoints(tiempo)
    }
    setVueltas([...vueltas, vuelta]);
    setVueltaActual(vueltaActual + 1);
  };

  const [teclaPresionada, setTeclaPresionada] = useState('');
  const handleKeyPress = (event) => {
    const keyPressed = event.key.toUpperCase();
    setTeclaPresionada(keyPressed);
    if (keyPressed === " ") {
        console.log("Se preciono espacio!!");
        tomarVuelta();
    }

  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [tiempo]);

  return (
    <div className='container'>
      <h1 className='title'>Cronómetro</h1>
      <p className='text'><span>Tiempo:</span><span className="seg">{tiempo}</span><span>segundos</span></p>
      <button onClick={empezarCronometro}>Empezar</button>
      <button onClick={detenerCronometro}>Detener</button>
      <button onClick={reiniciarCronometro}>Reiniciar</button>
      <button onClick={tomarVuelta}>Vuelta</button>
      <div>
        <h2>Vueltas</h2>
        <ul>
          {vueltas.map((vuelta, index) => (
            <li key={index}><span>Vuelta {index + 1}: {vuelta.time} segundos, </span><span> Puntos: {vuelta.points}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cronometro;


