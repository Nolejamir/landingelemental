let name = document.getElementById("");
let lastName = document.getElementById("");
let business = document.getElementById("");
let businessName = document.getElementById("");
let dni = document.getElementById("dni");
let cell = document.getElementById("numero-celular");
let email = document.getElementById("email");
let password = document.getElementById("contrasena");
let typePlan = "0003"; //document...

function showStep(step) {
    if (step === 2) {
        document.getElementById("step-1").style.display = "none";
        document.getElementById("step-2").style.display = "block";
    } else if (step === 3) {
        //agregar la lógica para procesar los datos del formulario y finalizar el registro en la BD vivaaaaaaa
    }
}

function validateStep1() {

    if (!/^\d{8}$/.test(dni.value)) {
        alert("El campo DNI debe contener 8 dígitos numéricos.");
        return;
    }

    if (!/^\d{9}$/.test(cell.value)) {
        alert("El campo Número de celular debe contener 9 dígitos numéricos.");
        return;
    }
    showStep(2);
}

function validateStep2() {
    const confirmarContrasenaInput = document.getElementById("confirmar-contrasena");

    if (!validateEmail(email.value)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    if (password.value !== confirmarContrasenaInput.value) {
        confirmarContrasenaInput.style.borderColor = "red";
        alert("Las contraseñas no coinciden. Por favor, verifica.");
        return;
    }

    showStep(3);
}

function validateEmail(email) {
    const emailRegex = /^[\w.-]+@@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email);
}

function validateInput(input) {
    input.value = input.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, "");
}

window.addEventListener("load",  async () => {
    const req = await fetch("https://rickandmortyapi.com/api");

})

const sendRegister = async () => {
    const request = await fetch("https://payment-services.askcorp.pe/elemental", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            programId: "3d020259-3fa6-4d24-a78f-d4ac8bf006ec",
            body: [{
                name: name.value.trim(),
                lastName: lastName.value.trim(),
                business: business.value.trim(),
                businessName: businessName.value.trim(),
                dni: dni.value.trim(),
                cell: cell.value.trim(),
                password: password.value.trim(),
                tpPlan: typePlan.trim(), //TODO select
                
            }]
        })
    })
}

