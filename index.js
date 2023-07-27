import { createNoteObject, initialNotesState, dateRegex } from './data.js';

let activeNotes = initialNotesState.activeNotes;
let archivedNotes = initialNotesState.archivedNotes;

const noteInput = document.querySelector('#noteInput');
const categorySelect = document.querySelector('#categorySelect');
const activeNotesList = document.querySelector('#activeNotesList');
const archivedNotesList = document.querySelector('#archivedNotesList');
const editNoteContainer = document.querySelector('#editNoteContainer');
const editNoteContent = document.querySelector('#editNoteContent');
const editCategorySelect = document.querySelector('#editCategorySelect');
const saveEditButton = document.querySelector('#saveEditButton');
const cancelEditButton = document.querySelector('#cancelEditButton');
let activeNoteIndexToEdit = -1;

function renderNotes(notes, targetElement) {
  targetElement.innerHTML = '';

  if (notes.length === 0) {
    targetElement.innerHTML = '<h3>No notes to display</h3>';
    return;
  }

  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.innerHTML = `
      <p><em>${note.category}</em></p>
      <p>${note.content}</p>
      <p>Dates: ${note.dates ? note.dates.join(', ') : 'N/A'}</p>
      <p><strong>${note.timestamp}</strong></p>
      ${targetElement === activeNotesList
        ? `<button class="editButton" data-index="${index}">Edit</button>
           <button class="archiveButton" data-index="${index}">Archive</button>`
        : `<button class="unarchiveButton" data-index="${index}">Unarchive</button>`}
      <button class="deleteButton" data-index="${index}">Delete</button>
    `;
    targetElement.appendChild(noteDiv);
  });

  const editButtons = targetElement.querySelectorAll('.editButton');
  editButtons.forEach(button => button.addEventListener('click', handleEditNote));

  const archiveButtons = targetElement.querySelectorAll('.archiveButton');
  archiveButtons.forEach(button => button.addEventListener('click', handleArchiveNote));

  const unarchiveButtons = targetElement.querySelectorAll('.unarchiveButton');
  unarchiveButtons.forEach(button => button.addEventListener('click', handleUnarchiveNote));

  const deleteButtons = targetElement.querySelectorAll('.deleteButton');
  deleteButtons.forEach(button => button.addEventListener('click', handleDeleteNote));
}

function updateSummaryTable() {
  const categoryCounts = {};

  activeNotes.forEach(note => {
    categoryCounts[note.category] = (categoryCounts[note.category] || 0) + 1;
  });

  archivedNotes.forEach(note => {
    categoryCounts[note.category] = (categoryCounts[note.category] || 0) + 1;
  });

  const summaryTable = document.querySelector('#summaryTable');
  summaryTable.innerHTML = `
    <tr>
      <th>Category</th>
      <th>Active Notes</th>
      <th>Archived Notes</th>
    </tr>
    ${Object.keys(categoryCounts).map(category => `
      <tr>
        <td>${category}</td>
        <td>${activeNotes.filter(note => note.category === category).length}</td>
        <td>${archivedNotes.filter(note => note.category === category).length}</td>
      </tr>
    `).join('')}
  `;
}

function rerenderApp() {
  renderNotes(activeNotes, activeNotesList);
  renderNotes(archivedNotes, archivedNotesList);
  updateSummaryTable();
}

function handleAddNote() {
  const content = noteInput.value.trim();
  const category = categorySelect.value;

  if (content === '') return;

  const newNote = createNoteObject(content, category);
  activeNotes.push(newNote);

  rerenderApp();
  noteInput.value = '';
}

function openEditForm(index) {
  const noteToEdit = activeNotes[index];
  editNoteContent.value = noteToEdit.content;
  editCategorySelect.value = noteToEdit.category;
  editNoteContainer.style.display = 'block';
  activeNoteIndexToEdit = index;
}

function closeEditForm() {
  editNoteContainer.style.display = 'none';
  activeNoteIndexToEdit = -1;
}

function handleEditNote(event) {
  const index = event.target.dataset.index;
  openEditForm(index);
}

function handleSaveEdit() {
  if (activeNoteIndexToEdit !== -1) {
    const newContent = editNoteContent.value.trim();
    const newCategory = editCategorySelect.value;

    if (newContent !== '') {
      activeNotes[activeNoteIndexToEdit].content = newContent;
      activeNotes[activeNoteIndexToEdit].dates = newContent.match(dateRegex);
      activeNotes[activeNoteIndexToEdit].category = newCategory;
      closeEditForm();
      rerenderApp();
    } else {
      alert('Note content cannot be empty.');
    }
  }
}

function handleCancelEdit() {
  closeEditForm();
}


function handleArchiveNote(event) {
  const index = event.target.dataset.index;
  const archivedNote = activeNotes.splice(index, 1)[0];
  archivedNote['archived'] = true;
  archivedNotes.push(archivedNote);
  rerenderApp();
}

function handleUnarchiveNote(event) {
  const index = event.target.dataset.index;
  const unarchivedNote = archivedNotes.splice(index, 1)[0];
  unarchivedNote['archived'] = false;
  activeNotes.push(unarchivedNote);
  rerenderApp();
}

function handleDeleteNote(event) {
  const index = event.target.dataset.index;
  if (event.target.parentElement.parentElement === activeNotesList) {
    activeNotes.splice(index, 1);
  } else {
    archivedNotes.splice(index, 1);
  }

  rerenderApp();
}

document.querySelector('#addButton').addEventListener('click', handleAddNote);
saveEditButton.addEventListener('click', handleSaveEdit);
cancelEditButton.addEventListener('click', handleCancelEdit);

rerenderApp();