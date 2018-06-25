function DialogoPin() {
    $(function () {
        if ($('.dialogPin').length) {
            $('.dialogPin').dialog('destroy').remove();
        }
        //hace el append a la tabla
        $('body').append('<div class="dialogPin"><div class="headerDialog"><div class="cTitulo">Pin de Acceso</div><div class="cCerrar"><img src="images/close.png" class="imgCloseDialog" alt="Cerrar" /></div></div>' +
            '<div class="cContentPin">' +
            '<table>' +
            '<tr><td colspan="2"><span>Pin de acceso a los sistemas del TEC.</span></td></tr>' +
            '<tr><td>Nombre:</td><td><span id="spNombrePin"></span></td></tr>' +
            '<tr><td>Carné:</td><td><span id="spCarnetPin"></span></td></tr>' +
            '<tr><td>Pin:</td><td><span id="spPin"></span></td></tr>' +
            '</table>' +
            '</div>');

        //Activa el dialogo
        $('.dialogPin').dialog({
            autoOpen: true,
            modal: true,
            show: "fade",
            hide: "fade",
            width: 600,
            height: 350,
            draggable: true,
            resizable: true,
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
            $('.dialogPin').dialog("close");
        }).mouseenter(function () {
            $('.imgCloseDialog').attr('src', 'images/close_over.png');
            $(this).css('color', "gray");
        }).mouseleave(function () {
            $('.imgCloseDialog').attr('src', 'images/close.png');
        });
        $('.dialogPin').removeClass("ui-dialog ui-dialog-content ui-widget-content");
        $(".ui-dialog-titlebar").remove();
        //$(".dialogPin > .headerDialog").css({ height: '15%' });
        //obtiene la informacion
        ObtieneInfoPin();
         
    });
}

function ObtieneInfoPin() {
    AccionPanelMensaje("CI", "Cargando...");
    $.ajax(
           {
               url: "frmMatricula.aspx/ObtienePinEstudiante",
               data: "{}",
               dataType: "json",
               type: "POST",
               async: true,
               global: false,
               contentType: "application/json; charset=utf-8",
               success: function (msg) {
                   if (msg.d != "false") {
                       var data = jQuery.parseJSON(msg.d);
                       $('#spNombrePin').html(data.Nombre);
                       $('#spCarnetPin').html(data.Carnet);
                       $('#spPin').html(data.Pin);
                   }
                   else {
                       AccionPanelMensaje("F", "No ha sido posible cargar la información. Por favor intente de nuevo.");
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