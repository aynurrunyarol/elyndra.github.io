const botonInfo = document.getElementById("btn-mas-info");
const inicioMain = document.getElementById("inicio-main");

botonInfo.addEventListener("click", () => {
    inicioMain.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});