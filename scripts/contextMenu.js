document.onclick = hideMenu
document.oncontextmenu = rightClick

const menu = document.getElementById("contextMenu") 

function hideMenu() { 
    menu.style.display = "none" 
} 

function rightClick(e) { 
    e.preventDefault()

    if (menu.style.display == "block") hideMenu() 
    else { 
        
        if(e.pageX > 280 && e.pageY > 408){
            menu.style.display = 'block'
            menu.style.left = e.pageX-130 + "px"
            menu.style.top = e.pageY-130 + "px"
        }else if(e.pageX > 280){        
            menu.style.display = 'block'
            menu.style.left = e.pageX-130 + "px"
            menu.style.top = e.pageY + "px"
        }else if(e.pageY > 408){
            menu.style.display = 'block'
            menu.style.left = e.pageX + "px"
            menu.style.top = e.pageY-130 + "px"
        }else{
            menu.style.display = 'block'
            menu.style.left = e.pageX + "px"
            menu.style.top = e.pageY + "px"
        }
        
    }
} 