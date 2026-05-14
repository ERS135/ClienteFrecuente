const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyzKXsuEBRtdaqXz9rDWyxeZfzaV8L0uHDBbb0VH4C3Jyws0hcI7eVn-zcwFOwg3zrYLg/exec"; 
let esRegistro = false;

function modoRegistro() {
    esRegistro = true;
    document.getElementById('title-action').innerText = "REGISTRO";
    document.getElementById('sec-name').classList.remove('hidden');
    document.getElementById('btn-main').innerText = "REGISTRARME";
    document.getElementById('btn-switch').classList.add('hidden');
}

async function procesarAcceso() {
    const tel = document.getElementById('inp-tel').value;
    const nom = document.getElementById('inp-name').value;

    if (!tel) { alert("Ingresa tu teléfono"); return; }
    if (esRegistro && !nom) { alert("Ingresa tu nombre"); return; }

    document.getElementById('overlay-carga').style.display = 'flex';

    try {
        const url = `${WEB_APP_URL}?telefono=${tel}&nombre=${encodeURIComponent(nom)}`;
        const response = await fetch(url);
        const res = await response.json();

        if (res.status === "no_encontrado") {
            modoRegistro(); // Si no existe, lo mandamos a registrarse
            alert("Número no encontrado, por favor regístrate.");
        } else {
            mostrarTarjeta(res, tel);
        }
    } catch (err) {
        alert("Error de conexión");
    } finally {
        document.getElementById('overlay-carga').style.display = 'none';
    }
}

function mostrarTarjeta(res, tel) {
    document.getElementById('view-login').classList.add('hidden');
    document.getElementById('view-card').classList.remove('hidden');
    
    document.getElementById('txt-user-name').innerText = res.nombre.toUpperCase();
    document.getElementById('txt-pts').innerText = "$" + parseFloat(res.puntos).toFixed(2);
    
    // Generar QR
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${tel}`;
    document.getElementById('img-qr').src = qrUrl;
}

async function recargarSaldo() {
    const tel = document.getElementById('inp-tel').value;
    document.getElementById('overlay-carga').style.display = 'flex';
    try {
        const response = await fetch(`${WEB_APP_URL}?telefono=${tel}`);
        const res = await response.json();
        document.getElementById('txt-pts').innerText = "$" + parseFloat(res.puntos).toFixed(2);
    } catch (e) { console.error(e); }
    finally { document.getElementById('overlay-carga').style.display = 'none'; }
}