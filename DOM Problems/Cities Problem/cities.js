window.onload=function(){
    const searchKey=document.querySelector('#search');
    const list=document.querySelector('.list');

    searchKey.addEventListener('keyup',(e)=>{
        const key=e.target.value.toLowerCase();
        document.querySelectorAll('.item').forEach((items)=>{
            const currItem=items.textContent;
            if(currItem.toLowerCase().indexOf(key)!=-1){
                items.style.display='Block';
            }
            else{
                items.style.display='none';
            }
        })
    })

    list.addEventListener('click',(e)=>{
        alert(e.target.innerText)
    })
}
