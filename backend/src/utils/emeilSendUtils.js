const { sendEmail } = require("../services/emailService");
const { getCompleteEmployer } = require("../DAO/EmployerDAO");
const { getVacationById } = require("../DAO/VacationDAO");
const { createEmailTokenById, formatDateToString, getTime } = require("./utils");

const linkConfirmEmailByIdUser  = (employer)=>{
  const token = createEmailTokenById(employer.user_id,employer.email)
  return `${process.env.DOMAIN_FRONTEND}confirmEmail/${token.replaceAll(".","*")}`
}

const resetPassword = async (idEmployer) => {
  try {
    const employer = await getCompleteEmployer(idEmployer);
    if (!employer) throw new Error("Error al conseguir el empleado");

    const subject = 'Recuperar Contraseña BeCation';
    const html = generateResetPasswordEmail(employer);

    const data = {
      to: employer.email,
      subject,
      html
    };

    await sendEmail(data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const generateResetPasswordEmail = (employer) => {
  const styleHeader = "background: #74a1d1;  width: 100%; padding: 1rem; margin:auto; display: flex; justify-content: center; align-items: center; text-align: center;";
  const styleTitle = "color: #f8f9fa; margin: auto;";
  const styleFooter = "background: #333; color: #f8f9fa; width: 100%; padding: 1rem; text-align: center;";
  const styleMain = "width: 80%; margin: 0 auto; text-align: center;max-width: 60rem;";
  const styleButton = "display: block; background-color: #74a1d1; color: #f8f9fa; padding: 0.5rem 1rem; border: none; border-radius: 4px; text-decoration: none;margin:2rem auto ;width:8rem; font-size: 1.2rem;";
  const styleBody = "background:#f8f9fa; width: 100%; padding: 1rem; margin:auto;";
  const linkToken = linkConfirmEmailByIdUser(employer);
  return `
    <div style="${styleMain}">
      <div style="${styleHeader}">
        <h1 style="${styleTitle}">RESETEAR CONTRASEÑA</h1>
      </div>
      <div style="${styleBody}">
        <h3>Hola ${employer.name}, parece que has perdido el acceso a tu cuenta de BeCation y solicitaste un cambio de contraseña. Si esto no es así, desestima este mensaje. De lo contrario, haz clic en el siguiente botón:</h3>
        <a href="${linkToken}" style="${styleButton}">Resetear Contraseña</a>
      </div>
      <div style="${styleFooter}">
        <p>© ${new Date().getFullYear()} StreamBe. BeCation es una marca registrada de StreamBe. Todos los derechos reservados</p>
      </div>
    </div>
  `;
};

async function sendVacationUploadConfirmation(idEmployer, idVacation) {
  try {
    const employer = await getCompleteEmployer(idEmployer);
    if (!employer) throw new Error("Error al encontrar al empleado");
    const vacacion = await getVacationById(idVacation);

    const subject = 'Vacación solicitada de manera exitosa!';
    const html = generateVacationUploadConfirmationEmail(employer, vacacion);

    const data = {
      to: employer.email,
      subject,
      html
    };

    await sendEmail(data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

function generateVacationUploadConfirmationEmail(employer, vacacion) {
  const styleHeader = "background: #74a1d1;  width: 100%; padding: 1rem; margin:auto; display: flex; justify-content: center; align-items: center; text-align: center;";
  const styleTitle = "color: #f8f9fa; margin: auto;";
  const styleFooter = "background: #333; color: #f8f9fa; width: 100%; padding: 1rem; text-align: center;";
  const styleMain = "width: 80%; margin: 0 auto; text-align: center;max-width: 60rem;";
  const styleBody = "background:#f8f9fa; width: 100%; padding: 1rem; margin:auto;";

  return `
    <div style="${styleMain}">
      <div style="${styleHeader}">
        <h1 style="${styleTitle}">VACACIÓN SOLICITADA CON ÉXITO</h1>
      </div>
      <div style="${styleBody}">
        <h3>Hola ${employer.name}, pediste tus vacaciones acorde a los siguientes datos:</h3>
        <p>Fecha pedida: ${vacacion.date_asked}</p>
        <p>Desde ${formatDateToString(vacacion.start_date)} hasta: ${formatDateToString(vacacion.end_date)}</p>
      </div>
      <div style="${styleFooter}">
        <p>© ${new Date().getFullYear()} StreamBe. BeCation es una marca registrada de StreamBe. Todos los derechos reservados</p>
      </div>
    </div>
  `;
}

async function sendEventModification(idUser, event) {
  try {
    const user = await getUserById(idUser);
    if (!user) throw new Error("Error al agregar usuarios");

    const subject = 'Aviso de Modificación/Cancelación de Evento';
    const html = generateEventModificationEmail(user, event);

    const data = {
      to: user.email,
      subject,
      html
    };

    await sendEmail(data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

function generateEventModificationEmail(user, event) {
  const styleHeader = "background: #6e3ef8;  width: 100%; padding: 1rem; margin:auto; display: flex; justify-content: center; align-items: center; text-align: center;";
  conststyleTitle = "color: white; margin: auto;";
  const styleFooter = "background: #333; color: white; width: 100%; padding: 1rem; text-align: center;";
  const styleMain = "width: 80%; margin: 0 auto; text-align: center;max-width: 60rem;";
  const styleButton = "display: block; background-color: #6e3ef8; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; text-decoration: none;margin:2rem auto ;width:8rem; font-size: 1.2rem;";
  const styleBody = "background:#ffd8d8; width: 100%; padding: 1rem; margin:auto;";

  return `
    <div style="${styleMain}">
      <div style="${styleHeader}">
        <h1 style="${styleTitle}">AVISO DE MODIFICACIÓN/CANCELACIÓN DE EVENTO</h1>
      </div>
      <div style="${styleBody}">
        <h3>Hola ${user.name}, te informamos que ha habido una modificación o cancelación en el evento "${event.tittle}" esta es la actualizacion:</h3>
        <p>Evento: ${event.tittle}</p>
        <p>Fecha: ${formatDateToString(event.startDateTime)}</p>
        <p>Hora: ${getTime(event.startDateTime) } - ${getTime(event.endDateTime)}</p>
        <p>Lamentamos los inconvenientes y te agradecemos tu comprensión.</p>
      </div>
      <div style="${styleFooter}">
        <p>© ${new Date().getFullYear()} X-MOON. Todos los derechos reservados</p>
      </div>
    </div>
  `;
}

module.exports = {
  resetPassword,
  sendVacationUploadConfirmation,
  sendEventModification,
};
