import "./Loader.css";

function Loader() {
  return (
    <div className="scene">
      <div className="cube-wrapper">
        <div className="cube">
          <div className="cube-faces">
            <div className="cube-face front">
              {" "}
              <p className="loader-message-front">...du Pdf</p>
            </div>
            <div className="cube-face top">
              <p>FACTURATOR</p>
            </div>
            <div className="cube-face left">
              <p className="loader-message-left">Chargement...</p>
            </div>
            <div className="cube-face right"></div>
            <div className="cube-face back"></div>
            <div className="cube-face bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Loader;
