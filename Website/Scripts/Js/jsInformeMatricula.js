$(function () {
    $('.dFiltroInforme input[type="button"]').on('click', function () {
        var idBtn = $(this).attr("id");
        switch (idBtn) {
            case 'Gen':
                GeneraInforme("F");
                break;
            case 'Env':
                EnviaInforme();
                break;
            default:
                break;

        }
        
    });

    $('#inCarnet').blur(function () {
        var value = $(this).val();    
        if(value!="") {
            AjaxCallAnnosEstudiante(value, $("#selecAno"));
        }
    });
    $("#selecAno").change(function () {
        var valAno = $(this).find(":selected").text(), value = $('#inCarnet').val();
        AjaxCallModalidadEstudiante(value, valAno, $('#selModPer'));
    });
    $("#selecAno").hide();
    $('#selModPer').hide();
});

function AjaxCallAnnosEstudiante(idEstudiante, $selector) {
    $(function () {
        $.ajax(
            {
                url: "frmInformeMatricula.aspx/ObtieneAnos",
                data: "{idEstudiante: '" + idEstudiante + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if (msg.d != "false") {
                        var data = jQuery.parseJSON(msg.d);
                        CargaAnos(data);
                        $selector.change();
                    }
                },
                error: function (result) {
                    AccionError(result.status);
                }
            });
    });
}
function AjaxCallModalidadEstudiante(idEstudiante, idAnno, $selector) {
    $(function () {
        $.ajax(
            {
                url: "frmInformeMatricula.aspx/ObtienePerMod",
                data: "{idEstudiante: '" + idEstudiante + "', idAno:'" + idAnno + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if (msg.d == "NE") {
                        $(".dialogo-texto").text("El estudiante no se encuentra registrado.");
                        $(".dialogo-resultado").dialog("open");
                    } else if (msg.d == "false") {
                        $(".dialogo-texto").text("Ha ocurrido un error al conectar al servidor.");
                        $(".dialogo-resultado").dialog("open");
                    } else {
                        var data = jQuery.parseJSON(msg.d);
                        CargaPerMod(data);
                    }

                },
                error: function (result) {
                    AccionError(result.status);

                }
            });
    });
}
function CreaDialogVisualizarInforme() {
    $('body').append('<div class="dialogInforme" title="Informe de Matrícula">' +
        '<div class="headerDialog"><div class="cTitulo">Informe de Matrícula</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div> </div>' +
        '<div class="Informe"><div class="cuerpoInforme" style="font-family: helvetica;font-size: 10pt;max-width: 1280px;min-width: 920px;"></div></div></div>');
    //Activa el dialogo
    $(".dialogInforme").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: "fade",
        width: 950,
        height: 600,
        draggable: true,
        resizable: false,
        buttons: {
            //Cambiar: {
            //    text: 'Buscar Informe',
            //    class: 'btn_CambiaInforme',
            //    click: function () {
            //        if ($('#diagCambiaInforme').length==0) {
            //            $("body").append($("<div id='diagCambiaInforme'>").append($('<div class="headerDialog gradient">').append($('<div class="cTitulo">').html('Selecciona un Periodo')))
            //                .append($('<div id="informeModalidad">')
            //                    .append($('<table>')
            //                        .append($("<tr>").append($('<td>').html("Año")).append($('<td>').html($('<select id="selAnnoInforme">'))))
            //                        .append($("<tr>").append($('<td>').html("Modalidad")).append($('<td>').html($('<select id="selModalidadInforme">'))))
            //                        //.append($("<tr>").append($('<td colspan="2">').html($('<input type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" style="width: 80px;" value="Aplicar">'))))
            //                    )));

            //            $("#diagCambiaInforme .headerDialog").css("height", "40px");
            //            $("#diagCambiaInforme .cTitulo").css("font-size", "18px");
            //            $("#diagCambiaInforme").hide();
            //            $("#diagCambiaInforme").css({ "left": $(".btn_CambiaInforme").offset().left -50, "top": $(".btn_CambiaInforme").position().top - 150})
            //                .addClass("arrow");
            //            CargaCombosInforme();
            //        }
            //        $('#diagCambiaInforme').toggle("drop");
            //    }
            //},
            Enviar: function() {
                    AccionPanelMensaje("CI", "Enviado...");
                    EnviaInforme();
                    $(this).dialog('close');
            },
            //'Descargar PDF' : function () {
            //    AccionPanelMensaje("CI", "Generando archivo PDF...");
            //    GeneraPDFInforme();
            //    $(this).dialog('close');
            //},
            Cerrar: function() {
                $(this).dialog("close");

            }
        },
        close: function(event, ui) {
            $(this).dialog('destroy').remove();
            $('#diagCambiaInforme').remove();
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
    $(".dialogInforme").removeClass("ui-dialog ui-dialog-content ui-widget-content");
    $(".ui-dialog-titlebar").remove();
    $('.btn_CambiaInforme').css({ marginRight: '600px' });
}

function CargaCombosInforme() {
    $('#selAnnoInforme').append($('<option>').html('2014'));
    $('#selModalidadInforme').append($('<option>').html('1 Semestre'));
}

function GeneraPDFInforme() {
    //var img;
    //$(function () {
    //    var ele = $(".cuerpoInforme");
    //    //El html2canvas toma el elemento en pantalla y lo transforma en una imagen tipo canvas
    //    html2canvas(ele, {
    //        //onrendered, renderiza la imagen tipo canvas
    //        onrendered: function (canvas) {
    //            img = canvas.toDataURL()
    //            window.open(img);
               
    //        }
    //    });


        $('body').append($('<div id="editor">'));

    var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('.cuerpoInforme');

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#editor': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top, { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
    },

    function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.save('InformeMatricula.pdf');
    }, margins);
        $('#editor').remove();

  
}

function EnviaInforme() {
    var htmlInforme = $('.cuerpoInforme').html();
    $(function () {
        $.ajax(
            {
                url: "frmInformeMatricula.aspx/EnviaInforme",
                data: "{htmlInforme: '" + htmlInforme + "'}",
                dataType: "json",
                type: "POST",
                async: true,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if (msg.d != "False") {
                        AccionPanelMensaje("T", "El informe ha sido enviado al correo electrónico: " + msg.d);
                    }
                    else {
                        AccionPanelMensaje("F", "No ha sido posible enviar el informe de matrícula debido a un problema con el envío de correos.");
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
function GeneraInforme(tipo) {
    var idEstudiante = "",
    idAno = "",
    vModPer = "",
    topeCursos = "",
    topeCursosLetras = "";
    if (tipo == "F") {
        idEstudiante = $('#inCarnet').val(),
        idAno = $('#selecAno').find(":selected").text(),
        vModPer = $('#selModPer').find(":selected").val().split('_');
        topeCursos = $('#seltopeCursos').find(":selected").text(),
        topeCursosLetras = $('#seltopeCursos').find(":selected").val();
    } else if (tipo == "EF") {
        idAno = $('#selecAno').find(":selected").text(),
        vModPer = $('#selModPer').find(":selected").val().split('_');
        topeCursos = $('#seltopeCursos').find(":selected").text(),
        topeCursosLetras = $('#seltopeCursos').find(":selected").val();
    } else if (tipo == "E") {
        topeCursos = "5";
        topeCursosLetras = "Cinco";
    }
    $(function () {
        //tipoAjax = 1;
        AccionPanelMensaje("CI", "Generando Informe de Matrícula...");
        $.ajax(
            {
                url: "frmInformeMatricula.aspx/GeneraInforme",
                data: "{idEstudiante: '" + idEstudiante + "', idAno: '" + idAno + "', idModalidad: '" + vModPer[1] + "',idPeriodo: '" + vModPer[0] + "',tipo:'" + tipo + "', topeCursos:'" + topeCursos + "'}",
                dataType: "json",
                type: "POST",
                async:true,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if (msg.d != "false") {
                        if (msg.d == 'ModH') {
                            AccionPanelMensaje("T", "Informe no disponible para Matrículas de Centro de Formación Humanistica.");
                        } else {

                            var data = jQuery.parseJSON(msg.d);
                            if (data.objInformeG == null) {
                                AccionPanelMensaje("F", "No es posible generar el informe debido a un problema técnico.");
                            }
                            else {
                                if (data.objInformeG.DetalleMaterias == null) {
                                    AccionPanelMensaje("F", "No se encuentran cursos matriculados para el periodo seleccionado.");
                                } else {
                                    CargaInformacionInforme(data.objInfoPersonal, data.objInformeG.DetalleMaterias, data.objInformeG.DetallePago, data.objInformeG.DetalleHistorico, data.ListInfoSituacionMateria, data.ListInfoModalidad, data.ListInfoGradoAcademico, data.ListLeyenda, data.idPeriodo, data.idAno, topeCursosLetras);
                                }
                            }
                        }
                    } else {
                        AccionPanelMensaje("F", "No ha sido posible generar el informe, consulte con el Departamento de Admisión y Registro");
                        //$(".cuerpoInforme").html($("<span>").html("No ha sido posible generar el informe, consulte con el Departamento de Admisión y Registro"));
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


function isOdd(num) { return num % 2;}


function CargaInformacionInforme(objInfoEstudiante, objDetalleMateriasInforme, objDeslocePago, objCursosCursadosInforme, objSituacion, objModalidad, objGrado, objLeyenda, idPeriodo, idAno, cantMaterias) {
    if ((objInfoEstudiante != null) && (objDetalleMateriasInforme!= null)) {
        $(".cuerpoInforme").empty().html("<table id='theader' style='width: 100%; margin: 0 auto 0 auto;   border-spacing: 0;'>")
            .append("<table id='tCursosM' style='width: 100%; margin: 15px auto 0 auto;border-spacing: 0;'>")
            .append("<table id='tFactura' style='width: 48%; max-width: 620px; margin: 20px auto 0 auto;   border-spacing: 0; float: right;'>");

        //MODIFICA FORMATO MONTOS
        // var totalPago = parseFloat(objDeslocePago.CostoTotal.replace(',', '.').replace(' ', '')).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

        //carga el encabezado
        var tbody = $("<tbody>")
            .append($("<tr style='height: 50px;'>")
                .append($("<td style='width: 70%; text-align: left;font-size: 20pt; color:rgb(0, 67, 121)' colspan='3'>").html("<span style='font-weight: bold;'>Informe de Matrícula</span>"))
                .append($("<td style='width: 30%; text-align: right;' colspan='4'>").html("<img alt='LogoTEC' src='http://www.tec.ac.cr/sites/default/files/media/branding/logo-tec.png' style='width: 150px;height: 79px;'>")))
            .append($("<tr style='height: 25px;'>")
                .append($("<td style='text-align: center; width: 12%; background-color: rgb(139, 163, 189); color: white;border-right: 1px solid rgb(255,255,255);'>").html("<span>Carné</span>"))
                .append($("<td style='text-align: left; width: 30%; background-color: rgb(139, 163, 189); color: white;border-right: 1px solid rgb(255,255,255);'>").html("<span style='margin-left: 5px;'>Nombre del estudiante</span>"))
                .append($("<td style='text-align: center; width: 15%; background-color: rgb(139, 163, 189); color: white;border-right: 1px solid rgb(255,255,255);'>").html("<span>Identificación</span>"))
                .append($("<td style='text-align: left; background-color: rgb(139, 163, 189); color: white;border-right: 1px solid rgb(255,255,255);' colspan='4' >").html("<span style='margin-left: 5px;'>Carrera</span>")))
            .append($("<tr style='height: 30px;'>")
                .append($("<td style='text-align: center; '>").html(objInfoEstudiante.IdCarne))
                .append($("<td style='text-align: left;'>").html(objInfoEstudiante.Nombre))
                .append($("<td style='text-align: center; '>").html(objInfoEstudiante.Dni))
                .append($("<td colspan='3' style='text-align: center;'>").html(objInfoEstudiante.Plan)))
            .append($("<tr style='height: 10px;'>")
                .append($("<td colspan='6'>").html('')))
            .append($("<tr style='height: 25px;'>")
                .append($("<td  colspan='2' style='text-align: left; background-color: rgb(139, 163, 189); color: white;border-right: 1px solid rgb(255,255,255);'>").html("<span style='margin-left: 5px;'>Sede</span>"))
                .append($("<td  style='text-align: center; background-color: rgb(139, 163, 189); color: white;border-right: 1px solid rgb(255,255,255);'>").html("<span>Plan</span>"))
                .append($("<td  style='text-align: center; background-color: rgb(139, 163, 189); color: white;border-right: 1px solid rgb(255,255,255);'>").html("<span>Modalidad</span>"))
                .append($("<td  style='text-align: center; background-color: rgb(139, 163, 189); color: white;border-right: 1px solid rgb(255,255,255);'>").html("<span>Periodo</span>"))
                .append($("<td  style='text-align: center; background-color: rgb(139, 163, 189); color: white;border-right: 1px solid rgb(255,255,255);'>").html("<span>Año</span>"))
                .append($("<td  style='text-align: center; background-color: rgb(139, 163, 189); color: white;border-right: 1px solid rgb(255,255,255);'>").html("<span>Jornada</span>")))
            .append($("<tr style='height: 30px;'>")
                .append($("<td style='text-align: left;' colspan='2'>").html(objInfoEstudiante.Sede))
                .append($("<td style='text-align: center;'>").html(objInfoEstudiante.IdePlan))
                .append($("<td style='text-align: center; '>").html(objInfoEstudiante.Modalidad))
                .append($("<td style='text-align: center;'>").html(idPeriodo))
                .append($("<td style='text-align: center;'>").html(idAno))
                .append($("<td style='text-align: center;'>").html(objInfoEstudiante.Jornada)));
        //.append($("<tr style='height: 50px;'>")
        //    .append($("<td colspan='2' style='text-align: center;'>").html("Fecha Límite de Pago: <span id='Span2' style='font-weight: bold;'>Feb 28 2014</span>"))
        //    .append($("<td colspan='5' style='text-align: center;'>").html("Total a Pagar: <span id='Span3' style='font-weight: bold;'>" + totalPago + "</span>")));
        $("#theader").append(tbody);
        //carga Cursos Matriculados
        tbody = $("<tbody>")
            .append($("<tr style='height: 25px'>")
                .append($("<td style='text-align: center; background-color: rgb(0, 67, 121); border-right: 1px solid rgb(255,255,255); color: white; width: 10%;'>").html("Código"))
                .append($("<td style='text-align: center; background-color: rgb(0, 67, 121); border-right: 1px solid rgb(255,255,255);color: white; width: 30%;'>").html("Materia"))
                .append($("<td style='text-align: center; background-color: rgb(0, 67, 121); border-right: 1px solid rgb(255,255,255);color: white; width: 7%;'>").html("Sede"))
                .append($("<td style='text-align: center; background-color: rgb(0, 67, 121); border-right: 1px solid rgb(255,255,255);color: white; width: 7%;'>").html("Grupo"))
                .append($("<td style='text-align: center; background-color: rgb(0, 67, 121); border-right: 1px solid rgb(255,255,255);color: white; width: 7%;'>").html("Grado"))
                .append($("<td style='text-align: center; background-color: rgb(0, 67, 121); border-right: 1px solid rgb(255,255,255);color: white; width: 7%;'>").html("Horas"))
                .append($("<td style='text-align: center; background-color: rgb(0, 67, 121); border-right: 1px solid rgb(255,255,255);color: white; width: 7%;'>").html("Créditos"))
                .append($("<td style='text-align: center; background-color: rgb(0, 67, 121); border-right: 1px solid rgb(255,255,255);color: white; width: 10%;'>").html("Aula"))
                .append($("<td style='text-align: center; background-color: rgb(0, 67, 121); border-right: 1px solid rgb(255,255,255);color: white; width: 15%;'>").html("Horario")));

        //crea arreglo de las sedes
        var sedesMatriculadas = [];
        
        for (var a = 0; a < objDetalleMateriasInforme.length; a++) {
            if (objDetalleMateriasInforme[a].Itinerario.length > 0) {
                var dia, edificio;
                filaodd = 'background-color: rgb(204, 217, 228);';
                if (!isOdd(a)) {
                    filaodd = '';
                }
                for (var b = 0; b < objDetalleMateriasInforme[a].Itinerario.length; b++) {
                    
                    dia = BuscaNombreDia(objDetalleMateriasInforme[a].Itinerario[b].Dia);
                    if (objDetalleMateriasInforme[a].Itinerario[b].Edificio == "ND") {
                        edificio = "";
                    } else {
                        edificio = objDetalleMateriasInforme[a].Itinerario[b].Edificio + "-" + objDetalleMateriasInforme[a].Itinerario[b].Aula;
                    }
                    if (b == 0) {
                        tbody.append($("<tr style='height: 25px; " + filaodd + "'>")
                            .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].IdMateria))
                            .append($("<td style='text-align: left;'>").html(objDetalleMateriasInforme[a].NomMateria))
                            .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].IdSede))
                            .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].IdGrupo))
                            .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].IdGrado))
                            .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].Horas))
                            .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].Creditos))
                            .append($("<td style='text-align: center;'>").html(edificio))
                            .append($("<td style='text-align: center;'>").html(dia + ' ' + objDetalleMateriasInforme[a].Itinerario[b].Inicio + ' - ' + objDetalleMateriasInforme[a].Itinerario[b].Fin)));
                    } else {
                        tbody.append($("<tr style='height: 25px; " + filaodd + "'>")
                            .append($("<td style='text-align: center;'>").html(""))
                            .append($("<td style='text-align: left; '>").html(""))
                            .append($("<td style='text-align: center;'>").html(""))
                            .append($("<td style='text-align: center;'>").html(""))
                            .append($("<td style='text-align: center;'>").html(""))
                            .append($("<td style='text-align: center;'>").html(""))
                            .append($("<td style='text-align: center;'>").html(""))
                            .append($("<td style='text-align: center;'>").html(edificio))
                            .append($("<td style='text-align: center;'>").html(dia + ' ' + objDetalleMateriasInforme[a].Itinerario[b].Inicio + ' - ' + objDetalleMateriasInforme[a].Itinerario[b].Fin)));
                    }
                }
            } else {
                tbody.append($("<tr style='height: 25px; " + filaodd + "'>")
                    .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].IdMateria))
                    .append($("<td style='text-align: left;'>").html(objDetalleMateriasInforme[a].NomMateria))
                    .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].IdSede))
                    .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].IdGrupo))
                    .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].IdGrado))
                    .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].Horas))
                    .append($("<td style='text-align: center;'>").html(objDetalleMateriasInforme[a].Creditos))
                    .append($("<td style='text-align: center;'>").html(""))
                    .append($("<td style='text-align: center;'>").html("")));
            }

           //agrega las sedes al arreglo
            if($.inArray(objDetalleMateriasInforme[a].IdSede, sedesMatriculadas)== -1) {
                sedesMatriculadas.push(objDetalleMateriasInforme[a].IdSede);
            }
        }

        $("#tCursosM").append(tbody);
        //agrega las abreviaturas de las sedes
        ConsultaSedes(sedesMatriculadas);
        //carga Factura
        tbody = $("<tbody>")
            .append($("<tr style='height: 25px'>")
                .append($("<td style='text-align: left; background-color: rgb(0, 67, 121); color: white;' colspan='2'>").html("<span style='margin-left: 5px;'>Desglose de Pago por Matrícula</span>")));
        if (objDeslocePago != null) {
            var rubro;

            for (var i = 0; i < objDeslocePago.length; i++) {
                var filaodd = 'background-color: rgb(204, 217, 228);';
                if (!isOdd(i)) {
                    filaodd = '';
                }
                if (objDeslocePago[i].Rubro == '') {
                    rubro = '0';
                }
                else {
                    rubro = objDeslocePago[i].Rubro;
                }
                tbody.append($("<tr style='height: 25px; " + filaodd + "'>")
                    .append($("<td style='text-align: left; width: 60%; '>").html("<span style='margin-left: 20px;'>" + objDeslocePago[i].Detalle + "</span>"))
                    .append($("<td style='text-align: left; width: 40%; '>").html("<span style='margin-left: 10px;'>" + rubro + "</span>")));
            }
        } else {
            tbody.append($("<tr style='height: 25px'>")
                .append($("<td style='text-align: left; font-weight: bold;' colspan=2>")
                    .html("<span style='margin-right: 10px;'>No hay disponible información de pago, comunicarse con el Departamento de Financiero Contable.</span>")));
        }
        //tbody.append($("<tr style='height: 25px'>")
        //     .append($("<td style='text-align: right; width: 50%; font-weight: bold; font-size: small;'>").html("<span style='margin-right: 10px;'>Costo de créditos normales:</span>"))
        //     .append($("<td style='text-align: right; width: 15%; font-weight: bold; font-size: small;'>").html("<span style='margin-left: 10px;'>" + parseFloat(objDeslocePago.CostoCreditos.replace(',', '.').replace(' ', '')).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</span>"))
        //     .append($("<td>").html("")))
        //     .append($("<tr style='height: 25px'>")
        //         .append($("<td style='text-align: right; width: 50%; font-weight: bold; font-size: small;'>").html("<span style='margin-right: 10px;'>Trámite de matrícula:</span>"))
        //         .append($("<td style='text-align: right; width: 15%; font-weight: bold; font-size: small;'>").html("<span style='margin-left: 10px;'>" + parseFloat(objDeslocePago.CostoMatricula.replace(',', '.').replace(' ', '')).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</span>"))
        //         .append($("<td>").html("")))
        //     .append($("<tr style='height: 25px'>")
        //         .append($("<td style='text-align: right; width: 50%; font-weight: bold; font-size: small;'>").html("<span style='margin-right: 10px;'>Bienestar estudiantil (FEITEC, ADERTEC):</span>"))
        //         .append($("<td style='text-align: right; width: 15%; font-weight: bold; font-size: small;'>").html("<span style='margin-left: 10px;'>" + parseFloat(objDeslocePago.CostoBienestar.replace(',', '.').replace(' ', '')).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</span>"))
        //         .append($("<td>").html("")));
        // if (objDeslocePago.CostoBeca != "0,0000") {
        //     tbody.append($("<tr style='height: 25px'>")
        //         .append($("<td style='text-align: right; width: 50%; font-weight: bold; font-size: small;'>").html("<span style='margin-right: 10px;'>Beca Estudiantil:</span>"))
        //         .append($("<td style='text-align: right; width: 15%; font-weight: bold; font-size: small;'>").html("<span style='margin-left: 10px;'>-" + parseFloat(objDeslocePago.CostoBeca.replace(',', '.').replace(' ', '')).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</span>"))
        //         .append($("<td>").html("")));
        // }
        // tbody.append($("<tr style='height: 25px'>")
        //     .append($("<td style='text-align: right; font-weight: bold; font-size: medium;'>").html("<span style='margin-right: 10px;'>Total:</span>"))
        //     .append($("<td style='text-align: right; width: 15%; font-weight: bold; font-size: medium; border-top: solid 1px black;'>").html("<span style='margin-left: 10px;'>" + totalPago+ "</span>"))
        //     .append($("<td style='text-align: center; font-weight: bold; font-size: medium;'>").html(objDeslocePago.EstadoCostos)));

        $("#tFactura").append(tbody);

        //carga CURSOS CURSADOS
        //if (objCursosCursadosInforme.length > 0) {
        //    $(".cuerpoInforme").append("<table id='tCurCur' style='width: 100%; max-width: 1024px; margin: 0 auto 0 auto; font-family: sans-serif; font-size: medium; border-spacing: 0; margin-top: 10px;'>");
        //    tbody = $("<tbody>")
        //        .append($("<tr style='height: 30px'>")
        //            .append($("<td id='tdTituloMaterias' style='text-align: left; background-color: rgb(29, 60, 126); color: white;' colspan='11'>").html("Reporte de notas (Ultimas " + cantMaterias + " Asignaturas)")))
        //        .append($("<tr style='height: 30px'>")
        //            .append($("<td style='text-align: center; background-color: rgb(29, 60, 126); color: white; font-size: medium; font-family: serif; width: 12%'>").html("Código"))
        //            .append($("<td style='text-align: left; background-color: rgb(29, 60, 126); color: white; font-size: medium; font-family: serif;'>").html("Nombre de la Materia"))
        //            .append($("<td style='text-align: center; background-color: rgb(29, 60, 126); color: white; font-size: small; font-family: serif; width: 5%'>").html("Grupo"))
        //            .append($("<td style='text-align: center; background-color: rgb(29, 60, 126); color: white; font-size: small; font-family: serif; width: 5%'>").html("Grado"))
        //            .append($("<td style='text-align: center; background-color: rgb(29, 60, 126); color: white; font-size: small; font-family: serif; width: 5%'>").html("Horas"))
        //            .append($("<td style='text-align: center; background-color: rgb(29, 60, 126); color: white; font-size: small; font-family: serif; width: 5%'>").html("Créditos"))
        //            .append($("<td style='text-align: center; background-color: rgb(29, 60, 126); color: white; font-size: small; font-family: serif; width: 5%'>").html("Nota"))
        //            .append($("<td style='text-align: center; background-color: rgb(29, 60, 126); color: white; font-size: small; font-family: serif; width: 5%'>").html("Situación"))
        //            .append($("<td style='text-align: center; background-color: rgb(29, 60, 126); color: white; font-size: small; font-family: serif; width: 5%'>").html("Modalidad"))
        //            .append($("<td style='text-align: center; background-color: rgb(29, 60, 126); color: white; font-size: small; font-family: serif; width: 5%'>").html("Periodo"))
        //            .append($("<td style='text-align: center; background-color: rgb(29, 60, 126); color: white; font-size: small; font-family: serif; width: 5%'>").html("Año")));
        //    if (cantMaterias == "Todos") {
        //        $("#tdTituloMaterias").html("Reporte de notas (Todas las Asignaturas Cursadas)");
        //    }

        //    for (var c = 0; c < objCursosCursadosInforme.length; c++) {
        //        tbody.append($("<tr style='height: 30px'>")
        //            .append($("<td style='text-align: center; font-family: serif;'>").html(objCursosCursadosInforme[c].IdMateria))
        //            .append($("<td style='text-align: left; font-family: serif;'>").html(objCursosCursadosInforme[c].NomMateria))
        //            .append($("<td style='text-align: center; font-family: serif;'>").html(objCursosCursadosInforme[c].IdGrupo))
        //            .append($("<td style='text-align: center; font-family: serif;'>").html(objCursosCursadosInforme[c].IdGrado))
        //            .append($("<td style='text-align: center; font-family: serif;'>").html(objCursosCursadosInforme[c].Horas))
        //            .append($("<td style='text-align: center; font-family: serif;'>").html(objCursosCursadosInforme[c].Creditos))
        //            .append($("<td style='text-align: center; font-family: serif;'>").html(objCursosCursadosInforme[c].Nota))
        //            .append($("<td style='text-align: center; font-family: serif;'>").html(objCursosCursadosInforme[c].Situacion))
        //            .append($("<td style='text-align: center; font-family: serif;'>").html(objCursosCursadosInforme[c].IdModalidad))
        //            .append($("<td style='text-align: center; font-family: serif;'>").html(objCursosCursadosInforme[c].IdPeriodo))
        //            .append($("<td style='text-align: center; font-family: serif;'>").html(objCursosCursadosInforme[c].IdAño)));
        //    }
        //    tbody.append($("<tr style='height: 30px'>").append($("<td colspan='11'>").html("")));
        //    $("#tCurCur").append(tbody);
        //}




        //carga Leyenda
        $(".cuerpoInforme").append("<table id='tAbrev' style='width: 48%; max-width: 620px; margin: 20px auto 0 auto;   border-spacing: 0; float: left;'>");
        tbody = $("<tbody>")
            .append($("<tr style='height: 25px'>")
                .append($("<td style='text-align: left; background-color: rgb(139, 163, 189); color: white;' colspan='2'>").html("<span style='margin-left: 5px;'>Términos y Condiciones</span>")))
            .append($("<tr>")
                .append($("<td id='spLey' style='text-align: justify; font-size: 8pt' colspan='3'>")));
        $("#tAbrev").append(tbody);
        for (var s = 0; s < objLeyenda.length; s++) {

            $('#spLey').append($("<p style='margin: 10px;'>").html(objLeyenda[s].DESCRIPCION));
        };
        
        $('#spLey').append($("<p style='margin: 5px 10px 0 10px;   font-weight: bold;'>").html("Instituto Tecnológico de Costa Rica"));
        $('#spLey').append($("<p style='margin: 5px 10px 0 10px;   font-weight: bold;'>").html("Cédula Jurídica 4-000-04-2145-07"));
        $('#spLey').append($("<p style='margin: 5px 10px 0 10px;   font-weight: bold;'>").html("Departamento de Admisión y Registro"));



        ////carga Abreviaturas y Leyenda
        //$(".cuerpoInforme").append("<table id='tAbrev' style='width: 48%; max-width: 620px; margin: 20px auto 0 auto;   border-spacing: 0; float: left;'>");
        //tbody = $("<tbody>")
        //    .append($("<tr>")
        //        .append($("<td style='text-align: left; font-family: serif; border-bottom: solid 1px black;'>").html("Situación"))
        //        .append($("<td style='text-align: left; font-family: serif; border-bottom: solid 1px black;'>").html("Modalidad"))
        //        .append($("<td style='text-align: left; font-family: serif; border-bottom: solid 1px black;'>").html("Grado Académico")))
        //    .append($("<tr>")
        //        .append($("<td id='spSit' style='text-align: left; font-family: serif;vertical-align: top;'>"))
        //        .append($("<td id='spMod' style='text-align: left; font-family: serif;vertical-align: top;'>"))
        //        .append($("<td id='spGra' style='text-align: left; font-family: serif;vertical-align: top;'>")))
        //    .append($("<tr>")
        //        .append($("<td id='spLey' style='text-align: justify; font-family: serif; font-size: small' colspan='3'>")))
        //    .append($("<tr>")
        //        .append($("<td style='text-align: center;' colspan='3'>").html("<img alt='LogoTEC' src='http://www.tec.ac.cr/estudiantes/PublishingImages/Firma_TEC.PNG' style='margin: 20px auto 0 auto;width: 300px;height: 56px;'>")));
        //$("#tAbrev").append(tbody);
        //for (var s = 0; s < objSituacion.length; s++) {
        //    $('#spSit').append($("<span style='display: block;'>").html(objSituacion[s].NomSituacion + ": " + UpperCasetoCapitalize(objSituacion[s].Descripcion)));
        //}
        //for (s = 0; s < objModalidad.length; s++) {
        //    $('#spMod').append($("<span style='display: block;'>").html(objModalidad[s].IdeModalidad + ": " + UpperCasetoCapitalize(objModalidad[s].NomModalidad)));
        //}
        //for (s = 0; s < objGrado.length; s++) {
        //    $('#spGra').append($("<span style='display: block;'>").html(objGrado[s].IdGrado + ": " + UpperCasetoCapitalize(objGrado[s].NomGrado)));
        //}
        //for (s = 0; s < objLeyenda.length; s++) {
        //    $('#spLey').append($("<p>").html(objLeyenda[s].DESCRIPCION));
        //}
        //;

        //Abre el dialogo
        $(".dialogInforme").dialog("open");
    } else {
        AccionPanelMensaje("F", "No ha sido posible generar el informe de Matrícula.");
    }
}
function BuscaNombreDia(numDia) {
    switch (numDia) {
        case "1":
            return "L";
            break;
        case "2":
            return "K";
            break;
        case "3":
            return "M";
            break;
        case "4":
            return "J";
            break;
        case "5":
            return "V";
            break;
        case "6":
            return "S";
            break;
        case "7":
            return "D";
            break;
        default:
            return "ND";
            break;
            
    }
}
function ConsultaSedes(sedesMatriculadas) {
    $.ajax(
           {
               url: "frmInformeMatricula.aspx/ObtieneSedes",
               data: "{}",
               dataType: "json",
               type: "POST",
               async: false,
               contentType: "application/json; charset=utf-8",
               success: function (msg) {
                   if (msg.d != "false") {
                       if (msg.d == 'NE') {
                           return "false";
                       } else {
                           var sedes = jQuery.parseJSON(msg.d);
                           if (sedes != "false") {
                               var datosSede = '<span style="margin-right: 30px; font-weight:bold;">Simbología Sede</span>';
                               for (var i = 0; i < sedesMatriculadas.length; i++) {
                                   for (var s = 0; s < sedes.length; s++) {
                                       if (sedesMatriculadas[i] == sedes[s].IdSede) {
                                           datosSede = datosSede + '<span style="margin-right: 30px;">' + sedes[s].IdSede + ': ' + sedes[s].NombreSede + '</span>';
                                       }
                                   }
                               }
                               if (datosSede != '<span style="margin-right: 30px; font-weight:bold;">Simbología Sede</span>') {
                                   $('#tCursosM').append($("<tr style='height: 25px;'>")
                                       .append($("<td colspan=9 style='text-align: center;font-size: 8pt;  border-top: 1px solid rgb(177,177,177);'>").html(datosSede)));
                               }
                           }
                       }
                   } else {
                       return "false";
                   }
               },
               error: function (result) {
                   return "false";
               }
           });

}

function CargaAnos(data) {
    $('#selecAno').empty();
    for(var i=0; i<data.length; i++) {
        $('#selecAno').append($('<option>').html(data[i].IdAño));
    }
    $("#selecAno").show();
}
function CargaPerMod(data) {
    $('#selModPer').empty();
    for (var i = 0; i < data.length; i++) {
        $('#selModPer').append($('<option value="'+data[i].IdPeriodo+'_'+ data[i].IdeModalidad+'">').html(data[i].IdeModalidad + ' ' + data[i].IdPeriodo));
    }
    $('#selModPer').show();
}