let page= {
    url: '',
    title: ''
}
 
chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
    const url = tabs[0].url
    page.url = url

    const title = tabs[0].title
    page.title = title
})

const inputUrl = document.querySelector('.url')
const inputTitle = document.querySelector('.title')
const closeButton = document.querySelector('.closeButton')
const ul = document.querySelector('.ul')

let array = []

if(JSON.parse(localStorage.getItem('array')) != null){
    array = JSON.parse(localStorage.getItem('array'))
    renderItems()
}

function renderItems(){

    ul.innerHTML = ''
    localStorage.setItem('array', JSON.stringify(array)) 

    array.forEach((element, index) => {
        
        ul.innerHTML += `
        <li>
            <button class="dot"></button>
            <a href="${element.url}" target="_blank">
                <p class="p">
                    ${element.title}
                </p>
            </a>
            <button class="deleteButton" id="${index}">X</button>
        </li>`

    })

    const deleteButton = document.querySelectorAll('.deleteButton')
    deleteButton.forEach( (button)=>{
        button.addEventListener('click', (event)=> {
            array.splice(event.target.id, 1)
            renderItems()
        })
    })

}


function dialogBOX(message, buttonText){
    const popupClose = document.querySelector('.popup-close')
    const popupShow = document.querySelector('.popup-open')
    const popupMessage = document.querySelector('.popupMessage')

    popupShow.showModal()

    popupMessage.innerHTML = message
    popupClose.innerHTML = buttonText

    popupClose.addEventListener('click', ()=>{
        popupShow.close()
    })
}

function addUrl(){

    if (inputUrl.value === ``) dialogBOX('url input is empty', 'OK')
    else if (inputTitle.value === ``) dialogBOX('title input is empty', 'OK')
    else{

        array.push({
            title: inputTitle.value,
            url: inputUrl.value
        })

        renderItems()
        inputTitle.value = ``
        inputUrl.value = ``

    }

}

function currentTab (){

    inputUrl.value = ``
    if (inputTitle.value != '') page.title = inputTitle.value 

    array.push({
        title: page.title,
        url: page.url
    })

    renderItems()
    inputTitle.value = ``

}

function deleteAll (){
    localStorage.clear()
    array = []
    ul.innerHTML = ''
    renderItems()
}




