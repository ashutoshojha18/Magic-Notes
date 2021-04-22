//Showing notes after reload.
showNotes();

//If user add notes add it to local storage.

//1. Get add notes button.
let addBtn = document.getElementById("addBtn");
//2. Add click event listener.
addBtn.addEventListener("click", function (e) {
    //3. Get add text 
    let addTxt = document.getElementById("addTxt");
    //4. checking the value and storing it to localStorage
    let notes = localStorage.getItem("notes");
    //5. Checking localstoage.
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    //6. If you want value at localstorage.
    localStorage.setItem("notes", JSON.stringify(notesObj));
    //7. After adding clear textarea.
    addTxt.value = ""
    // console.log(notesObj);
    //8. For showing notes.
    showNotes();
})

// Create function for showing notes.
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    //9. Create html blank.
    let html = "";
    notesObj.forEach(function (element, index) {
        //10. Using for append.
        html += ` <div id="notes" class="row container-fluid">

        <div class="noteCard my-2 mx-2  card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                    <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>

    </div>`;

    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = "Nothing to show here, please use add notes section to Add Notes."
    }

}

//Function to create delete notes.
function deleteNote(index) {
    // console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    //for deleting use slice function.
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//For searching.
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    
    let inputVal = search.value.toLowerCase();
    console.log("Fired", inputVal);

    //for note card
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
       if(cardTxt.includes(inputVal)){
           element.style.display= "block";
       }
       else{
           element.style.display = "none";
       }
       
        // console.log(cardTxt);
    })
})