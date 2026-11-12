document.querySelectorAll(".leerMas").forEach(botonMas => {

    // Obtener el contenido que corresponde a este botón
    const contenido = botonMas.nextElementSibling;

    // Comprobar que el siguiente elemento sea el contenido oculto
    if (!contenido || !contenido.classList.contains("contenido-extra")) return;

    const botonMenos = contenido.querySelector(".leerMenos");

    if (!botonMenos) return;


    // ABRIR
    botonMas.addEventListener("click", () => {

        contenido.style.height = contenido.scrollHeight + "px";

        botonMas.style.display = "none";

        contenido.addEventListener("transitionend", function finalizar(e) {

            if (e.propertyName === "height") {
                contenido.style.height = "auto";
                contenido.removeEventListener("transitionend", finalizar);
            }

        });

    });


    // CERRAR
    botonMenos.addEventListener("click", () => {

        contenido.style.height = contenido.scrollHeight + "px";

        // Forzar el cálculo de la altura actual
        contenido.offsetHeight;

        contenido.style.height = "0px";

        botonMas.style.display = "block";

    });

});