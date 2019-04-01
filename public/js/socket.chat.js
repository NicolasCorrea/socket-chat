var socket = io();
var params = new URLSearchParams(window.location.search);
if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
}
var usuario = { nombre: params.get("nombre"), sala: params.get("sala") };
socket.on("connect", function() {
  console.log("Conectado al servidor");
  socket.emit("entrarChat", usuario, function(res) {
    console.log(res);
  });
});

// escuchar
socket.on("disconnect", function() {
  console.log("Perdimos conexión con el servidor");
});

// Enviar información
// socket.emit(
//   "crearMensaje",
//   {
//     usuario: "Fernando",
//     mensaje: "Hola Mundo"
//   },
//   function(resp) {
//     console.log("respuesta server: ", resp);
//   }
// );
// mensaje privado
socket.on("mensajePrivado", function(data) {
  console.log("mensaje privado", data);
});
// Escuchar información
socket.on("crearMensaje", function(mensaje) {
  console.log("Servidor:", mensaje);
});

socket.on("listaPersonas", function(mensaje) {
  console.log("Usuarios conectados",mensaje);
});
