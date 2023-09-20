import Security from "../models/SecurityModel.js";
import requestIP from "request-ip";

// Crear un nuevo registro de seguridad
export async function createSecurityLog(res, data, next) {
    try {
      const securityLog = new Security(data);
      const result = await securityLog.save();
      console.log('Registro creado:', result);
      /* res.status(202).json(result)  */
      next()
    } catch (error) {
      console.error('Error al crear el registro de seguridad:', error);
    }
  }

  // Leer todos los registros de seguridad
export async function getAllSecurityLogs(req,res) {
    try {
      const securityLogs = await Security.find();
      console.log(securityLogs)
      res.status(200).json(securityLogs)
    } catch (error) {
      console.error('Error al obtener los registros de seguridad1:', error);
    }
  }
  
// Actualizar un registro de seguridad por ID
export async function updateSecurityLogById(id, updateData) {
    try {
      const result = await Security.findByIdAndUpdate(id, updateData, {
        new: true, // Devuelve el documento actualizado
      });
      console.log('Registro de seguridad actualizado:', result);
    } catch (error) {
      console.error('Error al actualizar el registro de seguridad:');
    }
  }

  // Eliminar un registro de seguridad por ID
export async function deleteSecurityLogById(id) {
    try {
      const result = await Security.findByIdAndRemove(id);
      console.log('Registro de seguridad eliminado:', result);
    } catch (error) {
      console.error('Error al eliminar el registro de seguridad:', );
    }
  }

export async function getSecurityById (id){
  try {
    const result = await Security.findById(id)
    console.log('Registros de seguridad:', result);
  } catch (error) {
    console.error('Hubo un error a traer el registro' );
  }
}
