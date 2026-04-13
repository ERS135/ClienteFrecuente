function acceder() {
    const tel = document.getElementById('phoneInput').value;
    const nom = document.getElementById('nameInput').value;
    const nameSec = document.getElementById('nameSection');

    if (!tel) {
        alert("Por favor, ingresa tu número de teléfono.");
        return;
    }

    // CUANDO PASES A GOOGLE APPS SCRIPT, USA ESTO:
    /*
    google.script.run.withSuccessHandler(function(res) {
        if (res.status === "no_encontrado") {
            nameSec.classList.remove('hidden');
        } else {
            mostrarTarjeta(res);
        }
    }).gestionarCliente(tel, nom);
    */

    // SIMULACIÓN PARA VS CODE (Borrar al subir a Google)
    console.log("Conectando con la base de datos de Silva...");
    if (tel === "123") {
        mostrarTarjeta({nombre: "Erik Silva", puntos: 150});
    } else {
        nameSec.classList.remove('hidden');
    }
}

function mostrarTarjeta(res) {
    document.getElementById('loginView').classList.add('hidden');
    document.getElementById('cardView').classList.remove('hidden');
    document.getElementById('userName').innerText = "¡Hola, " + res.nombre + "!";
    document.getElementById('userPoints').innerText = res.puntos;
    
    // Generar QR
    const tel = document.getElementById('phoneInput').value;
    const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" + tel;
    document.getElementById('qrImg').src = qrUrl;
}