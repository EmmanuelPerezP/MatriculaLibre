//UTILIZAR OPCIONES DE MINIMIZAR (http://closure-compiler.appspot.com/home) Y OBFUSCATOR (http://www.javascriptobfuscator.com/) PARA CADA JS

//funciones del DOM
$(function () {
    $('.subDivHorario').on('click', function () {

        //if ($('.dialogInforme').length > 0) {
        //    GeneraInforme("E");
        //} else {
        //    CreaDialogVisualizarInforme();
        //    GeneraInforme("E");
        //}

        //AccionPanelMensaje("CI", "Generando Informe...");
        //setTimeout(function () {
        //    //AjaxCall_HorarioMatriculado();
        //}, 200);
        AjaxCall_HorarioMatriculado();
    });

    $('.subDivInforme').on('click', function () {

        if ($('.dialogInforme').length > 0) {
            GeneraInforme("E");
        } else {
            CreaDialogVisualizarInforme();
            GeneraInforme("E");
        }

        //AccionPanelMensaje("CI", "Generando Informe...");
        //setTimeout(function () {
        //    //AjaxCall_HorarioMatriculado();
        //}, 200);
        //AjaxCall_HorarioMatriculado();
    });
    if ($(".footer").length) {
        $('.content').css({ "height": $(".footer").position().top - 170 });
    }

    //$('#Table_Cursos tbody').css({ "height": $(".footer").position().top - 200});
    $(".divCargando").hide();
    //evento cerrar dialog
    $('.cCerrar').on("click", function () {
        var $parent = $(this).parent().parent();
        $parent.dialog("close");
        if ($parent.hasClass("dialogMorosidad")) {
            $("#dialogConvocatorias").dialog("open");
        }
    });

    $('.subDivHorario').mouseenter(function () {
        // $('#imgHorarios').attr('src', 'images/calendar_over.png');
        $(this).addClass("backgroundHoverAcciones");
    }).mouseleave(function () {
        //$('#imgHorarios').attr('src', 'images/calendar.png');
        $(this).removeClass("backgroundHoverAcciones");
    });

    $('.subDivInforme').mouseenter(function () {
        // $('#imgHorarios').attr('src', 'images/calendar_over.png');
        $(this).addClass("backgroundHoverAcciones");
    }).mouseleave(function () {
        //$('#imgHorarios').attr('src', 'images/calendar.png');
        $(this).removeClass("backgroundHoverAcciones");
    });


    $('.cCerrar').mouseenter(function () {
        $('.imgCloseDialog').attr('src', 'images/close_over.png');
        $(this).css('color', "gray");
    }).mouseleave(function () {
        $('.imgCloseDialog').attr('src', 'images/close.png');
    });
    $('.divCitas').on('click', function () {
        //crea el dialogo para la info de la cita
        if ($('#divCalculoCita').length) {
            $('#divCalculoCita').dialog("open");
        }
        else {
            $('body').append($('<div id="divCalculoCita">')
                .append($('<div class="headerDialog"><div class="cTitulo">¿Cómo se calcula la cita de matrícula?</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div></div>'))
                .append($('<div class="divCCita">')
                    .append($('<table>')
                        .append('<tr><td class="divCCitaFirstTD">Paso 1</td><td>La cita de matrícula se asigna según el Artículo 35 del Reglamento de Enseñanza Aprendizaje, su publicación y/o apelación a la misma se realiza según las fechas indicadas en el Calendario Académico e Institucional.</td></tr>')
                        .append('<tr><td class="divCCitaFirstTD">Paso 2</td><td>Se obtiene la diferencia entre créditos aprobados y reprobados.</td></tr>')

                        .append('<tr><td colspan="2" class="divCCitaTextCenter">Créditos Aprobados - Créditos Reprobados = <span>Diferencia de Créditos</span></td></tr>')
                        .append('<tr><td class="divCCitaFirstTD">Paso 3</td><td>Se realiza el ordenamiento de mayor a menor de acuerdo a la  <span>diferencia de créditos</span> obtenida en el Paso 2.</td></tr>')
                        .append('<tr><td class="divCCitaFirstTD">Paso 4</td><td>En caso de existir igualdad en la <span>diferencia de créditos</span> se considera para el ordenamiento el mayor promedio ponderado del periodo.</td></tr>')
                        .append('<tr><td class="divCCitaTextCenter" colspan="2"><img src="images/sumatoria.png" style="vertical-align: middle; margin-right: 5px;" />Nota X Créditos / Total de Créditos =  <span>Promedio Ponderado</span></td></tr>')
                        .append('<tr><td class="divCCitaFirstTD">Paso 5</td><td>En caso de existir empate en el <span>promedio ponderado</span> del periodo, el criterio de asignación será:</td></tr>')
                        .append('<tr><td class="divCCitaFirstTD"></td><td>1. Mayor número de créditos ganados</td></tr>')
                        .append('<tr><td class="divCCitaFirstTD"></td><td>2. Menor número de créditos perdidos</td></tr>')
                        .append('<tr><td class="divCCitaFirstTD"></td><td>3. Azar</td></tr></table>'))
                    .append($('<table>')
                        .append('<tr><td colspan="2">Información utilizada para cálcular su cita de matrícula:</td><td rowspan="4">Tu cita es:<br /><span id="tdCitaEstudiante">No Asignada</span></td></tr>')
                        .append('<tr><td><ul><li>Créditos aprobados: <span id="tdCredAprobCitaEstudiante"></span></li><li>Créditos reprobados: <span id="tdCredRepCitaEstudiante"></span></li><li>Promedio ponderado: <span id="tdPromedioCitaEstudiante"></span></li></ul></td><td></td></tr>'))));
        }
        $("#divCalculoCita").dialog({
            autoOpen: false,
            modal: true,
            show: "fade",
            hide: "fade",
            width: 700,
            height: 520,
            draggable: false,
            resizable: false,
            buttons: {
                //'Apelar tu Cita de Matrícula': function () {
                //    $(this).dialog("close");//agregar el logout del server.
                //    //window.location = "./frmAutenticacion.aspx";
                //},
                Cerrar: function () {
                    $(this).dialog("close");//agregar el logout del server.
                    //window.location = "./frmAutenticacion.aspx";
                }
            },
            close: function (event, ui) {
                $(this).dialog('destroy').remove();
            }

        });
        $('.cCerrar').on("click", function () {
            var $parent = $(this).parent().parent();
            $parent.dialog("close");
        }).mouseenter(function () {
            $('.imgCloseDialog').attr('src', 'images/close_over.png');
            $(this).css('color', "gray");
        }).mouseleave(function () {
            $('.imgCloseDialog').attr('src', 'images/close.png');
        });
        // $("#divCalculoCita > .headerDialog").css({ height: '50px' });
        $("#divCalculoCita").removeClass("ui-dialog ui-dialog-content ui-widget-content");
        $(".ui-dialog-titlebar").remove();

        //CARGA LOS VALORES EN LA DESCRIPCION DE LA CITA
        ConsultaInfoCitaMatricula();
        if (objCita != null) {
            if (objCita.ID_CITA != 0) {
                var fecha = new Date(objCita.FECHA.toLocaleString()),
                    dia = fecha.getDate(),
                    mes = fecha.getMonth(),
                    hora = fecha.getHours(),
                    min = fecha.getMinutes(),
                    mNames = new Array("Ene", "Feb", "Mar",
                        "Abr", "May", "Jun", "Jul", "Ago", "Sep",
                        "Oct", "Nov", "Dec");
                if (dia < 10) {
                    dia = '0' + dia;
                }
                if (hora < 10) {
                    hora = '0' + hora;
                }
                if (min < 10) {
                    min = '0' + min;
                }

                $('#tdCitaEstudiante').text(dia + " " + mNames[mes] + " " + fecha.getFullYear() + " " + hora + ":" + min);

                $('#tdCredAprobCitaEstudiante').text(objCita.CREDITOS_GANADOS);
                $('#tdCredRepCitaEstudiante').text(objCita.CREDITOS_PERDIDOS);
                $('#tdDifCredCitaEstudiante').text(objCita.CREDITOS_DIFERENCIA);
                $('#tdPromedioCitaEstudiante').text(objCita.PROMEDIO);
            } else {
                $('#tdCitaEstudiante').text('No Asignada');

                $('#tdCredAprobCitaEstudiante').text('');
                $('#tdCredRepCitaEstudiante').text('');
                $('#tdDifCredCitaEstudiante').text('');
                $('#tdPromedioCitaEstudiante').text('');
            }
            $("#divCalculoCita").dialog("open");
        } else {
            AccionError(1);
        }
    });

    //cierra el menu cuando da click por fuera del div

    $(document).mouseup(function (e) {
        var container = $(".contentMenu");
        //var containerInforme = $("#diagCambiaInforme");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.hide();
        }
        //if (!containerInforme.is(e.target) // if the target of the click isn't the container...
        //   && containerInforme.has(e.target).length === 0) // ... nor a descendant of the container
        //{
        //    containerInforme.hide();
        //}
    });

    //crea dialogo Resumen matricula
    //Activa el dialogo
    //$("#divResumenMatricula").dialog({
    //    autoOpen: false,
    //    modal: true,
    //    show: "fade",
    //    hide: "fade",
    //    width: 800,
    //    height: 600,
    //    draggable: true,
    //    resizable: false,
    //    buttons: {
    //        Continuar: function () {
    //            $(this).dialog("close");
    //        }
    //    },
    //    close: function (event, ui) {
    //        $(this).dialog('destroy').remove();
    //       }
    //});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCIONES DE MOROSIDADES
function ValidaMorosidad(data, tipo) {
    var objMor = jQuery.parseJSON(data);
    CreaDialogMorosidad();
    if (tipo == 2) {
        $(".dialogMorosidad").dialog("option", "buttons", [
                   {
                       text: "Cerrar",
                       click: function () {
                           $(this).dialog("close");
                       }
                   }
        ]);
    }
    CargaMorosidadEstudiante(objMor.PendientesDFC, objMor.PendientesDBI, objMor.PendientesDAR, objMor.PendientesTSS);
}
function CreaDialogMorosidad() {
    if ($('.dialogMorosidad').length) {
        $('.dialogMorosidad').dialog("open");
    }
    else {
        $('body').append('<div class="dialogMorosidad"><div class="headerDialog"><div class="cTitulo">Tenés requisitos pendientes</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div></div>' +
            '<div class="cContentMorosidad"><div class="cMorDinero"><div class="cdivTituloMorosidad" id="idTitMor"><div class="divImgEstadoMoroso"><img src="images/pending.png" id="imgMorosidad" class="imgM" alt="Estado de Morosidad" /></div><div class="divTituloMoroso"><img src="images/money.png" class="imgTipoMorosidad" alt="Tipo Morosidad" /><span>Requisito de Pago</span></div></div>' +
            '<div class="cdivCuerpoMorosidad" id="idCuerpoMor"><table class="tmPago">' +
            //'<tbody><tr><td>Deparamtento Financiero-Contable</td><td class="tdMontos">¢ 5.000</td></tr><tr><td>Deparamtento Admisión y Registro</td><td class="tdMontos">¢ 7.500</td></tr><tr><td>TOTAL A PAGAR</td><td class="tdTotalPago tdMontos">¢ 12.500</td></tr></tbody>' +
            '</table></div></div>' +
            '<div class="cMorAdmin"><div class="cdivTituloMorosidad" id="idTitAdm"><div class="divImgEstadoMoroso"><img src="images/notpending.png" id="imgRequisitos" class="imgM" alt="Estado de Morosidad" /></div><div class="divTituloMoroso"><img src="images/papers.png" class="imgTipoMorosidad" alt="Tipo Morosidad" /><span>Requisito Administrativo</span></div></div><div class="cdivCuerpoMorosidad" id="idCuerpoAdm">' +
            '<table class="tmAdmin">' +
            //'<tbody><tr><td>No ha hecho entrega del Título de Secundaria.<br /><span class="morosidadAdmin_Dept">Departamento de Admisión y Registro</span></td></tr><tr><td>Devolución del libro "Estadística I".<br /><span class="morosidadAdmin_Dept">Biblioteca José Figueres Ferrer</span></td></tr></tbody>' +
            '</table></div></div></div></div>');
        //Activa el dialogo
        $(".dialogMorosidad").dialog({
            autoOpen: true,
            modal: true,
            show: "fade",
            hide: "fade",
            width: 800,
            height: 600,
            draggable: true,
            resizable: false,
            buttons: {
                Continuar: function () {
                    $(this).dialog("close");
                    $("#dialogConvocatorias").dialog("open");
                }
            },
            close: function (event, ui) {
                $(this).dialog('destroy').remove();
                $('#detFC').remove();
            }
        });
        $('.cCerrar').on("click", function () {
            if ($("#detFC").length > 0) {
                if ($("#detFC").is(":visible")) {
                    $(".tmPago tr").click();
                }
            }
            var $parent = $(this).parent().parent();

            $parent.dialog("close");
        }).mouseenter(function () {
            $('.imgCloseDialog').attr('src', 'images/close_over.png');
            $(this).css('color', "gray");
        }).mouseleave(function () {
            $('.imgCloseDialog').attr('src', 'images/close.png');
        });
        $(".dialogMorosidad").removeClass("ui-dialog ui-dialog-content ui-widget-content");
        $(".ui-dialog-titlebar").remove();
    }
}
function CargaMorosidadEstudiante(objPendientesDfc, objPendientesDbi, objPendientesDar, objPendientesTss) {
    //Carga Montos Economicos (Financiero y/o Biblioteca
    var tbody = $("<tbody>"), tbodyDet = $("<tbody>"), tbodyFP = $("<tbody>"), total = 0, biblioteca = 0, esMoroso = false, tel = "", email = "";
    //Financiero
    if (objPendientesDfc != null) {
        if (objPendientesDfc.Estado) {
            if (objPendientesDfc.ListaMontosPendientes != null) {
                $("body").append($("<div id='detFC'>").append($('<div class="headerDialog">').append($('<div class="cTitulo">').html('Departamento Financiero Contable')))
                    .append($('<div id="tabFC">')
                        .append($('<ul>')
                            .append($("<li>").append($('<a href="#infoPagoFC">').html("Información de Pago")))
                            .append($("<li>").append($('<a href="#infoDetalleFC">').html("Detalles de Montos"))))
                        .append($('<div id="infoPagoFC">').append($("<table>")))
                        .append($('<div id="infoDetalleFC">').append($("<table>")))));
                //$("#detFC .headerDialog").css("height", "11%");
                //$("#detFC .cTitulo").css("font-size", "18px");
                $("#detFC").hide();
                //Agrega los detalles del pago
                for (var f = 0; f < objPendientesDfc.ListaMontosPendientes.length; f++) {
                    tbodyDet.append($("<tr>")
                        .append($("<td>").html(UpperCasetoCapitalize(objPendientesDfc.ListaMontosPendientes[f].Detalle)))
                        .append($("<td class='tdMontos'>").html(objPendientesDfc.ListaMontosPendientes[f].Monto)));
                    total += parseFloat(objPendientesDfc.ListaMontosPendientes[f].Monto.replace(',', '').replace(' ', ''));
                }
                tbodyDet.append($("<tr>")
                    .append($("<td>").html("TOTAL"))
                    .append($("<td class='tdTotalPago tdMontos'>").html(parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))));
                $("#infoDetalleFC table").html(tbodyDet);

                //Agrega las formas de pago
                //forma de pago por conectividad
                tbodyFP.append($("<tr class='titPago'>").append($("<td colspan='2'>").html("Pago en línea")));
                for (var p = 0; p < objPendientesDfc.FormaPago.Conectividad.length; p++) {
                    tbodyFP.append($("<tr>").append($("<td colspan='2'>").html($('<a href=' + objPendientesDfc.FormaPago.Conectividad[p].NomCuenta + ' target="_blank" class="trInfoPago">').html('- ' + objPendientesDfc.FormaPago.Conectividad[p].NomBanco))));
                }
                //forma de pago por Deposito
                if (objPendientesDfc.FormaPago.DepBancacio.length > 0) {
                    var html = '<a href=' + objPendientesDfc.FormaPago.DepBancacio[0].Intrucciones + ' target="_blank"><img src="images/information.png" style="height: 20px;"></a>';
                    tbodyFP.append($("<tr class='titPago'>").append($("<td colspan='2'>").html("Deposito Bancario " + html)));
                    for (var c = 0; c < objPendientesDfc.FormaPago.DepBancacio.length; c++) {
                        tbodyFP.append($("<tr>").append($("<td colspan='2' class='tdInfoPago'>").append($("<span  class='trInfoPago'>").html('- ' + objPendientesDfc.FormaPago.DepBancacio[c].NomBanco + ' (Cuenta: ' + objPendientesDfc.FormaPago.DepBancacio[c].NomCuenta + ')'))));

                    }
                }
                //forma de pago por cajas
                tbodyFP.append($("<tr class='titPago'>").append($("<td colspan='2'>").html("Pago en Cajas")));
                for (var ca = 0; ca < objPendientesDfc.FormaPago.PagoCajas.length; ca++) {
                    tbodyFP.append($("<tr>").append($("<td colspan='2' class='tdInfoPago'>").append($("<span  class='trInfoPago'>").html('- ' + objPendientesDfc.FormaPago.PagoCajas[ca].Intrucciones))));
                }

                //carga la tabla
                $("#infoPagoFC table").html(tbodyFP);
                email = '<img src="images/mail_logo.png" alt="email" />email@itcr.ac.cr'; //+ objPendientesDfc.Email;
                if (objPendientesDfc.Email != "") {
                    email = '<img src="images/mail_logo.png" alt="email" />' + objPendientesDfc.Email;
                }
                if (objPendientesDfc.Telefono != "") {
                    tel = '<img src="images/phone.png" alt="Telefono" />' + objPendientesDfc.Telefono;
                }
                $("#detFC").append($("<div class='fooinfoContact ui-widget'>").append($("<table>").append($("<tr>")
                    .append($("<td>").html(tel))
                    .append($("<td>").html(email)))));
                /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
                //carga el total a la tabla principal
                tbody.append($("<tr class='trFC'>")
                    .append($("<td>"))
                    .append($("<td>").html("Departamento Financiero Contable"))
                    .append($("<td class='tdMontos'>").html(parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")))
                    .append($("<td>")));

                //crea los tab
                $(function () {
                    $("#tabFC").tabs();
                });
            }

        }
    }
    //Biblioteca
    if (objPendientesDbi != null) {
        if (objPendientesDbi.Estado) {
            if (objPendientesDbi.Prestamos != null) {
                for (var b = 0; b < objPendientesDbi.Prestamos.length; b++) {
                    biblioteca += parseFloat(objPendientesDbi.Prestamos[b].CurrentFine.replace(',', '').replace(' ', ''));
                }

            }
            biblioteca += parseFloat(objPendientesDbi.Multas.replace(',', '').replace(' ', ''));
            if (biblioteca > 0) {
                tbody.append($("<tr>")
                .append($("<td>"))
                    .append($("<td>").html("Biblioteca José Figueres Ferrer"))
                    .append($("<td class='tdMontos'>").html(parseFloat(biblioteca).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")))
                .append($("<td>")));
            }
        }
    }
    if (total + biblioteca > 0) {
        //Carga linea Totales
        var totales = total + biblioteca;

        tbody.append($("<tr>")
            .append($("<td>"))
            .append($("<td>").html("TOTAL A PAGAR"))
            .append($("<td class='tdTotalPago tdMontos'>").html(parseFloat(totales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")))
            .append($("<td>")));
        $('#imgMorosidad').attr("src", "images/pending.png");
    } else {
        tbody.append($("<tr>")
        .append($("<td>"))
               .append($("<td>").html('No tiene requisitos de pago pendientes.'))
        .append($("<td>")));
        $('#imgMorosidad').attr("src", "images/notpending.png");
    }
    $(".tmPago").html(tbody);
    /*********************************************************/
    //carga requisitos administrativos
    tbody = $("<tbody>");
    if ((objPendientesDar != null) || (objPendientesDbi != null) || (objPendientesTss != null)) {
        //Admisión y Registro
        if (objPendientesDar != null) {
            if (objPendientesDar.Estado) {
                esMoroso = true;
                for (var a = 0; a < objPendientesDar.DocPendientes.length; a++) {
                    tbody.append($("<tr>")
                        .append($("<td>"))
                        .append($("<td>").html(objPendientesDar.DocPendientes[a].Documento + '<br /><span class="morosidadAdmin_Dept">Departamento de Admisión y Registro</span>'))
                        .append($("<td>")));
                }
            }
        }
        //Trabajo Social
        if (objPendientesTss != null) {
            for (var t = 0; t < objPendientesTss.length; t++) {
                tbody.append($("<tr>")
                .append($("<td>"))
                    .append($("<td>").html(objPendientesTss[t].Documento + '<br /><span class="morosidadAdmin_Dept">Trabajo Social y Salud</span>'))
                .append($("<td>")));
            }
        }
        //Biblioteca (de nuevo para los requisitos admninistrativos)
        if (objPendientesDbi != null) {
            if (objPendientesDbi.Estado) {

                if (objPendientesDbi.Prestamos != null) {
                    esMoroso = true;
                    for (var b1 = 0; b1 < objPendientesDbi.Prestamos.length; b1++) {
                        tbody.append($("<tr>")
                            .append($("<td>"))
                            .append($("<td>").html(objPendientesDbi.Prestamos[b1].Material + ': ' + objPendientesDbi.Prestamos[b1].Titulo + '<br /><span class="infoMorosidadAd">Fecha Vencimiento: ' + objPendientesDbi.Prestamos[b1].FechaVenc + ' ' + objPendientesDbi.Prestamos[b1].HoraVenc + '<br/> Multa: ' + parseFloat(objPendientesDbi.Prestamos[b1].CurrentFine).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '</span><br/><span class="morosidadAdmin_Dept">Devolución: ' + objPendientesDbi.Prestamos[b1].LugarDevolucion + '</span>'))
                            .append($("<td>")));
                    }
                }
            }
        }

        if (esMoroso) {
            $('#imgRequisitos').attr("src", "images/pending.png");
        } else {
            tbody.append($("<tr>")
            .append($("<td>"))
                .append($("<td>").html('No tiene requisitos administrativos pendientes.'))
            .append($("<td>")));
            $('#imgRequisitos').attr("src", "images/notpending.png");
        }
    } else {
        tbody.append($("<tr>")
        .append($("<td>"))
               .append($("<td>").html('No fue posible realizar la revisión de la morosidad.'))
        .append($("<td>")));
        $('#imgRequisitos').attr("src", "images/notpending.png");
    }
    $(".tmAdmin").html(tbody);
    $(".tmPago tr").on("click", function () {
        var fila = $(this);
        if (fila.hasClass("trFC")) {
            $("#detFC").css({ "left": $(".cMorAdmin").offset().left - 15, "top": $(".cMorAdmin").offset().top + 21 })
                .addClass("arrow")
                .toggle("drop", function () {
                    if ($(this).is(":visible")) {
                        fila.css({ "background-color": "rgb(22,39,88)", "color": "white" });
                    } else {
                        fila.css({ "background-color": "initial", "color": "#444444" });
                    }
                });
        }
    });


}
function ConsultaMorosidadEstudiante() {
    $(function () {
        $.ajax(
            {
                url: "frmMatricula.aspx/ConsultaMorosidadEstudiante",
                data: "{}",
                dataType: "json",
                type: "POST",
                global: false,
                async: true,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if ((msg.d != "False") && (msg.d != "Error")) {
                        ValidaMorosidad(msg.d, 2);
                    } else if (msg.d == "Error") {
                        AccionPanelMensaje("F", "No ha sido posible cargar sus cursos debido a un problema de conexión con el servidor principal, por favor comuniquese con el Departamento de Admisión y Registro.");
                    } else {
                        AccionPanelMensaje("T", "Usted no tiene requisitos pendientes con la Institución.");
                    }
                },
                error: function (result) {
                    AccionError(result.status);

                },
                complete: function () {
                    AccionPanelMensaje("CL", "");
                }
            });
    });
}
function ObtieneDetallesPago() {
    var html = $("<div class='tabDetails'>")
        .append($("<ul>").append($("<li>").append($("<a href='.tabPago'>").html("Información de Pago")))
            .append($("<li>").append($("<a href='.tabDesgloce'>").html("Desgloce"))))
        .append($("<div class='tabPago'>"))
        .append($("<div class='tabDesgloce'>"));

    return html;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//VERIFICAR PERFIL
function VerificaPerfil() {
    $(function () {
        $.ajax(
            {
                url: "frmMatricula.aspx/VerificaActualizacionPerfil",
                data: "{}",
                dataType: "json",
                type: "POST",
                async: true,
                global: false,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if (msg.d == "True") {
                        AccionPanelMensaje("CI", "Abriendo Perfil Personal...");
                        CreaDialogo();
                        ObtieneInfoPersonal();
                    }
                },
                error: function (result) {
                    AccionError(result.status);
                },
                complete: function () {
                    AccionPanelMensaje("CL", "");
                }
            });
    });

}

//////////////////////////////////////////////////////////////////////////////////////////////////
//realiza la llamada Ajax para los mantenimientos (inserts, updates, deletes) y retorna datos.
function AjaxCall_Cursos(idConvocatoria, idPeriodo) {
    $(function () {
        $.ajax(
            {
                url: "frmMatricula.aspx/CargaCursos",
                data: "{idConvocatoria: '" + idConvocatoria + "', idPeriodo:'" + idPeriodo + "'}",
                dataType: "json",
                type: "POST",
                global: false,
                async: true,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if (msg.d != "false") {
                        var data = jQuery.parseJSON(msg.d);
                        Carga_Cursos(data.Cursos);
                        if (!data.EstadoCita) {
                            $('.txtGrupoMatriculado').attr('disabled', 'disabled');
                            //una vez cargado los cursos revisa la cita de matrícula
                        }
                        if (data.EsBloqueado) {
                            //abre el dialogo para indicar que esta bloqueado.
                            AbreDialogoInfoTemporal("Su usuario se encuentra Bloqueado debido a que no ha entregado la documentación necesaria para proceder con su matrícula.");
                            //Muestra mensaje en el espacio de la cita.
                            $('#lblCitaMatricula').text("Usuario Bloqueado");
                            $('.divCitas').removeClass('cCitasOk cCitasNA').addClass('cCitasNo');
                            $('.citaIndicador').removeClass('citaIndicadorOk citaIndicadorNA').addClass('citaIndicadorNo');
                            //bloquea la matricula
                            $('.txtGrupoMatriculado').remove();
                        }
                        ConsultaCitaMatricula();
                    } else {
                        AccionPanelMensaje("F", "No ha sido posible cargar sus cursos debido a un problema de conexión con el servidor principal, por favor comuniquese con el Departamento de Admisión y Registro.");
                    }

                },
                error: function (result) {
                    AccionError(result.status);
                },
                complete: function () {
                    AccionPanelMensaje("CL", "");
                }
            });
    });
}

function AjaxCall_Convocatorias() {
    var data;
    $(function () {
        $.ajax(
            {
                url: "frmMatricula.aspx/ConsultaConvocatorias",
                data: "{}",
                dataType: "json",
                type: "POST",
                async: true,
                global: false,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if ((msg.d != "false") || (msg.d != null)) {
                        data = jQuery.parseJSON(msg.d);
                        $("#Table_ConvocatoriaEstudiante tr").remove();
                        ValidaConvocatoria(data);
                    } else {
                        data = msg.d;
                    }
                },
                error: function (result) {
                    AccionError(result.status);
                },
                complete: function () {
                    if (!$('.dialogMorosidad').length) {
                        $("#dialogConvocatorias").dialog("open");
                    }
                    AccionPanelMensaje("CL", "");
                }
            });
    });
    return data;
}
function ValidaConvocatoria(data) {
    //var data = jQuery.parseJSON(convocatorias);
    $("#dialogConvocatorias").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: "fade",
        width: 800,
        height: 450,
        zindex: 900,
        draggable: true,
        resizable: false,
        //        closeOnEscape: false,
        buttons: {
            "Ver Historial Académico": function () {
                AccionPanelMensaje("CI", "Consultando Historial Académico...");
                ConsultarCurriculumAcademico();
                $(".contentMenu").fadeToggle(500);

            }
            //,
            //Continuar: function () {
            //    Carga_Cursos(null);
            //    $(this).dialog("close");
            //}
        },
        close: function (event, ui) {
            AccionPanelMensaje("CI", "Cargando...");
            VerificaPerfil();
            ConsultaMensaje();
        }
    });
    if (data != null) {
        var estado = false, activaConv;
        if (data.length > 0) {
            $('#tHeaderConvocatoria').show();
            $('#headerConvocatorias > span').remove();

            for (var i = 0; i < data.length; i++) {
                //if (data[i].ESTADO != true) {
                //    estado = 'Inactivo';
                //} else {
                //    estado = "Activo";
                //}
                if (data[i].DENTRO_FECHA == true) {
                    activaConv = '<img class="btn_Consultar" src="images/checkgreen.png" style=" z-index:1; width:30px; height:30px;" title="Seleccionar Convocatoria Activa">';
                    estado = true;
                } else {
                    activaConv = '<img class="btn_Consultar" src="images/i.png" style=" z-index:1; width:25px; height:25px;" title="Seleccionar Solo Consulta">';
                }
                var row = $("<tr id='" + data[i].ID_CONVOCATORIA + "_" + data[i].ID_PERIODO + "'>")
                    .append($("<td class='center'>").html(data[i].MODALIDAD))
                    .append($("<td class='center'>").html(data[i].PERIODO))
                    .append($("<td class='center'>").html(data[i].TIPOMATRICULA))
                    .append($("<td >").html(data[i].FECHA_INICIO))
                    .append($("<td>").html(data[i].FECHA_FINAL))
                    .append($("<td class='center'>").html(activaConv));
                $("#Table_ConvocatoriaEstudiante > tbody").append(row);
            }
            $('.btn_Consultar').on('click', function () {
                AccionPanelMensaje("CI", "Cargando Cursos...");
                var $row = $(this).closest("tr"); //Closest permite obtener la fila donde esta contenido el boton
                var idRow = $row.attr('id').split("_");
                var idConvocatoria = idRow[0], idPeriodo = idRow[1];
                AjaxCall_Cursos(idConvocatoria, idPeriodo);
                $("#dialogConvocatorias").dialog("close");
            });
        } else {
            $('#tHeaderConvocatoria').hide();
            $('.headerConvocatorias').append($('<span>').html('No hay convocatorias disponibles relacionadas con su plan de estudios.'));
            //remover los nombres de columnas 
        }
        $("#dialogConvocatorias").removeClass("ui-dialog ui-dialog-content ui-widget-content");
        $(".ui-dialog-titlebar").remove();
        //$("#dialogConvocatorias > .headerDialog").css({ height: '12%' });
        //$("#dialogConvocatorias > .ui-dialog-buttonpane").append($("<span>").html("NOTA: Seleccione una convocatoria disponible para matricular."));
        //revisa los botones si tiene convocatorias activas
        //var dialogOb = $("#dialogConvocatorias");
        //if (!estado) {
        //    dialogOb.dialog("option", "buttons", [{
        //        text: "Continuar",
        //        click: function() {
        //            $(this).dialog("close");
        //            Carga_Cursos("NM");
        //        }
        //    }, {
        //        text: "Ver Curriculum Académico",
        //        click: function () {
        //            ConsultarCurriculumAcademico();
        //        }
        //    }]);
        //} else {
        //    dialogOb.dialog("option", "buttons", [
        //        {
        //            text: "Ver Curriculum Académico",
        //        click: function () {
        //            ConsultarCurriculumAcademico();
        //        }
        //        }
        //    ]);
        //}
        if (!$('.dialogMorosidad').length) {
            $("#dialogConvocatorias").dialog("open");
        }
    } else {
        AccionPanelMensaje("F", "No ha sido posible cargar las convocatorias, por favor reintente de nuevo más tarde. Comuniquese con el Departamento de Admisión y Registro.");
    }
}

function ConsultaMensaje() {
    $(function () {
        $.ajax(
            {
                url: "frmMatricula.aspx/ConsultaMensaje",
                data: "{}",
                dataType: "json",
                type: "POST",
                async: true,
                global: false,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if (msg.d != "False") {
                        AbreDialogoInfoTemporal(msg.d);
                    }
                },
                error: function (result) {
                }
            });
    });
}
//********************************************************************************************************
function AbreDialogoInfoTemporal(texto) {

    $('body').append($('<div id=dialogMensaje>').append($('<div style="width: 95%;margin: 30px auto 0 auto;text-align: center;">')
        .append($('<span style="display: block;margin: 10px;font-size: 14px;">').html(texto))
        .append($('<span style="display: block;margin: 40px;font-size: 16px;font-weight: bold;">').html('Departamento de Admisión y Registro'))));

    $('#dialogMensaje').dialog({
        autoOpen: true,
        modal: true,
        show: "fade",
        hide: "fade",
        width: 400,
        height: 220,
        draggable: true,
        resizable: false,
        closeOnEscape: false,
        buttons: {
            "Cerrar": function () {
                $(this).dialog("close");
                $(this).dialog('destroy').remove();
            }
        }
    });
    $('#dialogMensaje').removeClass("ui-dialog ui-dialog-content ui-widget-content");
    //($dialogo + "> .headerDialog").css({ height: '15%' });
    $(".ui-dialog-titlebar").remove();


}

//********************************************************************************************************

function Carga_Cursos(data) {
    $(function () {
        if (data != null) {
            if ((data.length > 0) && (data != "NM")) {
                $("#tBodyCursos > tbody >tr").remove();
                for (var i = 0; i < data.length; i++) {
                    var grupo, estado;
                    if (data[i].ID_GRUPO != 0) {
                        grupo = '<input id="grupo_' + data[i].ID_MATERIA + '" type="text" class="txtGrupoMatriculado" value="' + data[i].ID_GRUPO + '"/>';
                        estado = '<img id="img' + data[i].ID_MATERIA + '" src="images/registered_nombre.png" class="imgVerticalMiddle ccmat" title="Curso Matriculado">';
                    } else {
                        grupo = '<input id="grupo_' + data[i].ID_MATERIA + '" type="text" class="txtGrupoMatriculado" value=""/>';
                        estado = '<img id="img' + data[i].ID_MATERIA + '" src="" class="imgVerticalMiddle imghide" title="">';
                    }
                    var row = $("<tr id=" + data[i].ID_MATERIA + ">")
                        .append($("<td class='colInd center'>").html('<img class="imgAccordion" src="images/level.png" title="Ver Grupos">'))
                        .append($("<td class='colCodigo center'>").html(data[i].ID_MATERIA))
                        .append($("<td class='colMateria'>").html('<span id="nombre' + data[i].ID_MATERIA + '">' + data[i].DESCRIPCION_MATERIA + '</span>'))
                        .append($("<td class='colCreditos center'>").html(data[i].CANT_CREDITOS))
                        .append($("<td class='colGrupo center'>").html(grupo))
                        .append($("<td class='colError center'>").html('<img id="imgError' + data[i].ID_MATERIA + '" src="images/warning.png" class="imgVerticalMiddle imgErrorMatricula" title="click para ver el error.">'))
                        .append($("<td class='colMatricula center'>").html(estado));
                    $("#tBodyCursos > tbody").append(row);
                    $("#tBodyCursos > tbody").append('<tr class="Rowaccordion"  id="trH' + data[i].ID_MATERIA + '"><td colspan="7"><div class="divHorario" id="divH' + data[i].ID_MATERIA + '"></div></td></tr>');
                }
            } else if (data == "NM") {
                $("#tBodyCursos > tbody >tr").remove();
                $("#tBodyCursos > tbody").append($("<tr>").append("<td>No hay convocatorias disponibles en este momento.</td>"));
            } else {
                $("#tBodyCursos > tbody >tr").remove();
                $("#tBodyCursos > tbody").append($("<tr>").append("<td>No hay cursos disponibles en su prematrícula.</td>"));
            }
        } else {
            $("#tBodyCursos > tbody >tr").remove();
            $("#tBodyCursos > tbody").append($("<tr>").append("<td>No hay cursos disponibles en su prematrícula.</td>"));
        }
        $(".Rowaccordion").hide();
        if ($(".footer").length) {
            $('.BodyCursos, #tBodyCursos').css({ "max-height": $(".footer").position().top - 175, "width": $('.content').width() });
        }

        //  $(".colMatricula img").hide();
        $(".imgErrorMatricula").hide();
        $('#tBodyCursos tr').on("click", function () {
            if (!$('.txtGrupoMatriculado').is(":focus")) {
                $('#tBodyCursos tr').removeClass("tdSelected");
                if (!$(this).hasClass("Rowaccordion")) {
                    $(this).addClass("tdSelected");
                    var idMateria = $(this).attr('id'), $Accordion = $('#trH' + idMateria), idGrupo = $("#grupo_" + idMateria).val();
                    if ($Accordion.is(':hidden')) {
                        if ($('#divH' + idMateria).length) {
                            $('#divH' + idMateria).html(AddDetalles(idMateria));
                            AccionPanelMensaje("CI", "Cargando Horarios...");
                            CargaHorarios(idMateria, idGrupo, 1); //, idGrupo, idPrematricula
                        }
                        $('.imgAccordion', this).attr('src', "images/openlevel.png");
                        $('.imgAccordion', this).attr('title', "Ocultar Grupos");
                    } else {
                        $('.imgAccordion', this).attr('src', "images/level.png");
                        $('.imgAccordion', this).attr('title', "Ver Grupos");
                    }
                    $Accordion.fadeToggle(500);
                }
            }
        });
        $('.txtGrupoMatriculado').on("change", function () {
            var idMateria = $(this).attr("id").split("_")[1];
            var idGrupo = $(this).val();
            if (idGrupo == "") { idGrupo = 0; }
            SeleccionaGrupo(idMateria, idGrupo);

        });
    });

}
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
                                        .append($("<td class='colHoMatricular center'>").html('<img id="' + idMateria + "_" + data[i].IdGrupo + '" class="cBtnMat_' + idMateria + ' imgMatriculaGrupo cImgDesMatriculado"  src="images/notregistered.png"  title="Matricular">'));
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

function ConsultarCupo(idMateria) {
    AccionPanelMensaje("CI", "Consultando Cupos...");
    var data = CargaHorarios(idMateria, 1, 2);
    if (data != null) {
        data = data.Horario;
        for (var a = 0; a < data.length; a++) {
            $('#cupo' + idMateria + data[a].IdGrupo).text(data[a].CupoDisponible);
        }
    }
    AccionPanelMensaje("CL", "");
}
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
    '  </tr></thead></table>' +//hasta aquí la tabla del header de horarios
        '<div class="cdivHorariosBody"><table class="tableHorarios">' +//tabla del cuerpo de horarios
            '<tbody id="bodyTableHorarios_' + idMateria + '"></tbody></table></div>';

}
function activaDialog($dialogo) {
    $(function () {
        $dialogo.dialog({
            autoOpen: false,
            modal: true,
            show: "fade",
            hide: "fade",
            width: 700,
            height: 550,
            draggable: true,
            resizable: false
        });
        $dialogo.removeClass("ui-dialog ui-dialog-content ui-widget-content");
        //($dialogo + "> .headerDialog").css({ height: '15%' });
        $(".ui-dialog-titlebar").remove();
        $('.cCerrar').on("click", function () {
            var $parent = $(this).parent().parent();
            $parent.dialog("close");
        }).mouseenter(function () {
            $('.imgCloseDialog').attr('src', 'images/close_over.png');
            $(this).css('color', "gray");
        }).mouseleave(function () {
            $('.imgCloseDialog').attr('src', 'images/close.png');
        });
    });
}
function SeleccionaGrupo(idMateria, idGrupo) {
    AccionPanelMensaje("CI", "Aplicando matricula...");
    var tipoMat = $('#img' + idMateria).hasClass("ccmat");
    //    $('#img' + idMateria).attr("src", "imagenes/loading.gif");
    if (!tipoMat) {//si tiene el curso matriculado, desmatriculelo sino matriculelo
        CallMatricular(idMateria, idGrupo);
    } else {
        var matriculado = $('#' + idMateria + '_' + idGrupo).hasClass('cImgMatriculado');
        if ((!matriculado) && (idGrupo > 0))//cambio de grupo
        {
            CallMatricular(idMateria, idGrupo);
        } else { //desmatricula
            $.ajax(
                {
                    url: "frmMatricula.aspx/DesMatricular",
                    data: "{idMateria:'" + idMateria + "'}",
                    dataType: "json",
                    type: "POST",
                    async: false,
                    global: false,
                    contentType: "application/json; charset=utf-8",
                    success: function (msg) {
                        var resultado = jQuery.parseJSON(msg.d), errorCorequisito = false, mateCorequisito = "ND";
                        var nomReq1 = "ND", nomReq2 = "ND";
                        if (resultado.ErrorString != null) {
                            var resCoRequisito = resultado.ErrorString.split("_");
                            if (resCoRequisito.length == 2) {
                                if (resCoRequisito[0] == "ErrCoRequisito") {
                                    errorCorequisito = true;
                                    mateCorequisito = resCoRequisito[1];
                                }
                            }
                            if (resCoRequisito.length == 3) {
                                if (resCoRequisito[0] == "ErrCoRequisito2mas") {
                                    errorCorequisito = true;
                                    nomReq1 = resCoRequisito[1];
                                    nomReq2 = resCoRequisito[2];
                                }
                            }
                            if (resultado.ErrorString == "SMaterias") {
                                AbreDialogoInfoTemporal("Se ha eliminado la materia y no cuenta con materias matriculadas, por lo que pierde su cupo en el TEC. Recuerde, matricule al menos una materia.");
                            }
                        }
                        if (resultado.Estado) {
                            //var oTable = $('#Table_Cursos').dataTable();
                            //oTable.fnUpdate('<img src="imagenes/check.png" class="imgVerticalMiddle" title="Curso Matriculado">', pos, 5);
                            $('#grupo_' + idMateria).val("");
                            $('#img' + idMateria).hide().removeClass('ccmat').addClass('imghide');
                            //remueve el curso matriculado a todos
                            var selectorGrupo = '.cBtnMat_' + idMateria;
                            $(selectorGrupo).removeClass("cImgMatriculado").attr({ "src": "images/notregistered.png", "tittle": "Matricular Curso." }).addClass("cImgDesMatriculado");
                            //quita el dialogo de error si existe
                            $('#imgError' + idMateria).hide();
                            $('#dialogError' + idMateria).remove();

                        } else {
                            if ((errorCorequisito) && (mateCorequisito != "ND")) { //revisa si tiene co-requisitos
                                AbreDialogoEliminaCoRequisitos(mateCorequisito, idMateria, nomReq1, nomReq2, 1);

                            } else if ((errorCorequisito) && (nomReq1 != "ND") && (nomReq2 != "ND")) {
                                AbreDialogoEliminaCoRequisitos(idMateria, idMateria, nomReq1, nomReq2, 2);
                            }
                            else {
                                var listaErrores = resultado.Error;
                                $("body").append('<div id="dialogError' + idMateria + '" title="Información"> <br /><span>Se han presentado los siguientes errores en tu proceso de matrícula:</span>' +
                                    '<div class="tituloMateriaError" ><h5 id="TError' + idMateria + '">' + $("#nombre" + idMateria).text() + '</h5></div>' +
                                    '<div class="cuerpoError"><ul id="ulError' + idMateria + '"></ul></div></div>');
                                //version todo en una sola lista
                                for (var i = 0; i < listaErrores.length; i++) {
                                    $("#ulError" + idMateria).html('<li>' + listaErrores[i].MENSAJE_USUARIO + '</li>');
                                }
                            }
                        }
                    },
                    error: function (result) {
                        AccionError(result.status);
                    },
                    complete: function () {
                        AccionPanelMensaje("CL", "");
                    }
                });

        }

    }
    ConsultarCupo(idMateria);
    $('.cCerrar').on("click", function () {
        var $parent = $(this).parent().parent();
        $parent.dialog("close");

    });
}

function AbreDialogoEliminaCoRequisitos(idMateriaCo, idMateria, nomReq1, nomReq2, tipo) {
    if ($('#dialogEliminaCoReq' + idMateriaCo).length) {
        $('#dialogEliminaCoReq' + idMateriaCo).remove();
    }
    if (tipo == 1) {
        $("body").append('<div id="dialogEliminaCoReq' + idMateriaCo + '" title="Información"> ' +
            '<div class="tituloMateriaError" ><h5 id="TError' + idMateriaCo + '">' + $("#nombre" + idMateria).text() + '</h5></div>' +
            '<div class="msgEliminarCor">' +
            '<span class="spMensajeCoReq">El curso que desea eliminar presenta un Co-Requisito, para continuar debe des matricular el curso ' + $("#nombre" + idMateriaCo).text() + '.</br></br> ¿Desea Continuar? </span>' +
            '</div>');
        $("#dialogEliminaCoReq" + idMateriaCo).dialog({
            autoOpen: true,
            modal: true,
            show: "fade",
            hide: "fade",
            width: 500,
            height: 300,
            draggable: false,
            resizable: false,
            buttons: {
                Sí: function () {
                    $(this).dialog("close");
                    DesMatricularGrupoCoRequisito(idMateriaCo, 1);
                },
                No: function () {
                    $(this).dialog("close");
                    DesMatricularGrupoCoRequisito(idMateriaCo, 2);
                }
            }
        });
    } else {
        $("body").append('<div id="dialogEliminaCoReq' + idMateriaCo + '" title="Información"> ' +
          '<div class="tituloMateriaError" ><h5 id="TError' + idMateriaCo + '">' + $("#nombre" + idMateria).text() + '</h5></div>' +
          '<div class="msgEliminarCor">' +
          '<span class="spMensajeCoReq">El curso que desea eliminar presenta dos Co-Requisitos, para continuar debe des matricular los cursos ' + nomReq1 + ' y ' + nomReq2 + '.</span>' +
          '</div>');
        $("#dialogEliminaCoReq" + idMateriaCo).dialog({
            autoOpen: true,
            modal: true,
            show: "fade",
            hide: "fade",
            width: 500,
            height: 300,
            draggable: false,
            resizable: false,
            buttons: {
                Cerrar: function () {
                    $(this).dialog("close");

                }
            }
        });
    }


}

function DesMatricularGrupoCoRequisito(idMateria, tipo) {
    AccionPanelMensaje("CI", "Aplicando matricula...");
    $.ajax(
        {
            url: "frmMatricula.aspx/DesMatricularCoRequisito",
            data: "{idMateria:'" + idMateria + "', tipo:'" + tipo + "'}",
            dataType: "json",
            type: "POST",
            async: false,
            global: false,
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                var resultado = jQuery.parseJSON(msg.d), errorCorequisito = false, mateCorequisito = "ND";
                if (tipo != 2) {
                    if (resultado.ErrorString != null) {
                        var resCoRequisito = resultado.ErrorString.split("_");
                        if (resCoRequisito.length == 2) {
                            if (resCoRequisito[0] == "ErrCoRequisito") {
                                errorCorequisito = true;
                                mateCorequisito = resCoRequisito[1];
                            }
                        }

                    }
                    if (resultado.Estado) {
                        //var oTable = $('#Table_Cursos').dataTable();
                        //oTable.fnUpdate('<img src="imagenes/check.png" class="imgVerticalMiddle" title="Curso Matriculado">', pos, 5);
                        var materias = resultado.ErrorString.split('_');
                        var idMateriaReal = materias[0], idMateriaCor = materias[1];
                        //aplica materia real

                        $('#grupo_' + idMateriaReal).val("");
                        $('#img' + idMateriaReal).hide().removeClass('ccmat').addClass('imghide');
                        //remueve el curso matriculado a todos
                        var selectorGrupo = '.cBtnMat_' + idMateriaReal;
                        $(selectorGrupo).removeClass("cImgMatriculado").attr({ "src": "images/notregistered.png", "tittle": "Matricular Curso." }).addClass("cImgDesMatriculado");
                        //quita el dialogo de error si existe
                        $('#imgError' + idMateriaReal).hide();
                        $('#dialogError' + idMateriaReal).remove();

                        //aplica al corequistio
                        $('#grupo_' + idMateriaCor).val("");
                        $('#img' + idMateriaCor).hide().removeClass('ccmat').addClass('imghide');
                        //remueve el curso matriculado a todos
                        selectorGrupo = '.cBtnMat_' + idMateriaCor;
                        $(selectorGrupo).removeClass("cImgMatriculado").attr({ "src": "images/notregistered.png", "tittle": "Matricular Curso." }).addClass("cImgDesMatriculado");
                        //quita el dialogo de error si existe
                        $('#imgError' + idMateriaCor).hide();
                        $('#dialogError' + idMateriaCor).remove();
                    } else {
                        if ((errorCorequisito) && (mateCorequisito != "ND")) { //revisa si tiene co-requisitos
                            AbreDialogoEliminaCoRequisitos(mateCorequisito);

                        } else {
                            var listaErrores = resultado.Error;
                            $("body").append('<div id="dialogError' + idMateria + '" title="Información"> <br /><span>Se han presentado los siguientes errores en tu proceso de matrícula:</span>' +
                                '<div class="tituloMateriaError" ><h5 id="TError' + idMateria + '">' + $("#nombre" + idMateria).text() + '</h5></div>' +
                                '<div class="cuerpoError"><ul id="ulError' + idMateria + '"></ul></div></div>');
                            //version todo en una sola lista
                            for (var i = 0; i < listaErrores.length; i++) {
                                $("#ulError" + idMateria).html('<li>' + listaErrores[i].MENSAJE_USUARIO + '</li>');
                            }
                        }
                    }
                }
            },
            error: function (result) {
                AccionError(result.status);
            },
            complete: function () {
                AccionPanelMensaje("CL", "");
            }
        });
}

function CallMatricular(idMateria, idGrupo) {
    if (idGrupo > 0) {
        $.ajax(
            {
                url: "frmMatricula.aspx/Matricular",
                data: "{idMateria: '" + idMateria + "', idGrupo:'" + idGrupo + "'}",
                dataType: "json",
                type: "POST",
                async: false,
                global: false,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    var resultado = jQuery.parseJSON(msg.d), errorCorequisito = false, mateCorequisito = "ND";
                    var nomReq1 = "ND", nomReq2 = "ND";
                    if (resultado.ErrorString != null) {
                        var resCoRequisito = resultado.ErrorString.split("_");
                        if (resCoRequisito.length == 2) {
                            if (resCoRequisito[0] == "ErrCoRequisito") {
                                errorCorequisito = true;
                                mateCorequisito = resCoRequisito[1];
                            }
                        } else if (resCoRequisito.length == 3) {
                            if (resCoRequisito[0] == "ErrCoRequisito2mas") {
                                errorCorequisito = true;
                                nomReq1 = resCoRequisito[1];
                                nomReq2 = resCoRequisito[2];
                            }
                        }
                    }
                    if (resultado.Estado) {
                        //var oTable = $('#Table_Cursos').dataTable();
                        //oTable.fnUpdate('<img src="imagenes/check.png" class="imgVerticalMiddle" title="Curso Matriculado">', pos, 5);

                        $('.cBtnMat_' + idMateria).removeClass("cImgMatriculado").attr({ "src": "images/notregistered.png", "tittle": "Matricular Curso." }).addClass("cImgDesMatriculado");
                        $('#grupo_' + idMateria).val(resultado.NumGrupo);
                        //muestra la imagen de la materia......
                        $('#img' + idMateria).attr("src", "images/registered_nombre.png").show().addClass('ccmat').removeClass('imghide');
                        var selectorGrupo = '#' + idMateria + "_" + resultado.NumGrupo;
                        $(selectorGrupo).removeClass("cImgDesMatriculado").attr({ "src": "images/registered.png", "tittle": "Eliminar Grupo." }).addClass("cImgMatriculado");
                        //quita el dialogo de error si existe
                        $('#imgError' + idMateria).hide();
                        $('#dialogError' + idMateria).remove();

                    } else {
                        if (resultado.ErrorString == "ErrSede") {
                            if ($('#dialogOtraSede').length != 0) {
                                $('#dialogOtraSede').remove();
                            }
                            $("body").append(
                                $('<div id="dialogOtraSede" title="Curso en otra sede">')
                                    .append($('<div>').html('Esta solicitando matrícula en un curso distinto la sede de su plan de estudios. </br> </br> ¿Desea continuar con la matricula del curso: ' + $("#nombre" + idMateria).text() + '?')));
                            $("#dialogOtraSede").dialog({
                                autoOpen: true,
                                modal: true,
                                show: "fade",
                                hide: "fade",
                                width: 500,
                                height: 200,
                                draggable: false,
                                resizable: false,
                                buttons: {
                                    Sí: function () {
                                        $(this).dialog("close");
                                        SeleccionaGrupo(idMateria, idGrupo);
                                    },
                                    No: function () {
                                        $(this).dialog("close");
                                        CancelaMatriculaOtraSede(idMateria, idGrupo);
                                    }
                                }
                            });
                        } else if (resultado.ErrorString == "ErrGrupoNE") {
                            AccionPanelMensaje("F", "El grupo indicado no existe en la Guía de Horarios.");

                            //} else if ((!resultado.Estado) && (resultado.Error.length == 0)) {
                            //    AccionPanelMensaje("F", "No ha sido posible cargar sus cursos debido a un problema de conexión con el servidor central, por favor comuniquese con el Departamento de Admisión y Registro.");
                        } else if (resultado.ErrorString == "ErrGrupo") {
                            AccionPanelMensaje("F", "Debe indicar el número de grupo correctamente para procesar su matrícula.");
                        } else if ((errorCorequisito) && (mateCorequisito != "ND")) { //revisa si tiene co-requisitos

                            var listaErrorCo = resultado.Error;
                            if (listaErrorCo != null) {
                                if (listaErrorCo.length > 0) { //revisa que no tenga problemas con la cantidad de cursos
                                    AbreDialogErrorCorequisitos(listaErrorCo, idMateria);
                                } else {
                                    ConsultaHorariosCorequisito(mateCorequisito, idMateria);
                                }
                            }

                        } else if ((errorCorequisito) && (nomReq1 != "ND") && (nomReq2 != "ND") && (resultado.Error == null)) { //revisa si tiene co-requisitos

                            MensajeMas2Corequisitos(idMateria, nomReq1, nomReq2);

                        }
                        else {
                            var listaErrores = resultado.Error;
                            $('.tooltipError').remove();
                            if ($('#dialogError' + idMateria).length) {
                                $('#dialogError' + idMateria).remove();
                            }
                            $("body").append('<div id="dialogError' + idMateria + '" title="Información"> ' +
                                '<div class="headerDialog"><div class="cTitulo">Restricciónes de tu proceso de matrícula</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div> </div>' +
                                '<div class="tituloMateriaError" ><h5 id="TError' + idMateria + '">' + $("#nombre" + idMateria).text() + '</h5></div>' +
                                '<div class="cuerpoError"><ul id="ulError' + idMateria + '"></ul></div>' +
                                '<div class="divfooterError"><br/><span>Coloque el cursor sobre la restricción para ver más detalles.</span></div>' +
                                '</div>');
                            //version con tooltips
                            for (var i = 0; i < listaErrores.length; i++) {
                                $("body").append('<div class="tooltipError" id="tooltipError' + listaErrores[i].ID_ERROR + '"><ul></ul></div>');
                                var idToolError = '#tooltipError' + listaErrores[i].ID_ERROR;
                                var j;
                                if (listaErrores[i].CHOQUE_HORARIOS != null) {

                                    $("#ulError" + idMateria).append('<li class="tooltip" id="' + listaErrores[i].ID_ERROR + '">' + listaErrores[i].MENSAJE_USUARIO + '</li>');
                                    $(idToolError + ' ul').empty();
                                    var arrayListos = [], materiaRev;

                                    for (j = 0; j < listaErrores[i].CHOQUE_HORARIOS.length; j++) {
                                        materiaRev = listaErrores[i].CHOQUE_HORARIOS[j].IdMateria2;
                                        if (jQuery.inArray(materiaRev, arrayListos) == -1) {
                                            arrayListos.push(materiaRev);
                                            $(idToolError + ' ul').append('<li>' + listaErrores[i].CHOQUE_HORARIOS[j].NombreMateria2 + ' (' + listaErrores[i].CHOQUE_HORARIOS[j].IdMateria2 + ') en el Grupo ' + listaErrores[i].CHOQUE_HORARIOS[j].IdGrupo2 + '</li>');
                                        }
                                    }
                                } else if (listaErrores[i].RESERVACIONES != null) {
                                    $("#ulError" + idMateria).append('<li class="tooltip" id="' + listaErrores[i].ID_ERROR + '">' + listaErrores[i].MENSAJE_USUARIO + '</li>');
                                    $(idToolError + ' ul').empty();
                                    for (j = 0; j < listaErrores[i].RESERVACIONES.length; j++) {
                                        if (listaErrores[i].RESERVACIONES[j].NombreSede != "") {
                                            $(idToolError + ' ul').append('<li> Sede ' + listaErrores[i].RESERVACIONES[j].NombreSede + '</li>');
                                        }
                                        if (listaErrores[i].RESERVACIONES[j].NombreDepartamento != null) {
                                            $(idToolError + ' ul').append('<li> ' + listaErrores[i].RESERVACIONES[j].NombreDepartamento + '</li>');
                                        }
                                        if (listaErrores[i].RESERVACIONES[j].IdPlan != null) {
                                            $(idToolError + ' ul').append('<li> Plan ' + listaErrores[i].RESERVACIONES[j].IdPlan + ' </li>');
                                        }
                                        if (listaErrores[i].RESERVACIONES[j].IdJornada != null) {
                                            $(idToolError + ' ul').append('<li> Jornada ' + listaErrores[i].RESERVACIONES[j].IdJornada + ' </li>');
                                        }
                                    }
                                } else {
                                    $("#ulError" + idMateria).append('<li class="tooltip" id="' + listaErrores[i].ID_ERROR + '">' + listaErrores[i].MENSAJE_USUARIO + '</li>');
                                    $(idToolError + ' ul').empty();
                                    $(idToolError + ' ul').append('<li>' + listaErrores[i].DESCRIPCION + '</li>');
                                }
                            }
                            activaDialog($("#dialogError" + idMateria));
                            $('#imgError' + idMateria).on("click", function () {
                                $("#dialogError" + idMateria).dialog("open");
                            }).show();
                            $("#dialogError" + idMateria).dialog("open");
                            $(".tooltipError ul").css({ marginLeft: "20px", marginRight: "20px", width: "90%" });
                            $(".tooltipError").hide();
                            $(".tooltip").mouseenter(function (e) {
                                //var x = e.pageX - this.offsetLeft;
                                //var y = e.pageY - this.offsetTop;
                                var x = $("#dialogError" + idMateria).offset().left + 300, y = e.pageY - 120, $content = $(".content"), rt = $content.outerWidth();
                                //alert("x: " + posXy.left + ", y: " + posXy.top + " , x1: " + this.offsetLeft + " , y1: " + this.offsetTop);
                                $('#tooltipError' + $(this).attr('id')).css({ marginTop: y, marginLeft: x, maxWidth: rt - x }).show();
                            }).mouseleave(function () {
                                $('#tooltipError' + $(this).attr('id')).hide();
                            });
                        }
                    }

                },
                error: function (result) {
                    AccionError(result.status);
                },
                complete: function () {
                    AccionPanelMensaje("CL", "");
                }
            });
    } else {
        AccionPanelMensaje("F", "Debe seleccionar un grupo que exista en la Guía de Horarios para poder matrícular.");
    }
}

function MensajeMas2Corequisitos(idMateria, nomReq1, nomReq2) {
    //creo el dialogo
    if ($('#dialogCoReq2' + idMateria).length) {
        $('#dialogCoReq2' + idMateria).remove();
    }
    $("body").append('<div id="dialogCoReq2' + idMateria + '" title="Información"> ' +
        '<div class="headerDialog"><div class="cTitulo">Curso con Co-Requisitos</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div> </div>' +
        '<div class="tituloMateriaError" ><h5>El curso ' + $("#nombre" + idMateria).text() + ' presenta dos Co-Requisitos, matricule los cursos ' + nomReq1 + ', y ' + nomReq2 + ' de primero para continuar con el proceso de matricula.</h5></div>' +
        '<div class="cuerpoCorequisito"></div>' +
        '</div>');
    activaDialog($("#dialogCoReq2" + idMateria));
    $('#dialogCoReq2' + idMateria).dialog("open");
}

function AbreDialogErrorCorequisitos(listaErrorCo, idMateria) {
    if ($('#dialogError' + idMateria).length) {
        $('#dialogError' + idMateria).remove();
    }
    $("body").append('<div id="dialogError' + idMateria + '" title="Información"> ' +
        '<div class="headerDialog"><div class="cTitulo">Restricciónes de tu proceso de matrícula</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div> </div>' +
        '<div class="tituloMateriaError" ><h5 id="TError' + idMateria + '">' + $("#nombre" + idMateria).text() + '</h5></div>' +
        '<div class="cuerpoError">' +
        '<span class="spMensajeCoReq">El curso que desea matricular presenta un Co Requisito, para continuar con su matrícula debe solucionar los siguientes errores:</span>' +
        '<ul id="ulError' + idMateria + '"></ul></div>' +
        '</div>');
    for (var i = 0; i < listaErrorCo.length; i++) {
        $("body").append('<div class="tooltipError" id="tooltipError' + listaErrorCo[i].ID_ERROR + '"><ul></ul></div>');
        var idToolError = '#tooltipError' + listaErrorCo[i].ID_ERROR;
        var j;
        $("#ulError" + idMateria).append('<li class="tooltip" id="' + listaErrorCo[i].ID_ERROR + '">' + listaErrorCo[i].MENSAJE_USUARIO + '</li>');
        $(idToolError + ' ul').empty();
        $(idToolError + ' ul').append('<li>' + listaErrorCo[i].DESCRIPCION + '</li>');
    }
    activaDialog($("#dialogError" + idMateria));
    $('#imgError' + idMateria).on("click", function () {
        $("#dialogError" + idMateria).dialog("open");
    }).show();
    $("#dialogError" + idMateria).dialog("open");
    $(".tooltipError ul").css({ marginLeft: "20px", marginRight: "20px", width: "90%" });
    $(".tooltipError").hide();
    $(".tooltip").mouseenter(function (e) {
        //var x = e.pageX - this.offsetLeft;
        //var y = e.pageY - this.offsetTop;
        var x = $("#dialogError" + idMateria).offset().left + 300, y = e.pageY - 120, $content = $(".content"), rt = $content.outerWidth();
        //alert("x: " + posXy.left + ", y: " + posXy.top + " , x1: " + this.offsetLeft + " , y1: " + this.offsetTop);
        $('#tooltipError' + $(this).attr('id')).css({ marginTop: y, marginLeft: x, maxWidth: rt - x }).show();
    }).mouseleave(function () {
        $('#tooltipError' + $(this).attr('id')).hide();
    });
}
function ConsultaHorariosCorequisito(idMateriaCo, idMateria) {
    //creo el dialogo
    if ($('#dialogCoReq' + idMateriaCo).length) {
        $('#dialogCoReq' + idMateriaCo).remove();
    }
    $("body").append('<div id="dialogCoReq' + idMateriaCo + '" title="Información"> ' +
        '<div class="headerDialog"><div class="cTitulo">Curso con Co-Requisitos</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div> </div>' +
        '<div class="tituloMateriaError" ><h5>El curso ' + $("#nombre" + idMateria).text() + ' presenta un Co-Requisito, seleccione el grupo de ' + $("#nombre" + idMateriaCo).text() + ' para continuar con su proceso de matricula.</h5></div>' +
        '<div class="cuerpoCorequisito"></div>' +
        '</div>');
    $('.cuerpoCorequisito').html($('<table class="tbHorarioCorequisito"><thead><tr>' +
        '<td class="colHoSedeCoR">Sede</td>' +
        '<td class="colHoGrupoCoR">Grupo</td>' +
        '<td class="colHoHorarioCoR">Horario - Aula</td>' +
        '<td class="colHoProfesorCoR">Profesor(es)</td>' +
        '<td class="colHoCupoCoR">Cupo <img id="cupoupd_' + idMateriaCo + '" src="images/refresh.png" class="imgUpdCupo" title="Actualizar Cupo"></td>' +
        '<td class="colHoEstadoCoR">Estado</td>' +
        '<td class="colHoMatricular"></td>' +
    '  </tr></thead>'));

    $(".tbHorarioCorequisito thead td").css({ "border-bottom": "solid", "font-weight": "bold", "text-align": "center" });
    //llamo a los horarios
    var horario = CargaHorarios(idMateriaCo, 1, 2); //Obtiene la información de los horarios
    var cita = horario.EstadoCita, data = horario.Horario, idGrupo;
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
                //if (data[i].EstadoReservado) { //carga si es reservado
                //    htmlReservado = "Sí";
                //} else {
                //    htmlReservado = "No";
                //}
                var row = $("<tr>")
                  .append($("<td class='colHoSedeCoR'>").html(data[i].Sede))
                  .append($("<td class='colHoGrupoCoR center'>").html(data[i].IdGrupo))
                  .append($("<td class='colHoHorarioCoR'>").html(htmlHorarios))
                  .append($("<td class='colHoProfesorCoR'>").html(htmlProfesores))
                  .append($("<td class='colHoCupoCoR center'>").html('<span id="cupo' + idMateriaCo + data[i].IdGrupo + '">' + data[i].CupoDisponible + '</span>'))
                  //.append($("<td class='colHoReservado center'>").html(htmlReservado))
                  .append($("<td class='colHoEstadoCoR center'>").html(data[i].EstadoGrupo))
                  .append($("<td class='colHoMatricular center'>").html('<img id="' + idMateriaCo + "_" + data[i].IdGrupo + '" class="cBtnMatCo_' + idMateriaCo + ' imgMatriculaGrupo cImgDesMatriculado"  src="images/notregistered.png"  title="Matricular">'));
                $('.tbHorarioCorequisito').append(row);
                htmlHorarios = "", htmlProfesores = "";
            }
            //var selectorGrupo = '#' + idMateriaCo + "_" + idGrupo;
            //$(selectorGrupo).removeClass("cImgDesMatriculado").attr({ "src": "images/registered.png", "tittle": "Eliminar Grupo." }).addClass("cImgMatriculado");

        } else {
            $('.tbHorarioCorequisito').append('<tr><td colspan=8>No se encontraron horarios disponibles para esta materia</td></tr>');
        }
    } else {
        AccionPanelMensaje("SS", "Se ha cerrado la sesión por inactividad, por favor vuelva a ingresar al sitio web.");
    }

    if (cita) {
        //Crea el evento
        $('.cBtnMatCo_' + idMateriaCo).on("click", function () {
            var idBtn = $(this).attr("id");
            idGrupo = idBtn.split('_')[1];
            MatriculaCoRequisitos(idMateriaCo, idGrupo);
        });
    } else {
        $('.cImgDesMatriculado').remove();
    }
    $('.imgUpdCupo').on("click", function () {
        //var idBtn = $(this).attr("id"),
        //idGrupo = idBtn.split('_')[1];
        ConsultarCupo(idMateriaCo);
        //SeleccionaGrupo(idPrematricula, idMateriaCo, idGrupo);

    });
    activaDialog($("#dialogCoReq" + idMateriaCo));
    $('#dialogCoReq' + idMateriaCo).dialog("open");
}

function MatriculaCoRequisitos(idMateria, idGrupo) {
    if (idGrupo > 0) {
        AccionPanelMensaje("CI", "Aplicando matricula...");
        $.ajax(
            {
                url: "frmMatricula.aspx/MatricularCorequisito",
                data: "{idMateria: '" + idMateria + "', idGrupo:'" + idGrupo + "'}",
                dataType: "json",
                type: "POST",
                async: true,
                global: false,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    var resultado = jQuery.parseJSON(msg.d);
                    if (resultado.Estado) {
                        //var oTable = $('#Table_Cursos').dataTable();
                        //oTable.fnUpdate('<img src="imagenes/check.png" class="imgVerticalMiddle" title="Curso Matriculado">', pos, 5);
                        //aplica exito a ambas materias
                        var materias = resultado.ErrorString.split('_');
                        var idMateriaReal = materias[0], idGrupoReal = materias[1], idMateriaCor = materias[2], idGrupoCor = materias[3]
                        //aplica materia real
                        $('.cBtnMat_' + idMateriaReal).removeClass("cImgMatriculado").attr({ "src": "images/notregistered.png", "tittle": "Matricular Curso." }).addClass("cImgDesMatriculado");
                        $('#grupo_' + idMateriaReal).val(idGrupoReal);
                        $('#img' + idMateriaReal).attr("src", "images/registered_nombre.png").show().addClass('ccmat').removeClass('imghide');
                        var selectorGrupo = '#' + idMateriaReal + "_" + idGrupoReal;
                        $(selectorGrupo).removeClass("cImgDesMatriculado").attr({ "src": "images/registered.png", "tittle": "Eliminar Grupo." }).addClass("cImgMatriculado");
                        //quita el dialogo de error si existe
                        $('#imgError' + idMateriaReal).hide();
                        $('#dialogError' + idMateriaReal).remove();

                        //aplica Materia Corequisito
                        $('.cBtnMat_' + idMateriaCor).removeClass("cImgMatriculado").attr({ "src": "images/notregistered.png", "tittle": "Matricular Curso." }).addClass("cImgDesMatriculado");
                        $('#grupo_' + idMateriaCor).val(idGrupoCor);
                        $('#img' + idMateriaCor).attr("src", "images/registered_nombre.png").show().addClass('ccmat').removeClass('imghide');
                        selectorGrupo = '#' + idMateriaCor + "_" + idGrupoCor;
                        $(selectorGrupo).removeClass("cImgDesMatriculado").attr({ "src": "images/registered.png", "tittle": "Eliminar Grupo." }).addClass("cImgMatriculado");
                        //quita el dialogo de error si existe
                        $('#imgError' + idMateriaCor).hide();
                        $('#dialogError' + idMateriaCor).remove();

                        $("#dialogCoReq" + idMateria).dialog("close");
                    } else {
                        if (resultado.ErrorString == "ErrSede") {
                            if ($('#dialogOtraSede').length != 0) {
                                $('#dialogOtraSede').remove();
                            }
                            $("body").append(
                                $('<div id="dialogOtraSede" title="Curso en otra sede">')
                                    .append($('<div>').html('Esta solicitando matrícula en un curso distinto la sede de su plan de estudios. </br> </br> ¿Desea continuar con la matricula del curso: ' + $("#nombre" + idMateria).text() + '?')));
                            $("#dialogOtraSede").dialog({
                                autoOpen: true,
                                modal: true,
                                show: "fade",
                                hide: "fade",
                                width: 500,
                                height: 200,
                                draggable: false,
                                resizable: false,
                                buttons: {
                                    Sí: function () {
                                        $(this).dialog("close");
                                        SeleccionaGrupo(idMateria, idGrupo);
                                    },
                                    No: function () {
                                        $(this).dialog("close");
                                        CancelaMatriculaOtraSede(idMateria, idGrupo);
                                    }
                                }
                            });
                        } else if (resultado.ErrorString == "ErrGrupoNE") {
                            AccionPanelMensaje("F", "El grupo indicado no existe en la Guía de Horarios.");

                            //} else if ((!resultado.Estado) && (resultado.Error.length == 0)) {
                            //    AccionPanelMensaje("F", "No ha sido posible cargar sus cursos debido a un problema de conexión con el servidor central, por favor comuniquese con el Departamento de Admisión y Registro.");
                        } else if (resultado.ErrorString == "ErrGrupo") {
                            AccionPanelMensaje("F", "Debe indicar el número de grupo correctamente para procesar su matrícula.");
                        } else {
                            var listaErrores = resultado.Error;
                            $('.tooltipError').remove();
                            if ($('#dialogError' + idMateria).length) {
                                $('#dialogError' + idMateria).remove();
                            }
                            $("body").append('<div id="dialogError' + idMateria + '" title="Información"> ' +
                                '<div class="headerDialog"><div class="cTitulo">Restricciónes de tu proceso de matrícula</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div> </div>' +
                                '<div class="tituloMateriaError" ><h5 id="TError' + idMateria + '">' + $("#nombre" + idMateria).text() + '</h5></div>' +
                                '<div class="cuerpoError"><ul id="ulError' + idMateria + '"></ul></div>' +
                                '<div class="divfooterError"><br/><span>Coloque el cursor sobre la restricción para ver más detalles.</span></div>' +
                                '</div>');
                            //version con tooltips
                            for (var i = 0; i < listaErrores.length; i++) {
                                $("body").append('<div class="tooltipError" id="tooltipError' + listaErrores[i].ID_ERROR + '"><ul></ul></div>');
                                var idToolError = '#tooltipError' + listaErrores[i].ID_ERROR;
                                var j;
                                if (listaErrores[i].CHOQUE_HORARIOS != null) {

                                    $("#ulError" + idMateria).append('<li class="tooltip" id="' + listaErrores[i].ID_ERROR + '">' + listaErrores[i].MENSAJE_USUARIO + '</li>');
                                    $(idToolError + ' ul').empty();
                                    var arrayListos = [], materiaRev;

                                    for (j = 0; j < listaErrores[i].CHOQUE_HORARIOS.length; j++) {
                                        materiaRev = listaErrores[i].CHOQUE_HORARIOS[j].IdMateria2;
                                        if (jQuery.inArray(materiaRev, arrayListos) == -1) {
                                            arrayListos.push(materiaRev);
                                            $(idToolError + ' ul').append('<li>' + listaErrores[i].CHOQUE_HORARIOS[j].NombreMateria2 + ' (' + listaErrores[i].CHOQUE_HORARIOS[j].IdMateria2 + ') en el Grupo ' + listaErrores[i].CHOQUE_HORARIOS[j].IdGrupo2 + '</li>');
                                        }
                                    }
                                } else if (listaErrores[i].RESERVACIONES != null) {
                                    $("#ulError" + idMateria).append('<li class="tooltip" id="' + listaErrores[i].ID_ERROR + '">' + listaErrores[i].MENSAJE_USUARIO + '</li>');
                                    ;
                                    $(idToolError + ' ul').empty();
                                    for (j = 0; j < listaErrores[i].RESERVACIONES.length; j++) {
                                        if (listaErrores[i].RESERVACIONES[j].NombreSede != "") {
                                            $(idToolError + ' ul').append('<li> Sede ' + listaErrores[i].RESERVACIONES[j].NombreSede + '</li>');
                                        }
                                        if (listaErrores[i].RESERVACIONES[j].NombreDepartamento != null) {
                                            $(idToolError + ' ul').append('<li> ' + listaErrores[i].RESERVACIONES[j].NombreDepartamento + '</li>');
                                        }
                                        if (listaErrores[i].RESERVACIONES[j].IdPlan != null) {
                                            $(idToolError + ' ul').append('<li> Plan ' + listaErrores[i].RESERVACIONES[j].IdPlan + ' </li>');
                                        }
                                    }
                                } else {
                                    $("#ulError" + idMateria).append('<li class="tooltip" id="' + listaErrores[i].ID_ERROR + '">' + listaErrores[i].MENSAJE_USUARIO + '</li>');
                                    $(idToolError + ' ul').empty();
                                    $(idToolError + ' ul').append('<li>' + listaErrores[i].DESCRIPCION + '</li>');
                                }
                            }
                            activaDialog($("#dialogError" + idMateria));
                            $('#imgError' + idMateria).on("click", function () {
                                $("#dialogError" + idMateria).dialog("open");
                            }).show();
                            $("#dialogError" + idMateria).dialog("open");
                            $(".tooltipError ul").css({ marginLeft: "20px", marginRight: "20px", width: "90%" });
                            $(".tooltipError").hide();
                            $(".tooltip").mouseenter(function (e) {
                                //var x = e.pageX - this.offsetLeft;
                                //var y = e.pageY - this.offsetTop;
                                var x = $("#dialogError" + idMateria).offset().left + 300, y = e.pageY - 120, $content = $(".content"), rt = $content.outerWidth();
                                //alert("x: " + posXy.left + ", y: " + posXy.top + " , x1: " + this.offsetLeft + " , y1: " + this.offsetTop);
                                $('#tooltipError' + $(this).attr('id')).css({ marginTop: y, marginLeft: x, maxWidth: rt - x }).show();
                            }).mouseleave(function () {
                                $('#tooltipError' + $(this).attr('id')).hide();
                            });

                        }
                    }

                },
                error: function (result) {
                    AccionError(result.status);
                },
                complete: function () {
                    AccionPanelMensaje("CL", "");
                }
            });
    } else {
        AccionPanelMensaje("F", "Debe seleccionar un grupo que exista en la Guía de Horarios para poder matrícular.");
    }
}


function CancelaMatriculaOtraSede(idMateria, idGrupo) {
    $(function () {
        AccionPanelMensaje("CI", "Cancelando...");
        $.ajax(
            {
                url: "frmMatricula.aspx/CancelaOtraSede",
                data: "{idMateria: '" + idMateria + "', idGrupo:'" + idGrupo + "'}",
                dataType: "json",
                type: "POST",
                global: false,
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if ((msg.d != "false") || (msg.d != null)) {
                        AccionPanelMensaje("T", "Matrícula del curso: " + $("#nombre" + idMateria).text() + " cancelada.");
                    }
                },
                error: function (result) {
                    AccionError(result.status);
                },
                complete: function () {
                    AccionPanelMensaje("CL", "");
                }
            });
    });

}
function ConsultarCurriculumAcademico() {
    $(function () {
        $.ajax(
            {
                url: "frmMatricula.aspx/ConsultaCurriculumEstudiante",
                data: "{}",
                dataType: "json",
                type: "POST",
                global: false,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if ((msg.d != "false") && (msg.d != "NS")) {
                        var data = jQuery.parseJSON(msg.d);
                        //Carga_Cursos("NM");//remueve los cursos de la prematricula
                        CreaDialogoCurriculum(data);
                    }
                    else if (msg.d == "NS") {
                        AccionPanelMensaje("F", "No se encuentra el número de carnet por lo que no es posible obtener su historial académico.");
                    }
                    else {
                        AccionPanelMensaje("F", "No ha sido posible obtener los cursos debido a un problema de conexión con el servidor principal, por favor comuniquese con el Departamento de Admisión y Registro.");
                    }

                },
                error: function (result) {
                    AccionError(result.status);
                },
                complete: function () {
                    $('.dialogCurriculum').dialog("open");
                    AccionPanelMensaje("CL", "");
                }
            });
    });
}
function CreaDialogoCurriculum(data) {
    $(function () {
        var $dialogCurri = $('.dialogCurriculum');
        if ($dialogCurri.length) {
            $dialogCurri.dialog('destroy').remove();
        }
        //hace el append a la tabla
        $('body').append('<div class="dialogCurriculum"><div class="headerDialog"><div class="cTitulo">Historial Académico</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div></div>' +
            '<div class="cContentCurriculum"><table id="TCurri"></div>');
        var oTable = $('#TCurri').dataTable({
            "aaData": data,
            "aoColumns":
                //[
                //    { "sTitle": "Código", "sWidth": "10%", "bVisible": true, "sClass": "center", "bSortable": true },
                //    { "sTitle": "Materia", "sWidth": "30%", "bVisible": true, "bSortable": true },
                //    { "sTitle": "Grupo", "sWidth": "7%", "sClass": "center", "bVisible": true, "bSortable": true },
                //    { "sTitle": "Créditos", "sClass": "center", "sWidth": "6%", "bVisible": true, "bSortable": true },
                //    { "sTitle": "Estado", "sClass": "center", "sWidth": "15%", "bVisible": true, "bSortable": true },
                //    { "sTitle": "Nota", "sClass": "center", "bSortable": true, "sWidth": "7%", "bVisible": true },
                //    { "sTitle": "Periodo", "sClass": "center", "bSortable": true, "sWidth": "25%", "bVisible": true }
                //],
                [
                { "mDataProp": "IdMateria", "sTitle": "Código", "sWidth": "10%", "sClass": "center", "bSearchable": true, "bSortable": true },
                { "mDataProp": "NomMateria", "sTitle": "Materia", "sWidth": "34%", "bSearchable": true, "bSortable": true },
                { "mDataProp": "IdGrupo", "sTitle": "Grupo", "sWidth": "7%", "sClass": "center", "bSearchable": true, "bSortable": false },
                { "mDataProp": "CantCreditos", "sTitle": "Créditos", "sWidth": "7%", "sClass": "center", "bSearchable": true, "bSortable": true },
                { "mDataProp": "Estado", "sTitle": "Estado", "sWidth": "15%", "sClass": "center", "bSearchable": true, "bSortable": true },
                { "mDataProp": "Nota", "sTitle": "Nota", "sWidth": "7%", "sClass": "center", "bSearchable": true, "bSortable": true },
                { "mDataProp": "Periodo", "sTitle": "Periodo", "sWidth": "20%", "sClass": "center", "bSearchable": true, "bSortable": true }
                ],
            "oLanguage": {
                "sLengthMenu": " Filas: _MENU_",
                "sInfo": "Mostrando _START_ a _END_ de _TOTAL_ registros.",
                "sZeroRecords": "No se encontraron coincidencias con la busqueda.",
                "sInfoFiltered": "(filtrado de _MAX_ filas totales)",
                "sSearch": "Buscar"
            },
            "scrollY": "350px",
            "bSort": true,
            "aaSorting": [],
            "scrollCollapse": false,
            "bJQueryUI": false,
            "bAutoWidth": true,
            "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Todo"]],
            "sDom": '<"H"lfr>t<"F"ip>'
        });
        //agrega estilos a la tabla
        $("#TCurri_filter").parent().css("height", "30px").addClass("ui-state-active");
        $(".dataTables_info").parent().css("height", "40px").addClass("ui-state-active");
        //$("#TDATOS > thead >tr> th").addClass("ui-state-default");
        //esto es para reajustar las columnas debido al scrollY
        setTimeout(function () {
            oTable.fnAdjustColumnSizing();
        }, 1);

        //Activa el dialogo
        $('.dialogCurriculum').dialog({
            autoOpen: false,
            modal: true,
            show: "fade",
            hide: "fade",
            width: 900,
            height: 514,
            //minHeight: 550,
            //minWidth:800,
            draggable: false,
            resizable: false,
            //buttons: {
            //    Cerrar: function() {
            //        $(this).dialog("close");
            //    }
            //},
            close: function (event, ui) {
                $(this).dialog('destroy').remove();
            },
            resize: function (event, ui) {
                oTable.fnAdjustColumnSizing();
            }
        });
        $('.cCerrar').on("click", function () {
            $('.dialogCurriculum').dialog("close");
        }).mouseenter(function () {
            $('.imgCloseDialog').attr('src', 'images/close_over.png');
            $(this).css('color', "gray");
        }).mouseleave(function () {
            $('.imgCloseDialog').attr('src', 'images/close.png');
        });
        $(".ui-dialog-titlebar").remove();
        $('.dialogCurriculum').removeClass("ui-dialog ui-dialog-content ui-widget-content");
        //$('.dialogCurriculum').css({ height: "500px" });
        //$(".dialogCurriculum > .headerDialog").css({ height: '55px' });
        //$("#dialogConvocatorias").dialog("close");
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCIONES CITAS DE MATRICULA
//variable para activar la función N veces
var FuncCitas, FuncCitasFin, objCita;

function ConsultaCitaMatricula() {
    var res = false;
    $(function () {

        $.ajax(
            {
                url: "frmMatricula.aspx/ConsultaCitaMatricula",
                data: "{}",
                dataType: "json",
                type: "POST",
                global: false,
                async: true,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    ActivaCitaMatricula(msg.d);
                },
                error: function (result) {
                    AccionError(result.status);
                }
            });
    });
    return res;
}
//obtiene información de cita de matricula
function ConsultaInfoCitaMatricula() {
    var res = false;
    $(function () {
        AccionPanelMensaje("CI", "Cargando...");
        $.ajax(
            {
                url: "frmMatricula.aspx/ObtieneCitaMatricula",
                data: "{}",
                dataType: "json",
                type: "POST",
                global: false,
                async: true,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    objCita = jQuery.parseJSON(msg.d);
                },
                error: function (result) {
                    AccionError(result.status);
                },
                complete: function () {
                    if (objCita.ID_CITA == 0) {
                        //inhabilitar las opciones
                        clearInterval(FuncCitas);
                        clearInterval(FuncCitasFin);
                    } else {
                        // CierraMatricula();
                        FuncCitas = setInterval(ConsultaFinCita, 1000);//ejecuta la funcion hata que sea true
                    }
                    AccionPanelMensaje("CL", "");
                }
            });
    });
    return res;
}

function ActivaCitaMatricula(data) {
    if (data == "True") {//debe activar todo
        ActivaMatricula();
        if (objCita == null) {
            ConsultaInfoCitaMatricula();
        } else if (objCita.ID_CITA == 0) {
            ConsultaInfoCitaMatricula();
        } else if (objCita.ID_CITA > 0) {
            clearInterval(FuncCitas);
            clearInterval(FuncCitasFin);
        }
    } else if (data == "M") {
        CierraMatriculaMorosidad();
    }
    else {
        try {
            objCita = jQuery.parseJSON(data);
            if (objCita.ID_CITA == 0) {
                $('#lblCitaMatricula').text("No hay Cita Asignada");
                $('.divCitas').removeClass('cCitasOk cCitasNo').addClass('cCitasNA');
                $('.citaIndicador').removeClass('citaIndicadorOk citaIndicadorNo').addClass('citaIndicadorNA');
                //inhabilitar las opciones
                clearInterval(FuncCitas);
                clearInterval(FuncCitasFin);
            } else {
                CierraMatricula();
                //FuncCitas = setInterval(ConsultaCitaRec, 1000);//ejecuta la funcion hata que sea true
            }
        } catch (e) {
            AccionPanelMensaje("F", "No ha sido posible consultar su cita de matrícula, por favor consulte con el Departamento de Admisión y Registro o Consulte de nuevo más tarde.");
        }
    }
}
function ConsultaCitaRec() {
    var fechaCita = new Date(objCita.FECHA.toLocaleString()),
        fechaFinConvocatoria = new Date(objCita.FECHA_FINCONVOCATORIA.toLocaleString()),
        fechaInicioConvocatoria = new Date(objCita.FECHA_INICIOCONVOCATORIA.toLocaleString());
    if (fechaP >= fechaCita) { //revisa si la fecha del servidor es mayor que la cita
        if (objCita.VALIDA_CITADIA) { //revisa si valida día
            if ((fechaP.getDate() == fechaCita.getDate()) && (fechaP >= fechaInicioConvocatoria) && (fechaP <= fechaFinConvocatoria)) { //revisa si esta en el día
                ConsultaCitaMatricula(); //consulta en el servidor para estar más seguro
            } else {
                CierraMatricula();
            }
        } else {
            if ((fechaP >= fechaInicioConvocatoria) && (fechaP <= fechaFinConvocatoria)) {
                ConsultaCitaMatricula();
            } else {
                CierraMatricula();
            }
        }
    }
}
function ConsultaFinCita() {
    var fechaCita = new Date(objCita.FECHA.toLocaleString()), fechaFinConvocatoria = new Date(objCita.FECHA_FINCONVOCATORIA.toLocaleString());
    if (fechaP >= fechaCita) { //revisa si la fecha del servidor es mayor que la cita
        if (fechaP > fechaFinConvocatoria) {
            ConsultaCitaMatricula();
        }
    }
}
function ActivaMatricula() {
    $('#lblCitaMatricula').text("Está en su Cita de Matrícula");
    $('.divCitas').removeClass('cCitasNo cCitasNA').addClass('cCitasOk');
    $('.citaIndicador').removeClass('citaIndicadorNo citaIndicadorNA').addClass('citaIndicadorOk');
    //Activar las opciones
    $('.txtGrupoMatriculado').removeAttr('disabled');

    $('.Rowaccordion').fadeToggle(500).css("display", "none");
    $('.imgAccordion').attr('src', "images/level.png");
    $('.imgAccordion').attr('title', "Ver Grupos");
    $('#tBodyCursos tr').removeClass("tdSelected");
    clearInterval(FuncCitas);
    clearInterval(FuncCitasFin);
}
function CierraMatricula() {
    $('#lblCitaMatricula').text("No está en su Cita de Matrícula");
    $('.divCitas').removeClass('cCitasOk cCitasNA').addClass('cCitasNo');
    $('.citaIndicador').removeClass('citaIndicadorOk citaIndicadorNA').addClass('citaIndicadorNo');
    //inhabilitar las opciones
    $('.txtGrupoMatriculado').attr('disabled', 'disabled');
    ///////////////////////////
    //$('.Rowaccordion').fadeToggle(500).css("display", "none");
    $('.imgAccordion').attr('src', "images/level.png");
    $('.imgAccordion').attr('title', "Ver Grupos");
    $('#tBodyCursos tr').removeClass("tdSelected");
    /////////////////////////////////
    // $('.cImgMatriculado').attr('disabled', 'disabled');
    clearInterval(FuncCitas);
    clearInterval(FuncCitasFin);
}
function CierraMatriculaMorosidad() {
    $('#lblCitaMatricula').text("Tiene Requisitos Pendientes");
    $('.divCitas').removeClass('cCitasOk cCitasNA').addClass('cCitasNo');
    $('.citaIndicador').removeClass('citaIndicadorOk citaIndicadorNA').addClass('citaIndicadorNo');
    //inhabilitar las opciones
    $('.txtGrupoMatriculado').attr('disabled', 'disabled');
    ///////////////////////////

    //    $('.Rowaccordion').fadeToggle(500).css("display", "none");
    $('.imgAccordion').attr('src', "images/level.png");
    $('.imgAccordion').attr('title', "Ver Grupos");
    $('#tBodyCursos tr').removeClass("tdSelected");
    /////////////////////////////////
    // $('.cImgMatriculado').attr('disabled', 'disabled');
    clearInterval(FuncCitas);
    clearInterval(FuncCitasFin);
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCIONES DE HORARIOS MATRICULADOS
function AjaxCall_HorarioMatriculado() {
    $(function () {
        AccionPanelMensaje("CI", "Cargando horario...");
        $.ajax(
            {
                url: "frmMatricula.aspx/ConsultaHorarioMatriculado",
                data: "{}",
                dataType: "json",
                type: "POST",
                async: true,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if ((msg.d != "false") || (msg.d != null)) {
                        data = jQuery.parseJSON(msg.d);
                        CargaHorariosMatriculados(data);
                    } else {
                        AccionPanelMensaje("F", "No hay horarios registrados para los cursos indicados.");
                    }
                },
                error: function (result) {
                    AccionError(result.status);
                },
                complete: function () {
                    $(".dialogHorario").dialog("open");
                    AccionPanelMensaje("CL", "");
                }
            });
    });
}
function CargaHorariosMatriculados(data) {
    $(function () {
        if ($('.dialogHorario').length) {
            $('.dialogHorario').remove();
        }
        if (data != null) {
            var dataHorario = data.Horario;
            if ((dataHorario != null) && (dataHorario.length > 0)) {

                //CrearHorarioMatriculado(limHorario[1], limHorario[2], limHorario[0], periodoEstudiante);
                $('body').append('<div class="dialogHorario" title="Mi Horario - ' + data.Periodo + '">' +
                '<div class="headerDialog"><div class="cTitulo">Mi Horario - ' + data.Periodo + '</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div> </div>' +
                '</div> ');
                var ancho = (680 * $(window).width()) / 1024,
                alto = (600 * $(window).height()) / 768;
                if (ancho < 800) {
                    ancho = 800;
                }
                if (alto < 500) {
                    alto = 500;
                }
                if (alto > 700) {
                    alto = 700;
                }
                $('.ContentCalendar').css("height", alto);
                //agrega el div para el calendario
                $('.dialogHorario').append($('<div class="ContentCalendar">')
                                                .append($('<div id="calendar">'))
                                                .append($('<div class="calendarfooter">').
                                                        append($('<table>')
                                                            .append($('<tr>')
                                                                .append($('<td>'))
                                                                .append($('<td>').append($('<span id="spNombreHorario">').html("Seleccione un curso para ver el grupo")))))));

                //Crea arreglo eventos
                var cursosObj = [], finSemana = false, horaMin = moment('23:00', 'HH:mm'), estadoMinimo = false, sinHorario = '';
                for (var a = 0; a < dataHorario.length; a++) {
                    if (dataHorario[a].Itinerario != null) {
                        //DICTAMINA LOS BLOQUES
                        if ((moment(dataHorario[a].Itinerario.Inicio, 'HH:mm') < moment('07:00', 'HH:mm'))
                            && (moment(dataHorario[a].Itinerario.Inicio, 'HH:mm') < horaMin)) {
                            horaMin = moment('00:00', 'HH:mm');
                        } else if ((moment(dataHorario[a].Itinerario.Inicio, 'HH:mm') >= moment('07:00', 'HH:mm'))
                            && (moment(dataHorario[a].Itinerario.Inicio, 'HH:mm') < moment('12:00', 'HH:mm'))
                            && (moment(dataHorario[a].Itinerario.Inicio, 'HH:mm') < horaMin)) {
                            horaMin = moment('07:00', 'HH:mm');
                        } else if ((moment(dataHorario[a].Itinerario.Inicio, 'HH:mm') >= moment('12:00', 'HH:mm'))
                            && (moment(dataHorario[a].Itinerario.Inicio, 'HH:mm') < moment('18:00', 'HH:mm'))
                            && (moment(dataHorario[a].Itinerario.Inicio, 'HH:mm') < horaMin)) {
                            horaMin = moment('12:00', 'HH:mm');
                        } else if ((moment(dataHorario[a].Itinerario.Inicio, 'HH:mm') >= moment('18:00', 'HH:mm'))
                            && (moment(dataHorario[a].Itinerario.Inicio, 'HH:mm') < horaMin)) {
                            horaMin = moment('17:00', 'HH:mm');
                        }
                        if ((dataHorario[a].Itinerario.Dia == '6') || (dataHorario[a].Itinerario.Dia == '7')) {
                            finSemana = true;
                        }
                        //crea los eventos
                        var evento = {};
                        evento["id"] = dataHorario[a].IdMateria + '_' + dataHorario[a].IdGrupo;
                        evento["title"] = dataHorario[a].NomMateria;
                        evento["description"] = 'Aula ' + dataHorario[a].Itinerario.Edificio + '-' + dataHorario[a].Itinerario.Aula;
                        evento["start"] = ObtienefechaPorDia(parseInt(dataHorario[a].Itinerario.Dia), dataHorario[a].Itinerario.Inicio);
                        evento["end"] = ObtienefechaPorDia(parseInt(dataHorario[a].Itinerario.Dia), dataHorario[a].Itinerario.Fin);
                        evento["backgroundColor"] = 'rgb(177,177,177)';
                        evento["borderColor"] = 'rgb(128, 128, 128)';
                        evento["textColor"] = 'rgb(255,255,255)';
                        cursosObj.push(evento);
                    }
                    else {
                        sinHorario += "<span>" + dataHorario[a].NomMateria + " (Grupo: " + dataHorario[a].IdGrupo + ")</span>";
                    }
                }
                //inicializa el calendario
                $('#calendar').fullCalendar({
                    height: alto - 200,
                    weekends: finSemana,
                    lang: 'es',
                    defaultView: 'agendaWeek',
                    header: false,
                    columnFormat: 'dddd',
                    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
                    , allDaySlot: false
                    , scrollTime: '07:00:00'
                    , axisFormat: 'HH:mm'
                    , minTime: horaMin
                    , events: cursosObj,
                    eventClick: function (calEvent, jsEvent, view) {
                        var id = calEvent.id;
                        SeleccionaEventoHorario(id);
                    },
                    eventRender: function (event, element) {
                        element.find('.fc-title').append($('<span>').html(event.description));
                    }
                });

                //crea el dialogo
                $(".dialogHorario").dialog({
                    autoOpen: true,
                    modal: true,
                    show: "fade",
                    hide: "fade",
                    width: ancho,
                    height: alto,
                    draggable: false,
                    resizable: false,
                    buttons: {
                        //"Informe de Matrícula": function () {
                        //    if ($('.dialogInforme').length > 0) {
                        //        GeneraInforme("E");
                        //    } else {
                        //        CreaDialogVisualizarInforme();
                        //        GeneraInforme("E");
                        //    }
                        //    $(this).dialog('close');
                        //},
                        //"Descargar PDF": function () {

                        //},
                        Cerrar: function () {
                            //EnviaHorario();
                            $(this).dialog("close");
                        }
                    },
                    close: function (event, ui) {
                        $(this).dialog('destroy').remove();
                        $('#divSinHorario').remove();
                    }
                });
                $('.cCerrar').on("click", function () {

                    var $parent = $(this).parent().parent();

                    $parent.dialog("close");

                }).mouseenter(function () {
                    $('.imgCloseDialog').attr('src', 'images/close_over.png');
                    $(this).css('color', "gray");
                }).mouseleave(function () {
                    $('.imgCloseDialog').attr('src', 'images/close.png');
                });
                $(".dialogHorario").removeClass("ui-dialog ui-dialog-content ui-widget-content");
                $('.dialogHorario > .headerDialog').css({ height: '30px' });
                $(".ui-dialog-titlebar").remove();
                if (sinHorario != '') {
                    $(' .ui-dialog-buttonpane').append($('<div id="divSinHorario">')
                        .html('<span id="spTitSinhorario">Cursos matriculados sin horario asignado por la Escuela:</span>')
                        .append($('<div>').html(sinHorario)));
                }
            }
            else {
                AccionPanelMensaje("F", "Usted no tiene cursos matriculados para este periodo.");
            }
        } else {
            AccionPanelMensaje("F", "Ocurrio un error al conectar con el servidor principal, Por favor comuniquese con Admisión y Registro.");
        }
    });
}

function SeleccionaEventoHorario(id) {

    var eventsFil = new Array();
    var eventsAll = new Array();
    eventsAll = $('#calendar').fullCalendar('clientEvents');
    eventsFil = $('#calendar').fullCalendar('clientEvents', id);
    //cambia los colores para mostrar los desmarcados
    if (eventsAll.length > 0) {
        for (var e in eventsAll) {
            //marca el evento seleccionado
            eventsAll[e].backgroundColor = 'rgb(177,177,177)';
            eventsAll[e].borderColor = 'rgb(128, 128, 128)';
            $('#calendar').fullCalendar('updateEvent', eventsAll[e]);
        }
    }

    if (eventsFil.length > 0) {
        for (var e in eventsFil) {
            //marca el evento seleccionado
            eventsFil[e].backgroundColor = 'rgb(0,113,186)';
            eventsFil[e].borderColor = 'rgb(0,113,186)';
            $('#calendar').fullCalendar('updateEvent', eventsFil[e]);
        }

        var Grupo = id.split('_')[1];
        //agrega el nombre al div de abajo
        $('#spNombreHorario').text(eventsFil[0].title + '  •  Grupo ' + Grupo);
        $('.calendarfooter  table tr:first-child td:nth-child(2)').css('background-color', 'rgb(0,113,186)');
    }


}


function ObtienefechaPorDia(index_nuevo, hora) {
    var fecha_hoy = new Date(),
            fecha_mes = fecha_hoy.getMonth() + 1,
            fecha_ano = fecha_hoy.getFullYear(),
            fecha_dia = fecha_hoy.getDate(),
            index_dia = fecha_hoy.getDay();

    if (index_dia > index_nuevo) {
        fecha_dia = fecha_dia + index_nuevo - index_dia;
    } else if (index_dia < index_nuevo) {
        fecha_dia = fecha_dia + index_nuevo - index_dia;
    }
    var max_dias = new Date(fecha_ano, fecha_mes, 0).getDate();
    if (fecha_dia > max_dias) {
        fecha_dia = fecha_dia - max_dias;
        fecha_mes = fecha_mes + 1;
        if (fecha_mes > 12) {
            fecha_ano = fecha_ano + 1;
            fecha_mes = 1;
        }
    }
    else if (fecha_dia < 1) {
        if (fecha_mes < 1) {
            fecha_ano = fecha_ano - 1;
            fecha_mes = 12;
        }
        max_dias = new Date(fecha_ano, fecha_mes - 1, 0).getDate();
        if (fecha_dia < 0) {
            fecha_dia = fecha_dia * -1;
        }
        fecha_dia = max_dias - fecha_dia;
        fecha_mes = fecha_mes - 1;

    }
    var fecha = fecha_mes + '/' + fecha_dia + '/' + fecha_ano + ' ' + hora
    return new Date(fecha);
}



function GetLimiteHorario(data1) {
    var diaMax = 5, horaMin = 23, horaMax = 0, limHorario = new Array();
    if (data1 != null) {
        for (var indexDiaMin = 0; indexDiaMin < data1.length; indexDiaMin++) {
            if (data1[indexDiaMin].Itinerario != null) {
                if (data1[indexDiaMin].Itinerario.Dia > diaMax) {
                    diaMax = data1[indexDiaMin].Itinerario.Dia;
                }
                var itineriarioIni = data1[indexDiaMin].Itinerario.Inicio.split(":");
                if (itineriarioIni[0] < horaMin) {
                    horaMin = itineriarioIni[0];
                }
                var itineriarioFin = data1[indexDiaMin].Itinerario.Fin.split(":");
                if (itineriarioFin[0] > horaMax) {
                    horaMax = itineriarioFin[0];
                }
            }
        }
        limHorario[0] = diaMax;
        limHorario[1] = horaMin;
        limHorario[2] = horaMax;
        return limHorario;
    } else {
        return null;
    }
}
function CrearHorarioMatriculado(horaInicial, horaFinal, diaMax, periodoEstudiante) {

    // CrearGridHorario(horaInicial, horaFinal, 20, diaMax);
}
//función que crea la tabla de horarios.
function CrearGridHorario(horaInicio, horaFin, anchoMin, diaMax) {
    var $tabla = $('.table_Horario_matriculado');
    $tabla.append("<thead><tr class='tHeader'></tr></thead><tbody class='tablaCuerpo'></tbody>");
    var $encabezado = $('.tHeader');
    if (diaMax == 6) {
        $encabezado.append('<th width="9%" ><th width="9px"> <th class="headerDias">Lunes</th> <th class="headerDias">Martes</th><th class="headerDias">Miércoles</th><th class="headerDias">Jueves</th><th class="headerDias">Viernes</th> <th class="headerDias">Sábado</th>');
        $('.headerDias').css("width", "15%");
    } else {
        $encabezado.append('<th width="9%" ><th width="9px">  <th class="headerDias">Lunes</th> <th class="headerDias">Martes</th><th class="headerDias">Miércoles</th><th class="headerDias">Jueves</th><th class="headerDias">Viernes</th>');
        $('.headerDias').css("width", "18%");
    }
    CrearCeldaTiempo(horaInicio, horaFin, anchoMin); //Crea la columna de horas
    var $cuerpo = $('.tablaCuerpo');
    for (var i = parseInt(horaInicio) ; i <= parseInt(horaFin) ; i++) {
        for (var min = 0; min < 60; min += anchoMin) { //crea  filas de anchoMin
            if (min == 0) {
                //agrega la fila hora con min:00 y con la clase horas
                $cuerpo.append('<tr id="fila_' + i + min + '" class="clases"> <td class="Titulo_horas" > </td> </tr>');
                for (var j = 1; j <= diaMax; j++) {
                    //agrega las celdas de la hora en cada día
                    $("#fila_" + i + min).append('<td id="d_' + j + "_" + i + "_" + min + '"class="horas" > </td>');
                }
            } else {
                //agrega la fila hora con min:00 y con la clase horas
                $cuerpo.append('<tr id="fila_' + i + min + '" class="clases"> <td class="Titulo_minutos" > </td> </tr>');
                for (var k = 1; k <= diaMax; k++) {
                    //agrega las celdas de la hora en cada día
                    $("#fila_" + i + min).append('<td id="d_' + k + "_" + i + "_" + min + '"class="minutos" > </td>');
                }
            }
        }
    }
    if (diaMax == 6) {
        $('.horas').css("width", "17%");
        $('.minutos').css("width", "15%");
    }
}
function CrearCeldaTiempo(horaInicio, horaFin, minutos) {
    $('.tablaCuerpo').append('<div id = "DivColumTiempo" class="DivColumTiempo"> </div>');
    var hora;
    var $Tiempo = $('#DivColumTiempo');
    for (var i = horaInicio; i <= horaFin; i++) {
        if (i.toString().length == "1") {
            hora = "0" + i.toString();
        } else {
            hora = i.toString();
        }
        for (var min = 0; min < 60; min += minutos) {
            if (min == 0) {
                $Tiempo.append('<div class="DivCeldaHora" > <label class="LBHora"> ' + hora + ':00' + '</label></div>');
            } else {
                $Tiempo.append('<div class="DivCeldaMinuto" > <label class="LBMin"> ' + hora + ':' + min + '</label> </div>');
            }
        }
    }
}
function PintarBloqueLeccion(dia, horaIncio, minInicio, horaFin, minFin, nomCurso, grupo, edificio, aula, idBloqueLecc, sumAnchos) {
    var $Leccion = $('.tablaCuerpo');
    $Leccion.append('<div id="' + idBloqueLecc + '" class="boxBloqueLeccion"><label class="LBNomCurso"> ' + nomCurso + '</label> <label class="LBGrupAula"> ' + "Grupo: " + grupo + " - " + edificio + "-" + aula + '</label>  </div>');
    var posicionCoordInic = BuscarHoraInicio(dia, horaIncio, minInicio),
    posicionCoordFin = BuscarHoraFinal(dia, horaFin, minFin),
    desnivelInic = parseInt(posicionCoordInic[1].toString()), //diferencia de los minutos iniciales
    desnivelFinal = parseInt(posicionCoordFin[1].toString()), //diferencia de los minutos iniciales
    altoBodyTable = parseInt($("#DivColumTiempo").css('height').replace("px", "")), //alto de la columna del tiempo, alto real del tbody
    altoHeadTable = parseInt($('.tHeader').css('height').replace("px", "")) + parseInt($('.tablaCuerpo').css('padding-top').replace("px", "")), //ancho thead + paddin-top tbody
    xTop = parseInt(posicionCoordInic[2].toString()) - (altoBodyTable + altoHeadTable) + parseInt(desnivelInic), //posición top negativa para el div-relative en el tbody + diferencia de minutos
    xLeft = parseInt(posicionCoordInic[3].toString()) - sumAnchos,
    xWidth = parseInt(posicionCoordInic[4].toString()), //ancho del objeto inicial
    yTop = parseInt(posicionCoordFin[2].toString()) - (altoBodyTable + altoHeadTable) + desnivelFinal, //posición top negativa para el div-relative en el tbody
    xHeight = yTop - xTop - parseInt($("#" + posicionCoordInic[0].toString()).css('padding-top').replace("px", "")) - desnivelFinal;
    $("#" + idBloqueLecc).css({ "top": xTop, "left": xLeft, "width": xWidth, "height": xHeight });
    sumAnchos = sumAnchos + xWidth;
    return sumAnchos;
}
function BuscarHoraInicio(dia, horaIncio, minInicio) {
    var posicion = new Array(), idObj, topObjInicial = 0, desnivel = 0;
    idObj = "d_" + dia + "_" + parseInt(horaIncio) + "_";
    if (minInicio == 0) {
        idObj = idObj + "0";
        desnivel = minInicio;
        topObjInicial = parseInt($("#" + idObj).position().top);
    } else if ((minInicio > 0) && (minInicio < 20)) {
        idObj = idObj + "0";
        desnivel = minInicio;
        topObjInicial = parseInt($("#" + idObj).position().top);
    } else if (minInicio == 20) {
        idObj = idObj + "20";
        topObjInicial = parseInt($("#" + idObj).position().top);
    } else if ((minInicio > 20) && (minInicio < 40)) {
        idObj = idObj + "20";
        desnivel = minInicio - 20;
        topObjInicial = parseInt($("#" + idObj).position().top);
    } else if (minInicio == 40) {
        idObj = idObj + "40";
        topObjInicial = parseInt($("#" + idObj).position().top);
    } else if ((minInicio > 40) && (minInicio < 60)) {
        idObj = idObj + "40";
        desnivel = minInicio - 40;
        topObjInicial = parseInt($("#" + idObj).position().top);
    }
    if (desnivel != 0) {
        desnivel = (((parseInt($("#" + idObj).css('height').replace("px", ""))) + parseInt($("#" + idObj).css('padding-top').replace("px", ""))) * desnivel / 20);
    }
    posicion[0] = idObj;
    posicion[1] = desnivel.toString();
    posicion[2] = topObjInicial;
    posicion[3] = parseInt($("#" + idObj).position().left);
    posicion[4] = parseInt($("#" + idObj).width()) + parseInt($("#" + idObj).css('padding-right').replace("px", "")) + parseInt($("#" + idObj).css('padding-left').replace("px", ""));
    return posicion;
}
function BuscarHoraFinal(dia, horaFin, minFin) {

    var posicion = new Array();

    var idObj;

    var desnivel = 0;

    var topObjFinal = 0;

    idObj = "d_" + dia + "_" + parseInt(horaFin) + "_";

    if (minFin == 0) {

        idObj = idObj + "0";

        desnivel = minFin;

        topObjFinal = parseInt($("#" + idObj).position().top);

    }

    else if ((minFin > 0) && (minFin < 20)) {

        idObj = idObj + "0";

        topObjFinal = ((parseInt(((parseInt($("#" + idObj).css('height').replace("px", ""))) * (minFin) / 20))) + parseInt($("#" + idObj).css('padding-top').replace("px", "")));

        topObjFinal = topObjFinal + parseInt($("#" + idObj).position().top);

        desnivel = minFin;

    }

    else if (minFin == 20) {

        idObj = idObj + "20";

        desnivel = minFin - 20;

        topObjFinal = parseInt($("#" + idObj).position().top);

    }

    else if ((minFin > 20) && (minFin < 40)) {

        idObj = idObj + "20";

        desnivel = minFin - 20;

        topObjFinal = ((parseInt(((parseInt($("#" + idObj).css('height').replace("px", ""))) * (minFin - 20) / 20))) + parseInt($("#" + idObj).css('padding-top').replace("px", "")));

        topObjFinal = topObjFinal + parseInt($("#" + idObj).position().top);

    }

    else if (minFin == 40) {

        idObj = idObj + "40";

        desnivel = 0;

        topObjFinal = parseInt($("#" + idObj).position().top);

    }

    else if ((minFin > 40) && (minFin < 60)) {

        idObj = idObj + "40";

        topObjFinal = ((parseInt(((parseInt($("#" + idObj).css('height').replace("px", ""))) * (minFin - 40) / 20))) + parseInt($("#" + idObj).css('padding-top').replace("px", "")));

        topObjFinal = topObjFinal + parseInt($("#" + idObj).position().top);

        desnivel = minFin - 40;

    }

    if (desnivel != 0) {

        desnivel = (((parseInt($("#" + idObj).css('height').replace("px", ""))) + parseInt($("#" + idObj).css('padding-top').replace("px", ""))) * desnivel / 20);

    }

    //posicion[0] = Objeto Id

    //posicion[1] = Desnivel de minutos

    //posicion[2] = Top

    //posicion[3] = Left

    //posicion[4] = Width - (paddin-left + padding-right)

    posicion[0] = idObj;

    posicion[1] = desnivel.toString();

    posicion[2] = parseInt(topObjFinal) - parseInt($("#" + idObj).css('padding-top').replace("px", ""));

    return posicion;

}

////////////////////////////////////////////////////////////////////////////////////////////////////FUNCIONES PARA LA VISUALIZACION DEL INFORME

//FUNCIONES PARA EL CAMBIO DE CONTRASEÑA
function ValidaCambioPassword() {
    activaDialogPassword();
    $('.spTituloCambioPwd').text("Es necesario que cambies tu contraseña.");
}
function activaDialogPassword() {
    if ($('#dialogCambioPassword').length) {
        $('#dialogCambioPassword').remove();
    }
    //crea el html
    $("body").append('<div id="dialogCambioPassword"><div class="headerDialog"><div class="cTitulo">Cambio de Contraseña</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div></div>' +
        '<div class="cuerpoDialogPassword"><span class="spTituloCambioPwd"></span><input id="txtPwdOld" type="password" placeholder="Contraseña Anterior" /><input id="txtPwdNew" type="password" placeholder="Nueva Contraseña" />' +
        '<input id="txtPwdVerificada" type="password" placeholder="Repetir Nueva Contraseña" /><div class="divPassFortaleza"><span>Fortaleza:</span><br /><div class="progressbarPassword"></div>' +
        '<span class="_porcPass" style="float: right; font-weight: bold; font-size: xx-small;color: Blue;">0%</span> <span style="float: left; font-weight: bold; font-size: x-small;color: Red;">Débil</span>' +
        '<span style="float: right; font-weight: bold; font-size: x-small;color: Black;">Fuerte</span></div></div></div>');
    //activa el dialogo
    $('#dialogCambioPassword').dialog({
        autoOpen: true,
        modal: true,
        show: "fade",
        hide: "fade",
        width: 700,
        height: 450,
        draggable: false,
        resizable: false,
        buttons: {
            Actualizar: function () {
                ActualizarPassword();
            },
            Cerrar: function () {
                $(this).dialog("close");

            }
        }
    });
    $('#dialogCambioPassword').removeClass("ui-dialog ui-dialog-content ui-widget-content");
    // $('#dialogCambioPassword > .headerDialog').css({ height: '15%' });
    $(".ui-dialog-titlebar").remove();
    $('.cCerrar').on("click", function () {
        var $parent = $(this).parent().parent();
        $parent.dialog("close");
    }).mouseenter(function () {
        $('.imgCloseDialog').attr('src', 'images/close_over.png');
        $(this).css('color', "gray");
    }).mouseleave(function () {
        $('.imgCloseDialog').attr('src', 'images/close.png');
    });
    ActivaEventoPassword();
}
function ActualizarPassword() {
    var pwdOld = $('#txtPwdOld').val(), pwdNew = $("#txtPwdNew").val(), pwdVer = $("#txtPwdVerificada").val();
    if ((pwdOld != "") && (pwdNew != "") && (pwdVer != "")) {
        if (pwdNew != pwdVer) {
            AccionPanelMensaje("F", "La contraseña nueva y de verificación no coinciden.");
            $("#txtPwdNew, #txtPwdVerificada").css("border-color", "red");
        } else {
            $("#txtPwdNew, #txtPwdVerificada, #txtPwdOld").css("border-color", "none");
            AccionPanelMensaje("CI", "Actualizando su nueva contaseña...");
            $.ajax(
                {
                    url: "Default.aspx/CambioContrasena",
                    data: "{passwordOld: '" + pwdOld + "', passwordNew: '" + pwdNew + "'}",
                    dataType: "json",
                    type: "POST",
                    async: true,
                    global: false,
                    contentType: "application/json; charset=utf-8",
                    success: function (msg) {
                        if (msg.d == "True") {
                            $('#dialogCambioPassword').dialog("close");
                            AccionPanelMensaje("T", "Se ha modificado la contraseña correctamente.");
                        } else if (msg.d == "False") {
                            AccionPanelMensaje("F", "No ha sido posible modificar su contraseña debido a un problema con el envío de correos.");
                        } else {
                            AccionPanelMensaje("F", msg.d);
                        }
                    },
                    error: function (result) {
                        AccionError(result.status);
                    },
                    complete: function () {
                        AccionPanelMensaje("CL", "");
                    }
                });
        }
    } else {
        $("#txtPwdNew, #txtPwdVerificada, #txtPwdOld").css("border-color", "red");
        AccionPanelMensaje("F", "Es necesario completar los tres campos para realizar el cambio de contraseña.");
    }

}

//PASAR DE CSS A STYLES
function css(a) {
    var sheets = document.styleSheets, o = {};
    for (var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var r in rules) {
            if (a.is(rules[r].selectorText)) {
                o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
            }
        }
    }
    return o;
}
function css2json(css) {
    var s = {};
    if (!css) return s;
    if (css instanceof CSSStyleDeclaration) {
        for (var i in css) {
            if ((css[i]).toLowerCase) {
                s[(css[i]).toLowerCase()] = (css[css[i]]);
            }
        }
    } else if (typeof css == "string") {
        css = css.split("; ");
        for (var i in css) {
            var l = css[i].split(": ");
            s[l[0].toLowerCase()] = (l[1]);
        }
    }
    return s;
}
function cssChildren(obj) {
    obj.children().each(function (i, $val) {
        $val.inlineCSS();
        cssChildren($val);
    });
}
function EnviaHorario() {
    //cssChildren($(".ContenedorCuadricula"));
    $(".ContenedorCuadricula").inlineCSS();
    //var horario = $(".ContenedorCuadricula").html();
    //$(function () {
    //    $.ajax(
    //        {
    //            url: "frmInformeMatricula.aspx/EnviaHorario",
    //            data: "{data: '" + horario + "'}",
    //            dataType: "json",
    //            type: "POST",
    //            contentType: "application/json; charset=utf-8",
    //            success: function (msg) {
    //                alert(msg.d);
    //                //if (msg.d != "false") {
    //                //    var data = jQuery.parseJSON(msg.d);
    //                //    CargaInformacionInforme(data);
    //                //}
    //            },
    //            error: function (result) {
    //                if (result.status != '401') {
    //                    $(".dialogo-texto").text("Ocurrio un error al conectar con el servidor, error (" + result.status + ").");
    //                    $(".dialogo-resultado").dialog("open");
    //                } else {
    //                    window.location = "./frmAutenticacion.aspx";
    //                }
    //            }
    //        });
    //});
}



//funciones para activar resumen de matricula

//function ActivaDialogResumenMatricula() {
//    $("#divResumenMatricula").dialog("open");
//    return false;
//}