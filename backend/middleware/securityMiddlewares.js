import { createSecurityLog } from '../controllers/SecurityController.js';
import axios from "axios";

function validateIPAddress(requestIP) {
  const ipv4Regex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/;
  const ipv6Regex = /^([0-9a-fA-F:]+)$/;

  if (ipv4Regex.test(requestIP) || ipv6Regex.test(requestIP)) {
    return requestIP;
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
    console.log(ipAddressResponse.data.ip)

    // Obtener información de la IP utilizando la API "ip-api.com"
    const infoApiResponse = await axios.get(`http://ip-api.com/json/${publicIpAddress}`);


    const {
      country,
      countryCode,
      region,
      regionName,
      city,
      zip,
      lat,
      lon,
      timezone,
      isp, 
      org,
      as,
    } = infoApiResponse.data;

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
      isBlocked: false,
      infoApi: {
        country,
        countryCode,
        region,
        regionName,
        city,
        zip,
        lat,
        lon,
        timezone,
        isp, 
        org,
        as,
      } 
    };

    // Crear el registro de seguridad
    await createSecurityLog(res, securityData, next);

  } catch (error) {
    console.error('Error al crear el registro de seguridad:', error);
    next(error);
  }
};


// Middleware para verificar si la IP está bloqueada
export function checkIPBlocked(req, res, next) {
  // Obtén la dirección IP del cliente desde la solicitud
  const clientIP = req.ip; 

  // Verifica si la IP está bloqueada en la base de datos
  Security.findOne({ ipAddress: clientIP }, (err, security) => {
    if (err) {
      console.error('Error al verificar IP bloqueada:', err);
      return res.status(500).json({ error: 'Error al verificar la IP' });
    }

    if (security && security.isBlocked) {
      // La IP está bloqueada, devuelve una respuesta de error
      return res.status(403).json({ error: 'Acceso prohibido para esta IP' });
    }

    // La IP no está bloqueada, continúa con la solicitud principal
    next();
  });
}

