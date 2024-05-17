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

function getFaviconUrl(url) {
    return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=128`;
}

function getTitle(title){
    const paragraph = title
    let result = paragraph.slice(0, 32)

    if(paragraph.length > 33) result = paragraph.slice(0, 32)+'...'
    return result
}

function renderItems(){

    ul.innerHTML = ''
    localStorage.setItem('array', JSON.stringify(array)) 

    array.forEach((element, index) => {
        if(element == undefined)array.splice(index, 1)
        else{
                
            ul.innerHTML += `
            <li class="li">
                <button class="dot"></button>
                <a href="${element.url}" target="_blank" class="aa">
                    <p class="p">
                    <img src="${getFaviconUrl(element.url)}">
                        ${getTitle(element.title)}
                    </p>
                </a>
                <button class="deleteButton" id="${index}">X</button>
            </li>
            `
        }

    })

    const deleteButton = document.querySelectorAll('.deleteButton')
    deleteButton.forEach( (button)=>{
        button.addEventListener('click', (event)=> {
            //bin.push(array[event.target.id])
            //localStorage.setItem('bin', JSON.stringify(bin))
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

setTimeout(function(){
    const hint = document.querySelector('.hint')
    hint.style.display = "none" 
}, 2000);


