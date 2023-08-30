const { sendEmail } = require("../services/emailService");
const { getUserById } = require("../services/userService");
const { createEmailTokenById, formatDateToString, getTime } = require("./utils");

const linkConfirmEmailByIdUser  = (user)=>{
  const token = createEmailTokenById(user?.idUser,user?.email)
  return `${process.env.DOMAIN_FRONTEND}confirmEmail/${token.replaceAll(".","*")}`
}

const sendConfirmEmail = async (idUser) => {
  try {
    const user = await getUserById(idUser,"");
    if (!user) throw new Error("Error al intentar mandar email al usuario");

    const subject = 'Confirmar dirección de correo electrónico - DateTy';
    const html = generateConfirmEmail(user);

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
};

const generateConfirmEmail = (user) => {
  const styleHeader = "background: #6e3ef8;  width: 100%; padding: 1rem; margin:auto; display: flex; justify-content: center; align-items: center; text-align: center;";
  const styleTitle = "color: white; margin: auto;";
  const styleFooter = "background: #333; color: white; width: 100%; padding: 1rem; text-align: center;";
  const styleMain = "width: 80%; margin: 0 auto; text-align: center;max-width: 60rem;";
  const styleButton = "display: block; background-color: #6e3ef8; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; text-decoration: none;margin:2rem auto ;width:8rem; font-size: 1.2rem;";
  const styleBody = "background:#ffd8d8; width: 100%; padding: 1rem; margin:auto;";

  return `
    <div style="${styleMain}">
      <div style="${styleHeader}">
        <h1 style="${styleTitle}">CONFIRMAR DIRECCIÓN DE CORREO ELECTRÓNICO</h1>
      </div>
      <div style="${styleBody}">
        <h3>Hola ${user.name}, ¡Gracias por registrarte en DateTy! Para completar el proceso de registro, por favor confirma tu dirección de correo electrónico haciendo clic en el siguiente botón:</h3>
        <a href=${linkConfirmEmailByIdUser(user)} style="${styleButton}">Confirmar Email</a>
      </div>
      <div style="${styleFooter}">
        <p>© ${new Date().getFullYear()} X-MOON. Todos los derechos reservados</p>
      </div>
    </div>
  `;
};


const resetPassword = async (idUser) => {
  try {
    const user = await getUserById(idUser);
    if (!user) throw new Error("Error al agregar usuarios");

    const subject = 'Recuperar Contraseña DateTy';
    const html = generateResetPasswordEmail(user);

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
};
const generateResetPasswordEmail = (user) => {
  const styleHeader = "background: #6e3ef8;  width: 100%; padding: 1rem; margin:auto; display: flex; justify-content: center; align-items: center; text-align: center;";
  const styleTitle = "color: white; margin: auto;";
  const styleFooter = "background: #333; color: white; width: 100%; padding: 1rem; text-align: center;";
  const styleMain = "width: 80%; margin: 0 auto; text-align: center;max-width: 60rem;";
  const styleButton = "display: block; background-color: #6e3ef8; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; text-decoration: none;margin:2rem auto ;width:8rem; font-size: 1.2rem;";
  const styleBody = "background:#ffd8d8; width: 100%; padding: 1rem; margin:auto;";

  return `
    <div style="${styleMain}">
      <div style="${styleHeader}">
        <h1 style="${styleTitle}">RESETEAR CONTRASEÑA</h1>
      </div>
      <div style="${styleBody}">
        <h3>Hola ${user.name}, parece que has perdido el acceso a tu cuenta de DateTy y solicitaste un cambio de contraseña. Si esto no es así, desestima este mensaje. De lo contrario, haz clic en el siguiente botón:</h3>
        <a href="https://google.com.ar" style="${styleButton}">Resetear Contraseña</a>
      </div>
      <div style="${styleFooter}">
        <p>© ${new Date().getFullYear()} X-MOON. Todos los derechos reservados</p>
      </div>
    </div>
  `;
};

async function sendSecurityNotification(idUser) {
  try {
    const user = await getUserById(idUser);
    if (!user) throw new Error("Error al agregar usuarios");

    const subject = 'Aviso de Seguridad';
    const html = generateSecurityNotificationEmail(user);

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

function generateSecurityNotificationEmail(user) {
  const styleHeader = "background: #6e3ef8;  width: 100%; padding: 1rem; margin:auto; display: flex; justify-content: center; align-items: center; text-align: center;";
  const styleTitle = "color: white; margin: auto;";
  const styleFooter = "background: #333; color: white; width: 100%; padding: 1rem; text-align: center;";
  const styleMain = "width: 80%; margin: 0 auto; text-align: center;max-width: 60rem;";
  const styleButton = "display: block; background-color: #6e3ef8; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; text-decoration: none;margin:2rem auto ;width:8rem; font-size: 1.2rem;";
  const styleBody = "background:#ffd8d8; width: 100%; padding: 1rem; margin:auto;";

  return `
    <div style="${styleMain}">
      <div style="${styleHeader}">
        <h1 style="${styleTitle}">AVISO DE SEGURIDAD</h1>
      </div>
      <div style="${styleBody}">
        <h3>Hola ${user.name}, se ha detectado un cambio de contraseña o información en tu cuenta de DateTy. Si no realizaste estos cambios, te recomendamos tomar las siguientes medidas de seguridad:</h3>
        <ul>
          <li>Cambiar tu contraseña de inmediato.</li>
          <li>Revisar y actualizar la información de seguridad en tu cuenta.</li>
          <li>Contactar al soporte técnico si sospechas de actividad no autorizada.</li>
        </ul>
        <p>Si fuiste tú quien realizó estos cambios, puedes ignorar este mensaje.</p>
      </div>
      <div style="${styleFooter}">
        <p>© ${new Date().getFullYear()} X-MOON. Todos los derechos reservados</p>
      </div>
    </div>
  `;
}

async function sendEventReminder(idUser, event) {
  try {
    const user = await getUserById(idUser);
    if (!user) throw new Error("Error al agregar usuarios");

    const subject = 'Recordatorio de Evento';
    const html = generateEventReminderEmail(user, event);

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

function generateEventReminderEmail(user, event) {
  const styleHeader = "background: #6e3ef8;  width: 100%; padding: 1rem; margin:auto; display: flex; justify-content: center; align-items: center; text-align: center;";
  const styleTitle = "color: white; margin: auto;";
  const styleFooter = "background: #333; color: white; width: 100%; padding: 1rem; text-align: center;";
  const styleMain = "width: 80%; margin: 0 auto; text-align: center;max-width: 60rem;";
  const styleButton = "display: block; background-color: #6e3ef8; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; text-decoration: none;margin:2rem auto ;width:8rem; font-size: 1.2rem;";
  const styleBody = "background:#ffd8d8; width: 100%; padding: 1rem; margin:auto;";

  return `
    <div style="${styleMain}">
      <div style="${styleHeader}">
        <h1 style="${styleTitle}">RECORDATORIO DE EVENTO</h1>
      </div>
      <div style="${styleBody}">
        <h3>Hola ${user.name}, te recordamos que tienes un evento programado:</h3>
        <p>Evento: ${event.tittle}</p>
        <p>Fecha: ${formatDateToString(event.startDateTime)}</p>
        <p>Hora: ${getTime(event.startDateTime) } - ${getTime(event.endDateTime)}</p>
        <p>No olvides estar presente y disfrutar del evento.</p>
      </div>
      <div style="${styleFooter}">
        <p>© ${new Date().getFullYear()} X-MOON. Todos los derechos reservados</p>
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

async function sendEventInvitation(idUser, event) {
  try {
    const user = await getUserById(idUser);
    if (!user) throw new Error("Error al agregar usuarios");

    const subject = 'Invitación a Evento';
    const html = generateEventInvitationEmail(user, event);

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

function generateEventInvitationEmail(user, event) {
  const styleHeader = "background: #6e3ef8;  width: 100%; padding: 1rem; margin:auto; display: flex; justify-content: center; align-items: center; text-align: center;";
  const styleTitle = "color: white; margin: auto;";
  const styleFooter = "background: #333; color: white; width: 100%; padding: 1rem; text-align: center;";
  const styleMain = "width: 80%; margin: 0 auto; text-align: center;max-width: 60rem;";
  const styleButton = "display: block; background-color: #6e3ef8; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; text-decoration: none;margin:2rem auto ;width:8rem; font-size: 1.2rem;";
  const styleBody = "background:#ffd8d8; width: 100%; padding: 1rem; margin:auto;";

  return `
    <div style="${styleMain}">
      <div style="${styleHeader}">
        <h1 style="${styleTitle}">INVITACIÓN A EVENTO</h1>
      </div>
      <div style="${styleBody}">
        <h3>Hola ${user.name}, tienes una invitación para el siguiente evento:</h3>
        <p>Evento: ${event.tittle}</p>
        <p>Fecha: ${formatDateToString(event.startDateTime)}</p>
        <p>Hora: ${getTime(event.startDateTime) } - ${getTime(event.endDateTime)}</p>
        <p>Esperamos contar con tu presencia en este evento. ¡No te lo pierdas!</p>
      </div>
      <div style="${styleFooter}">
        <p>© ${new Date().getFullYear()} X-MOON. Todos los derechos reservados</p>
      </div>
    </div>
  `;
}

module.exports = {
  resetPassword,
  sendSecurityNotification,
  sendEventReminder,
  sendEventModification,
  sendEventInvitation,
  sendConfirmEmail
};
