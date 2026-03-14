document.addEventListener("DOMContentLoaded", () => {
  //  alternar tema
  const alternador = document.getElementById("alternador-visual");
  const corpoPagina = document.body;

  // salva preferencia do usuario
  if (localStorage.getItem("preferencia_tema") === "dark") {
    corpoPagina.classList.add("dark-mode");
    alternador.innerText = "Modo☀️";
  }

  alternador.addEventListener("click", () => {
    corpoPagina.classList.toggle("dark-mode");
    if (corpoPagina.classList.contains("dark-mode")) {
      alternador.innerText = "Claro☀️";
      localStorage.setItem("preferencia_tema", "dark");
    } else {
      alternador.innerText = "Escuro🌙";
      localStorage.setItem("preferencia_tema", "light");
    }
  });

  // logica do menu mobile
  const gatilhoMenu = document.getElementById("gatilho-mobile");
  const wrapperNav = document.getElementById("navegacao");
  const linksInternos = document.querySelectorAll(".item-link");

  gatilhoMenu.addEventListener("click", () => {
    wrapperNav.classList.toggle("menu-aberto");
    gatilhoMenu.setAttribute(
      "aria-expanded",
      wrapperNav.classList.contains("menu-aberto"),
    );
  });

  linksInternos.forEach((ancora) => {
    ancora.addEventListener("click", () => {
      wrapperNav.classList.remove("menu-aberto");
      gatilhoMenu.setAttribute("aria-expanded", "false");
    });
  });

  // validação do form e simulação de envio
  const areaForm = document.getElementById("form-fale-conosco");
  const campoNome = document.getElementById("txt-nome");
  const campoEmail = document.getElementById("txt-email");
  const campoMsg = document.getElementById("txt-mensagem");

  // elementos do modal
  const popup = document.getElementById("pop-confirmacao");
  const fecharPopup = document.querySelector(".fechar-janela");
  const confirmacaoBtn = document.getElementById("btn-finalizar");

  // regex para validar formato do e-mail. EX: usuario@gmail.com
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setErro(input, erroId, texto) {
    input.classList.add("borda-alerta");
    document.getElementById(erroId).innerText = texto;
  }

  function clearErro(input, erroId) {
    input.classList.remove("borda-alerta");
    document.getElementById(erroId).innerText = "";
  }

  areaForm.addEventListener("submit", (evento) => {
    evento.preventDefault(); // evita o reload da pagina
    let isValido = true;

    // valida o nome
    if (campoNome.value.trim().length < 3) {
      setErro(
        campoNome,
        "msg-erro-nome",
        "O nome deve ter pelo menos 3 caracteres.",
      );
      isValido = false;
    } else {
      clearErro(campoNome, "msg-erro-nome");
    }

    // valida email
    if (!regexEmail.test(campoEmail.value.trim())) {
      setErro(
        campoEmail,
        "msg-erro-email",
        "Insira um e-mail válido (ex: email@dominio.com).",
      );
      isValido = false;
    } else {
      clearErro(campoEmail, "msg-erro-email");
    }

    // valida o campo da msg
    if (campoMsg.value.trim().length < 10) {
      setErro(
        campoMsg,
        "msg-erro-mensagem",
        "A mensagem deve conter pelo menos 10 caracteres.",
      );
      isValido = false;
    } else {
      clearErro(campoMsg, "msg-erro-mensagem");
    }

    // se tiver ok, simula o envio e abre o modal
    if (isValido) {
      areaForm.reset(); // limpa os campos

      // mostra o modal de confirmação (famoso alert bonitinho)
      popup.style.display = "flex";
    }
  });

  // funções para fechar o modal
  function hidePopup() {
    popup.style.display = "none";
  }

  fecharPopup.addEventListener("click", hidePopup);
  confirmacaoBtn.addEventListener("click", hidePopup);

  // fecha o modal se clicar fora da caixa branca
  window.addEventListener("click", (evento) => {
    if (evento.target === popup) {
      hidePopup();
    }
  });
});
