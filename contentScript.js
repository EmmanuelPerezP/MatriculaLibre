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



// injectar scripts y html a la pagina
var logBubble = document.createElement('div');
logBubble.id = "consolaActividad";
logBubble.style = "position: fixed; bottom: 0; background: rgba(55, 93, 212, 0.62); border-radius: .4em; width: 600px; padding: 60px 20px; margin: 1em 1em; color: white; font-weight: bold; font-size: 150%; text-shadow: 0 -0.05em 0.1em rgba(0,0,0,.3); height: 80px; overflow: auto; ";
logBubble.textContent = "Consola de Actividad";

var extensionId = document.createElement('div');
extensionId.id = "extensionId";
extensionId.textContent = chrome.runtime.id;

var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');

// se quita este script si solo se quiere ejecutar una vez
// s.onload = function() {
//     this.remove();
// };
// se agrega el caja de logs al body y lo demas al header
(document.body).appendChild(logBubble);
(document.head || document.documentElement).appendChild(s);
(document.head || document.documentElement).appendChild(extensionId);

console.log("content script ready");

chrome.storage.sync.get(['suscripciones'], function(result) {
    window.postMessage({"type": "FROM_EXTENSION","suscripciones": result.suscripciones},"*");
});