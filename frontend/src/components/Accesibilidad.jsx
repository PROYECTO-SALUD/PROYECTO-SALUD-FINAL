import './Accesibilidad.css';
// COMPONENTE DE ACCESIBILIDAD
function Accesibilidad() {
function activarContraste() {

    document.body.classList.toggle("contraste-activo");
}


function aumentarLetra() {

    /* SI NO EXISTE */
    if (!document.body.classList.contains("letra-grande")) {

        document.body.classList.add("letra-grande");
    }

    /* SI YA EXISTE */
    else if (!document.body.classList.contains("letra-extra-grande")) {

        document.body.classList.add("letra-extra-grande");
    }
}


function reducirLetra() {

    /* SI EXISTE EXTRA GRANDE */
    if (document.body.classList.contains("letra-extra-grande")) {

        document.body.classList.remove("letra-extra-grande");
    }

    /* SI EXISTE GRANDE */
    else if (document.body.classList.contains("letra-grande")) {

        document.body.classList.remove("letra-grande");
    }
}


/* RESTAURAR */
function restaurarAccesibilidad() {

    document.body.classList.remove("contraste-activo");

    document.body.classList.remove("letra-grande");
}

  return (
    <>

      {/* PANEL DE ACCESIBILIDAD */}
      <div className="panel-accesibilidad">

        {/* BOTÓN CONTRASTE */}
        <button title="Contraste" onClick={activarContraste}>
          <span className="icono">◐</span>
          <span className="texto">Contraste</span>
        </button>

        {/* BOTÓN REDUCIR LETRA */}
        <button title="Reducir letra" onClick={reducirLetra}>
          <span className="icono">A-</span>
          <span className="texto">Reducir letra</span>
        </button>

        {/* BOTÓN AUMENTAR LETRA */}
        <button title="Aumentar letra" onClick={aumentarLetra}>
          <span className="icono">A+</span>
          <span className="texto">Aumentar letra</span>
        </button>

        {/* BOTÓN RESTAURAR */}
        <button title="Restaurar" onClick={restaurarAccesibilidad}>
          <span className="icono">↺</span>
          <span className="texto">Restaurar</span>
        </button>

      </div>

    </>
  );
}

export default Accesibilidad;