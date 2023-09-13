import User from '../models/UserModel.js';
import { generateToken } from '../middleware/middlewares.js'
import bcrypt from 'bcrypt';

// Controlador para crear un usuario
export const createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener todos los usuarios
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users); 
    
  } catch (error) {
    next(error);
    return
  }
};

// Controlador para obtener un usuario por ID
export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json(user);
    if (!user) {
      
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};

// Controlador para actualizar un usuario por ID
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};

// Controlador para eliminar un usuario por ID
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json( {message: "Usuario eliminado correctamente"});
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};

// Controlador para iniciar sesión
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // Busca al usuario por su nombre de usuario
    const user = await User.findOne({ username });

    // Verifica si el usuario existe
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Compara la contraseña ingresada con el hash de contraseña almacenado
    const esPasswordValida = await bcrypt.compare(password, user.password);

    // Si la contraseña es válida, autentica al usuario
    if (esPasswordValida) {
      req.user = user;
    }
    // Genera un token JWT para la autenticación usando el middleware
    const newtoken = generateToken(user);

    // Llama a next() después de generar el token
    res.status(200).json({ token: newtoken })
  } catch (error) {
    // Maneja los errores
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
