
const { getAllRoles } = require('../DAO/RoleDAO');
const UserDAO = require('../DAO/UserDAO');
const EmployerDAO = require('../DAO/EmployerDAO');
const AreaDAO = require('../DAO/AreaDAO');
const { hashCompare } = require('../utils/authUtils');
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
    const employer_id = req.employer.employer_id; // Obtener el ID del usuario desde el token en el middleware auth 
    const employer = await EmployerDAO.getCompleteEmployer(employer_id); 
    if (!employer){res.status(404).json({ message: 'Employer not found' });return;};
    res.status(200).json(employer); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const addEmployer = async (req, res) => {
  try {
    const employerAdmin_id = req.employer.employer_id; // Obtener el ID del usuario desde el token en el middleware auth 

    const data = req.body;
    // Verificar si el email ya está registrado
    const emailExists = await UserDAO.getUserByColumn('email', data.email,null); //lo pongo con null el tercer prop para que tenga en cuenta los emails desaibilitados
    if (emailExists.length) {
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
        to_update: employerAdmin_id,
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
      area:data.area_id,
      to_update_date:employerAdmin_id,
      to_update:Date(),
    }

    const employer_id = await EmployerDAO.addEmployer(dataEmployer);
    if(!employer_id){
      UserDAO.removeUser(user_id);
      throw new Error('Error adding user');
    } 
      
    
    // Agregar usuario
    const token = createToken({employer_id}); // Crear el token JWT
    res.status(200).json({ token }); // Devolver el token en la respuesta
    //sendConfirmEmail(id);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const editEmployer = async (req,res) => {
  try {
    const id = req.employer.employer_id; // Obtener el ID del usuario desde el auth
    // Obtener el usuario por ID
    const employer = await EmployerDAO.getEmployerById(id);
    // Validar si el usuario existe
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    let data = {};
    for (const prop in req.body) {
      if(prop != "is_able"){
        data[prop] = req.body[prop];
      }
    }
    if(data.password!=undefined) {
      data.password = await encryptText(data.password);
    }
    const result = await EmployerDAO.editEmployer(data, id); // Editar el usuario utilizando la función edit de CRUD
    if (result === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'Failed to edit employer'});
      return;
    }
    res.status(200).json({});

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const editEmployerById = async (req,res) => {
  try {
    const id = req.params.id; // Obtener el ID del usuario desde el auth
    // Obtener el usuario por ID
    const employer = await EmployerDAO.getEmployerById(id);
    console.log(employer)
    // Validar si el usuario existe
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    let data = {};
    for (const prop in req.body) {
      if(prop != "is_able"){
        data[prop] = req.body[prop];
      }
    }
    if(data.password!=undefined) {
      data.password = await encryptText(data.password);
    }
    const result = await EmployerDAO.editEmployer(data, id); // Editar el usuario utilizando la función edit de CRUD
    if (result === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'Failed to edit employer'});
      return;
    }
    res.status(200).json({});

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const disableEmployer = async (req, res) => {
  try {
    const id = req.employer.employer_id; // Obtener el ID del usuario desde el auth
    
    // Obtener el usuario por ID
    const employer = await EmployerDAO.getEmployerById(id);
    // Validar si el usuario existe
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    const data = { is_able: false }; // Actualiza el campo "is_able" a false para desactivar el usuario
    const result = await employerService.editEmployer(data, id); // Editar el usuario utilizando la función edit de CRUD
    if (result === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'Failed to disable employer' });
      return;
    }
    res.status(200).json({});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteEmployer = async (req,res) => {
  try {
    //Por logica empresarial no es correcto eliminar por completo a un usuario de una empresa, debido a que siempre debe quedar registro, pero por normativa tiene que estar el endpoint. 
    const id = req.employer.employer_id; // Obtener el ID del usuario desde el auth
    const result = await EmployerDAO.removeEmployer(id); // Eliminar el usuario 
    if (result === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'Employer not found' });
      return;
    }
    res.status(200).json({}); //confirmo que se elimino correctamente

  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//Funciones especificas

const login = async (req, res) => {
  try {
    const uEmail = req.body.email; // Obtener el nombre de usuario desde el body
    const password = req.body.password;
    
    const employerDB =  await EmployerDAO.getEmployerByColumn("email", uEmail,null,["employer_id","password"]);;
    
   
    if (!employerDB) { res.status(404).json({ message: 'Invalid Employer' }); return; };

    const isMatch = await hashCompare(password, employerDB[0].password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = createToken({employer_id:employerDB[0].employer_id}); // Crear el token JWT
    res.status(200).json({ token }); // Devolver el token en la respuesta
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


  
module.exports = {
  getAllEmployers,
  getAllEmployersByArea,
  getAllAreas,
  getEmployerById,
  getEmployer,
  addEmployer,
  editEmployer,
  editEmployerById,
  disableEmployer,
  deleteEmployer,
  login,

}