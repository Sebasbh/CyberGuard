import Form from '../models/FormModel.js';

// Controlador para crear un formulario de contacto
export const createForm = async (req, res, next) => {
  try {
   /*  const existingForm = await Form.findOne({ email: req.body.email });

    if (existingForm) {
      // A document with the same email already exists.
      return res.status(400).json({ error: 'Email already exists' });
    } */
    const form = new Form(req.body);
    
    await form.save();

    
    res.status(201).json(form);
    
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener todos los formularios de contacto
export const getForms = async (req, res, next) => {
  try {
      const forms = await Form.find();// esto hay que mejorarlo
      
      res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener un formulario de contacto por ID
export const getFormById = async (req, res, next) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);
    res.status(200).json(form);
    if (!form) {
      return res.status(404).json({ message: 'Formulario de contacto no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};

// Controlador para actualizar un formulario de contacto por ID
export const updateForm = async (req, res, next) => {
  try {
    const formId = req.params.id;
    const updatedForm = await Form.findByIdAndUpdate(formId, req.body, { new: true });
    res.status(200).json(updatedForm);
    if (!updatedForm) {
      return res.status(404).json({ message: 'Formulario de contacto no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};

// Controlador para eliminar un formulario de contacto por ID
export const deleteForm = async (req, res, next) => {
  try {
    const formId = req.params.id;
    const deletedForm = await Form.findByIdAndDelete(formId);
    res.status(200).json( {message: "Formulario eliminado correctamente"});
    if (!deletedForm) {
      return res.status(404).json({ message: 'Formulario de contacto no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};
