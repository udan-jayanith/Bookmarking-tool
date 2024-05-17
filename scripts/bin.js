let bin = []

const recycleBin = document.querySelector('.bin')


recycleBin.addEventListener('click', ()=>{

    const binDialog = document.querySelector('.bin-dialog')


    binDialog.showModal()
    renderBin()


    const restoreButton = document.querySelector('.restoreButton')
    restoreButton.addEventListener('click', function a(event){
        array.push(bin[event.target.id])
        bin.splice(event.target.id ,1)
    })

    const exitBin = document.querySelector('.exit-bin')
    exitBin.addEventListener('click', ()=>{
        binDialog.close()
    })

})

function renderBin(){
    const olBin = document.querySelector('.ol-bin')
    olBin.innerHTML =``
    bin.forEach((element, index)=>{
        olBin.innerHTML +=`
        <li class="li">
            <button class="dot"></button>
            <a>
                <p class="p">
                <img src="${getFaviconUrl(element.url)}">
                    ${getTitle(element.title)}
                </p>
            </a>
            <img src="images/history.png" class = "icon restoreButton" id="${index}">
        </li>
        `
    })
}