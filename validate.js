/* Variables */

const camposDoFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]');
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]
const mensagens = {
    nome: {
      valueMissing: "O campo 'Nome' não pode estar vazio.",
      patternMismatch: "Por favor, preencha um nome válido.",
      tooShort: "O nome deve ter, pelo menos 3 caracteres."
    },
    email: {
      valueMissing: "O campo 'E-mail' não pode estar vazio.",
      typeMismatch: "Por favor, preencha um email válido.",
      tooShort: "O campo 'E-mail' não tem caractéres suficientes."
    },
    assunto: {
      valueMissing: "O campo 'Assunto' não pode estar vazio.",
      tooShort: "O campo 'Assunto' não tem caractéres suficientes."
    },
    mensagem: {
      valueMissing: "O campo 'Mensagem' não pode estar vazio.",
      tooShort: "O campo 'Mensagem' não tem caracteres suficientes."
    }
}

/* Listeners */

window.addEventListener('scroll', scrollCheck)

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "assunto": e.target.elements["assunto"].value,
        "mensagem": e.target.elements["mensagem"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
    window.location.href = "./index.html";
})

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

/* Functions */

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}
function upScreen () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
}
function scrollCheck () {
    if (window.scrollY === 0) {
      document.querySelector('.top').style.display = 'none';
    } else {
      document.querySelector('.top').style.display = 'block';
    }
}