let storedItems = localStorage.getItem('ExtHistory')
const saveBtn = document.getElementById('save')
const test = document.getElementById('test')
if (storedItems===null){
    storedItems = []
}
else{
    storedItems = JSON.parse(storedItems)
}
const handleSubmit = (e) =>{
    e.preventDefault()
}
const loadSavedItems = () => {
    const ul = document.getElementById("history")
    if (storedItems.length >0 ){
        document.getElementById('history-head').style.display = "block"
    }
    else{
        document.getElementById('history-head').style.display = "none"
    }

    const innerVal = storedItems.reverse().map(item =>{
        return (
            `<li class='list-item'>
                <p id='list-date'>${item.date}</p>
                <div class='list-item-inner'>
                    <h6>${item.key}</h6>
                    <p title='click to copy' class='copy-text'>${item.value}</p>
                    <button class='delete-btn' id='${item.id}'  >X</button>
                </div>
            </li>`
        )
    })
    ul.innerHTML = innerVal.join("")
    const deleteBtns = document.getElementsByClassName('delete-btn')

    for (let i=0;i<deleteBtns.length;i++){
        deleteBtns[i].addEventListener('click',()=>{
            deleteFunction(deleteBtns[i].getAttribute('id'))
            
        })
    }
    const copyTexts = document.getElementsByClassName('copy-text')
    for (let i=0;i<copyTexts.length;i++){
        copyTexts[i].addEventListener('click',(event)=>{
            handleCopy(event)
        })
    }
}

const getJulianDay = () => {
    const date = new Date()
    const initialDate = new Date('1/1/'+date.getFullYear())
    let offsetHour= document.getElementById('offset').value 
    if (!offsetHour){
        offsetHour =0
    }

    const finalDate  = new Date(date.toLocaleDateString( date.setHours(date.getHours()+parseInt(offsetHour))))
    const julianDay = (Math.ceil((finalDate-initialDate) / (1000 * 60 * 60 * 24))+1)
    document.getElementById('julian_day').textContent = "Julian Day is: " + julianDay; 
}
const saveFunction = () => {
    const heading = document.getElementById('choice').value
    const saveValue = document.getElementById('save-value').value
    const dateNow = new Date(Date.now()).toLocaleString()
    
    let id = Math.max(...storedItems.map(item => item.id))
    id = id===-Infinity ? 1 : id+1
    if (heading && saveValue){
        const saveItem = {'id':id,'key':heading,'value':saveValue,'date':dateNow}
        storedItems.push(saveItem)
        localStorage.setItem('ExtHistory',JSON.stringify(storedItems))
        document.getElementById('save-value').value =""
        loadSavedItems()
    }
    else{
        const message = document.getElementById('message')
        message.textContent = 'Enter Both Fields'
        message.style.display='block'
        setTimeout(()=>{
            message.style.display='none'
        },2000)
    }
    
    
}
const handleCopy = (e) =>{
    const elementCopy = e.target
    navigator.clipboard.writeText(elementCopy.textContent)
    const message = document.getElementById('message')
    message.textContent = 'Copied to ClipBoard'
    message.style.display='block'
    setTimeout(()=>{
        message.style.display='none'
    },1000)


}
const deleteFunction = (id) => {
    storedItems = storedItems.filter(item => item.id!==parseInt(id))
    localStorage.setItem('ExtHistory',JSON.stringify(storedItems))
    loadSavedItems()
    
}
getJulianDay()
loadSavedItems()
document.getElementById('save').addEventListener('click',saveFunction)
//add Event listener not inline


document.getElementById('input-handle-container').addEventListener('submit',handleSubmit)

//find that comma bug
setInterval(()=>{
    getJulianDay()
},1000)