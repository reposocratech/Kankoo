import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./PrivacyPolicy.scss";
export const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <Row className="d-flex">
        <Col
          lg={6}
          md={6}
          sm={12}
          xs={12}
          className="d-flex align-items-center justify-content-lg-end text-center"
        >
          <img className="imgPol" src="/assets/polPic.jpg" alt="" />
        </Col>
        <Col>
          <div className="polGeneral">
            <h2 className="mb-4 h2Pol">Política de privacidad</h2>
            <p>
              En Kankoo estamos comprometidos a proteger tu privacidad e
              información personal. Esta política de privacidad explica cómo
              recopilamos, utilizamos y divulgamos tu información cuando
              utilizas nuestra aplicación móvil Kankoo ("App"). Información que
              recopilamos Cuando utilizas la App, podemos recopilar los
              siguientes tipos de información: Información personal: Podemos
              recopilar información personal que nos proporcionas, como tu
              nombre, dirección de correo electrónico y credenciales de inicio
              de sesión en redes sociales cuando creas una cuenta en nuestra
              App. Información de ubicación: Podemos recopilar información sobre
              tu ubicación a través del GPS de tu dispositivo u otras
              tecnologías basadas en la ubicación cuando usas nuestra App.
              Información de uso: Podemos recopilar información sobre cómo
              utilizas nuestra App, incluida la fecha y hora de tu visita, las
              páginas o pantallas que visualizas y las acciones que realizas
              mientras usas la App.
            </p>
            <p>
              Información del dispositivo: Podemos recopilar información sobre
              el dispositivo que utilizas para acceder a nuestra App, como el
              modelo de hardware, el sistema operativo y los identificadores
              únicos del dispositivo. Cómo utilizamos tu información Utilizamos
              tu información para brindarte una experiencia personalizada y
              eficiente en nuestra App, incluyendo: Proporcionarte acceso a
              nuestra App y sus funciones. Comunicarnos contigo sobre nuestra
              App, incluyendo actualizaciones, cambios y promociones.
            </p>
            <p>
              Analizar cómo utilizas nuestra App para mejorar su funcionalidad y
              experiencia de usuario. Personalizar tu experiencia en nuestra App
              según tus preferencias e intereses. Hacer cumplir nuestros
              Términos de Servicio y otras políticas aplicables. Cómo
              compartimos tu información Podemos compartir tu información con
              terceros en las siguientes circunstancias: Con tu consentimiento:
              Podemos compartir tu información con terceros si das tu
              consentimiento para dicho intercambio. Con nuestros proveedores de
              servicios: Podemos compartir tu información con proveedores de
              servicios externos que nos ayudan a operar nuestra App y brindarte
              nuestros servicios. Según lo requiera la ley: Podemos divulgar tu
              información si estamos obligados a hacerlo por ley o de buena fe
              creemos que dicha acción es necesaria para cumplir con leyes,
              regulaciones o procesos legales aplicables.os o las leyes y
              regulaciones aplicables.
            </p>
            <p>
              En caso de fusión o adquisición: Si participamos en una fusión,
              adquisición o venta de la totalidad o parte de nuestros activos,
              tu información puede transferirse como parte de esa transacción.
              Cómo protegemos tu información Tomamos medidas razonables para
              proteger tu información contra el acceso, uso o divulgación no
              autorizados. Sin embargo, ningún método de transmisión por
              internet o almacenamiento electrónico es 100% seguro. Por lo
              tanto, no podemos garantizar su seguridad absoluta. Tus opciones
              Puedes controlar los tipos de información que recopilamos
              ajustando la configuración de tu dispositivo o eligiendo no
              utilizar nuestra App.
            </p>
            <p>
              Sin embargo, ten en cuenta que ciertas funciones de nuestra App
              pueden no funcionar correctamente sin cierta información. Cambios
              en esta política de privacidad Podemos actualizar esta política de
              privacidad de vez en cuando. Si realizamos cambios importantes, te
              notificaremos por correo electrónico o mediante un aviso en
              nuestra App. Contáctanos Si tienes alguna pregunta o inquietud
              acerca de esta política de privacidad o nuestras prácticas de
              privacidad, contáctanos en support@Kankoo.app.
            </p>

            <button className="polButton" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
