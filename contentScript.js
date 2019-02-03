chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log(message.txt);
    if (message.txt == "runScript"){
        // aqui codigo para ejecutar
    }
}

window.addEventListener("message", function(event) {
    // solo escuchamos eventos de la ventada
  if (event.source != window){
    return;
  }
  // solo usamos los datos que vienen de la pagina
  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Se recibieron las suscripciones en el content script");
    console.log(event.data.suscripciones);
    chrome.storage.sync.set({"suscripciones": event.data.suscripciones}, function() {
        console.log("se guardaron las suscripciones");
    });
  }
}, false);

console.log('%c moxdi.com', "color: white; background: rgb(30,87,153); background: -moz-linear-gradient(left, rgba(30,87,153,1) 0%, rgba(41,137,216,1) 50%, rgba(125,185,232,1) 100%); background: -webkit-linear-gradient(left, rgba(30,87,153,1) 0%,rgba(41,137,216,1) 50%,rgba(125,185,232,1) 100%); background: linear-gradient(to right, rgba(30,87,153,1) 0%,rgba(41,137,216,1) 50%,rgba(125,185,232,1) 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#7db9e8',GradientType=1 ); font-size: x-large");

// injectar scripts y html a la pagina
var logBubble = document.createElement('div');
logBubble.id = "consolaActividad";
logBubble.style = "position: fixed; bottom: 0; background: rgba(55, 93, 212, 0.62); border-radius: .4em; width: 500px; padding: 30px 20px; margin: 1em 1em; color: white; font-weight: bold; font-size: 130%; text-shadow: 0 -0.05em 0.1em rgba(0,0,0,.3); height: 80px; overflow: auto; ";
logBubble.textContent = "Consola de Actividad";

var extensionId = document.createElement('div');
extensionId.id = "extensionId";
extensionId.textContent = chrome.runtime.id;

var moxdibut = document.createElement('a');
moxdibut.id = "moxdiButt";
moxdibut.style = "margin:1.5rem;position: fixed;bottom: 0px;display: inline-block;padding: .5rem;font-size: 1rem;cursor: pointer;text-align: center;text-decoration: none;outline: none;color: #fff;background-color: #4CAF50;border: none; border-radius: 15px;";
moxdibut.href = "https://www.moxdi.com";
moxdibut.textContent = "Moxdi";


var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');

// se quita este script si solo se quiere ejecutar una vez
// s.onload = function() {
//     this.remove();
// };
// se agrega el caja de logs al body y lo demas al header
(document.body).appendChild(logBubble);
(document.body).appendChild(moxdibut);
(document.head || document.documentElement).appendChild(s);
(document.head || document.documentElement).appendChild(extensionId);

console.log("content script ready");

chrome.storage.sync.get(['suscripciones'], function(result) {
    window.postMessage({"type": "FROM_EXTENSION","suscripciones": result.suscripciones},"*");
});