import { createSecurityLog } from '../controllers/SecurityController.js';
import requestIp from "request-ip";
import axios from "axios"

function validateIPAddress(requestIPip) {
  const ipv4Regex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/;
  const ipv6Regex = /^([0-9a-fA-F:]+)$/;
  
  if (ipv4Regex.test(requestIPip) || ipv6Regex.test(requestIPip)) {
    return requestIPip;
  }

  return "Dirección IP no válida";
}

function validateRequestMethod(method) {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  return validMethods.includes(method) ? method : 'Método no válido';
}

export const createSecurityLogMiddleware = async (req, res, next) => {
  try {
    // Obtener la dirección IP pública del cliente utilizando el servicio "ipify"
    const ipAddressResponse = await axios.get('https://api.ipify.org?format=json');
    const publicIpAddress = ipAddressResponse.data.ip;

    const ipAddress = validateIPAddress(publicIpAddress);
    const requestMethod = validateRequestMethod(req.method);

    const securityData = {
      timestamp: new Date(),
      ipAddress,
      requestPath: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      requestMethod,
      bruteForceAttempt: false,
      ddosAttack: false,
      sqlInjectionAttempt: false,
      xssAttempt: false,
    };

    // Crear el registro de seguridad
    await createSecurityLog(res, securityData, next);

  } catch (error) {
    console.error('Error al crear el registro de seguridad1:', error.message);
    next(error);
  }
};