import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./TermsConditions.scss";
export const TermsConditions = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="termsBackCombo" onClick={() => navigate(-1)}>
        <img
          className="termsBackArrow"
          src="/icons/back.png"
          alt="flecha a la izquierda"
        />
        <button className="termsButton" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
      <div className="termsGeneral">
        <h2>Terminos y condiciones de uso</h2>
        <p>
          Términos de servicio para la aplicación móvil Kankoo ¡Bienvenido a
          Kankoo! Estos términos de servicio ("Términos") rigen tu uso de la
          aplicación móvil Kankoo ("App") y sus servicios relacionados. Al usar
          la App, aceptas estos Términos, que constituyen un acuerdo vinculante
          entre tú y Kankoo. Si no estás de acuerdo con estos Términos, no uses
          la App. Uso de la App Solo puedes usar la App para sus fines previstos
          y cumplir con estos Términos y todas las leyes y regulaciones
          aplicables. No debes utilizar la App con fines ilegales o no
          autorizados. Registro de cuenta Para utilizar ciertas funciones de la
          App, es posible que debas registrarte para obtener una cuenta. Aceptas
          proporcionar información precisa y completa al crear una cuenta y
          actualizar tu información según sea necesario. Eres responsable de
          mantener la confidencialidad de tu cuenta y contraseña y de restringir
          el acceso a tu cuenta. Contenido La App puede permitirte publicar,
          cargar u enviar contenido, incluidas fotos y texto ("Contenido").
          Conservas todos los derechos sobre el Contenido que publicas. Al
          publicar Contenido, otorgas a Kankoo una licencia no exclusiva,
          transferible, sublicenciable, libre de regalías, mundial para usar,
          copiar, modificar, crear obras derivadas, distribuir, mostrar
          públicamente, realizar públicamente y explotar de cualquier otra
          manera dicho Contenido en todos los formatos y canales de distribución
          conocidos o desarrollados en el futuro (Kankoo en relación con la App
          y el negocio de Kankoo y en sitios y servicios de terceros), sin
          previo aviso o consentimiento adicional tuyo, y sin la obligación de
          realizar pagos a ti o a cualquier otra persona o entidad. Conducta del
          usuario No debes usar la App de ninguna manera perjudicial,
          fraudulenta o engañosa, o que viole estos Términos o las leyes y
          regulaciones aplicables. No debes participar en conductas que puedan
          dañar, deshabilitar, sobrecargar o perjudicar la App o interferir con
          el uso y disfrute de la App por parte de cualquier otra parte.
          Derechos de propiedad intelectual Kankoo posee todos los derechos,
          títulos e intereses en y para la App, incluidos todos los derechos de
          propiedad intelectual. No debes copiar, modificar, distribuir, vender
          o arrendar ninguna parte de la App sin el consentimiento previo por
          escrito de Kankoo. Privacidad Kankoo recopila, utiliza y divulga tu
          información de acuerdo con nuestra Política de Privacidad, que se
          incorpora a estos Términos. Renuncia de garantías LA APP SE
          PROPORCIONA "TAL CUAL" Y SIN GARANTÍA DE NINGÚN TIPO. Kankoo RENUNCIA
          A TODAS LAS GARANTÍAS, YA SEAN EXPRESAS, IMPLÍCITAS, LEGALES O DE OTRO
          TIPO, INCLUYENDO, SIN LIMITACIÓN, GARANTÍAS DE COMERCIABILIDAD,
          IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. Limitación de
          responsabilidad EN NINGÚN CASO Kankoo SERÁ RESPONSABLE ANTE TI O
          CUALQUIER TERCERO POR DAÑOS INDIRECTOS, CONSECUENTES, INCIDENTALES,
          ESPECIALES O PUNITIVOS, INCLUYENDO PÉRDIDAS DE BENEFICIOS, DERIVADOS
          DE O EN CONEXIÓN CON ESTOS TÉRMINOS O TU USO DE LA APP, AUNQUE Kankoo
          HAYA SIDO ADVERTIDO DE LA POSIBILIDAD DE TALES DAÑOS. LA
          RESPONSABILIDAD TOTAL DE Kankoo ANTE TI POR TODAS LAS RECLAMACIONES
          DERIVADAS DE O EN CONEXIÓN CON ESTOS TÉRMINOS O TU USO DE LA APP NO
          EXCEDERÁ LAS CANTIDADES PAGADAS POR TI A Kankoo, EN CASO DE HABERLAS,
          DURANTE LOS SEIS MESES ANTERIORES AL EVENTO QUE DÉ LUGAR A LA
          RESPONSABILIDAD. Indemnización Te comprometes a indemnizar, defender y
          eximir de responsabilidad a Kankoo y a sus funcionarios, directores,
          empleados, agentes y afiliados de cualquier reclamo, daño, pérdida,
          responsabilidad, costo y gasto (incluidos honorarios razonables de
          abogados) derivados de o en relación con tu uso de la App o cualquier
          violación de estos.
        </p>
      </div>
    </Container>
  );
};
