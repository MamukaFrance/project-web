$('#nom').on("input", function(){
    let nom = $('#nom')
    let  val = nom.val()
    let id = "#nom-alert"
    let condition = val.length < 3
    alert(nom, condition)
    alertText(condition, id)
})

$('#email').on("input", function(){
    let email = $('#email')
    let val = email.val()
    let id = "#email-alert"
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let condition = !regex.test(val)
    alert(email, condition)
    alertText(condition, id)
})

$('#password').on("input", function(){
    let password = $("#password")
    let passwordVal = password.val()
    let id = "#password"
    let  regex = /^(?=.*[0-9])(?=.*[\W_]).{6,}$/;
    let condition = !regex.test(passwordVal)
    alert(password, condition)
    let fort = passwordValider(passwordVal)
    console.log(fort);
    
    updateDisplayLines(fort)

})
$('#confirme-password').on("input", function(){
    let confirmePassword = $('#confirme-password')
    let condition = $("#password").val() != $("#confirme-password").val()
    alert(confirmePassword, condition)
})

function passwordValider( val){
    let fort = 0
    if (val > 6) fort++
    if (/[a-zA-Z]/.test(val)) fort++
    if (/[0-9]/.test(val)) fort++
    const regex = /^(?=.*[0-9])(?=.*[\W_]).{8,}$/
    if (regex.test(val)) fort = 3
    return fort
}
function updateDisplayLines(fort){
     $(".lines button").hide()
     $(".spans span").hide()

    if (fort === 1) {
        $(".line-orang").show()
        $("#orang").show()
       }
    if (fort === 2){
        $(".line-orang").show()
        $("#orang").show()
        $(".line-yellow").show()
        $("#yellow").show()
    } 
        
    if (fort === 3){
        $(".line-orang").show()
        $(".line-yellow").show()
        $(".line-green").show()
    }
         
}

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

