
function Carga_Foto(bytefoto) {
    if (bytefoto != "false") {
        var foto = 'data:image/png;base64,' + bytefoto;
        $('.imgUsr').attr('src', foto);
    } else {
        $('.imgUsr').attr('src', './images/user.png');
    }
}

$(function() {
    $("#idPerfil").on("click", function() {
        CreaDialogo();
        ObtieneInfoPersonal();
    }).mouseover(function() {
        $(this).css("cursor", "pointer");
    }).mouseout(function() {
        $(this).css("cursor", "default");
    });
});

function CreaDialogo() {
    $(function() {
        if ($('.dialog_Perfil').length == 0) {
            $('body').append('<div class="dialog_Perfil" title="Información Personal"> ' +
                '<div class="headerDialog"><div class="cTitulo">Perfil</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div> </div>' +
                '<div class="cdivCentralInfo"><div class="divImgUsr"><img src="images/user.png" id="imgEstudiantePerfil" class="imgUsr" alt="Foto del estudiante" /></div>' +
                '<div class="divInfoPersonal"><h2>Información Personal</h2><table class="tablePersonal"><tbody></tbody></table></div>' +
                '<div class="divInfoContacto"><h2>Información de Contacto</h2>' +
                '<div class="divContacto">' +
                '<input type="text" id="txtTelefono" value="" placeholder="Teléfono habitación" class="text cblock telefono txtboxOnlyNumeric" />' +
                '<input type="text" id="txtCelular" value="" placeholder="Teléfono celular" class="text cblock telefono txtboxOnlyNumeric" />' +
                '<input type="text" id="txtemail" value="" placeholder="Correo electrónico" class="text cblock email" readonly />' +
                '<input type="text" id="txtemail2" value="" placeholder="Correo electrónico secundario" class="text cblock email"/>' +
                '</div></div>' +
                '<div class="divInfoDireccion"><h2>Dirección de Residencia</h2>' +
                '<div class="csubDir1">' +
                '<select id="cbProvincia" class="text cblock distribucionDirProvincia"></select>' +
                '<select id="cbCanton" class="text cblock distribucionDir"></select>' +
                '<select id="cbDistrito" class="text cblock distribucionDir"></select> </div>' +
                '<div class="csubDir2"><textarea id="dbOtrasS" placeholder="Otras Señas..." class="text cblock otrasDir"></textarea></div>' +
                '<div id="radio">' +
                '¿Utiliza esta dirección durante sus estudios? ' +
                '<input type="radio" id="raDirT" name="radio" checked="checked"><label for="raDirT" >Sí</label>' +
                '<input type="radio" id="raDirP" name="radio"><label for="raDirP">No</label></div>' +
                '</div>' +
                '</div></div>');
            $("body").append($("<div id='dirTemporalDialog'>").append($('<div class="headerDialog">').append($('<div class="cTitulo">').html('Dirección durante sus estudios')))
                .append('<div class="csubDir1">' +
                    '<select id="cbProvinciaTemporal" class="text cblock distribucionDirProvincia"></select>' +
                    '<select id="cbCantonTemporal" class="text cblock distribucionDir"></select>' +
                    '<select id="cbDistritoTemporal" class="text cblock distribucionDir"></select> </div>' +
                    '<div class="csubDir2"><textarea id="dbOtrasSTemporal" placeholder="Otras Señas..." class="text cblock otrasDir"></textarea>' +
                    '<input id="idButtonListoDirT" type="button" value="Listo" />' +
                    '</div>'));
            $("#dirTemporalDialog").hide();
            $("#dirTemporalDialog").css({ "left":'45%', "top": '40%' })
                .addClass("arrow");
            //$("#dirTemporalDialog .headerDialog").css("height", "20%");
            //$("#dirTemporalDialog .cTitulo").css("font-size", "18px");
        }

        $(".dialog_Perfil").dialog({
            autoOpen: false,
            modal: true,
            show: "fade",
            hide: "fade",
            width: 770,
            height: 580,
            draggable: false,
            resizable: false,
            buttons: {
                Guardar: function() {
                    ActualizaInfoPersonal();
                },
                Cancelar: function() {
                    $(this).dialog("close");

                }
            },
            close: function (event, ui) {
                $('.ui-widget-overlay').unbind('click');
                $("#dirTemporalDialog").remove();
                $(this).dialog('destroy').remove();
             
            },
            open: function (event, ui) { $('.ui-widget-overlay').bind('click', function() {
                $('#dirTemporalDialog').hide('drop');
            }); }
       });
       $('.csubDir2 > input[type=button]').on('click', function () {
           $('#dirTemporalDialog').hide('drop');
       }).button().css({'margin-top': '20px', 'margin-left': '85px'});
        $(".dialog_Perfil").removeClass("ui-dialog ui-dialog-content ui-widget-content");
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
       $('.cCambioPwd').on("click", function() {
           activaDialogPassword();
       });
        
      

        //$('#txtTelefono').focusout(function () {
        //    if ($(this).val() == "") {
        //        $(this).addClass("cErrorCampoTexto");
        //    } else {
        //        $(this).removeClass("cErrorCampoTexto");
        //    }
        //});
        
    });
}

function ObtieneInfoPersonal() {
    $(function () {
       
        $.ajax(
            {
                url: "frmMatricula.aspx/ObtieneInfoPersonal",
                data: "{}",//"{idCanton:'" + idCanton + "',idProvincia:'" + idProvincia + "'}",
                dataType: "json",
                type: "POST",
                async: true,
                contentType: "application/json; charset=utf-8",
                success: function(msg) {
                    if (msg.d != "false") {
                        CargaInfoPersonal(jQuery.parseJSON(msg.d));//serializa el objeto en una variable JS (nombre y foto)
                       
                    } else {
                        AccionPanelMensaje("F", "No ha sido posible obtener la información de perfil, por favor intente de nuevo más tarde.");
                    }
                    
                },
                error: function(result) {
                    AccionError(result.status);
                },
                complete: function () {
                    $(".dialog_Perfil").dialog("open");
                    AccionPanelMensaje("CL", "");
                }
            });
       
    });
}

function CargaInfoPersonal(data) {
    //carga la info personal
    $(".tablePersonal > tbody >tr").remove();
    var html = "<tr><td class='cTituloInfoP'>Nombre:</td><td>" + data.Nombre + "</td></tr>" +
        "<tr><td class='cTituloInfoP'>Fecha de Nacimiento:</td><td>" + data.Fecha + "</td></tr>" +
        "<tr><td class='cTituloInfoP'>Cédula:</td><td>" + data.Dni + "</td></tr>" +
        "<tr><td class='cTituloInfoP'>Carné:</td><td>" + data.IdCarne + "</td></tr>" +
        "<tr><td class='cTituloInfoP'>Carrera:</td><td>" + data.Depto + "</td></tr>" +
        "<tr><td class='cTituloInfoP'>Plan:</td><td>" + data.IdePlan + "</td></tr>" +
        "<tr><td class='cTituloInfoP'>Sede:</td><td>" + data.Sede + "</td></tr>";
    $(".tablePersonal > tbody").append(html);
    //carga la foto
    if (data.Foto != "false") {
        var foto = 'data:image/png;base64,' + data.Foto;
        $('#imgEstudiantePerfil').attr('src', foto);
    } else {
        $('#imgEstudiantePerfil').attr('src', './images/user.png');
    }
    //carga telefonos y correo
    if (data.Telefono1 != "null") {
        $("#txtTelefono").val(data.Telefono1);
    }
    if (data.Telefono2 != "null") {
        $("#txtCelular").val(data.Telefono2);
    }
    if (data.Email != "null") {
        $("#txtemail").val(data.Email);
    }
    if (data.Email2 != "null") {
        $("#txtemail2").val(data.Email2);
    }
    //carga dirección
    ObtineProvincias('#cbProvincia', data.IdProvincia);
    ObtineCantones(data.IdProvincia, '#cbCanton', data.IdCanton);
    ObtineDistritos(data.IdCanton, data.IdProvincia, '#cbDistrito', data.IdDistrito);

    //$("#cbProvincia").change();

    //$("#cbCanton").change();

    //    $("#cbDistrito option[value=" + data.IdDistrito + "]").attr("selected", "selected");

    $("#dbOtrasS").val(data.Direccion);
    if (data.Direccion.toLowerCase() == "no disponible") {
        $("#dbOtrasS").val('');
    } else {
        $("#dbOtrasS").val(data.Direccion);
    }
    
        //carga direccion temporal
        ObtineProvincias('#cbProvinciaTemporal', data.IdProvinciaTiempoLectivo);
        ObtineCantones(data.IdProvinciaTiempoLectivo, '#cbCantonTemporal', data.IdCantonTiempoLectivo);
        ObtineDistritos(data.IdCantonTiempoLectivo, data.IdProvinciaTiempoLectivo, '#cbDistritoTemporal', data.IdCantonTiempoLectivo);
        //ObtineProvincias('#cbProvinciaTemporal');
        //if (data.IdProvincia != 0) {
        //    $("#cbProvinciaTemporal option[value=" + data.IdProvinciaTiempoLectivo + "]").attr("selected", "selected");
        //}
        //$("#cbProvinciaTemporal").change();
        //if (data.IdCanton != 0) {
        //    $("#cbCantonTemporal option[value=" + data.IdCantonTiempoLectivo + "]").attr("selected", "selected");
        //}
        //$("#cbCantonTemporal").change();
        //if (data.IdDistrito != 0) {
        //    $("#cbDistritoTemporal option[value=" + data.IdDistritoTiempoLectivo + "]").attr("selected", "selected");
    //}
    
        if (data.DireccionTiempoLectivo.toLowerCase() == "no disponible") {
            $("#dbOtrasSTemporal").val('');
        } else {
            $("#dbOtrasSTemporal").val(data.DireccionTiempoLectivo);
        }

    //compara dirección para activar el check
    var dirPer = data.IdCanton + data.IdDistrito + data.IdProvincia + data.Direccion.replace(/ /g, ''),
        dirTemp = data.IdCantonTiempoLectivo + data.IdDistritoTiempoLectivo + data.IdProvinciaTiempoLectivo + data.DireccionTiempoLectivo.replace(/ /g, '');
    if (dirPer != dirTemp) {
        $('#raDirT').prop('checked', true);
        $('#raDirP').prop('checked', false);

    }
    //activa eventos del radio --- DESPUES DE CHECKEAR EL RADIO EN TEMPORAL
    $("input[type=radio]").on("click", function() {

        if ($('#raDirP').is(':checked')) {
            $('#dirTemporalDialog').show("drop");

        } else {
            $('#dirTemporalDialog').hide("drop");
        }
    });
    $("#radio").buttonset();
}

function ObtineProvincias(tipo, idProvincia) {
    var haydatos = false;
    $(function () {
        $.ajax(
            {
                url: "frmMatricula.aspx/ObtieneProvincias",
                data: "{}",
                dataType: "json",
                type: "POST",
                async:false,
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if (msg.d != "false") {
                        var data = jQuery.parseJSON(msg.d);
                        if (data != null) {
                            haydatos = true;
                            $(tipo + " > option").remove();
                            $(tipo).append("<option value='0'>Selecciona una Provincia...</option>");
                            for (var a = 0; a < data.length; a++) {
                                var datos = "<option value='" + data[a].COD_PROVINCIA + "'>" + data[a].DSC_PROVINCIA + "</option>";
                                $(tipo).append(datos);
                            }
                        } else {
                            $(tipo).append("<option value='0'>No hay provincias disponibles.</option>");
                        }
                    }
                },
                error: function (result) {
                    AccionError(result.status);
                },
                complete: function () {
                    if (haydatos) {
                        $(tipo + ' option[value=' + idProvincia + "]").attr("selected", "selected");
                    } else {
                        $(tipo + ' option[value="0"]').attr("selected", "selected");
                    }
                }
            });
        $("#cbProvincia").on("change", function () {
            idProvincia = $(this).val();
            var selDistrito = '#cbDistrito';
            ObtineCantones(idProvincia, "#cbCanton",0);
            $(selDistrito+" > option").remove();
            $(selDistrito).append("<option value='0'>Selecciona un Distrito...</option>").prop('disabled', 'disabled');
        });
        $("#cbProvinciaTemporal").on("change", function () {
            idProvincia = $(this).val();
            var selDistrito = '#cbDistritoTemporal';
            ObtineCantones(idProvincia, "#cbCantonTemporal",0);
            $(selDistrito+ " > option").remove();
            $(selDistrito).append("<option value='0'>Selecciona un Distrito...</option>").prop('disabled', 'disabled');
        });
    });
}
function ObtineCantones(idProvincia, tipo, idCanton) {
  
    var haydatos = false;
    $(function () {
        if (idProvincia > 0) {
            $.ajax(
                {
                    url: "frmMatricula.aspx/ObtieneCantones",
                    data: "{idProvincia:'" + idProvincia + "'}",
                    dataType: "json",
                    type: "POST",
                    async: true,
                    contentType: "application/json; charset=utf-8",
                    success: function(msg) {
                        if (msg.d != "false") {
                            var data = jQuery.parseJSON(msg.d);
                            if (data != null) {
                                haydatos = true;
                                $(tipo + " > option").remove();
                                var datos = "<option value='0'>Selecciona un Cantón...</option>";
                                for (var a = 0; a < data.length; a++) {
                                    datos += "<option value='" + data[a].COD_CANTON + "'>" + data[a].DSC_CANTON + "</option>";
                                }
                                $(tipo).append(datos);
                            } else {
                                $(tipo).append("<option value='0'>No hay cantones disponibles.</option>");
                            }

                        }
                    },
                    error: function(result) {
                        AccionError(result.status);
                    },
                    complete: function() {
                        if (haydatos) {
                            $(tipo + ' option[value=' + idCanton + "]").attr("selected", "selected");
                        } else {
                            $(tipo + ' option[value="0"]').attr("selected", "selected");
                        }
                    }
                });
        } else {
            $(tipo).append("<option value='0'>No hay cantones disponibles.</option>");
        }
        $("#cbCanton").on("change", function() {
            idProvincia = $("#cbProvincia").val(), idCanton = $(this).val();
            ObtineDistritos(idCanton, idProvincia, "#cbDistrito",0);
            $('#cbDistrito').prop('disabled', false);
        });
        $("#cbCantonTemporal").on("change", function() {
            idProvincia = $("#cbProvinciaTemporal").val(), idCanton = $(this).val();
            ObtineDistritos(idCanton, idProvincia, "#cbDistritoTemporal",0);
            $('#cbDistritoTemporal').prop('disabled', false);
        });
    });
}
function ObtineDistritos(idCanton, idProvincia, tipo, idDistrito) {
    var haydatos = false;
    $(function () {
        if (idProvincia > 0 && idCanton > 0) {
            $.ajax(
                {
                    url: "frmMatricula.aspx/ObtieneDistritos",
                    data: "{idCanton:'" + idCanton + "',idProvincia:'" + idProvincia + "'}",
                    dataType: "json",
                    type: "POST",
                    async: true,
                    contentType: "application/json; charset=utf-8",
                    success: function(msg) {
                        if (msg.d != "false") {
                            var data = jQuery.parseJSON(msg.d);
                            if (data != null) {
                                haydatos = true;
                                $(tipo + " > option").remove();
                                var datos = "<option value='0'>Selecciona un Distrito...</option>";
                                for (var a = 0; a < data.length; a++) {
                                    datos += "<option value='" + data[a].COD_DISTRITO + "'>" + data[a].DSC_DISTRITO + "</option>";
                                }
                                $(tipo).append(datos);
                            } else {
                                $(tipo).append("<option value='0'>No hay distritos disponibles.</option>");
                            }

                        }
                    },
                    error: function(result) {
                        AccionError(result.status);
                    },
                    complete: function() {
                        if (haydatos) {
                            $(tipo + ' option[value=' + idDistrito + "]").attr("selected", "selected");
                        } else {
                            $(tipo + ' option[value="0"]').attr("selected", "selected");
                        }
                    }
                });
        } else {
            $(tipo).append("<option value='0'>No hay distritos disponibles.</option>");
        }
    });
}
function ActualizaInfoPersonal() {
    var objInfoPersonal = {
        Telefono1: $("#txtTelefono").val(),
        Telefono2: $("#txtCelular").val(),
        Email2: $("#txtemail2").val(),
        IdProvincia: '',
        IdCanton: '',
        IdDistrito: '',
        Direccion: $("#dbOtrasS").val(),
        IdProvinciaTiempoLectivo: '',
        IdCantonTiempoLectivo: '',
        IdDistritoTiempoLectivo: '',
        DireccionTiempoLectivo: $("#dbOtrasSTemporal").val()
    }, idProvincia = $('#cbProvincia').find(":selected").val(),
        idCanton = $('#cbCanton').find(":selected").val(),
        idDistrito = $('#cbDistrito').find(":selected").val(),
        direccion = $("#dbOtrasS").val(),
        resultado = true, mensajeError="";
    //verifica selección de combos Direccion permanente
    if ((idProvincia == 0) || (idCanton == 0) || (idDistrito == 0)) {
        resultado = false;
        mensajeError = "Por favor seleccione una Provincia, Cantón y Distrito en su Dirección Permanente.";
    }
    else if (direccion == '') {
        resultado = false;
        mensajeError = "Por favor digite la dirección exacta donde se ubica su casa de habitación.";
    }
    //carga info dirección permanente
    objInfoPersonal.IdProvincia = idProvincia;
    objInfoPersonal.IdCanton = idCanton;
    objInfoPersonal.IdDistrito = idDistrito;
    objInfoPersonal.Direccion = direccion;
    //verifica selección de combos Direccion temporal
    if ($('#raDirP').is(':checked')) {
        idProvincia = $('#cbProvinciaTemporal').find(":selected").val(),
        idCanton = $('#cbCantonTemporal').find(":selected").val(),
        idDistrito = $('#cbDistritoTemporal').find(":selected").val(),
        direccion = $("#dbOtrasSTemporal").val();
        if ((idProvincia == 0) || (idCanton == 0) || (idDistrito == 0)) {
            resultado = false;
            mensajeError ="Por favor seleccione una Provincia, Cantón y Distrito en su Dirección Temporal.";
        }
        //else if (direccion == '') {
        //    resultado = false;
        //    mensajeError = "Por favor digite la dirección exacta donde se ubica su casa de habitación durante sus estudios.";
        //}
    }
    //carga info dirección temporal
    objInfoPersonal.IdProvinciaTiempoLectivo = idProvincia;
    objInfoPersonal.IdCantonTiempoLectivo = idCanton;
    objInfoPersonal.IdDistritoTiempoLectivo = idDistrito;
    objInfoPersonal.DireccionTiempoLectivo = direccion;
    
    if (resultado) {
        AjaxUpdInfoPersonal(JSON.stringify(objInfoPersonal));
    } else {
        AccionPanelMensaje("F", mensajeError);
    }
}
function AjaxUpdInfoPersonal(data) {
    $(function () {
        AccionPanelMensaje("CI", "Actualizando Perfil...");
        $.ajax(
            {
                url: "frmMatricula.aspx/ActualizaInfoPersonal",
                data: "{objInfoPersonal:'" + data + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    if (msg.d != "false") {
                        $(".dialog_Perfil").dialog("close");
                        AccionPanelMensaje("T", "Se ha modificado su información personal con éxito.");
                    } else {
                        AccionPanelMensaje("F", "No ha sido posible modificar su información debido a error de conexión con el servicio.");
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