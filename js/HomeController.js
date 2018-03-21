$('#txtFullName,#txtNIC,#txtAddress').focus(function () {
   $(this).select();
});

$("#txtFullName").keydown(function (e) {
    if((e.keyCode>=48 && e.keyCode<=57) || (e.keyCode>=96 && e.keyCode<=105)){
        e.preventDefault();
    }
});

$("#txtNIC").keydown(function (e) {
    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$("#btnAdd").click(function () {

    var name=$('#txtFullName').val();;
    var address=$('#txtAddress').val();
    var nic=$('#txtNIC').val();

    if(name.length===0){
        $('#txtFullName').focus();
        $('#txtFullName').addClass('error');
        return;
    }

    if(address.length===0){
        $('#txtAddress').focus();
        $('#txtAddress').addClass('error');
        return;
    }

    var nicRegExp=/\d{9}/;
    if(!nicRegExp.test(nic)){
        $("#txtNIC").focus();
        $("#txtNIC").addClass("error");
        return;
    }


    var id=generateId();

    $('#tblStudents tbody').append('<tr>' +
        '<td>'+id+'</td>' +
        '<td>'+name+'</td>' +
        '<td>'+address+'</td>' +
        '<td>'+nic+'</td>' +
        '<td><div class="recycle"></div></td>' +
        '</tr>');

    displayTableFooter();

    $('.recycle').click(function () {
       var row=$(this).parents('tr');
       row.fadeOut(500);
       setTimeout(function () {
           $(row).remove();
       },600);
       displayTableFooter();
    });

    $("#txtFullName").val("");
    $("#txtNIC").val("");
    $("#txtAddress").val("");

    $("#txtFullName").focus();


});

$('#txtFullName,#txtAddress,#txtNIC').keyup(function () {
   if($(this).val().length>0){
       $(this).removeClass('error');
   }
});

function generateId() {
    if($('#tblStudents tbody tr:last-child td:first-child').length===0){
        return 1;
    }else{
        return (parseInt($('#tblStudents tbody tr:last-child td:first-child').text())+1);
    }
}

function displayTableFooter() {
    console.log($('#tblStudents tbody tr').length);
    if($('#tblStudents tbody tr').length==1){
        $('#tblStudents tfoot').removeClass('tfoot-display');
    }else{
        $('#tblStudents tfoot').addClass('tfoot-display');
    }
}
