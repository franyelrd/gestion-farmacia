// Importamos la librería para leer datos del teclado
const readline = require('readline');

// Configuración de la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- VARIABLES GLOBALES (LLENAS CON DATOS DE EJEMPLO) ---
let inventario = [
    { nombre: "Paracetamol", cantidad: 100, precio: 5.50 },
    { nombre: "Ibuprofeno", cantidad: 50, precio: 8.00 },
    { nombre: "Amoxicilina", cantidad: 30, precio: 12.00 }
]; 
let ventasTotales = 0; 

// --- FUNCIÓN PRINCIPAL (MENÚ) ---
function iniciarSistema() {
    console.log("\n========================================");
    console.log("   GESTIÓN DE FARMACIA (Básico)        ");
    console.log("========================================");
    console.log("1. Registrar medicamento");
    console.log("2. Consultar inventario");
    console.log("3. Vender medicamento");
    console.log("4. Ver ventas del día");
    console.log("5. Salir");
    console.log("========================================");

    rl.question("Seleccione una opción (1-5): ", function(opcion) {
        
        if (opcion === '1') {
            registrarMedicamento();
        } else if (opcion === '2') {
            consultarInventario();
        } else if (opcion === '3') {
            venderMedicamento();
        } else if (opcion === '4') {
            verVentas();
        } else if (opcion === '5') {
            console.log("Saliendo del programa...");
            rl.close(); 
        } else {
            console.log("Opción incorrecta. Intente de nuevo.");
            iniciarSistema(); 
        }
    });
}

// --- FUNCIÓN 1: REGISTRAR ---
function registrarMedicamento() {
    console.log("\n--- REGISTRO NUEVO ---");
    
    rl.question("Nombre: ", function(nombre) {
        rl.question("Cantidad: ", function(cantidad) {
            rl.question("Precio: ", function(precio) {
                
                let medicamento = {
                    nombre: nombre,
                    cantidad: parseInt(cantidad), 
                    precio: parseFloat(precio)    
                };

                inventario.push(medicamento);
                console.log("¡Medicamento registrado con éxito!");
                iniciarSistema(); 
            });
        });
    });
}

// --- FUNCIÓN 2: CONSULTAR INVENTARIO ---
function consultarInventario() {
    console.log("\n--- LISTADO DE MEDICAMENTOS ---");
    
    if (inventario.length === 0) {
        console.log("No hay medicamentos en el inventario.");
    } else {
        console.log("Nombre\t\tCantidad\tPrecio");
        console.log("----------------------------------------");
        
        for (let i = 0; i < inventario.length; i++) {
            let med = inventario[i];
            console.log(med.nombre + "\t\t" + med.cantidad + "\t\t$" + med.precio);
        }
    }
    
    rl.question("\nPresione Enter para volver al menú...", function() {
        iniciarSistema();
    });
}

// --- FUNCIÓN 3: VENDER ---
function venderMedicamento() {
    console.log("\n--- VENTA DE MEDICAMENTO ---");
    rl.question("Nombre del medicamento a vender: ", function(nombreBusqueda) {
        
        let encontrado = false;

        for (let i = 0; i < inventario.length; i++) {
            let med = inventario[i];

            if (med.nombre.toLowerCase() === nombreBusqueda.toLowerCase()) {
                encontrado = true;

                rl.question("¿Cuántas unidades?: ", function(cantidadVender) {
                    let cantidadNum = parseInt(cantidadVender);

                    if (med.cantidad >= cantidadNum) {
                        med.cantidad = med.cantidad - cantidadNum;
                        let subtotal = cantidadNum * med.precio;
                        ventasTotales = ventasTotales + subtotal;

                        console.log("Venta realizada. Subtotal: $" + subtotal);
                    } else {
                        console.log("Error: No hay suficiente stock. Disponible: " + med.cantidad);
                    }
                    
                    iniciarSistema();
                });
                return; 
            }
        }

        if (!encontrado) {
            console.log("Error: El medicamento no existe.");
            rl.question("Presione Enter para continuar...", function() {
                iniciarSistema();
            });
        }
    });
}

// --- FUNCIÓN 4: VER VENTAS ---
function verVentas() {
    console.log("\n--- VENTAS DEL DÍA ---");
    console.log("Total acumulado: $" + ventasTotales);
    
    rl.question("\nPresione Enter para volver al menú...", function() {
        iniciarSistema();
    });
}

// --- INICIO ---
console.log("Bienvenido a la Farmacia Básica.");
iniciarSistema();
