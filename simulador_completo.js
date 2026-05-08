
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function mostrarParametros(){
    document.getElementById("parametros").classList.add("activa");
    document.getElementById("clientes").classList.remove("activa");
}

function mostrarClientes(){
    document.getElementById("clientes").classList.add("activa");
    document.getElementById("parametros").classList.remove("activa");
}

function ocultarSecciones(){
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("credito").classList.remove("activa");
    document.getElementById("listaCreditos").classList.remove("activa");
}

function mostrarSeccion(id){
    ocultarSecciones();

    document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
    let tasa;

    tasa = recuperarFloat("tasaInteres");

    if(tasa >= 10 && tasa <= 20){
        tasaInteres = tasa;
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasaInteres + "%");
    }else{
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
}