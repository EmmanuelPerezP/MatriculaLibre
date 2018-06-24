

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting == "hello")
//         sendResponse({farewell: "goodbye"});
// });



// function CargaHorarios(idMateria, idGrupo, tipo) { //si es Tipo 1 es carga normal, sino es retorno de información.
    
//     var datosHorario;
//     $(function() {
//         $.ajax(
//             {
//                 url: "frmMatricula.aspx/ConsultaHorarios",
//                 data: "{idMateria: '" + idMateria + "'}",
//                 dataType: "json",
//                 type: "POST",
//                 async: false,
//                 global: false,
//                 contentType: "application/json; charset=utf-8",
//                 success: function(msg) {
//                     if ((msg.d != "false") || (msg.d != null)) {
//                         datosHorario = jQuery.parseJSON(msg.d);
//                     } else {
//                         datosHorario = msg.d;
//                     }
//                 },
//                 error: function(result) {
//                     AccionError(result.status);
//                 },
//                 complete: function() {
//                     if (tipo == 1) {
//                         var horario = datosHorario;
//                         var cita = horario.EstadoCita, data = horario.Horario, bloqueado = horario.EsBloqueado;
//                         //Crea la estructura de la tabla
//                         if (data != false) {
//                             if (data != null) {
//                                 var htmlHorarios = "", htmlProfesores = "", htmlReservado, htmlEdificio;
//                                 for (var i = 0; i < data.length; i++) { //recorre el objeto de horarios para mostrar los datos
//                                     if (data[i].Itinerario != null) {
//                                         if (data[i].Itinerario.length > 0) { //carga los itinerarios
//                                             for (var h = 0; h < data[i].Itinerario.length; h++) {
//                                                 if (data[i].Itinerario[h].Edificio == "ND") {
//                                                     htmlEdificio = "Aula No Disponible";
//                                                 } else {
//                                                     htmlEdificio = data[i].Itinerario[h].Edificio + '-0' + data[i].Itinerario[h].Aula;
//                                                 }
//                                                 htmlHorarios += data[i].Itinerario[h].Dia + ' ' + data[i].Itinerario[h].Inicio + '-' + data[i].Itinerario[h].Fin + '</br>' + htmlEdificio + '</br>';
//                                             }
//                                         } else {
//                                             htmlHorarios = "Horario No Disponible";
//                                         }
//                                     } else {
//                                         htmlHorarios = "Horario No Disponible";
//                                     }
//                                     if (data[i].ListaProfesores != null) {
//                                         if (data[i].ListaProfesores.length > 0) { //carga los profesores
//                                             for (var p = 0; p < data[i].ListaProfesores.length; p++) {
//                                                 htmlProfesores += data[i].ListaProfesores[p] + '</br>';
//                                             }
//                                         } else {
//                                             htmlProfesores = "Profesor No Disponible";
//                                         }
//                                     } else {
//                                         htmlProfesores = "Profesor No Disponible";
//                                     }
//                                     if (data[i].EstadoReservado) { //carga si es reservado
//                                         htmlReservado = "Sí";
//                                     } else {
//                                         htmlReservado = "No";
//                                     }
//                                     var row = $("<tr>")
//                                         .append($("<td class='colHoSede'>").html(data[i].Sede))
//                                         .append($("<td class='colHoGrupo center'>").html(data[i].IdGrupo))
//                                         .append($("<td class='colHoHorario'>").html(htmlHorarios))
//                                         .append($("<td class='colHoProfesor'>").html(htmlProfesores))
//                                         .append($("<td class='colHoCupo center'>").html('<span id="cupo' + idMateria + data[i].IdGrupo + '">' + data[i].CupoDisponible + '</span>'))
//                                         .append($("<td class='colHoReservado center'>").html(htmlReservado))
//                                         .append($("<td class='colHoEstado center'>").html(data[i].EstadoGrupo))
//                                         .append($("<td class='colHoMatricular center'>").html('<img id="' + idMateria + "_" + data[i].IdGrupo + '" class="cBtnMat_' + idMateria + ' imgMatriculaGrupo cImgDesMatriculado"  src="images/notregistered.png"  title="Matricular">'));
//                                     $('#bodyTableHorarios_' + idMateria).append(row);
//                                     htmlHorarios = "", htmlProfesores = "";
//                                 }
//                                 var selectorGrupo = '#' + idMateria + "_" + idGrupo;
//                                 $(selectorGrupo).removeClass("cImgDesMatriculado").attr({ "src": "images/registered.png", "tittle": "Eliminar Grupo." }).addClass("cImgMatriculado");

//                                 $('.colHoMatricular > img').css("cursor", "pointer");


//                             } else {
//                                 $('#bodyTableHorarios_' + idMateria).append('<tr><td colspan=8>No se encontraron horarios disponibles para esta materia</td></tr>');
//                             }
//                         } else {
//                             AccionPanelMensaje("SS", "Se ha cerrado la sesión por inactividad, por favor vuelva a ingresar al sitio web.");
//                         }

//                         //if (cita) {
//                         //    //Crea el evento
//                         //    $('.cBtnMat_' + idMateria).on("click", function () {
//                         //        var idBtn = $(this).attr("id");
//                         //        idGrupo = idBtn.split('_')[1];
//                         //        SeleccionaGrupo(idMateria, idGrupo);
//                         //    });
//                         //} else {
//                         //    $('.cImgDesMatriculado').remove();
//                         //}
//                         if ((cita) && (!bloqueado)) {
//                             //Crea el evento
//                             $('.cBtnMat_' + idMateria).on("click", function() {
//                                 var idBtn = $(this).attr("id");
//                                 idGrupo = idBtn.split('_')[1];
//                                 SeleccionaGrupo(idMateria, idGrupo);
//                             });

//                         } else {
//                             $('.cImgDesMatriculado').remove();
//                         }

//                         $('.imgUpdCupo').on("click", function() {
//                             //var idBtn = $(this).attr("id"),
//                             //idGrupo = idBtn.split('_')[1];
//                             ConsultarCupo(idMateria);
//                             //SeleccionaGrupo(idPrematricula, idMateria, idGrupo);

//                         });
//                         AccionPanelMensaje("CL", "");
                        
//                     } 
//                 }
//             });

//     });
//     if (tipo == 2) {
//         return datosHorario;
//     } else {
//         return null;
//     }
// }
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log(message.txt);
    if (message.txt == "runScript"){
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('script.js');
        // s.onload = function() {
        //     this.remove();
        // };
        (document.head || document.documentElement).appendChild(s);
    }
}

console.log("content script ready");