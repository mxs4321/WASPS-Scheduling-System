$(document).ready(function(){
    var formInputs = $('input[type="text"],input[type="password"]');
    formInputs.focus(function() {
        $(this).parent().children('p.formLabel').addClass('formTop');
        $('div#formWrapper').addClass('darken-bg');
    });
    formInputs.focusout(function() {
        if ($.trim($(this).val()).length == 0){
            $(this).parent().children('p.formLabel').removeClass('formTop');
        }
        $('div#formWrapper').removeClass('darken-bg');
    });
    $('p.formLabel').click(function(){
        $(this).parent().children('.form-style').focus();
    });
});