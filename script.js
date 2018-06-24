console.log("cargaHorarios script ready");
// window.CargaHorarios("IC7900", "", 1);

// var tempfunc = window.CargaHorarios;

// window.CargaHorarios = function(idMateria, idGrupo, tipo){
//     tempfunc(idMateria,idGrupo, tipo);
//     console.log("horarios cargados");
// }

// Array que contendra las materias y grupos que checkear en cada request
var suscripcion = [];


// Aqui se sobreescribe la funcion de CargaHorarios para hacer una edicion en la linea 84 de este documento
function CargaHorarios(idMateria, idGrupo, tipo) { //si es Tipo 1 es carga normal, sino es retorno de información.
    var datosHorario;
    $(function () {
        $.ajax(
            {
                url: "frmMatricula.aspx/ConsultaHorarios",
                data: "{idMateria: '" + idMateria + "'}",
                dataType: "json",
                type: "POST",
                async: false,
                global: false,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if ((msg.d != "false") || (msg.d != null)) {
                        datosHorario = jQuery.parseJSON(msg.d);
                    } else {
                        datosHorario = msg.d;
                    }
                },
                error: function (result) {
                    AccionError(result.status);
                },
                complete: function () {
                    if (tipo == 1) {
                        var horario = datosHorario;
                        var cita = horario.EstadoCita, data = horario.Horario, bloqueado = horario.EsBloqueado;
                        //Crea la estructura de la tabla
                        if (data != false) {
                            if (data != null) {
                                var htmlHorarios = "", htmlProfesores = "", htmlReservado, htmlEdificio;
                                for (var i = 0; i < data.length; i++) { //recorre el objeto de horarios para mostrar los datos
                                    if (data[i].Itinerario != null) {
                                        if (data[i].Itinerario.length > 0) { //carga los itinerarios
                                            for (var h = 0; h < data[i].Itinerario.length; h++) {
                                                if (data[i].Itinerario[h].Edificio == "ND") {
                                                    htmlEdificio = "Aula No Disponible";
                                                } else {
                                                    htmlEdificio = data[i].Itinerario[h].Edificio + '-0' + data[i].Itinerario[h].Aula;
                                                }
                                                htmlHorarios += data[i].Itinerario[h].Dia + ' ' + data[i].Itinerario[h].Inicio + '-' + data[i].Itinerario[h].Fin + '</br>' + htmlEdificio + '</br>';
                                            }
                                        } else {
                                            htmlHorarios = "Horario No Disponible";
                                        }
                                    } else {
                                        htmlHorarios = "Horario No Disponible";
                                    }
                                    if (data[i].ListaProfesores != null) {
                                        if (data[i].ListaProfesores.length > 0) { //carga los profesores
                                            for (var p = 0; p < data[i].ListaProfesores.length; p++) {
                                                htmlProfesores += data[i].ListaProfesores[p] + '</br>';
                                            }
                                        } else {
                                            htmlProfesores = "Profesor No Disponible";
                                        }
                                    } else {
                                        htmlProfesores = "Profesor No Disponible";
                                    }
                                    if (data[i].EstadoReservado) { //carga si es reservado
                                        htmlReservado = "Sí";
                                    } else {
                                        htmlReservado = "No";
                                    }
                                    var row = $("<tr>")
                                        .append($("<td class='colHoSede'>").html(data[i].Sede))
                                        .append($("<td class='colHoGrupo center'>").html(data[i].IdGrupo))
                                        .append($("<td class='colHoHorario'>").html(htmlHorarios))
                                        .append($("<td class='colHoProfesor'>").html(htmlProfesores))
                                        .append($("<td class='colHoCupo center'>").html('<span id="cupo' + idMateria + data[i].IdGrupo + '">' + data[i].CupoDisponible + '</span>'))
                                        .append($("<td class='colHoReservado center'>").html(htmlReservado))
                                        .append($("<td class='colHoEstado center'>").html(data[i].EstadoGrupo))
                                        .append($("<td class='colHoMatricular center'>").html('<img id="' + idMateria + "_" + data[i].IdGrupo + '" class="cBtnMat_' + idMateria + ' imgMatriculaGrupo cImgDesMatriculado"  src="images/notregistered.png"  title="Matricular">'))
                                        .append($("<td class='suscribir center'>").html('<img id="' + idMateria + '_' + data[i].IdGrupo + '"' + 'src="chrome-extension://mfnppkmeoilpmijpkhjpampnognecbbn/ReloadSingle.png "' + 'onClick="agregarSuscripcion('+ "'"+ idMateria +"','" + data[i].IdGrupo + "');" + '" >')); // se agrega la columna de suscripcion
                                    $('#bodyTableHorarios_' + idMateria).append(row);
                                    htmlHorarios = "", htmlProfesores = "";
                                }
                                var tipoMat = $('#img' + idMateria).hasClass("ccmat");
                                if (tipoMat) {
                                    var selectorGrupo = '#' + idMateria + "_" + idGrupo;
                                    $(selectorGrupo).removeClass("cImgDesMatriculado").attr({ "src": "images/registered.png", "tittle": "Eliminar Grupo." }).addClass("cImgMatriculado");
                                }
                                $('.colHoMatricular > img').css("cursor", "pointer");


                            } else {
                                $('#bodyTableHorarios_' + idMateria).append('<tr><td colspan=8>No se encontraron horarios disponibles para esta materia</td></tr>');
                            }
                        } else {
                            AccionPanelMensaje("SS", "Se ha cerrado la sesión por inactividad, por favor vuelva a ingresar al sitio web.");
                        }

                        //if (cita) {
                        //    //Crea el evento
                        //    $('.cBtnMat_' + idMateria).on("click", function () {
                        //        var idBtn = $(this).attr("id");
                        //        idGrupo = idBtn.split('_')[1];
                        //        SeleccionaGrupo(idMateria, idGrupo);
                        //    });
                        //} else {
                        //    $('.cImgDesMatriculado').remove();
                        //}
                        if ((cita) && (!bloqueado)) {
                            //Crea el evento
                            $('.cBtnMat_' + idMateria).on("click", function () {
                                var idBtn = $(this).attr("id");
                                idGrupo = idBtn.split('_')[1];
                                SeleccionaGrupo(idMateria, idGrupo);
                            });

                        } else {
                            $('.cImgDesMatriculado').remove();
                        }

                        $('.imgUpdCupo').on("click", function () {
                            //var idBtn = $(this).attr("id"),
                            //idGrupo = idBtn.split('_')[1];
                            ConsultarCupo(idMateria);
                            //SeleccionaGrupo(idPrematricula, idMateria, idGrupo);

                        });
                        AccionPanelMensaje("CL", "");

                    }
                }
            });

    });
    if (tipo == 2) {
        return datosHorario;
    } else {
        return null;
    }
}


//encontrado en la linea 1013
function AddDetalles(idMateria) {
    return '<table class="tHorariosHeader"><thead><tr>' +
        '<td class="colHoSede">Sede</td>' +
        '<td class="colHoGrupo">Grupo</td>' +
        '<td class="colHoHorario">Horario - Aula</td>' +
        '<td class="colHoProfesor">Profesor(es)</td>' +
        '<td class="colHoCupo">Cupo <img id="cupoupd_' + idMateria + '" src="images/refresh.png" class="imgUpdCupo" title="Actualizar Cupo"></td>' +
        '<td class="colHoReservado">Reservado</td>' +
        '<td class="colHoEstado">Estado</td>' +
        '<td class="colHoMatricular"></td>' +
        '<td class="colSuscribirse">Suscripcion</td>' +     // aqui agregamos una columna para poner los botones de suscripcion
    '  </tr></thead></table>' +//hasta aquí la tabla del header de horarios
        '<div class="cdivHorariosBody"><table class="tableHorarios">' +//tabla del cuerpo de horarios
            '<tbody id="bodyTableHorarios_' + idMateria + '"></tbody></table></div>';

}

function agregarSuscripcion(idMateria1, idGrupo1){
    // si ya estaba suscrito se de-suscribe y si no estaba se suscribe
    for (let index = 0; index < suscripcion.length; index++) {
        let elemento = suscripcion[index];
        if(elemento["idGrupo"]=== idGrupo1 && elemento["idMateria"]===idMateria1){
            document.getElementById(idMateria1+"_"+idGrupo1).src = "chrome-extension://mfnppkmeoilpmijpkhjpampnognecbbn/ReloadSingle.png";
            suscripcion.splice(index);
            return;
        }
    }
    document.getElementById(idMateria1+"_"+idGrupo1).src = "chrome-extension://mfnppkmeoilpmijpkhjpampnognecbbn/ReloadGif.gif";
    suscripcion.push({"idMateria" : idMateria1, "idGrupo" : idGrupo1});
    return;
}

function snippets(){
    // intervalos
    var interval1 = window.setInterval(imprime,3000);
    clearInterval(interval1);
    // Carga un objeto con los horarios
    function imprime(){
        var data = CargaHorarios("IC7900",1,2);
        if(data!=null){
            console.log(data.Horario);
        }
    }
}

function suscripcionActiva(){
    for (let index = 0; index < suscripcion.length; index++) {
        let elemento = suscripcion[index];
        let informacion = CargaHorarios(elemento["idMateria"], 1, 2);
        console.log("cargo los horarios - Fun: suscripcionActiva");
        if(hayCupo(informacion,elemento)){
            console.log("Si hubo cupo en la suscripcion" + elemento["idMateria"]);
            CallMatricular(elemento["idMateria"],elemento["idGrupo"]);
            console.log("se matriculo la materia: " + elemento["idMateria"]);
        }
        else{
            console.log("no hubo cupo en la suscripcion: " + elemento["idMateria"] + " , " + elemento["idGrupo"]);
        }

    }
}

function hayCupo(informacion, grupo){
    for (let index = 0; index < informacion.length; index++) {
        let grupoInformacion = informacion[index];
        if(grupoInformacion["IdGrupo"]===grupo["idGrupo"] && grupoInformacion["IdMateria"]===grupo["idMateria"]){
            if(grupoInformacion["CupoDisponible"] > 0){
                return true;
            }
            else{
                return false;
            }
        }

        
    }
}

var intervaloPrincipal = window.setInterval(suscripcionActiva, 3000);