console.log("hello")
let notesObj;
let titlesObj;

showNotes();


// if user adds a note, add it to the localstorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    
    
    let addTitle = document.getElementById("title");
    let titles = localStorage.getItem("titles");
    
    if(titles==null)
    titlesObj = [];
    else
    titlesObj = JSON.parse(titles);
    
    if(addTitle.value == "")
    alert("Please add a Title")
    else
    titlesObj.push(addTitle.value);
    
    localStorage.setItem('titles',JSON.stringify(titlesObj));
    addTitle.value="";
    
    
    let addTxt = document.getElementById("note");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    
    if (addTxt.value == "")
        alert("Nothing present in the Note")
    else
        notesObj.push(addTxt.value);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();

});

// function to show notes once the user adds it

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let titles = localStorage.getItem("titles");
    if (titles == null) {
        titlesObj = [];
    }
    else {
        titlesObj = JSON.parse(titles);
    }
    let html = "";
  
    
        
        
        // titleHTML=addTitle.value;
    notesObj.forEach(function (element, index) {
        // titleHTML = addTitle.value
        
        
        html += ` <div class="note-body">
           <div class="actual-note">
           <h3 class="note-title">` + titlesObj[index]+`</h3>
               <p class="note">
                   ${element}
               </p>
               <button id="${index}" onClick="editNote(this.id)" class="edit">Edit</button>
               <button id="${index}" onClick="deleteNote(this.id)" class="delete">Delete</button>
           </div>
           </div>`

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0)
        notesElm.innerHTML = html;
    else
        notesElm.innerHTML = `No notes to display!`
}

// function to delete the note once the user deletes it


   function deleteNote(index){

   
    // console.log("I am deleting",index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = null;

    }
    else {
        notesObj = JSON.parse(notes);

    }
    let titles = localStorage.getItem("titles");
    if (titles == null) {
        titlesObj = null;

    }
    else {
        titlesObj = JSON.parse(titles);

    }

    notesObj.splice(index,1);
    titlesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    localStorage.setItem("titles",JSON.stringify(titlesObj));
    showNotes();

// });
   }

//    search functionality

   let search = document.getElementById('Searchbar');
   search.addEventListener("input",function(){
       let inputVal = search.value.toLowerCase().trim();
    //    console.log('input event fired');

       let noteBodies = document.getElementsByClassName('note-body');

       Array.from(noteBodies).forEach(function(element){

        let noteBdyTxt = element.getElementsByTagName('p')[0].innerText;
        let noteBdyTitle = element.getElementsByTagName('h3')[0].innerText;
        // console.log(noteBdyTxt);

        if(noteBdyTxt.includes(inputVal)||noteBdyTitle.includes(inputVal))
        element.style.display = "block";
        else
        element.style.display = "none";

       })
   })



// edit functionality
function editNote(index)
{
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = null;

    }
    else {
        notesObj = JSON.parse(notes);

    }
    let titles = localStorage.getItem("titles");
    if (titles == null) {
        titlesObj = null;

    }
    else {
        titlesObj = JSON.parse(titles);

    }

    var cancelTitle = titlesObj[index];
    var cancelNote = titlesObj[index];

    // let editTxt = localStorage.getItem('')

    let inp = document.createElement('input');
    inp.type = "text";
    inp.value = titlesObj[index];

     let title =  document.querySelectorAll('.note-title')[index];

    title.replaceWith(inp);

    let txtArea = document.createElement('textarea');
    txtArea.value = notesObj[index];
    let note = document.querySelectorAll('.note')[index];

    note.replaceWith(txtArea);

    let saveBtn = document.createElement('button');
    saveBtn.innerText = "Save";

    let cancelBtn = document.createElement('button');
    cancelBtn.innerText = "Cancel";

    
    let editBtn = document.querySelectorAll('.edit')[index];

    let deleteBtn = document.querySelectorAll('.delete')[index];

    editBtn.replaceWith(saveBtn);

    deleteBtn.replaceWith(cancelBtn)
  
    saveBtn.addEventListener('click',function(){
          titlesObj[index]= inp.value;
           notesObj[index]  = txtArea.value;
           
           inp.replaceWith(title);
           txtArea.replaceWith(note);

           saveBtn.replaceWith(editBtn);
           cancelBtn.replaceWith(deleteBtn);

           localStorage.setItem("notes",JSON.stringify(notesObj));
           localStorage.setItem("titles",JSON.stringify(titlesObj));
           showNotes();
    })

    cancelBtn.addEventListener ('click',function(){
        
        inp.replaceWith(title);
        txtArea.replaceWith(note);

        saveBtn.replaceWith(editBtn);
        cancelBtn.replaceWith(deleteBtn);

    })

    



}




































