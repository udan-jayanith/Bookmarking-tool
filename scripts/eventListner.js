const customeBookMark = document.querySelector('.addToBookMark')
const bookmarkThisTab = document.querySelector('.Bookmark')
const clearAll = document.querySelector('.clearAll')


customeBookMark.addEventListener("click", addUrl)
bookmarkThisTab.addEventListener('click', currentTab)
clearAll.addEventListener('dblclick', deleteAll)

document.addEventListener("keypress", function(event) {///////////
    if (event.key == 'Enter') {
        currentTab()
    }
})

document.querySelector(".title").focus()


clearAll.addEventListener('click', ()=>{
    const popupDialog = document.querySelector('.deleteAll')
    const popupYes = document.querySelector('.popup-yes')
    const popupNo = document.querySelector('.popup-no')

    popupDialog.showModal()


    popupYes.addEventListener('click', ()=>{
        deleteAll()
        popupDialog.close()
    })

    popupNo.addEventListener('click', ()=>{
        popupDialog.close()
    })
})

