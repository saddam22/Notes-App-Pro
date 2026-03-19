let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes(){
	localStorage.setItem("notes", JSON.stringify(notes))
}

function renderNotes(){

	let container = document.getElementById("notesContainer");
	container.innerHTML = "";

	notes.forEach((note, index) =>{
		container.innerHTML += `
			<div class="bg-white p-4 rounded shadow">
			<p class="mb-2">${note.text}</p>
			<p class="text-xs text-gray-500 mb-2">${note.date}</p>
			<div class="flex gap-2">

			<button onclick="editNote(${index})" class="bg-yellow-400 px-3 py-1 rounded">Edit</button>
			<button onclick="deleteNote(${index})" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
			</div>
			</div>
		`;
	});
}

function addNote(){
	let input = document.getElementById("noteInput");

	if(input.value.trim() === "") return;
		let note = {
			text: input.value,
			date: new Date().toLocaleString()
		}
		notes.push(note);
		saveNotes();
		renderNotes();
		input.value = "";
}

function editNote(index){
	let newText = prompt("Edit your Note: ", notes[index].text);
	if(newText){
		notes[index].text = newText;
		notes[index].date = new Date().toLocaleString();
		saveNotes();
		renderNotes();
	}
}

function deleteNote(index){
	notes.splice(index, 1);
	saveNotes();
	renderNotes();
}

document.getElementById('search').addEventListener("input", function(){
	let keyword = this.value.toLowerCase();
	let container = document.getElementById("notesContainer");
	container.innerHTML = "";

	notes.filter(n => n.text.toLowerCase().includes(keyword)).forEach((note, index) =>{
		container.innerHTML +=`
			<div class="bg-white p-4 rounded shadow">
			<p class="mb-2">${note.text}</p>
			<p class="text-xs text-gray-500 mb-2">${note.date}</p>
			<button onclick="deleteNote(${index})" class="bg-red-500 text-white
			 px-3 py-1 rounded">Delete</button>
			</div>
		`;
	});
});
renderNotes();