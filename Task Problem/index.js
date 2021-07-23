(function Load(){

    const form=document.querySelector('#form');
    const inputText=document.querySelector('#inputText');
    const taskList=document.querySelector('.taskList');
    const clearTask=document.querySelector('#clearBtn');
    const filterText=document.querySelector('#filter');

    LoadEvent();
    function LoadEvent(){

        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            const li=document.createElement('li');
            li.className='listItem';
            li.appendChild(document.createTextNode(inputText.value));
            const a=document.createElement('a');
            a.className='deleteBtn';
            a.innerHTML='<i class="deleteBtn">***</>'
            li.appendChild(a);
            if(inputText.value!==''){
                taskList.appendChild(li);
            }
            inputText.value='';
        })

        taskList.addEventListener('click',(e)=>{
           if(e.target.parentElement.classList.contains('deleteBtn')){
               if(confirm("Are you sure ?")) e.target.parentElement.parentElement.remove();
           }  
        })

        clearTask.addEventListener('click',(e)=>{
            taskList.innerHTML='';
        })

        filterText.addEventListener('keyup',(e)=>{
            const text=e.target.value.toLowerCase();
              document.querySelectorAll(".listItem").forEach(function (ele) {
                const item = ele.textContent;
                if (item.toLowerCase().indexOf(text) != -1) {
                  ele.style.display = "block";
                } else {
                  ele.style.display = "none";
                }
              });
        })
    }
    
})()