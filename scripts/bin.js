const recycleBin = document.querySelector('.bin')


recycleBin.addEventListener('click', ()=>{

    const binDialog = document.querySelector('.bin-dialog')

    binDialog.showModal()

    bin.forEach((el, index)=>{
        var now = moment()
        now.format('DD')

        if(Number(el.deletDate) >= Number(now.format('DD'))) bin.splice(index , 1)
        
    })

    renderBin()

    const exitBin = document.querySelector('.exit-bin')
    exitBin.addEventListener('click', ()=>{
        binDialog.close()
        renderItems()
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

    const restoreButton = document.querySelectorAll('.restoreButton')
    restoreButton.forEach(button=>{
        button.addEventListener('click', function a(event){

            array.push(bin[event.target.id])
            bin.splice(event.target.id ,1)

            localStorage.setItem('array', JSON.stringify(array)) 
            localStorage.setItem('bin', JSON.stringify(bin))

            renderBin()
            button.removeEventListener('click', a)
        })
    })


}




