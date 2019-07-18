document.addEventListener('DOMContentLoaded', function () {

    const API_KEY = 'Mxe0QV6s89kAlfQRfU5lE6D431HJhykP'
    // api.giphy.com/v1/gifs/search?q="cat"&api_key=Mxe0QV6s89kAlfQRfU5lE6D431HJhykP
    const queryURL = 'https://api.giphy.com/v1/gifs/search?limit=10&q='


    //Simpsons based array of characters
    let topics = [
        "Homer Simpson",
        "Marge Simpson",
        "Bart Simpson",
        "Maggie Simpson",
        "Lisa Simpson",
        "Apu",
        "Nelson",
        "Mr Skinner",
        "Flanders"
    ]
    //Init a blank favList, append localstorage at some point.
    let favList = []

    const buildButtons = function () {
        $('.button-section').html('')

        //Build out the buttons.
        topics.forEach(function (character) {
            let btnHTML = `<button class="savedSearch" data-value="${character}">${character}</button>`
            $('.button-section').append(btnHTML)
        })

        //Build out the buttons from stored favlist
        favList.forEach(function (character) {
            let btnHTML = `<button class="savedSearch" data-value="${character}">${character}</button>`
            $('.button-section').append(btnHTML)
        })
    }

    const buildImages = function (results) {
        $('.image-display').html('')
        let images = results.data
        images.forEach(function (e) {
            let animated = e.images.fixed_height.url
            let url = e.images.fixed_height_still.url
            $('.image-display').append(`
                <img src="${url}" data-still="${url}" data-animate="${animated}" data-state="still" class="gif">
            `)
        })
    }


    //Search GIFS function, takes 1 arg, searchterm and does work with that.
    const searchGIFS = function (term) {

        fetch(
            `${queryURL}${term}&api_key=${API_KEY}`, {
                method: 'GET'
            }
        ).then(function (response) {
            return response.json();
        }).then(function (result) {
            //Send results out to be built using buildImages function
            buildImages(result)
        })
    }


    //APP Begins init here.
    //Build our buttons
    buildButtons();



    //Click Handlers.
    $('#search-btn').on('click', function (e) {
        e.preventDefault()
        let term = $('.search').val()

        if (term) {
            favList.push(term)
            buildButtons();
        } else {
            alert('ENTER TERM')
        }
    })

    $('.button-section').on('click', 'button', function (e) {
        let term = e.currentTarget.dataset.value
        console.log(`Searched API for: ${term}`)
        searchGIFS(term)
    })

    $('.image-display').on('click', '.gif', function () {
        //Store current state of clicked element.
        let state = $(this).attr('data-state')

        //If state is still(default), change to animated.
        if (state === 'still') {
            $(this).attr({
                src: this.dataset.animate,
                'data-state': 'animated'
            })
        } else {
            $(this).attr({
                src: this.dataset.still,
                'data-state': 'still'
            })
        }
    })

















})