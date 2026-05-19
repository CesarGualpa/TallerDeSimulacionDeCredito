
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let montoMaximo = 5000;

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

function guardarParametros(){
    let tasa = recuperarFloat("tasaInteres");
    let maximo = recuperarFloat("montoMaximo");

    if(tasa < 10 || tasa > 20){
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
        return;
    }

    if(maximo <= 0){
        mostrarTexto("mensajeTasa", "El monto máximo debe ser mayor a 0");
        return;
    }

    tasaInteres = tasa;
    montoMaximo = maximo;

    mostrarTexto(
        "mensajeTasa", 
        "Parámetros guardados correctamente. Tasa: " + tasaInteres + "% - Monto máximo: " + montoMaximo
    );
}

function guardarCliente(){
    let cedula = recuperaraTexto("txtCedula");
    let nombre = recuperaraTexto("txtNombre");
    let apellido = recuperaraTexto("txtApellido");
    let telefono = recuperaraTexto("txtTelefono");
    let ingresos = recuperarFloat("txtIngresos");
    let egresos = recuperarFloat("txtEgresos");

    let clienteEncontrado = buscarCliente(cedula);

    if(clienteEncontrado == null){
        let cliente = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            ingresos: ingresos,
            egresos: egresos
        };

        clientes.push(cliente);
    }else{
        clienteEncontrado.nombre = nombre;
        clienteEncontrado.apellido = apellido;
        clienteEncontrado.telefono = telefono;
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
        contenido += "<td>" + cliente.telefono + "</td>";
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
        mostrarTextoEnCaja("txtTelefono", cliente.telefono);
        mostrarTextoEnCaja("txtIngresos", cliente.ingresos);
        mostrarTextoEnCaja("txtEgresos", cliente.egresos);
    }
}

function limpiar(){
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTextoEnCaja("txtTelefono", "");
    mostrarTextoEnCaja("txtIngresos", "");
    mostrarTextoEnCaja("txtEgresos", "");

    clienteSeleccionado = null;
}

function buscarClienteCredito(){
    let cedula;
    let cliente;
    let datosClienteCredito;

    cedula = recuperaraTexto("buscarCedulaCredito");

    cliente = buscarCliente(cedula);

    datosClienteCredito = document.getElementById("datosClienteCredito");

    if(cliente != null){
        clienteSeleccionado = cliente;

        datosClienteCredito.innerHTML = `
            <h3>Datos del Cliente</h3>
            <p><strong>Cédula:</strong> ${cliente.cedula}</p>
            <p><strong>Nombre:</strong> ${cliente.nombre}</p>
            <p><strong>Apellido:</strong> ${cliente.apellido}</p>
            <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
            <p><strong>Egresos:</strong> ${cliente.egresos}</p>
        `;
    }else{
        clienteSeleccionado = null;

        datosClienteCredito.innerHTML = `
            <p>Cliente no encontrado</p>
        `;
    }
}

function calcularCredito(){
    let monto;
    let plazo;
    let capacidadPago;
    let totalPagar;
    let cuotaMensual;
    let interes;
    let resultadoCredito;

    resultadoCredito = document.getElementById("resultadoCredito");

    if(clienteSeleccionado == null){
        resultadoCredito.innerHTML = "Primero debe buscar un cliente";
        return;
    }

    monto = recuperarFloat("montoCredito");
    plazo = recuperarInt("plazoCredito");

    if(monto > montoMaximo){
        resultadoCredito.className = "rechazado";
        resultadoCredito.innerHTML = "Error: el monto solicitado supera el monto máximo permitido de " + montoMaximo;

        mostrarTextoEnCaja("montoCredito", "");

        creditoAprobado = false;
        document.getElementById("btnAsignarCredito").disabled = true;

        return;
    }

    capacidadPago = clienteSeleccionado.ingresos - clienteSeleccionado.egresos;

    interes = monto * tasaInteres / 100;
    totalPagar = monto + interes;
    cuotaMensual = totalPagar / plazo;

    cuotaCalculada = cuotaMensual;
    montoCalculado = monto;
    plazoCalculado = plazo;

    if(cuotaMensual <= capacidadPago){
        creditoAprobado = true;

        resultadoCredito.className = "aprobado";

        resultadoCredito.innerHTML = `
            Capacidad de pago: ${capacidadPago.toFixed(2)}<br>
            Total a pagar: ${totalPagar.toFixed(2)}<br>
            Cuota mensual: ${cuotaMensual.toFixed(2)}<br>
            RESULTADO: APROBADO
        `;

        document.getElementById("btnAsignarCredito").disabled = false;
    }else{
        creditoAprobado = false;

        resultadoCredito.className = "rechazado";

        resultadoCredito.innerHTML = `
            Capacidad de pago: ${capacidadPago.toFixed(2)}<br>
            Total a pagar: ${totalPagar.toFixed(2)}<br>
            Cuota mensual: ${cuotaMensual.toFixed(2)}<br>
            RESULTADO: RECHAZADO
        `;

        document.getElementById("btnAsignarCredito").disabled = true;
    }
}

function asignarCredito(){
    if(creditoAprobado == true){
        let credito = {
            cedula: clienteSeleccionado.cedula,
            nombre: clienteSeleccionado.nombre,
            apellido: clienteSeleccionado.apellido,
            monto: montoCalculado,
            tasa: tasaInteres,
            plazo: plazoCalculado,
            cuota: cuotaCalculada
        };

        creditos.push(credito);

        alert("Crédito asignado correctamente");

        document.getElementById("btnAsignarCredito").disabled = true;
    }
}

function buscarCreditos(cedula){
    let creditosCliente = [];

    for(let i = 0; i < creditos.length; i++){
        if(creditos[i].cedula == cedula){
            creditosCliente.push(creditos[i]);
        }
    }

    return creditosCliente;
}

function pintarCreditos(listaCreditos){
    let tabla = document.getElementById("tablaCreditos");
    let contenido = "";

    for(let i = 0; i < listaCreditos.length; i++){
        let credito = listaCreditos[i];

        contenido += "<tr>";
        contenido += "<td>" + credito.cedula + "</td>";
        contenido += "<td>" + credito.nombre + "</td>";
        contenido += "<td>" + credito.apellido + "</td>";
        contenido += "<td>" + credito.monto + "</td>";
        contenido += "<td>" + credito.tasa + "%</td>";
        contenido += "<td>" + credito.plazo + "</td>";
        contenido += "<td>" + credito.cuota.toFixed(2) + "</td>";
        contenido += "</tr>";
    }

    tabla.innerHTML = contenido;
}

function buscarCreditosCliente(){
    let cedula;
    let creditosCliente;

    cedula = recuperaraTexto("buscarCedulaListado");

    creditosCliente = buscarCreditos(cedula);

    pintarCreditos(creditosCliente);
}

function mostrarCreditosVIP(){
    let creditosVIP = [];

    for(let i = 0; i < creditos.length; i++){
        if(creditos[i].monto > 5000){
            creditosVIP.push(creditos[i]);
        }
    }

    pintarCreditos(creditosVIP);
}