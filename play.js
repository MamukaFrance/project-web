let animaux = getImagesArr(28, 'webp', 'animaux')
let animauxAnimes = getImagesArr(8, 'webp', 'animauxAnimes')
let animauxdomestiques = getImagesArr(10, 'jpg', 'animauxdomestiques')
let chiens = getImagesArr(23, 'webp', 'chiens')
let dinosaures = getImagesArr(10, 'jpg', 'dinosaures')
let dinosauresAvecNom = getImagesArr(10, 'jpg', 'dinosauresAvecNom')
let memorylegume = getImagesArr(6, 'svg', 'memory-legume')
let alphabetscrabble = getImagesArr(26, 'png', 'alphabet-scrabble')


let coups = 0

let cards = getChoix()

addCards(cards)

let bestScores = localStorage.getItem('bestScores')

if (bestScores) {
   
    displayBestScore()
}

$(document).on('keydown', function(e){
    coups = 0
    if (e.code === "Space" || e.keyCode === 32) {
        $('.text').text("Tentez de gagner avec le moins d'essais possible.")
        $('.coups').text('Nombre de coups : 0')
        e.preventDefault()
        removeCards(cards)
        playGame(cards)
        reverseCard()  
    }
})


function shuffle(arr){
    for (let i = 0; i < arr.length; i++) {
        const j = Math.floor(Math.random() * arr.length);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

function getBoxSize(){
let curentUser = JSON.parse(localStorage.getItem('curentUser')) 
    let size = curentUser.size
    switch (size) {
        case '4*2':return size = 8
            break;
        case '4*3': return size = 12
            break;
        case '4*6': return size = 16
            break;
        case '4*7': return size = 28
        default:
            break;
    }
}


function getChoix(){
    let curentUser = JSON.parse(localStorage.getItem('curentUser'))
    let choix = curentUser.choixMemory
    switch (choix) {
        case 'animaux': return animaux
            break;
        case 'animauxAnimes': return animauxAnimes
            break;
        case 'alphabet-scrabble': return alphabetscrabble
            break;
        case 'animauxdomestiques': return animauxdomestiques
            break;
        case 'chiens': return chiens
            break;
        case 'dinosaures': return dinosaures
            break;
        case 'dinosauresAvecNom': return dinosauresAvecNom
            break;
        case 'memory-legume': return memorylegume
            break;
        default:
            break;
    }
    return 
}


function getImagesArr(number, type, folder){
    let arr = []
    for (let i = 0; i < 2; i ++ ) {
        for (let j = 0; j < number; j++) {
            arr.push(folder +'/' + (j + 1) + '.' + type)  
        }
    } return arr  
}

function playGame(cards) {
   
    const shuffled = shuffle(cards);
    shuffled.forEach(src => {
        const carte = $(`
            <div class="carte">
                <div class="inner-carte">
                    <div class="face front"></div>
                    <div class="face back"><img src=/image/${src} alt="Image"></div>
                </div>
            </div>
        `);
        $('#maGalerie').append(carte);
    }); 
}

function reverseCard() {
    coups++
    $('.coups').text('Nombre de coups :' + coups)
    let counter = 0;
    let counterCartes = 0;
    let srcs =[]
    let flippedCards =[]
     // Attacher le gestionnaire de clic initial
     $('.carte').on('click', handleCarteClick);
     
     
    // Créer une fonction de gestionnaire de clics distincte
    function handleCarteClick(e) {
        coups++
        $('.coups').text('Nombre de coups :' + coups)
        if ($(this).hasClass('flipped')) return
        $(this).addClass('flipped');
        flippedCards[counter] = $(this)
        srcs[counter] = $(e.target).closest('div').next('div').find('img').attr('src');
        counter++;
        if (counter >= 2) {
            if (srcs[0] != srcs[1]) {
                // Désactiver le clic sur toutes les cartes
                $('.carte').off('click', handleCarteClick);
                setTimeout(function() {
                counter = 0;
                flippedCards[0].removeClass('flipped')
                flippedCards[1].removeClass('flipped')
                // Réactiver le clic après 3 secondes
                $('.carte').on('click', handleCarteClick);
            }, 3000);
            }else {
                counter = 0;
                counterCartes += 2
                if(counterCartes === cards.length){
                    let score = Math.round(cards.length/coups*10)
                    updateCurentUser(score)
                    updateBestScore(score)
                    $('.text').text('Bravo! Vous avez gagné!')
                    $('.coups').text(`Votre score final : ${score}`)
                } return
            }
        }
    }
}

function addCards(cards){
    cards.forEach(src => {
        const carte = $(`
            <div class="carte">
                <div class="inner-carte">
                    <div class="face front"></div>
                </div>
            </div>
        `);
        $('#maGalerie').append(carte);
    }); 
}
function removeCards(cards){
    $('#maGalerie div').remove()
}

function updateBestScore(score){
 let bestScores = getLocalArray('bestScores')
 let curentUser = getLocalArray('curentUser')
 let playrInfo = {
    pseudo : curentUser.email,
    score : score,
    size : curentUser.size,
    choix : curentUser.choixMemory,
    date : curentDate ()
 }
 
 bestScores.push(playrInfo)
 localStorage.removeItem('bestScores')
 
 localStorage.setItem('bestScores', JSON.stringify(bestScores))
 displayBestScore()
}

function displayBestScore(){
    let bestScores = getLocalArray('bestScores') 
    for (let i = 0; i < bestScores.length; i++) {
        $(`#bst-pseudo${i}`).text(bestScores[i].pseudo)
        $(`#bst-score${i}`).text(bestScores[i].score)
        $(`#bst-size${i}`).text(bestScores[i].size)
        $(`#bst-choix${i}`).text(bestScores[i].choix)
        $(`#bst-date${i}`).text(bestScores[i].date) 
    }  
}

function getLocalArray(element){
    if(localStorage.getItem(element))  {
        return JSON.parse(localStorage.getItem(element))
    }else {
        return []
    }
}

function updateCurentUser(score) { 
 let curentUser = getLocalArray('curentUser')
 curentUser.score = score
 curentUser.date = curentDate ()
 localStorage.removeItem('curentUser')
 localStorage.setItem('curentUser', JSON.stringify(curentUser)) 
}

function curentDate (){
    let now = new Date();
    let jour = String(now.getDate()).padStart(2, '0');
    let mois = String(now.getMonth() + 1).padStart(2, '0'); // Mois = 0 à 11
    let annee = now.getFullYear();
    let dateFormatee = jour + '/' + mois + '/' + annee;
    return dateFormatee
}