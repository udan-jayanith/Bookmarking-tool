const editButton = document.querySelector('.editButton')
let editArray = structuredClone(array)

editButton.addEventListener('click', ()=>{
    const edit = document.querySelector('.edit')
    edit.showModal()

    editArray = structuredClone(array)
    for(let i = 0; i<editArray.length; i++){
        editArray[i].num = i+1
    }

    renderEdit()

})

function itemUp(){
    const up = document.querySelectorAll('.up')

    up.forEach( (item)=>{
        item.addEventListener('click', (event)=> {
            const index = Number(event.target.id)
            
            if(index == 0){
                const preiousItem = editArray[editArray.length-1]

                editArray[editArray.length-1] = editArray[0]
                editArray[0] = preiousItem
                
                renderEdit()
                
                return
            }

            const preiousItem = editArray[index]

            editArray[index] = editArray[index-1]
            editArray[index-1] = preiousItem

            renderEdit()

        })
    })
}

function itemDown(){
    const down = document.querySelectorAll('.down')

    down.forEach( (item)=>{
        item.addEventListener('click', (event)=> {
            const index = Number(event.target.id)
            
            if(index == editArray.length-1){
                const preiousItem = editArray[0]

                editArray[0] = editArray[editArray.length-1]
                editArray[editArray.length-1] = preiousItem
                renderEdit()

                return
            }

            const preiousItem = editArray[index]

            editArray[index] = editArray[index+1]
            editArray[index+1] = preiousItem

            renderEdit()

        })
    })
}

function editBookmark(){
    const editBookmarkEl = document.querySelectorAll('.edit-bookmark')
    
    const editDialog = document.querySelector('.edit-dialog')
    const inputUrl = document.querySelector('.url-edit')
    const inputTitle = document.querySelector('.title-edit')
    const doneButton = document.querySelector('.done-edit')
    const cancelButton = document.querySelector('.cancel-edit')

    editBookmarkEl.forEach( (item)=>{
        item.addEventListener('click', (event)=>{
            const index = Number(event.target.id)
        
            editDialog.showModal()

            inputUrl.value = editArray[index].url
            inputTitle.value = editArray[index].title

            doneButton.addEventListener('click', function x(){
                editArray[index].url = inputUrl.value
                editArray[index].title = inputTitle.value 

                editDialog.close()
                
                renderEdit()
                console.log(index)
                doneButton.removeEventListener('click', x)
            })

            cancelButton.addEventListener('click', ()=>{
                editDialog.close()
            })

        })
    })
}

function renderEdit(){
    const ol = document.querySelector('.ol')
    ol.innerHTML = ''

    editArray.forEach((element, index) => {

        ol.innerHTML += `
        <li>
            <div class="listDiv">
                <hr>
                <p>${element.num}. ${element.title}</p>
                <button class="up" id="${index}">Up</button>
                <button class="down" id="${index}">Down</button>
                <button class="edit-bookmark" id="${index}">Edit bookmark</button>
            </div>
        </li>
        `
    })

    itemUp()
    itemDown()
    editBookmark()
}


const saveEdit = document.querySelector('.save-edit')
saveEdit.addEventListener('click', ()=>{
    array = structuredClone(editArray)
    localStorage.setItem('array', JSON.stringify(array)) 

    const edit = document.querySelector('.edit')
    edit.close()
    renderItems()
})

const cancelEdit = document.querySelector('.exit-edit')
cancelEdit.addEventListener('click', ()=>{

    const edit = document.querySelector('.edit')
    edit.close()
})
