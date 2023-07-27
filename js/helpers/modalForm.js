import { activeNotes, setActiveNoteIndexToEdit } from '../data.js';

function openEditForm(index) {
  const noteToEdit = activeNotes[index];
  editNoteContent.value = noteToEdit.content;
  editCategorySelect.value = noteToEdit.category;

  const editButtonRect = event.target.getBoundingClientRect();
  const containerRect = activeNotesList.getBoundingClientRect();

  const topOffset = editButtonRect.bottom - containerRect.top + 150;
  const leftOffset = editButtonRect.left;

  editNoteContainer.style.position = 'absolute';
  editNoteContainer.style.top = `${topOffset}px`;
  editNoteContainer.style.left = `${leftOffset}px`;
  editNoteContainer.style.display = 'block';

  setActiveNoteIndexToEdit(index);
}

function closeEditForm() {
  editNoteContainer.style.display = 'none';
  setActiveNoteIndexToEdit(-1);
}

export {
  openEditForm,
  closeEditForm
}
