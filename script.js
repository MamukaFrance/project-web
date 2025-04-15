$('#nom').on("input", function(){
    let nom = $('#nom')
    let  val = nom.val()
    let id = "#nom-alert"
    let condition = val.length < 3
    alert(nom, condition)
    alertText(condition, id)

    //valider(nom, condition, id)
})

$('#email').on("input", function(){
    let email = $('#email')
    let val = email.val()
    let id = "#email-alert"
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let condition = !regex.test(val)
    //console.log(condition);
    alert(email, condition)
    alertText(condition, id)

    //valider(email, condition, id)
})

$('#password').on("input", function(){
    let password = $("#password")
    let val = password.val()
    let id = "#password"
    let  regex = /^(?=.*[0-9])(?=.*[\W_]).{6,}$/;
    let condition = !regex.test(val)
    alert(password, condition)
})

function confirmePassword(){
    if (condition) {
        
    }

}






// function valider(nom, condition, id){
//     if (condition) {
//         $(id).removeClass("invisible")
//         $(id).addClass("visible")
//         nom.addClass("form-control is-invalid"); 
//     }else{
//         $(id).removeClass("visible")
//         $(id).addClass("invisible")
//         nom.removeClass("is-invalid")
//         nom.addClass("is-valid"); 
//     }
// }
function alert(nom, condition){
    if(condition) {
        nom.addClass("form-control is-invalid"); 
    }else{
        nom.removeClass("is-invalid")
        nom.addClass("is-valid");
    }
}

function alertText(condition, id){
if (condition) {
    $(id).removeClass("invisible")
    $(id).addClass("visible")
}else{
    $(id).removeClass("visible")
    $(id).addClass("invisible")
}
}

