
document.querySelectorAll(".desplegable").forEach(desplegable => {

    const cabecera = desplegable.querySelector(".cabecera-desplegable");
    const contenido = desplegable.querySelector(".contenido-desplegable");

    cabecera.addEventListener("click", () => {

        const estaAbierto = desplegable.classList.contains("abierto");

        if (estaAbierto) {

            // CERRAR
            contenido.style.height = contenido.scrollHeight + "px";

            // Forzar al navegador a registrar la altura actual
            contenido.offsetHeight;

            // Iniciar la animación de cierre
            contenido.style.height = "0px";

            desplegable.classList.remove("abierto");

        } else {

            // ABRIR
            desplegable.classList.add("abierto");

            contenido.style.height = contenido.scrollHeight + "px";

            // Al terminar la animación, liberar la altura
            contenido.addEventListener("transitionend", function finalizar(e) {

                if (e.propertyName === "height") {

                    if (desplegable.classList.contains("abierto")) {
                        contenido.style.height = "auto";
                    }

                    contenido.removeEventListener("transitionend", finalizar);
                }

            });

        }

    });

});