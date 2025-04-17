let animaux = getImagesArr(28, 'webp', 'animaux')
let animauxAnimes = getImagesArr(8, 'webp', 'animauxAnimes')



let boxSize =  getBoxSize() 
addQuestionMark(boxSize, "/image/question.svg")

    

$(document).on('keydown', function(e){
    let count = 0
    if (e.code === "Space" || e.keyCode === 32) {
        e.preventDefault()
        console.log("Touche Espace pressée !")
        let cards = getChoix()
        
        playGame(count, cards)
    }
})


function playGame(count, cards){
    count ++
    $('.coups').text('Nombre de coups :' + count)
    let boxSize =  getBoxSize()
    removeCards(boxSize)
    const shuffledCards = shuffle(cards)
    let url = "/image/"
    addCards(url, shuffledCards)  
}

function removeCards(boxSize){
    for (let index = 0; index < boxSize; index++) {
        $('.div-images img').remove()    
    }
}

function addCards(url, arr){
    for (const element of arr) {
        $('.div-images').append(`<img class="image fluid-img me-2 mb-2" src= ${url}${element} alt="image">`)
    }
}

function shuffle(arr){
    for (let i = 0; i < arr.length; i++) {
        const j = Math.floor(Math.random() * arr.length);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

function addQuestionMark(boxSize, url){
    for (let index = 0; index < boxSize; index++) {
        $('.div-images').append(`<img class="image fluid-img me-2 mb-2" src= ${url} alt="image">`)    
    }
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




// $(document).ready(function () {
//     const images = [
//         'img1.jpg', 'img2.jpg', 'img3.jpg',
//         'img4.jpg', 'img5.jpg', 'img6.jpg',
//         'img7.jpg', 'img8.jpg', 'img9.jpg'
//     ];

//     function shuffle(array) {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//         return array;
//     }

//     const shuffled = shuffle(images);

//     shuffled.forEach(src => {
//         const carte = $(`
//             <div class="carte">
//                 <div class="inner-carte">
//                     <div class="face front"></div>
//                     <div class="face back"><img src="${src}" alt="Image"></div>
//                 </div>
//             </div>
//         `);

//         carte.on('click', function () {
//             $(this).toggleClass('flipped');
//         });

//         $('#maGalerie').append(carte);
//     });
// });