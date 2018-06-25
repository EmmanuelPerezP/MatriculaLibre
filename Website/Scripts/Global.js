//Obtiene el nombre de la pagina cargada 
function GetCurrentPageName() {
    var sPath = window.location.pathname,
    sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    return sPage.toLowerCase();
}


function ObtieneHora(fecha) {
    window.fechaP = new Date(fecha.toLocaleString());
    //fechaP = new Date(fechTemp.toLocaleString());
    var mNames = new Array("Ene", "Feb", "Mar",
    "Abr", "May", "Jun", "Jul", "Ago", "Sep",
    "Oct", "Nov", "Dec");

    var dd = fechaP.getDate();
    var mm = fechaP.getMonth();
    var yyyy = fechaP.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    fecha = dd + ' ' + mNames[mm] + ' ' + yyyy;
    
    $('#divFecha').html(fecha);
    mueveReloj();
}

///funcion para poner el reloj

function mueveReloj() {
    var fecha = new Date(window.fechaP);
    window.fechaP.setSeconds(fecha.getSeconds() + 1);
    var hora = fecha.getHours(),
        minuto = fecha.getMinutes(),
        segundo = fecha.getSeconds();
    if (hora < 10) {
        hora = '0' + hora;
    }
    if (minuto < 10) {
        minuto = '0' + minuto;
    }
    if (segundo < 10) {
        segundo = '0' + segundo;
    }
    $("#shora").text(hora);
    $("#sminutos").text(minuto);
    $("#ssegundos").text(segundo);
    setTimeout("mueveReloj()", 1000);
}

$(function () {
    $('#divCargando').hide();
    $("#divResultado").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: "fade",
        width: 400,
        height: 250,
        draggable: true,
        resizable: false,
        buttons: {
            Continuar: function () {
                $(this).dialog("close");
            }
        }
    });
    $("button, input:button").button();
    $("button, input:submit").button();
    //$(".cbAplicaciones").combobox();
    $('.tdSelect > input.ui-autocomplete-input').css('width', '100px');
    $(".dialogo-tabs").tabs({
        collapsible: false
    });
    $(".Imginfo").hover(function () { $(this).attr("src", "imagenes/info.png"); }, function () { $(this).attr("src", "imagenes/info2.png"); });
    $(".Img_logout").hover(function () {
        $(this).css("width", 70), $(this).css("height", 90);
    },
    function () { $(this).css("width", 50), $(this).css("height", 70); });
    $(".Img_Menu").hover(function () {
        $(this).css("width", 50), $(this).css("height", 50);
    },
    function () { $(this).css("width", 30), $(this).css("height", 30); });

    //$(document).click(function (event) {
    //    var conteiner = '.contentMenu';
    //    if (!$(event.target).closest(conteiner).length) {
    //        if ($(conteiner).is(":visible")) {
    //            $(conteiner).fadeToggle(500);
    //        }
    //    }
    //});

    $(".contentMenuClick").on("click", function () {
        $(".contentMenu").fadeToggle(500);
    }).mouseover(function () {
        $(this).css("cursor", "pointer");
    }).mouseout(function () {
        $(this).css("cursor", "default");
    });
    $(".contentMenu").hide();
    //eventos menu principal matricula
    $(".contentMenu ul>li").on("click", function () {
        var idElement = $(this).attr("id");
        switch (idElement) {
            case "subMConvocatoria":
                AccionPanelMensaje("CI","Cargando Convocatorias disponibles...");
                AjaxCall_Convocatorias();
                $("#dialogConvocatorias").dialog("open");
                $(".contentMenu").fadeToggle(500);
                break;
            case "subMPerfil":
                AccionPanelMensaje("CI", "Cargando Perfil...");
                CreaDialogo();
                ObtieneInfoPersonal();
                $(".cdivCentralInfo").show();
                //$(".divCargando").hide();
                $(".contentMenu").fadeToggle(500);
               break;
            case "subMPassword":
                activaDialogPassword();
                $(".contentMenu").fadeToggle(500);
                break;
            case "subMorosidad":
                AccionPanelMensaje("CI", "Cargando Requisitos Pendientes...");
                ConsultaMorosidadEstudiante();
                $(".contentMenu").fadeToggle(500);
                break;
            case "subCurriculum":
                AccionPanelMensaje("CI", "Cargando Curriculum Académico...");
                ConsultarCurriculumAcademico();
                $(".contentMenu").fadeToggle(500);
                break;
            case "subPin":
                DialogoPin();
                $(".contentMenu").fadeToggle(500);
                break;
            case "subAyuda":
                DialogoAyuda();
                $(".contentMenu").fadeToggle(500);
                break;
            default:
                break;
        }
    });

    $(window).resize(function () {
        var footer = $(window).height(), ancho = $(window).width();
        if (GetCurrentPageName() == 'frmmatricula.aspx') {
            $('.content').css({ "height": $(".footer").position().top - 170 });
            //$('#Table_Cursos tbody').css({ "max-height": $(".footer").position().top - 217, "width": $('.content').width() });
            $('.BodyCursos, #tBodyCursos').css({ "max-height": $(".footer").position().top - 175, "width": $('.content').width() });
            //$('.cuerpoInforme').css({ "height": footer - (160 + $('.dFiltroInforme').height()) });
        } else {
            
            //$('.contentMaster').css({ "height": footer - 130, "width": ancho - 252 });
            
            if (GetCurrentPageName() == 'frmconvocatoria.aspx') {
                if ($('#TDATOS tr').length > 0) {
                    var oTable = $('#TDATOS').dataTable(), oSettings = oTable.fnSettings();
                    oSettings.oScroll.scrollY = footer - 335;
                    oSettings.oScroll.scrollCollapse = true;
                    //$('div.dataTables_scrollBody').height(footer - 335 - $('#TDATOS tr:last').position().top - 20);
                    
                }
            }
        }
    });
    $(window).resize();

    $('.subDivCerrarSesion').mouseenter(function () {
        // $('.imgSalir').attr('src', 'images/logout_over.png');
        $(this).addClass("backgroundHoverAcciones");
    }).mouseleave(function () {
        //$('#imgHorarios').attr('src', 'images/calendar.png');
        $(this).removeClass("backgroundHoverAcciones");
    }).click(function (e) {
        alert($("#<%=btnSignOutMatricula.ClientID %>").length);
        $("#<%btnSignOutMatricula.ClientID%>").click();
    });
    

    //crea evento para abrir dialogo de contactos
    $('.contentEmail').on("click", function () {
        AccionPanelMensaje("CI", "Cargando...");
        CreaDialogContactos();
    });
});


function CreaDialogContactos() {

    $('body').append('<div class="dialogContactos" title="Contactos Admisión y Registro">' +
     '<div class="headerDialog"><div class="cTitulo">Contactos Admisión y Registro</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div> </div>' +
     '<div class="cuerpoContactos"></div></div>');
    
    //Crea la tabla de información
    $('.cuerpoContactos')
        .html($('<table>')
            .append($('<tr id="ContactosCA" class="oddtrContactos">').append($('<td>').append($('<span>').html('Sede Central'))))
            .append($('<tr>').append($('<td>').append($('<div id="divContactosCA" class="divRowCT">'))))
            .append($('<tr id="ContactosSC" class="oddtrContactos">').append($('<td>').append($('<span>').html('Sede Regional San Carlos'))))
            .append($('<tr>').append($('<td>').append($('<div id="divContactosSC" class="divRowCT">'))))
            .append($('<tr id="ContactosSJ" class="oddtrContactos">').append($('<td>').append($('<span>').html('Centro Académico San José'))))
            .append($('<tr>').append($('<td>').append($('<div id="divContactosSJ" class="divRowCT">'))))
            .append($('<tr id="ContactosLI" class="oddtrContactos">').append($('<td>').append($('<span>').html('Centro Académico Limón'))))
            .append($('<tr>').append($('<td>').append($('<div id="divContactosLI" class="divRowCT">'))))
            .append($('<tr id="ContactosAL" class="oddtrContactos">').append($('<td>').append($('<span>').html('Sede Interunivesitaria de Alajuela'))))
            .append($('<tr>').append($('<td>').append($('<div id="divContactosAL" class="divRowCT">'))))
        );
    //carga la información
    CargaDatosContactos();

    //Crea dialogo para ver contactos
    $(".dialogContactos").dialog({
        autoOpen: true,
        modal: true,
        show: "fade",
        hide: "fade",
        width: 750,
        height:600,
        draggable: false,
        resizable: false,
        buttons: {
            Cerrar: function () {
                $(this).dialog("close");
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
    $(".dialogContactos").removeClass("ui-dialog ui-dialog-content ui-widget-content");
    $(".ui-dialog-titlebar").remove();

    //genera eventos para la tabla
    $('.divRowCT').hide();
    
    $('.oddtrContactos').on('click', function() {
        $('.divRowCT').hide("blind");
        var idRow = $(this).attr('id');
        $('#div'+idRow).show("blind");
    }).show();
}

function CargaDatosContactos() {
    $(function () {
        $.ajax(
            {
                url: "Default.aspx/ConsultaContactos",
                data: "{}",
                dataType: "json",
                type: "POST",
                async:true,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    
                    if ((msg.d == "NE")||(msg.d == "false")) {
                        $('.cuerpoContactos > table').remove();
                        $('.cuerpoContactos').append($('<div id="noContactos">').html("No hay información disponible para mostrar."));
                   } else {
                        var data = jQuery.parseJSON(msg.d), sede;

                        $('#divContactosCA').append($('<table class="tbContactos">').append($('<tr>').append($('<td>').html('')).append($('<td>').html('')).append($('<td>').html('<img src="images/mail_logo.png" id="imgEmail" alt="Correo electrónico" />')).append($('<td>').html('<img src="images/icono_Telefono.png" id="imgEmail" alt="Teléfono" />'))));
                        $('#divContactosSJ').append($('<table class="tbContactos">').append($('<tr>').append($('<td>').html('')).append($('<td>').html('')).append($('<td>').html('<img src="images/mail_logo.png" id="imgEmail" alt="Correo electrónico" />')).append($('<td>').html('<img src="images/icono_Telefono.png" id="imgEmail" alt="Teléfono" />'))));
                        $('#divContactosSC').append($('<table class="tbContactos">').append($('<tr>').append($('<td>').html('')).append($('<td>').html('')).append($('<td>').html('<img src="images/mail_logo.png" id="imgEmail" alt="Correo electrónico" />')).append($('<td>').html('<img src="images/icono_Telefono.png" id="imgEmail" alt="Teléfono" />'))));
                        $('#divContactosLI').append($('<table class="tbContactos">').append($('<tr>').append($('<td>').html('')).append($('<td>').html('')).append($('<td>').html('<img src="images/mail_logo.png" id="imgEmail" alt="Correo electrónico" />')).append($('<td>').html('<img src="images/icono_Telefono.png" id="imgEmail" alt="Teléfono" />'))));
                        $('#divContactosAL').append($('<table class="tbContactos">').append($('<tr>').append($('<td>').html('')).append($('<td>').html('')).append($('<td>').html('<img src="images/mail_logo.png" id="imgEmail" alt="Correo electrónico" />')).append($('<td>').html('<img src="images/icono_Telefono.png" id="imgEmail" alt="Teléfono" />'))));

                        for(var i=0; i<data.length;i++) {
                            sede = data[i].SEDE;
                            $('#divContactos' + sede + ' table').append($('<tr>')
                                            .append($('<td>').html(data[i].AREA))
                                            .append($('<td>').html(data[i].NOMBRE))
                                            .append($('<td>').html('<a href="mailto:' + data[i].EMAIL + '">' + data[i].EMAIL + '</a>'))
                                            .append($('<td>').html(data[i].NUM_TELEFONO)));
                            
                            
                        }

                        $('#ContactosCA').click();
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

function MuestraPanelInfoPersonal() {
    var activo = $("#Panel_InfoP").css("display");
    if (activo == "none") {
        $("#Panel_InfoP").show("slide");
    } else {
        $("#Panel_InfoP").hide("slide");
    }
}

//funcion de tabs dentro del dialogo
$(function () {
    $(".tabs").tabs({
        collapsible: false
    });
});

//funcion que crea los dialogos
$(function () {
    $(".dialogo-resultado").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: "fade",
        width: 400,
        height: 170,
        draggable: false,
        resizable: false,
        buttons: {
            Cerrar: function () {
                $(this).dialog("close");//agregar el logout del server.
                //window.location = "./frmAutenticacion.aspx";
            }
        }
    });
    $(".dialogo_Grupos").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: "fade",
        width: 900,
        draggable: false,
        resizable: false,
        buttons: {
            Cerrar: function () {
                $(this).dialog("close");

            }
        }
    });

    $('.divIndicadorModalidad').on('click', function () {
        $("#DialogcontentModalidad").dialog("open");
    });

    $("#DialogcontentModalidad").dialog({
        autoOpen: false,
        modal: true,
        show: "fade",
        hide: "fade",
        width: 900,
        draggable: false,
        resizable: false,
        buttons: {
            Cerrar: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#DialogcontentModalidad > .headerDialog").css({ height: '50px' });
    $("#DialogcontentModalidad").removeClass("ui-dialog ui-dialog-content ui-widget-content");
    $(".ui-dialog-titlebar").remove();
    

});

function MuestraGrupos() {
    $(".dialogo_Grupos").dialog("open");

}

//FUNCION QUE HACE LA TRANSICION EN LAS IMAGENES

//$(function () {
//    $('#slideImgs').jqFancyTransitions({
//        width: 250,
//        height: 160,
//        effect: 'curtain', // wave, zipper, curtain
//        strips: 20, // number of strips
//        delay: 3000, // delay between images in ms
//        stripDelay: 100, // delay beetwen strips in ms
//        titleOpacity: 0.7, // opacity of title
//        titleSpeed: 1000, // speed of title appereance in ms
//        position: 'alternate', // top, bottom, alternate, curtain
//        direction: 'fountainAlternate', // left, right, alternate, random, fountain, fountainAlternate
//        navigation: false, // prev and next navigation buttons
//        links: false // show images as links
//    });
//});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////************FUNCIONES****************///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Carga_Valores(nombrePagina, direccion) {
    $("#NomPagina").text(nombrePagina);
    $("#_ruta").text(direccion);
}


function UpperCasetoCapitalize(data) {
    return data.toLowerCase().replace(/^(.)|\s(.)/g, function ($1) { return $1.toUpperCase(); });
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

//FUNCION CARGA CONVOCATORIAS
function CargaConvocatoriasMasterFuncionario(data) {
    if (data != null) {
        $(".Table_ConvocatoriaFuncionario > tbody >tr").remove();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var estado, activaConv;
                //if (data[i].ESTADO != true) {
                //    estado = 'Inactivo';
                //} else {
                //    estado = "Activo";
                //}
                estado = '<img class="btn_Consultar" src="imagenes/check.png" style=" z-index:1; width:20px; height:20px;" title="Seleccionar">';

                if (data[i].DENTRO_FECHA == true) {
                    //activaConv = '<img class="btn_Consultar" src="imagenes/check.png" style=" z-index:1; width:20px; height:20px;" title="Seleccionar">';
                    activaConv = 'hoy';
                } else {
                    activaConv = '';
                }
                var row = $("<tr id='" + data[i].ID_CONVOCATORIA + "_" + data[i].ID_PERIODO + "_" + data[i].PERIODO + "'>")
                    .append($("<td class='center'>").html(data[i].MODALIDAD))
                    .append($("<td class='center'>").html(data[i].PERIODO))
                    .append($("<td class='center'>").html(data[i].TIPOMATRICULA))
                    .append($("<td >").html(data[i].FECHA_INICIO))
                    .append($("<td >").html(data[i].FECHA_FINAL))
                    .append($("<td >").html(activaConv))
                    .append($("<td class='center'>").html(estado));
                $(".Table_ConvocatoriaFuncionario > tbody").append(row);
            }

            $('.Table_ConvocatoriaFuncionario .btn_Consultar').on('click', function () {
                var $row = $(this).closest("tr"); //Closest permite obtener la fila donde esta contenido el boton
                var idRow = $row.attr('id').split("_");
                var idConvocatoria = idRow[0];
                CargaVariblesConvocatoria(idConvocatoria);
                $("#DialogcontentModalidad").dialog("close");
            });
        } else {
            $(".Table_ConvocatoriaFuncionario > tbody").append($('<tr colspan="6">').html("No hay convocatorias registradas para la selección deseada."));
        }
    } else {
        $(".dialogo-texto").text("No ha sido posible cargar las convocatorias, por favor recargue la página web.");
        $(".dialogo-resultado").dialog("open");
    }
}
//CARGA MODALIDADES
function CargaModalidadFuncionario(data) {
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].Estado) {
                $('#selecModalidadFunc').append($('<option value=' + data[i].IdeModalidad + '>').text(UpperCasetoCapitalize(data[i].NomModalidad)));
            }
        }
        $("#selecModalidadFunc").val('S');
        $('#inAno').val(new Date().getFullYear());
        $('#idConsultarModalidad').on('click', function () {
            var idAno = $('#inAno').val(),
                idModalidad = $('#selecModalidadFunc').find(":selected").val();
            AccionPanelMensaje("CI", "Cargando...");
            ConsultaConvocatorias(idAno, idModalidad);
        });
    } else {
        $(".dialogo-texto").text("No ha sido posible cargar las convocatorias, por favor recargue la página web.");
        $(".dialogo-resultado").dialog("open");
    }
}

function ConsultaConvocatorias(idAno, idModalidad) {
    $(function () {
        $.ajax(
            {
                url: "Default.aspx/ConsultaConvocatoriasPorAnoPorModalidad",
                data: "{idModalidad: '" + idModalidad + "', idAno: '" + idAno + "'}",
                dataType: "json",
                type: "POST",
                async: true,
                global: false,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if (msg.d != "false") {
                        data = jQuery.parseJSON(msg.d);
                        CargaConvocatoriasMasterFuncionario(data);
                    } else {
                        $(".dialogo-texto").text("No ha sido posible cargar las Convocatorias debido a un problema de conexión con el servidor central.");
                        $(".dialogo-resultado").dialog("open");
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
//Activa convocatoria
function CargaVariblesConvocatoria(idConvocatoria) {
    $(function () {
        $.ajax(
            {
                url: "Default.aspx/ActivaConvocatoria",
                data: "{idConvocatoria: '" + idConvocatoria + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if (msg.d != "false") {
                        $('#lblModalidad').text(msg.d);
                        $(".dialogo-texto").text("Se ha seleccionado correctamente la convocatoria.");
                        $(".dialogo-resultado").dialog("open");
                    } else {
                        $(".dialogo-texto").text("No ha sido posible cargar sus cursos debido a un problema de conexión con el servidor central, por favor comuniquese con el Departamento de Admisión y Registro.");
                        $(".dialogo-resultado").dialog("open");
                    }

                },
                error: function (result) {
                    AccionError(result.status);
                }
            });
    });
}

//función que activa los mensajes de error
//tipo= 1 si es mostrar o ocultar
//tipoMensaje= E: error; T:Exito; C: Cargando
//texto= texto a mostrar
function AccionPanelMensaje(tipoMensaje, texto) {
    switch (tipoMensaje) {
        case "F":
            $('#divCargando').hide();//apaga el indicador de cargando
            $('.imgResultado').attr("src", "images/pending.png");
            $('.spResultado').text(texto);
            $('#divResultado').dialog("open");
            break;
        case "T":
            $('#divCargando').hide();//apaga el indicador de cargando
            $('.imgResultado').attr("src", "images/notpending.png");
            $('.spResultado').text(texto);
            $('#divResultado').dialog("open");
            break;
        case "CI":
            $('.spTitCargando').text(texto);
            $('#divCargando').show();
            break;
        case "CL":
            $('#divCargando').hide();
            break;
        case "SS"://sin sesión
            $('.imgResultado').attr("src", "images/pending.png");
            $('.spResultado').text(texto);
            $('#divResultado').dialog("open");
            window.location = "./frmAutenticacion.aspx";
            break;
        default:
            $('#divResultado').dialog("close");
            $('#divCargando').hide();
            break;
    }
}

function AccionError(estado) {
    if (result.status != '401') {
        AccionPanelMensaje("F", "Ocurrio un error al conectar con el servidor, error (" + estado + ").");
    } else {
        AccionPanelMensaje("SS", "Se ha cerrado la sesión por inactividad, por favor vuelva a ingresar al sitio web.");
        setTimeout(function () {
            window.location = "./frmAutenticacion.aspx";
        }, 5000);
        //
    }

}


///////dialogo de ayuda

function DialogoAyuda() {
    $(function () {
        if ($('.dialogAyuda').length) {
            $('.dialogAyuda').dialog('destroy').remove();
        }
        //hace el append a la tabla
        $('body').append('<div class="dialogAyuda"><div class="headerDialog"><div class="cTitulo">Ayuda</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div></div>' +
            '<div class="cContentAyuda"> <img src="Documents/pasos.jpg" class="imgAyuda" alt="Pasos para matricular" /></div>');
    
        //Activa el dialogo
        $('.dialogAyuda').dialog({
            autoOpen: true,
            modal: true,
            show: "fade",
            hide: "fade",
            width: 700,
            height: 628,
            draggable: true,
            resizable: true,
            buttons: {
                'Descargar Manual (pdf)': function () {
                    DescargaManual();
                },
                Cerrar: function () {
                    $(this).dialog("close");
                }
            },
            close: function (event, ui) {
                $(this).dialog('destroy').remove();
            }
        });
        $('.cCerrar').on("click", function () {
            $('.dialogAyuda').dialog("close");
        }).mouseenter(function () {
            $('.imgCloseDialog').attr('src', 'images/close_over.png');
            $(this).css('color', "gray");
        }).mouseleave(function () {
            $('.imgCloseDialog').attr('src', 'images/close.png');
        });
        $('.dialogAyuda').removeClass("ui-dialog ui-dialog-content ui-widget-content");
        $(".ui-dialog-titlebar").remove();
    });
}

function DescargaManual() {
    $(function () {
        window.open(
  'http://www.tec.ac.cr/estudiantes/Documents/Doc.%20vertical%20de%20pasos%20de%20matricula.pdf',
  '_blank' // <- This is what makes it open in a new window.
);
        //  window.location.href = "http://www.tec.ac.cr/estudiantes/Documents/Doc.%20vertical%20de%20pasos%20de%20matricula.pdf";
    });
}
//funciones de bloqueo de teclas
$(function() {

    //$("#txtPerfilFuncionario").keydown(function (event) {
    //    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 27) {
    //    }
    //    else {
    //        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
    //            event.preventDefault();
    //        }
    //    }
    //});
    
    $("#txtPwdOld, #txtPwdNew,  #txtPwdVerificada").keydown(function (e) { // alert (e.keyCode); 
        if (e.keyCode == 32) {
            return false;
        }
    });
});