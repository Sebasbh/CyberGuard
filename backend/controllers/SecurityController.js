import Security from "../models/SecurityModel.js";


// Crear un nuevo registro de seguridad
export async function createSecurityLog(res, data, next) {
    try {
      const securityLog = new Security(data);
      const result = await securityLog.save();
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

// Bloquear una IP por su ID
export async function blockIPById(req, res) {
  const { id } = req.params; // Solo necesitas el ID para identificar la IP

  try {
    const security = await Security.findById(id);

    if (!security) {
      return res.status(404).json({ error: 'IP no encontrada' });
    }

    security.isBlocked = true;
    await security.save();

    res.status(200).json({ message: 'IP bloqueada exitosamente', security });
  } catch (error) {
    console.error('Error al bloquear la IP:', error);
    res.status(500).json({ error: 'No se pudo bloquear la IP' });
  }
}

// Desbloquear una IP por su ID
export async function unblockIPById(req, res) {
  const { id } = req.params; // Solo necesitas el ID para identificar la IP

  try {
    const security = await Security.findById(id);

    if (!security) {
      return res.status(404).json({ error: 'IP no encontrada' });
    }

    security.isBlocked = false;
    await security.save();

    res.status(200).json({ message: 'IP desbloqueada exitosamente', security });
  } catch (error) {
    console.error('Error al desbloquear la IP:', error);
    res.status(500).json({ error: 'No se pudo desbloquear la IP' });
  }
}