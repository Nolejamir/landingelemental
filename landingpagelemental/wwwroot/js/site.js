const name = document.getElementById("nombres");
const lastName = document.getElementById("apellidos");
const business = document.getElementById("nombre-empresa");
const businessName = document.getElementById("razon-social");
const dni = document.getElementById("dni");
const cell = document.getElementById("numero-celular");
const email = document.getElementById("email");
const password = document.getElementById("contrasena");
const selectPlan = document.getElementById("select-plan");
const url = "http://localhost:3000";

window.addEventListener("load", async () => {
    const req = await fetch(`${url}/elemental/plans`);
    const reqJson = await req.json();
    reqJson.forEach(e => {
        selectPlan.innerHTML += `
        <option value="${e.TpCodigo}">
            ${e.TpNombre}
        </option>
`
    })
})

function showStep(step) {
    if (step === 2) {
        document.getElementById("step-1").style.display = "none";
        document.getElementById("step-2").style.display = "block";
    } else if (step === 3) {
        
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateInput(input) {
    input.value = input.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, "");
}


const sendRegister = async () => {
    console.log("execute");
    const typePlan = selectPlan.options[selectPlan.selectedIndex].value;
    const request = await fetch(`${url}/elemental`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            programId: "33b4028b-1ecb-11ee-bfc6-0200000cf393", //TODO elemental idProd
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
    const response = await request.json();
    console.log(response)
    
    if (response.message) {
        alert(response.message);
        return;
    }
    
    alert("Por favor verifica tu email, ahi esta llegando tu usuario y contraseña, gracias por registrarte en elemental")
    
}
/*const sendRegister = async () => {
    // Obtener los valores de los campos del formulario
    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const nombreEmpresa = document.getElementById('nombre-empresa').value.trim();
    const razonSocial = document.getElementById('razon-social').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const numeroCelular = document.getElementById('numero-celular').value.trim();
    const email = document.getElementById('email').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    // Construir el objeto de datos para enviar en la solicitud
    const data = {
        programId: "3d020259-3fa6-4d24-a78f-d4ac8bf006ec",
        body: [{
            name: nombres,
            lastName: apellidos,
            business: nombreEmpresa,
            businessName: razonSocial,
            dni: dni,
            cell: numeroCelular,
            password: contrasena,
            tpPlan: "" // Asegúrate de obtener el valor correcto del plan seleccionado
        }]
    };

    try {
        //solicitud API
        const response = await fetch("https://payment-services.askcorp.pe/elemental", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // stado de la respuesta
        if (response.ok) {
            // La solicitud se completó correctamente
            const responseData = await response.json();
            console.log("Registro exitoso:", responseData);
        } else {
            // La solicitud falló
            console.log("Error en el registro:", response.status);
        }
    } catch (error) {
        // Ocurrió un error
        console.error("Error al realizar la solicitud:", error);
    }
};
*/