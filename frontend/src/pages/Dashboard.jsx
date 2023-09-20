import React, { useEffect, useState } from 'react';
import { setAuthToken, getAllSecurityLogs } from '../context/Api';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderUser from '../components/header/HeaderUser';
import FooterUser from '../components/footer/FooterUser';
import Navbar from '../components/header/Navbar';

function Dashboard() {
  const [securityLogs, setSecurityLogs] = useState([]);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    setAuthToken(tokenFromLocalStorage);

    const fetchData = async () => {
      try {
        const data = await getAllSecurityLogs();
        setSecurityLogs(data);
      } catch (error) {
        console.log(error);
        alert(`Error al obtener los datos de la API: ${error}`);
      }
    };

    // Llama a la función fetchData cuando el componente se monta
    fetchData();
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo al montar el componente

  return (
    <>
    <HeaderUser/>
    <Navbar/>
    <div className="container">
      <h1 className="mt-5">Dashboard</h1>
      <ul className="list-unstyled">
        {securityLogs.map((log, index) => (
          <li key={index} className="mt-3 border p-3">
            <strong>Timestamp:</strong> {log.timestamp}<br />
            <strong>IP Address:</strong> {log.ipAddress}<br />
            <strong>Request Path:</strong> {log.requestPath}<br />
            <strong>Request Method:</strong> {log.requestMethod}<br />
            <strong>Brute Force Attempt:</strong> {log.bruteForceAttempt}<br />
            <strong>DDoS Attack:</strong> {log.ddosAttack}<br />
            <strong>SQL Injection Attempt:</strong> {log.sqlInjectionAttempt}<br />
            <strong>XSS Attempt:</strong> {log.xssAttempt}<br />
          </li>
        ))}
      </ul>
    </div>
    <FooterUser/>
    </>

  );
}

export default Dashboard;
