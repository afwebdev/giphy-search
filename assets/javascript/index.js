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
    //Init a blank favList, or set as current localstorage item 'userBtns'
    let favList = JSON.parse(localStorage.getItem("userBtns") || "[]");

    const buildButtons = function () {

        //clear the current button list.
        $('.button-section').html('')

        //Build out the built in buttons from topics array.
        topics.forEach(function (character) {
            let btnHTML = `<button class="defaultSearch" data-value="${character}">${character}</button>`
            $('.button-section').append(btnHTML)
        })

        //Build out the buttons from stored favlist (USER INPUT)
        favList.forEach(function (character) {
            let btnHTML = `<button class="savedSearch" data-value="${character}">${character}</button>`
            $('.button-section').append(btnHTML)
        })
    }

    const buildImages = function (results) {
        // $('.image-display').html('')
        let images = results.data
        images.forEach(function (e) {
            let rating = e.rating
            let animated = e.images.fixed_height.url
            let url = e.images.fixed_height_still.url
            $('.image-display').prepend(`
                <div class="img-container">
                <img src="${url}" data-still="${url}" data-animate="${animated}" data-state="still" class="gif">
                <p>Rated: ${rating.toUpperCase()}</p>
                </div>
            `)
        })
    }


    //Search GIFS function, takes 1 arg, searchterm and does work with that.
    const searchGIFS = function (term) {

        fetch(
            `${queryURL}${term}&api_key=${API_KEY}`, {
                method: 'GET'
            }
        ).then(response => {
            return response.json();
        }).then(result => {
            //Send results out to be built using buildImages function
            buildImages(result)
        })
    }


    //Clear local storage function.
    const clearLocal = function () {
        localStorage.clear();
        favList = []
        buildButtons();
    }


    //APP Begins init here.
    //Build our buttons
    buildButtons();



    //Click Handlers.

    //Add input to new button to be added to screen.
    $('#search-btn').on('click', function (e) {
        e.preventDefault()
        let term = $('.search').val()
        //check for truthy -> existence
        if (term) {
            //Store it in a local array.
            favList.push(term)

            //Store it in localStorage as an 'array' string.
            localStorage.setItem("userBtns", JSON.stringify(favList))
            buildButtons();
        } else {
            alert('Please Enter A Search Term.')
        }
    })


    //Button click handler
    $('.button-section').on('click', 'button', function (e) {
        e.preventDefault();
        let term = e.currentTarget.dataset.value
        console.log(`Searched API for: ${term}`)
        searchGIFS(term)
    })


    //Image click handler(animated to still,  vice versa)
    $('.image-display').on('click', '.gif', function () {
        //Store current state of clicked element.
        let state = $(this).attr('data-state')

        //If state is still(default), change to animated on click.
        if (state === 'still') {
            $(this).attr({
                src: this.dataset.animate,
                'data-state': 'animated'
            })
        } else {//change back to still if animated.
            $(this).attr({
                src: this.dataset.still,
                'data-state': 'still'
            })
        }
    })


    $('#clear-btn').on('click', function (e) {
        e.preventDefault();
        clearLocal();
    })

})
