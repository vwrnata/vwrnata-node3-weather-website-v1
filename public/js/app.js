console.log('Client side javascript file is loaded!')

//  fetch('http://puzzle.mead.io/puzzle').then((response) => {
//      response.json().then((data) => {
//         console.log(data)
//      })
//  })

fetch('http://localhost:3000/weather?address=liberec').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    msg1.textContent = 'Loading ...'
    msg2.textContent = ''
    console.log('testing:' + location)

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                msg1.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
})