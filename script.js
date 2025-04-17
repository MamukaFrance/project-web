$('#nom').on("input", function(){
    let nom = $('#nom')
    let  val = nom.val()
    let id = "#nom-alert"
    let condition = val.length < 3
    alerte(nom, condition)
    alertText(condition, id)
})

$('#email').on("input", function(){
    let email = $('#email')
    let val = email.val()
    let id = "#email-alert"
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let condition = !regex.test(val)
    alerte(email, condition)
    alertText(condition, id)
})

$('#password').on("input", function(){
    let password = $("#password")
    let passwordVal = password.val()
    let id = "#password"
    let  regex = /^(?=.*[0-9])(?=.*[\W_]).{6,}$/;
    let condition = !regex.test(passwordVal)
    alerte(password, condition)
    let fort = passwordValider(passwordVal)
    console.log(fort);
    
    updateDisplayLines(fort)

})
$('#confirme-password').on("input", function(){
    let confirmePassword = $('#confirme-password')
    let condition = $("#password").val() != $("#confirme-password").val()
    alerte(confirmePassword, condition)
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

function alerte(nom, condition){
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


$('#register_form').on("submit", function(e){
    e.preventDefault()
    let nom = $("#nom").val()
    let email = $('#email').val()
    let password = $('#password').val()

    let users = getUsers()

    let chNom = checkNom(users, nom)
   
    let chEmail = checkEmail(users, email)

    if (chNom) {
        alert("Nom'utilisateur " + nom + " est déja utilisé. Veuillez saisir un nouvel Nom'utilisateur")
    }else if(chEmail) {
        alert("email " + email + " est déja utilisé. Veuillez saisir un nouvel email")
    }else{
        addUser(users, nom, email, password)
    }
    window.location.replace('http://127.0.0.1:5500/connect.html');
})

$('#form_connexion').on("submit", function(e) {
    e.preventDefault() // Empêcher la soumission réelle du formulaire

    let users = getUsers()
    let email = $('#email-connecter').val()
    let password = $('#password-connecter').val()

    let check = checkEmailPassword(users, email, password)

    if (check) {
        alert("L'email " + email + " est connecter")
    }else{
        alert("Erreur, veuillez saisir les information correctement")
    }
    
   let oldCurentUser = getCurentUser()
     
    if (oldCurentUser){
        localStorage.removeItem('curentUser')
    }

   addCurentUser(email)


   window.location.href = '/profile.html'
   
   
   
    
});



function addCurentUser(email){
    let users = getUsers()
    let curentUser = users.find(user => user.email === email)
    let curentNom = curentUser.nom
    let curentEmail = curentUser.email
    let curentPassword = curentUser.password

    let newCurentUser ={
        nom : curentNom,
        email: curentEmail,
        password: curentPassword
    }
    localStorage.setItem("curentUser", JSON.stringify(newCurentUser))

}



function getCurentUser(){
    if (localStorage.getItem("curentUser")) {
        return JSON.parse(localStorage.getItem("curentUser"))
    }else return {}
}

function addUser(users, nom, email, password){
    let user = {
        nom : nom,
        email : email,
        password :password
    }
    users.push(user)
    localStorage.removeItem('users') 
    localStorage.setItem('users', JSON.stringify(users));

}


function checkEmailPassword(users, email, password){
    let check = false;
    users.forEach(element => {
        if ( element.email === email && element.password === password ) {
            check = true
        }
    });
    return check

}


function checkNom(users, nom){
    let check = false;
    users.forEach(element => {
        if (element.nom === nom) {
            check = true
        }
    });
    return check
}

function checkEmail(users, email){
    let check = false;
    users.forEach(element => {
        if (element.email === email) {
            check = true
        }
    });
    return check
}



function getUsers(){
    if (localStorage.getItem('users')) {
        return JSON.parse( localStorage.getItem('users'))
    }else{
        return []
    }
}

    

    

  

 

