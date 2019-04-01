var params = new URLSearchParams(window.location.search);
nombre = params.get('nombre');
sala = params.get('sala');
// referencias de usuario
var divUsuarios = $("#divUsuarios");
var formEnviar = $("#formEnviar");
var message = $("#message");
var divChatbox = $("#divChatbox");

function renderizarUsuarios(personas) {
  console.log(personas);
  var html = "";
  html += "<li>";
  html +='    <a href="javascript:void(0)" class="active"> Chat de <span>' +params.get("sala")+"</span></a>";
  html += "</li>";
  for (let i = 0; i < personas.length; i++) {
    html += "<li>";
    html +='    <a data-id="' +personas[i].id +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' +personas[i].nombre +'<small class="text-success">online</small></span></a>';
    html += "</li>";
  }
  divUsuarios.html(html);
}
function renderizarMensaje(mensaje, yo) {
  var html = "";

  var fecha = new Date(mensaje.fecha);
  var hora = fecha.getHours()+":"+fecha.getMinutes();
  var adminClass = 'info';
  if (mensaje.nombre=="Administrador") {
   adminClass = 'danger'; 
  }
  if(yo){
    html = `<li class="reverse">
              <div class="chat-content">
                  <h5>${mensaje.nombre}</h5>
                  <div class="box bg-light-inverse">${mensaje.mensaje}</div>
              </div>
              <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
              <div class="chat-time">${hora}</div>
            </li>`  
  }else{
    html = `<li class="animated fadeIn">
              `+((adminClass=="info")?`<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>`:``)+
              `<div class="chat-content">
                <h5>${mensaje.nombre}</h5>
                <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>
              </div>
              <div class="chat-time">${hora}</div>
            </li>`
  }
  divChatbox.append(html);
  scrollBottom();
}

divUsuarios.on("click", "a", function() {
  var id = $(this).data("id");
  if(id){ 
    console.log(id);
  }
});
formEnviar.on('submit',function(e) {
  e.preventDefault();
  if(!message.val().trim().length==0){
    socket.emit('crearMensaje', {
        nombre: nombre,
        sala:sala,
        mensaje: message.val()
    }, function(resp) {
        message.val("");
        renderizarMensaje(resp, true)
    });
  }
})
function scrollBottom() {

  // selectors
  var newMessage = divChatbox.children('li:last-child');

  // heights
  var clientHeight = divChatbox.prop('clientHeight');
  var scrollTop = divChatbox.prop('scrollTop');
  var scrollHeight = divChatbox.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      divChatbox.scrollTop(scrollHeight);
  }
}