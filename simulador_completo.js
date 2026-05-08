
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

function guardarCliente(){
    let cedula = recuperaraTexto("txtCedula");
    let nombre = recuperaraTexto("txtNombre");
    let apellido = recuperaraTexto("txtApellido");
    let ingresos = recuperarFloat("txtIngresos");
    let egresos = recuperarFloat("txtEgresos");

    let clienteEncontrado = buscarCliente(cedula);

    if(clienteEncontrado == null){
        let cliente = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            ingresos: ingresos,
            egresos: egresos
        };

        clientes.push(cliente);
    }else{
        clienteEncontrado.nombre = nombre;
        clienteEncontrado.apellido = apellido;
        clienteEncontrado.ingresos = ingresos;
        clienteEncontrado.egresos = egresos;
    }

    pintarClientes();
    limpiar();
}

function pintarClientes(){
    let tabla = document.getElementById("tablaClientes");
    let contenido = "";

    for(let i = 0; i < clientes.length; i++){
        let cliente = clientes[i];

        contenido += "<tr>";
        contenido += "<td>" + cliente.cedula + "</td>";
        contenido += "<td>" + cliente.nombre + "</td>";
        contenido += "<td>" + cliente.apellido + "</td>";
        contenido += "<td>" + cliente.ingresos + "</td>";
        contenido += "<td>" + cliente.egresos + "</td>";
        contenido += "<td>";
        contenido += "<button onclick=\"seleccionarCliente('" + cliente.cedula + "')\">Actualizar</button>";
        contenido += "</td>";
        contenido += "</tr>";
    }

    tabla.innerHTML = contenido;
}

function buscarCliente(cedula){
    for(let i = 0; i < clientes.length; i++){
        if(clientes[i].cedula == cedula){
            return clientes[i];
        }
    }

    return null;
}

function seleccionarCliente(cedula){
    let cliente = buscarCliente(cedula);

    if(cliente != null){
        clienteSeleccionado = cliente;

        mostrarTextoEnCaja("txtCedula", cliente.cedula);
        mostrarTextoEnCaja("txtNombre", cliente.nombre);
        mostrarTextoEnCaja("txtApellido", cliente.apellido);
        mostrarTextoEnCaja("txtIngresos", cliente.ingresos);
        mostrarTextoEnCaja("txtEgresos", cliente.egresos);
    }
}

function limpiar(){
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTextoEnCaja("txtIngresos", "");
    mostrarTextoEnCaja("txtEgresos", "");

    clienteSeleccionado = null;
}