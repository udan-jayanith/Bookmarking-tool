let page= {
    url: '',
    title: ''
}


/*
    
try {
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
        const url = tabs[0].url
        page.url = url
    
        const title = tabs[0].title
        page.title = title
    })
  }
  catch(err) {
    dialogBOX(err, 'OK')
}
    
 */

function getCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true}, ([tab]) => {

      if (chrome.runtime.lastError){
        console.error(chrome.runtime.lastError)
        dialogBOX(chrome.runtime.lastError, 'OK')
      }

        try {
            const url = tab.url
            page.url = url
        
            const title = tab.title
            page.title = title
        }
        catch(err) {
            dialogBOX(err, 'OK')
        }

    })
}
getCurrentTab()

const inputUrl = document.querySelector('.url')
const inputTitle = document.querySelector('.title')
const closeButton = document.querySelector('.closeButton')
const ul = document.querySelector('.ul')

let array = []
let bin = []
let userSettings = {
    mainColor: 'hsl(110, 69%, 34%)',
    mainHover: 'hsl(110, 69%, 32%)',
    backgroundColor: 'hsl(304, 71%, 100%)',
    color: 'hsl(0, 0%, 0%)',
    favicon: 'true',
    faviconSize: 48,
    recycleBin: 'true'
}

function renderColor(){
    const cssRoot = document.querySelector(':root')
    cssRoot.style.setProperty('--main-color', userSettings.mainColor);
    cssRoot.style.setProperty('--main-hover', userSettings.mainHover);
    cssRoot.style.setProperty('--background-color', userSettings.backgroundColor);
    cssRoot.style.setProperty('--color', userSettings.color)
}

if(JSON.parse(localStorage.getItem('userSettings')) != null) userSettings = JSON.parse(localStorage.getItem('userSettings'))
renderColor()

if(JSON.parse(localStorage.getItem('array')) != null){
    array = JSON.parse(localStorage.getItem('array'))
    renderItems()
}

if(JSON.parse(localStorage.getItem('bin')) != null) bin = JSON.parse(localStorage.getItem('bin'))


function getFaviconUrl(url) {
    
    if(userSettings.favicon == 'false') return ''
    
    return `<img src= "
        chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=${userSettings.faviconSize}
    ">
     </img>`
    
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
                        ${getFaviconUrl(element.url)}
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
            
/////////////////////////////////////////////////
            array[event.target.id].deletDate = moment().format("YYYYMMDD")

            bin.push(array[event.target.id])
            localStorage.setItem('bin', JSON.stringify(bin))
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
    bin = bin.concat(array)
    localStorage.setItem('bin', JSON.stringify(bin))
    array = []
    ul.innerHTML = ''
    renderItems()
}

const hint = document.querySelector('.hint')
const random = Math.random()*10

if(random > 4) hint.innerHTML = 'Press Shift+Space to search'

setTimeout(function(){
    hint.style.display = "none" 
}, 3000);

