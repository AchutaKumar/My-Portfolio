const name = "Hii I'am SAMEER";
let index = 0;


setInterval(()=>{
    if (index < name.length) {
        document.querySelector('.myname').innerHTML += name.charAt(index)
        index++
    }else{
        index=0
        document.querySelector('.myname').innerHTML = ''
    }
    
},150)
