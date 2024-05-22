document.addEventListener("keypress", function(event) {

     console.log(event.key)

     if(event.shiftKey == false || event.key != ' ') return

     const searchDialog = document.querySelector('.searchDialog')
     searchDialog.showModal()

     const search = document.querySelector('.search')
     search.addEventListener('keyup', ()=>{

          const searchResult = array.filter((text) => {
               return (
                   text.title.toLowerCase().includes(search.value.toLowerCase()) ||
                   text.url.toLowerCase().includes(search.value.toLowerCase())
               );
           });
     
           const result = document.querySelector('.result')
           result.innerHTML = ''

           if(search.value == null) search.value = ''
     
           searchResult.forEach(el=>{
               console.log(el.url.split('/'))
               result.innerHTML += `
               <li>
                    <div>
                         <p class = "ap">
                              Title: 
                              <a class="title" href="${el.url}" target="_blank">${el.title} </a>
                         </p>
                         
                         <p class = "ap">
                              Url: 
                              <a href="${el.url}" target="_blank">${el.url.split('/')[2]} </a> 
                         </p>
                         
                         <hr>
                    </div>
               </li>
           `
           })
     
     })

     const searchDialogE = document.querySelector('.searchDialogE')
     searchDialogE.addEventListener('click', ()=>{
          searchDialog.close()
     })
 })