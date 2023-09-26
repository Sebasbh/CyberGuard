import React, { useEffect, useState } from "react";
import {setAuthToken, getAllSecurityLogs, blockIPById, unblockIPById} from "../context/Api";
import HeaderUser from "../components/header/HeaderUser";
import FooterUser from "../components/footer/FooterUser";
import Navbar from "../components/header/Navbar";
import Chart from "chart.js/auto";
import context from "react-bootstrap/esm/AccordionContext";

function Dashboard() {
  const [securityLogs, setSecurityLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);

  const handleBlockIP = async (id) => {
    try {
      await blockIPById(id);

      
      console.log("el boton ha sido clikeado")

    } catch (error) {
      console.error("Error al bloquear la IP:", error);
    }
  };

  const handleUnblockIP = async (id) => {
    try {
      await unblockIPById(id);
    
    } catch (error) {
      console.error("Error al desbloquear la IP:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenFromLocalStorage = localStorage.getItem("token");
        setAuthToken(tokenFromLocalStorage);
        const data = await getAllSecurityLogs();
        setSecurityLogs(data);
      } catch (error) {
        console.log(error);
        alert(`Error al obtener los datos de la API: ${error}`);
      }
    };

    fetchData();
  }, []);

  const columnNames = [
    "Timestamp",
    "IP Address",
    "Request Path",
    "Request Method",
    "Brute Force Attempt",
    "DDoS Attack",
    "SQL Injection Attempt",
    "XSS Attempt",
    "Country",
    "Country Code",
    "Region",
    "Region Name",
    "City",
    "Zip",
    "Latitude",
    "Longitude",
    "Timezone",
    "ISP",
    "Org",
    "AS",
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = securityLogs.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  useEffect(() => {
    generateCharts();
  }, []); // Arreglo de dependencias vacío para ejecutar una vez después del montaje

  const generateCharts = () => {
    // Obtén el elemento HTML del canvas
    const ctx = document.getElementById("attackTypesChart");

    // Destruye el gráfico existente si ya existe
    Chart.getChart(ctx)?.destroy();

    // Obtén los datos necesarios para los gráficos
    const bruteForceAttempts = securityLogs.filter(
      (log) => log.bruteForceAttempt === 1
    ).length;
    const ddosAttacks = securityLogs.filter(
      (log) => log.ddosAttack === 1
    ).length;
    const sqlInjectionAttempts = securityLogs.filter(
      (log) => log.sqlInjectionAttempt === 1
    ).length;
    const xssAttempts = securityLogs.filter(
      (log) => log.xssAttempt === 1
    ).length;

    // Configuración del nuevo gráfico de barras
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Brute Force", "DDoS", "SQL Injection", "XSS"],
        datasets: [
          {
            label: "Intentos de Ataque",
            data: [
              bruteForceAttempts,
              ddosAttacks,
              sqlInjectionAttempts,
              xssAttempts,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 206, 86, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <HeaderUser />
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4">Dashboard</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Tipos de Ataque</h2>
              </div>
              <div className="card-body">
                <canvas id="attackTypesChart" width="400" height="200"></canvas>
              </div>
            </div>
          </div>
          {/* Otros gráficos pueden agregarse aquí */}
        </div>
        <div className="table-responsive mt-4">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Acción</th>
                {columnNames.map((columnName) => (
                  <th key={columnName}>{columnName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((log, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "table-row-highlight" : ""}
                >
                  <td>
                    {log.isBlocked ? (
                      <button
                        onClick={() => handleUnblockIP(log._id)}
                        className="btn btn-danger"
                      >
                        Desbloquear
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockIP(log._id)}
                        className="btn btn-success"
                      >
                        Bloquear
                      </button>
                    )}
                  </td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.ipAddress}</td>
                  <td>{log.requestPath}</td>
                  <td>{log.requestMethod}</td>
                  <td>{log.bruteForceAttempt}</td>
                  <td>{log.ddosAttack}</td>
                  <td>{log.sqlInjectionAttempt}</td>
                  <td>{log.xssAttempt}</td>
                  <td>{log.infoApi.country}</td>
                  <td>{log.infoApi.countryCode}</td>
                  <td>{log.infoApi.region}</td>
                  <td>{log.infoApi.regionName}</td>
                  <td>{log.infoApi.city}</td>
                  <td>{log.infoApi.zip}</td>
                  <td>{log.infoApi.lat}</td>
                  <td>{log.infoApi.lon}</td>
                  <td>{log.infoApi.timezone}</td>
                  <td>{log.infoApi.isp}</td>
                  <td>{log.infoApi.org}</td>
                  <td>{log.infoApi.as}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="page-link"
            >
              Anterior
            </button>
          </li>
          {Array(Math.ceil(securityLogs.length / recordsPerPage))
            .fill()
            .map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          <li
            className={`page-item ${
              currentPage === Math.ceil(securityLogs.length / recordsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-link"
            >
              Siguiente
            </button>
          </li>
        </ul>
      </div>
      <FooterUser />
    </>
  );
}

export default Dashboard;
