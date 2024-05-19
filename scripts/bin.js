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

    const restoreAll = document.querySelector('.restore-all-el')
    restoreAll.addEventListener('click', ()=>{
        
        array = array.concat(bin)
        bin = []

        localStorage.setItem('array', JSON.stringify(array)) 
        localStorage.setItem('bin', JSON.stringify(bin))

        renderBin()
    })

    const removeAll = document.querySelector('.remove-all-el')
    removeAll.addEventListener('click', ()=>{
        bin = []
        localStorage.setItem('bin', JSON.stringify(bin))

        renderBin()
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
                    ${getFaviconUrl(element.url)}
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




