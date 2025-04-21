if (localStorage.getItem("curentUser")) {
    displayProfile()
}


$('#choixMemory').on('change', function(){
    if ($(this).val() == 'animeaux-animes') $('.img-detail').attr('src', '/image/animauxAnimes/memory_detail_animaux_animes.png')
    if ($(this).val() == 'alphabet-scrabble') $('.img-detail').attr('src', '/image/alphabet-scrabble/memory_detail_scrabble.png')
    if ($(this).val() == 'animaux') $('.img-detail').attr('src', '/image/animaux/memory_detail_animaux.png')
    if ($(this).val() == 'animauxdomestiques') $('.img-detail').attr('src', '/image/animauxdomestiques/memory_detail_animaux_domestiques.png')
    if ($(this).val() == 'chiens') $('.img-detail').attr('src', '/image/chiens/memory_details_chiens.png')
    if ($(this).val() == 'dinosaures') $('.img-detail').attr('src', '/image/dinosaures/memory_detail_dinosaures.png')
    if ($(this).val() == 'dinosauresAvecNom') $('.img-detail').attr('src', '/image/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png')
    if ($(this).val() == 'memory-legume') $('.img-detail').attr('src', '/image/memory-legume/memory_detail.png')
})

$('#register').on("click", function(e){
    e.preventDefault()
    
    let curentUser = getLocalArray("curentUser")
    
    curentUser.choixMemory = $('#choixMemory').val()
    if (curentUser.score) {
        curentUser.score = $('#score').val()
    }
    curentUser.size = $('#size').val()
    localStorage.removeItem('curentUser')
    localStorage.setItem('curentUser', JSON.stringify(curentUser))
    
    
})

function displayProfile(){
    let curentUser = JSON.parse(localStorage.getItem("curentUser"))
    let nom = curentUser.nom
    let email = curentUser.email
    let choixMemory = curentUser.choixMemory
    let size = curentUser.size
    $('#nom-profile').val(nom)
    $('#email-profile').val(email)
    $('#choixMemory').val(choixMemory)
    $('#size').val(size)
    
    $('#pseudo').text(email)
    if (curentUser.score) $('#score') .text(curentUser.score)
    if (curentUser.date) $('#date') .text(curentUser.date)
    $('#taille').text(size)
    $('#chMemory').text(choixMemory)
    $('#date').text()

}



function getLocalArray(element){
    if(localStorage.getItem(element))  {
    return JSON.parse(localStorage.getItem(element))
    }else return []
}