let inputNewText = document.getElementById('inputNewText');
let inputDate = document.getElementById('inputDate');
let inputTime = document.getElementById('inputTime');

function saveNewNoteFunction(e) {
    e.preventDefault();
    let counterLocal = window.localStorage.getItem('counter');
    if (!counterLocal) {
        counterLocal = 0;
    } else {
        counterLocal++
    }
    window.localStorage.setItem('counter', counterLocal)

    if (inputNewText.value && inputDate.value && inputTime.value) {
        createNote(inputNewText.value, inputDate.value, inputTime.value, counterLocal)
    }
    const noteParameters = {
        "content": inputNewText.value,
        "date": inputDate.value,
        "time": inputTime.value,
        "counter": counterLocal
    }
    
    let noteStracture = window.localStorage.getItem('notes');
    if (!noteStracture) {
        noteStracture = [];
    } else {
        noteStracture = JSON.parse(noteStracture);
    }
    noteStracture.push(noteParameters);
    window.localStorage.setItem('notes', JSON.stringify(noteStracture))
}

function getNotesFromLocalStorage() {
    let notes = JSON.parse(window.localStorage.getItem('notes'));
    try {
        notes.forEach(element => {
            createNote(element.content, element.date, element.time, element.counter)
        });
    } catch (e){
        console.log(e)
    }
}

function createNote(title, date, hour, counter) {
    let note = document.createElement('div');
    let notes = document.getElementById('savesNotes');
    note.setAttribute("class", "note")
    note.setAttribute("id", counter)
    let noteContent = document.createElement('div');
    noteContent.setAttribute('class', 'noteContent');
    let savedText = document.createElement("textarea");
    savedText.setAttribute('class', 'noteTextArea')
    savedText.innerHTML = title;
    let savedDate = document.createElement("p");
    savedDate.innerHTML = date;
    let savedHour = document.createElement("span");
    savedHour.innerHTML = hour;
    savedDate.setAttribute('class', 'savedDateParagraph')
    savedHour.setAttribute('class', 'savedHourParagraph')
    let btnX = document.createElement('button');
    btnX.setAttribute('class', 'btn-close')
    btnX.addEventListener('click',(e)=>{
        erase(e);
    })
    note.addEventListener('mouseover',()=>{
        btnX.style.visibility="visible";
    })
    note.addEventListener('mouseleave',()=>{
        btnX.style.visibility="hidden";
    })
    note.append(btnX)
    notes.append(note)
    note.append(noteContent)
    noteContent.append(savedText);
    noteContent.append(savedDate);
    noteContent.append(savedHour);
}

function erase(e){
    let parent =  e.target.parentElement;
    let notes = JSON.parse(window.localStorage.getItem('notes'));
    let newArray = notes.filter(note=> note.counter!=parent.id);
    window.localStorage.setItem('notes',JSON.stringify(newArray));
    parent.remove()
}

document.body.addEventListener('load',()=>{
    document.body.style.animation= "none";
})



