import axios from 'axios';
import jwt_decode from 'jwt-decode';

/* const baseURL = 'http://localhost:8000';  */
const baseURL = 'https://jh5z4qfg-8000.uks1.devtunnels.ms'; 

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const login = async (formData, navigate, setError, setLoading) => {
  setError(null);
  setLoading(true);

  // Verificar si cualquiera de los dos campos ocultos está lleno y, en ese caso, evitar la petición
  if (formData.hiddenField1 !== "" || formData.hiddenField2 !== "") {
    setError("Al menos uno de los campos ocultos está lleno. La petición se evitó.");
    setLoading(false);
    return;
  }

  try {
    const response = await axios.post(`${baseURL}/user/login`, formData);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      setAuthToken(response.data.token); // Set the token in Axios headers

      // Decodificar el token para obtener el rol
      const decodedToken = jwt_decode(response.data.token);
      const userType = decodedToken.role;

      if (userType === "admin") {
        navigate("/homeadmin"); // Redirige a la página de administrador
      } else {
        navigate("/listforms"); // Redirige a la página para usuarios no administradores
      }
    } else {
      setError("No se recibió un token de acceso.");
    }
  } catch (error) {
    setError("Error al iniciar sesión. Verifica tus credenciales.");
  } finally {
    setLoading(false);
  }
};

export const getFormList = async () => {
  try {
    const response = await axios.get(`${baseURL}/form`);
    return response.data;
  
  } catch (error) {
    throw error;
  }
};


export const submitForm = async (formData) => {
    try {
      const response = await axios.post(`${baseURL}/form`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const updateForm = async (formId, formData) => {
  try {
    const response = await axios.put(`${baseURL}/form/${formId}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteForm = async (formId) => {
  try {
    const response = await axios.delete(`${baseURL}/form/${formId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/user`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await axios.put(`${baseURL}/user/${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${baseURL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}/user`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getSecurityById = async (securityId) => {
  try {
    const response = await axios.get(`${baseURL}/security/${securityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSecurityLogById = async (securityId, updatedSecurityData) => {
  try {
    const response = await axios.put(`${baseURL}/security/${securityId}`, updatedSecurityData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSecurityLogById = async (securityId) => {
  try {
    const response = await axios.delete(`${baseURL}/security/${securityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAllSecurityLogs = async () => {
  try {
    const response = await axios.get(`${baseURL}/security`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
