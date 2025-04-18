let animaux = getImagesArr(28, 'webp', 'animaux')
let animauxAnimes = getImagesArr(8, 'webp', 'animauxAnimes')
let count = 0

let cards = getChoix()
addCards(cards)

// let boxSize =  getBoxSize() 
// addQuestionMark(boxSize, "/image/question.svg")

    

$(document).on('keydown', function(e){
    if (e.code === "Space" || e.keyCode === 32) {
        e.preventDefault()
        count++
        removeCards(cards)
        playGame(cards)
        reverseCard()
    
    }
})


// function playGameOld(count, cards){
//     count ++
//     $('.coups').text('Nombre de coups :' + count)
//     let boxSize =  getBoxSize()
//     removeCards(boxSize)
//     const shuffledCards = shuffle(cards)
//     let url = "/image/"
//     addCards(url, shuffledCards)  
// }

// function removeCards(boxSize){
//     for (let index = 0; index < boxSize; index++) {
//         $('.div-images img').remove()    
//     }
// }

// function addCards(url, arr){
//     for (const element of arr) {
//         $('.div-images').append(`<img class="image fluid-img me-2 mb-2" src= ${url}${element} alt="image">`)
//     }
// }

function shuffle(arr){
    for (let i = 0; i < arr.length; i++) {
        const j = Math.floor(Math.random() * arr.length);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

// function addQuestionMark(boxSize, url){
//     for (let index = 0; index < boxSize; index++) {
//         $('.div-images').append(`<img class="image fluid-img me-2 mb-2" src= ${url} alt="image">`)    
//     }
// }

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
        case 'alphabet-scrabble': return alphabet-scrabble
            break;
        case 'animauxdomestiques': return animauxdomestiques
        default:
            break;
    }


    return 
}


function getImagesArr(number, type, folder){
    let arr = []
    for (let index = 0; index < number; index++) {
        arr.push(folder +'/' + (index+1) + '.' + type)  
    }
    return arr
}




function playGame(cards) {
    $('.coups').text('Nombre de coups :' + count)
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
        
        // carte.on('click', function () {
        //     $(this).toggleClass('flipped');
        // });
        $('#maGalerie').append(carte);
    }); 
}

function reverseCard() {
    let counter = 0;

    // Créer une fonction de gestionnaire de clics distincte
    function handleCarteClick() {
        $(this).addClass('flipped');
        
        counter++;
        console.log('Compteur : ' + counter);

        if (counter >= 2) {
            console.log('Attente de 3 secondes...');
            // Désactiver le clic sur toutes les cartes
            $('.carte').off('click', handleCarteClick);

            setTimeout(function() {
                counter = 0;
                console.log('Compteur remis à zéro');
                // Réactiver le clic après 3 secondes
                $('.carte').on('click', handleCarteClick);
            }, 3000);
        }
    }

    // Attacher le gestionnaire de clic initial
    $('.carte').on('click', handleCarteClick);
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