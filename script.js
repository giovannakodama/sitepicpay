const reqres = "https://reqres.in/api/";
const var_api = reqres;

function logo() {
  var wrapper_index = doent.getElementById("wrapper_index");
  var wrapper_login = document.getElementById("wrapper_login");
  var wrapper_busca = document.getElementById("wrapper_busca");
  var wrapper_cadastro = document.getElementById("wrapper_cadastro");
  var wrapper_upload = document.getElementById("wrapper_upload");
  var footer = document.getElementById("footer");
  var dialog = document.getElementById("dialog_index");

  wrapper_login.className = "desaparecer";
  wrapper_busca.className = "desaparecer";
  wrapper_cadastro.className = "desaparecer";
  wrapper_upload.className = "desaparecer";
  wrapper_index.className = "wrapper";
  footer.className = "footer";
  dialog.className = "desaparecer";
}

function iniciar() {
  var btn_logar = document.getElementById("btn_inicio");
  var login_mobile = document.getElementById("login_mobile");
  var wrapper_index = document.getElementById("wrapper_index");
  var wrapper_login = document.getElementById("wrapper_login");
  var wrapper_busca = document.getElementById("wrapper_busca");
  var wrapper_cadastro = document.getElementById("wrapper_cadastro");
  var wrapper_upload = document.getElementById("wrapper_upload");

  wrapper_login.className = "desaparecer";
  wrapper_busca.className = "desaparecer";
  wrapper_cadastro.className = "desaparecer";
  wrapper_upload.className = "desaparecer";
  btn_logar.addEventListener("click", function () {
    wrapper_index.className = "desaparecer";
    wrapper_login.className = "wrapper";
    wrapper_busca.className = "desaparecer";
    wrapper_cadastro.className = "desaparecer";
    wrapper_upload.className = "desaparecer";
  });

  login_mobile.addEventListener("click", function () {
    wrapper_index.className = "desaparecer";
    wrapper_login.className = "wrapper";
    wrapper_busca.className = "desaparecer";
    wrapper_cadastro.className = "desaparecer";
    wrapper_upload.className = "desaparecer";
  });
}

function pesquisar() {
  var wrapper_index = document.getElementById("wrapper_index");
  var wrapper_login = document.getElementById("wrapper_login");
  var wrapper_busca = document.getElementById("wrapper_busca");
  var wrapper_cadastro = document.getElementById("wrapper_cadastro");
  var wrapper_upload = document.getElementById("wrapper_upload");
  var token = localStorage.getItem("token");
  var dialog = document.getElementById("dialog_index");
  var mensagem = document.getElementById("mensagem_index");
  var btn_OK_index = document.getElementById("btn_OK_index");
  var btn_pesquisar = document.getElementById("btn_pesquisar");

  btn_pesquisar.addEventListener("click", function () {
    console.log("clicou");
    if (token == undefined) {
      mensagem.innerHTML =
        "Necessário estar logado para acessar pesquisa. Faça agora o login!";
      dialog.className = "dialog show";
    } else {
      wrapper_index.className = "desaparecer";
      wrapper_login.className = "desaparecer";
      wrapper_busca.className = "wrapper";
      wrapper_cadastro.className = "desaparecer";
      wrapper_upload.className = "desaparecer";
    }
  });

  btn_OK_index.addEventListener("click", function () {
    wrapper_index.className = "desaparecer";
    wrapper_login.className = "wrapper";
    wrapper_busca.className = "desaparecer";
    wrapper_cadastro.className = "desaparecer";
  });
}

function upload() {
  var wrapper_index = document.getElementById("wrapper_index");
  var wrapper_login = document.getElementById("wrapper_login");
  var wrapper_busca = document.getElementById("wrapper_busca");
  var wrapper_cadastro = document.getElementById("wrapper_cadastro");
  var wrapper_upload = document.getElementById("wrapper_upload");

  var dialog = document.getElementById("dialog_upload");
  var mensagem = document.getElementById("mensagem_upload");
  var btn_OK_upload = document.getElementById("btn_OK_upload");

  wrapper_index.className = "desaparecer";
  wrapper_login.className = "desaparecer";
  wrapper_busca.className = "desaparecer";
  wrapper_cadastro.className = "desaparecer";
  wrapper_upload.className = "wrapper";
  var button = document.getElementById("button_upload");
  var data = document.getElementById("input_data");
  var descricao = document.getElementById("input_descricao");
  var file = document.getElementById("button_escolher");
  var flag = 0;
  const formData = new FormData();

  button.onclick = function () {
    formData.append("file", file.files[0]);
    formData.append("data", data.value);
    formData.append("descricao", descricao.value);

    if (
      data.value.length > 0 &&
      descricao.value.length > 0 &&
      file.files[0] != null
    ) {
      axios
        .post(var_api + "upload", formData, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        .then(function (response) {
          if (response.status == 200) {
            flag = 1;
            mensagem.innerHTML = "Upload realizado com Sucesso!";
            dialog.className = "dialog show";
          }
        })
        .catch(function (error) {
          mensagem.innerHTML = "Erro ao fazer upload!";
          dialog.className = "dialog show";
        });
    } else {
      mensagem.innerHTML = "Insira os dados!";
      dialog.className = "dialog show";
    }
  };

  btn_OK_upload.addEventListener("click", function () {
    if (flag == 1) {
      wrapper_index.className = "desaparecer";
      wrapper_login.className = "desaparecer";
      wrapper_busca.className = "wrapper";
      wrapper_cadastro.className = "desaparecer";
      wrapper_upload.className = "desaparecer";
    } else {
      dialog.className = "dialog";
    }
  });
}

function download(image) {
  console.log(image);
  var img_busca = document.getElementById("img_busca");
  axios.get(var_api + "download/" + image).then(function (res) {
    if (res) {
      console.log(res);
    } else {
      console.log("Erro ao buscar a imagem!");
    }
  });
}

function busca_api() {
  var msg = document.getElementById("result");
  var button = document.getElementById("button_api");
  var search = document.getElementById("search");
  var button_upload = document.getElementById("btn_upload_page");

  var dialog = document.getElementById("dialog_busca");
  var mensagem = document.getElementById("mensagem_busca");
  var btn_OK_busca = document.getElementById("btn_OK_busca");

  button.addEventListener("click", function () {
    console.log(search.value);
    if (search.value != "") {
      axios
        .post(var_api + "upload/data", {
          data: search.value,
        })
        .then(function (res) {
          if (res.data != null) {
            console.log(res);
            msg.innerHTML =
              "Data: " +
              res.data.data +
              "<br>" +
              "Descrição: " +
              res.data.descricao +
              "<br>" +
              `<img src="${var_api}download/${res.data.image_name}" width=300 height=200>`;

            //  download()
          } else {
            msg.innerHTML =
              "Não foram encontrados eventos correspondentes a data " +
              search.value;
          }
        });
    } else {
      mensagem.innerHTML = "Selecione uma data!";
      dialog.className = "dialog show";
    }
  });

  button_upload.addEventListener("click", function () {
    var token = localStorage.getItem("token");
    console.log(token);
    axios
      .get(var_api + "adm", {
        headers: {
          Authorization: token,
        },
      })
      .then(function (r) {
        if (r.status == 200) {
          upload();
        } else if (r.status == 403) {
          mensagem.innerHTML = "Usuário não tem permissão!";
          dialog.className = "dialog show";
        }
      })
      .catch(function (error) {
        mensagem.innerHTML = "Usuário não tem permissão!";
        dialog.className = "dialog show";
      });
  });

  btn_OK_busca.addEventListener("click", function () {
    dialog.className = "dialog";
  });
}

function verificaEmail(email) {
  usuario = email.value.substring(0, email.value.indexOf("@")); // pega a primeira parte do email, usuario
  dominio = email.value.substring(
    email.value.indexOf("@") + 1,
    email.value.length
  ); // pega a segunda parte, o dominio

  if (
    usuario.length >= 1 &&
    dominio.length >= 3 &&
    usuario.search("@") == -1 &&
    dominio.search("@") == -1 &&
    usuario.search(" ") == -1 &&
    dominio.search(" ") == -1 &&
    dominio.search(".") != -1 &&
    dominio.indexOf(".") >= 1 &&
    dominio.lastIndexOf(".") < dominio.length - 1
  ) {
    return true;
  } else {
    return false;
  }
}

function cadastrar() {
  var btn_cadastrar = document.getElementById("button");
  var email = document.getElementById("email");
  var senha = document.getElementById("senha");
  var confsenha = document.getElementById("confsenha");
  var dialog = document.getElementById("dialog_cadastro");
  var mensagem = document.getElementById("mensagem_cadastro");
  var btn_OK = document.getElementById("btn_OK_cadastro");
  var resposta = 400;

  var val_email = document.getElementById("email-verify");
  var val_senha = document.getElementById("senha-verify");
  var val_confsenha = document.getElementById("confsenha-verify");
  var aux_email = false;
  var aux_senha = false;

  email.addEventListener("keyup", function () {
    if (email.value == "") {
      val_email.innerHTML = "Email deve ser preenchido";
    } else if (verificaEmail(email)) {
      aux_email = true;
      val_email.innerHTML = "";
    } else {
      email.classList.toggle("toggleFocusRed");
      val_email.innerHTML = "Email inválido";
    }
  });

  senha.addEventListener("keyup", function () {
    if (senha.value == "") {
      val_senha.innerHTML = "Senha deve ser preenchida";
      val_confsenha.innerHTML = "";
    }

    if (senha.value.length < 4) {
      val_senha.innerHTML = "Senha inválida";
      val_confsenha.innerHTML = "";
    } else {
      val_senha.innerHTML = "";
      val_confsenha.innerHTML = "";
    }
  });

  confsenha.addEventListener("keyup", function () {
    if (senha.value == confsenha.value) {
      aux_senha = true;
      val_senha.innerHTML = "";
      val_confsenha.innerHTML = "";
    } else if (senha.value != confsenha.value) {
      confsenha.classList.toggle("toggleFocusRed");
      val_senha.innerHTML = "";
      val_confsenha.innerHTML = "Senhas não conferem";
    } else {
      val_confsenha.innerHTML = "";
    }
  });

  // Para executar, deve usar o email = eve.holt@reqres.in e senha = pistol

  btn_cadastrar.addEventListener("click", function () {
    if (aux_email == true && aux_senha == true) {
      var json = axios
        .post(var_api + "users", {
          email: email.value,
          password: senha.value,
        })
        .then(function (response) {
          if (response.status == 200) {
            /*alert("Cadastro realizado com sucesso");*/
            mensagem.innerHTML = "Cadastro realizado com sucesso!";
            dialog.className = "dialog show";
            resposta = response.status;
          }
        })
        .catch(function (error) {
          mensagem.innerHTML = "Erro ao cadastrar! Tente novamente!";
          dialog.className = "dialog show";
          resposta = 400;
        });
    } else {
      mensagem.innerHTML = "Usuário e/ou senha inválidos! Tente novamente!";
      dialog.className = "dialog show";
      resposta = 400;
    }
  });

  btn_OK.addEventListener("click", function () {
    dialog.className = "dialog";

    if (resposta == 200) {
      var wrapper_index = document.getElementById("wrapper_index");
      var wrapper_login = document.getElementById("wrapper_login");
      var wrapper_busca = document.getElementById("wrapper_busca");
      var wrapper_cadastro = document.getElementById("wrapper_cadastro");

      wrapper_index.className = "desaparecer";
      wrapper_login.className = "wrapper";
      wrapper_busca.className = "desaparecer";
      wrapper_cadastro.className = "desaparecer";
    }
  });
}

function cadastro() {
  var link_cadastrar = document.getElementById("link_cadastrar");

  var wrapper_index = document.getElementById("wrapper_index");
  var wrapper_login = document.getElementById("wrapper_login");
  var wrapper_busca = document.getElementById("wrapper_busca");
  var wrapper_cadastro = document.getElementById("wrapper_cadastro");
  var wrapper_upload = document.getElementById("wrapper_upload");

  link_cadastrar.addEventListener("click", function () {
    wrapper_cadastro.className = "wrapper";
    wrapper_login.className = "desaparecer";
    wrapper_busca.className = "desaparecer";
    wrapper_index.className = "desaparecer";
    wrapper_upload.className = "desaparecer";
  });
}

function mobile() {
  var footer = document.getElementById("footer");
  footer.className = "desaparecer";
}

function displayForm() {
  window.location.replace('login/index.html')
}

function menu() {
  window.location.replace('../index.html')
}

function login(e) {
  const email = document.getElementById('email_input')
  const password = document.getElementById('password_input')
  if (email.value.trim() === '' || password.value.trim() === '') return
  if (email.value === 'eve.holt@reqres.in' && password.value === 'cityslicka') {
    document.cookie = "email=eve.holt@reqres.in"
    location.replace('../user/index.html')
  } else {
    email.classList.add('wrong-input')
    password.classList.add('wrong-input')
  }
}
