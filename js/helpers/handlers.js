import {
  activeNotes,
  archivedNotes,
  createNoteObject,
  activeNoteIndexToEdit,
  dateRegex,
  updateActiveNotes
}
from '../data.js';

import {
  renderApp
} from '../render.js'

import {
  openEditForm,
  closeEditForm
} from './modalForm.js';

const noteInput = document.querySelector('#noteInput');
const categorySelect = document.querySelector('#categorySelect');
const activeNotesList = document.querySelector('#activeNotesList');
const archivedNotesList = document.querySelector('#archivedNotesList');
const editNoteContent = document.querySelector('#editNoteContent');
const editCategorySelect = document.querySelector('#editCategorySelect');
const saveEditButton = document.querySelector('#saveEditButton');
const cancelEditButton = document.querySelector('#cancelEditButton');

function handleAddNote() {
  try {
    const content = noteInput.value.trim();
    const category = categorySelect.value;

    if (content === '') return;

    const newNote = createNoteObject(content, category);
    activeNotes.push(newNote);

    renderApp();
    noteInput.value = '';
  } catch (error) {
    console.error('Error while adding a new note:', error);
  }
}

function handleEditNote(event) {
  const index = event.target.dataset.index;
  openEditForm(index);
}

function handleUnarchiveNote(event) {
  try {
    const index = event.target.dataset.index;
    const unarchivedNote = archivedNotes.splice(index, 1)[0];
    unarchivedNote['archived'] = false;
    activeNotes.push(unarchivedNote);
    renderApp();
  } catch (error) {
    console.error('Error while unarchiving the note:', error);
  }
}

function handleDeleteNote(event) {
  const index = event.target.dataset.index;
  if (event.target.parentElement.parentElement === activeNotesList) {
    activeNotes.splice(index, 1);
  } else if (event.target.parentElement.parentElement === archivedNotesList) {
    archivedNotes.splice(index, 1);
  } else {
    throw new Error('Unknown note type');
  }

  renderApp();
}

function handleSaveEdit() {
  try {
    if (activeNoteIndexToEdit === -1) {
      return;
    }

    const newContent = editNoteContent.value.trim();
    const newCategory = editCategorySelect.value;

    if (newContent === '') {
      alert('Note content cannot be empty.');
      return;
    }

    const updatedNote = {
      ...activeNotes[activeNoteIndexToEdit],
      content: newContent,
      dates: newContent.match(dateRegex),
      category: newCategory,
    };

    updateActiveNotes([
      ...activeNotes.slice(0, activeNoteIndexToEdit),
      updatedNote,
      ...activeNotes.slice(activeNoteIndexToEdit + 1),
    ]);

    closeEditForm();
    renderApp();
  } catch (error) {
    console.error('Error while saving the edited note:', error);
  }
}

function handleArchiveNote(event) {
  const index = event.target.dataset.index;
  const archivedNote = activeNotes.splice(index, 1)[0];
  archivedNote['archived'] = true;
  archivedNotes.push(archivedNote);
  renderApp();
}

function handleCancelEdit() {
  closeEditForm();
}

document.querySelector('#addButton').addEventListener('click', handleAddNote);
saveEditButton.addEventListener('click', handleSaveEdit);
cancelEditButton.addEventListener('click', handleCancelEdit);

export {
  handleAddNote,
  handleEditNote,
  handleUnarchiveNote,
  handleDeleteNote,
  handleArchiveNote,
  handleSaveEdit,
  handleCancelEdit,
};