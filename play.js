$(document).on('keydown', function(e){
    let count = 0
    if (e.code === "Space" || e.keyCode === 32) {
        e.preventDefault()
        console.log("Touche Espace pressée !")

        playGame(count)


    }
})

function playGame(count){
    count ++
    $('.coups').text('Nombre de coups :' + count)
    
}