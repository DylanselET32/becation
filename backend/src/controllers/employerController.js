
const UserDAO = require('../DAO/UserDAO');
const EmployerDAO = require('../DAO/EmployerDAO');
const AreaDAO = require('../DAO/AreaDAO');
const { encryptText, createToken } = require('../utils/authUtils');
// const { sendConfirmEmail } = require('../utils/emeilSendUtils');


const getAllEmployers = async (req,res) => {
  //esta funcion solo podria ser ejecutada por un admin
  try {
    const respuesta = await EmployerDAO.getAllCompleteEmployer()
    res.status(200).json(respuesta);
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAllEmployersByArea = async (req,res) => {
    //esta funcion solo podria ser ejecutada por un admin o persona con privilegios y recibe por parametros el id del area y devuelve todos los usuarios que estan en ese area
    try {
      const area_id = req.params.id
      const respuesta = await EmployerDAO.getAllCompleteEmployerByArea(area_id);
      res.status(200).json(respuesta);
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllAreas = async (req,res) => {
    //esta funcion solo podria ser ejecutada por un admin o persona con privilegios
    try {
      const respuesta = await AreaDAO.getAllAreas()
      res.status(200).json(respuesta);
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const getEmployerById = async (req,res) => {
  //esta funcion solo podria ser ejecutada por un admin
  try {
    const id = req.params.id; // Obtener el ID del usuario desde la ruta
    const employer = await EmployerDAO.getCompleteEmployer(id); 
    if (!employer){res.status(404).json({ message: 'Employer not found' });return;};
    res.status(200).json(employer); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const getEmployer = async (req,res) => {
  //esta funcion va a ser llamada por un usuario y va a devolver su informacion a partir de su token
  try {
    const employer_id = req.employer.id; // Obtener el ID del usuario desde el token en el middleware auth 
    const employer = await EmployerDAO.getCompleteEmployer(employer_id); 
    if (!employer){res.status(404).json({ message: 'Employer not found' });return;};
    res.status(200).json(employer); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const addEmployer = async (req, res) => {
  //al crear un empleado le crea un usario, son relaciones 1 en 1. sin usuario no hay empleado y sin empleado no hay usuario.
  try {
    const employerAdmin_id = req.employer.id; // Obtener el ID del usuario desde el token en el middleware auth 

    const data = req.body;
    // Verificar si el email ya está registrado
    const emailExists = await UserDAO.getUserByColumn('email', data.email,null,["id", "name", "surname", "password","email", "dni", "is_able", "privileges", "to_create", "sign_up_date", "to_update", "to_update_date"]); //lo pongo con null el tercer prop para que tenga en cuenta los emails desaibilitados
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    //recopila info de user y encriptar contraseña 
    const dataUser = {
        name:data.name,
        surname:data.surname,
        email:data.email,
        dni:data.dni,
        is_able:true,
        privileges:data.privileges,
        sign_up_date:data.sign_up_date,
        password: await encryptText(data.password),
        to_update:employerAdmin_id,
        to_update_date: Date(),
    }
    
    const user_id = await UserDAO.addUser(dataUser);
    if(!user_id) throw new Error('Error adding user');

    const dataEmployer = {
      user_id,
      available_days:data.available_days,
      total_days :data.total_days,
      is_cumulative:data.is_cumulative,
      role_id:data.role_id,
      area_id:data.area_id,
      to_update:employerAdmin_id,
      to_update_date: Date(),
    }
    let employer_id;
    try { //hago otro try catch para que el error sql no salte directo al catch general, sino que primero elimine el usuario creado
      employer_id = await EmployerDAO.addEmployer(dataEmployer);
    } catch (error) {
      await UserDAO.removeUser(user_id);
      throw error;
    }

    
    // Agregar usuario
    const token = createToken({id:employer_id}); // Crear el token JWT
    res.status(200).json({ token }); // Devolver el token en la respuesta
    //sendConfirmEmail(id);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const editEmployer = async (req,res) => {
  try {
    const employer_id = req.employer.id; // Obtener el ID del usuario desde el auth

    // Obtener el usuario por ID
    const previousEmployer = await EmployerDAO.getEmployerById(employer_id);
    // Validar si el usuario existe
    if (!previousEmployer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    const previousUser = await UserDAO.getUserById(previousEmployer.employer_id)

    const fieldsUser = ['name','surname','dni','privileges','sign_up_date','password'];
    const fieldsEmployer = ['available_days','total_days','is_cumulative','role_id','area_id','to_update'];
    // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    let dataUser = {};
    let dataEmployer = {};

    for (const prop in req.body) {
        if(fieldsUser.includes(prop)){dataUser[prop] = req.body[prop]}
        if(fieldsEmployer.includes(prop)){dataEmployer[prop] = req.body[prop]}
    }

    if(dataUser.password!=undefined) {
      dataUser.password = await encryptText(dataUser.password);
    }

    if (dataUser.length>0){
      dataUser  = {...dataUser,
        to_update_date:Date(),
        to_update:employer_id,}
        const result = await UserDAO.editUser(dataUser, previousUser.id); // Editar el usuario utilizando la función edit de CRUD
        if (result === 0) { //si no se pudo editar 
          res.status(404).json({ message: 'Failed to edit user information'});
          return;
        } 
    }
    if (dataEmployer.length>0){
      dataEmployer  = {...dataEmployer,
        to_update_date:Date(),
        to_update:employer_id,}
        const result = await EmployerDAO.editEmployer(dataEmployer, employer_id); // Editar el usuario utilizando la función edit de CRUD
        if (result === 0) { //si no se pudo editar 
          res.status(404).json({ message: 'Failed to edit employer information'});
          if(dataUser.length>0){ await UserDAO.editUser(previousUser.filter(e=>e!="id"), previousUser.id)}; //en caso de que falle, devuelve al estado anterior los datos editados en dataUser
          return;
        } 
    }
    

    res.status(200).json({}); //devuelve satus 200 en caso de haber editado todo exitosamente 

  }catch (error) { 
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const editEmployerById = async (req,res) => {
  try {
    const employerAdmin_id = req.employer.id; // Obtener el ID del usuario admin desde el auth
    const employer_id = req.params.id; // Obtener el ID del usuario desde params

    // Obtener el usuario por ID
    const previousEmployer = await EmployerDAO.getEmployerById(employer_id);
    // Validar si el usuario existe
    if (!previousEmployer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    const previousUser = await UserDAO.getUserById(previousEmployer.user_id)

    const fieldsUser = ['name','surname','dni','privileges','sign_up_date','password'];
    const fieldsEmployer = ['available_days','total_days','is_cumulative','role_id','area_id','to_update'];
    // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    let dataUser = {};
    let dataEmployer = {};

    for (const prop in req.body) {
        if(fieldsUser.includes(prop)){dataUser[prop] = req.body[prop]}
        if(fieldsEmployer.includes(prop)){dataEmployer[prop] = req.body[prop]}
    }

    if(dataUser.password!=undefined) {
      dataUser.password = await encryptText(dataUser.password);
    }

    if (Object.keys(dataUser).length>0){
      dataUser  = {...dataUser,
        to_update_date:Date(),
        to_update:employerAdmin_id,}
        const result = await UserDAO.editUser(dataUser, previousUser.id); // Editar el usuario utilizando la función edit de CRUD
        if (result === 0) { //si no se pudo editar 
          res.status(404).json({ message: 'Failed to edit user information'});
          return;
        } 
    }
    if (Object.keys(dataEmployer).length>0){
      dataEmployer  = {...dataEmployer,
        to_update_date:Date(),
        to_update:employerAdmin_id,}
        const result = await EmployerDAO.editEmployer(dataEmployer, employer_id); // Editar el usuario utilizando la función edit de CRUD
        if (result === 0) { //si no se pudo editar 
          res.status(404).json({ message: 'Failed to edit employer information'});
          if(dataUser.length>0){ await UserDAO.editUser(previousUser.filter(e=>e!="id"), previousUser.id)}; //en caso de que falle, devuelve al estado anterior los datos editados en dataUser
          return;
        } 
    }

    res.status(200).json({}); //devuelve satus 200 en caso de haber editado todo exitosamente 

  }catch (error) { 
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const deleteEmployerById = async (req,res) => {
  try {
    //Por logica empresarial no es correcto eliminar por completo a un usuario/empleado de una empresa, debido a que siempre debe quedar registro, pero por normativa tiene que estar el endpoint. 
    const id = req.params.id; // Obtener el ID del empleado desde params
    const resultE = await EmployerDAO.removeEmployer(id); // Eliminar el Empleado
    const resultU = await UserDAO.removeUser(resultE.id); // Eliminar el usuario

    if (resultE === 0 || resultU === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'error deleting employee'});
      return;
    }

    res.status(200).json({}); //confirmo que se elimino correctamente

  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//Funciones especificas


  
module.exports = {
  getAllEmployers,
  getAllEmployersByArea,
  getAllAreas,
  getEmployerById,
  getEmployer,
  addEmployer,
  editEmployer,
  editEmployerById,
  deleteEmployerById,
}