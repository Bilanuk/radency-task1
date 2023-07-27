import { handleEditNote, handleArchiveNote, handleUnarchiveNote, handleDeleteNote } from './helpers/handlers.js';

import { activeNotes, archivedNotes } from './data.js';

const activeNotesList = document.querySelector('#activeNotesList');
const archivedNotesList = document.querySelector('#archivedNotesList');

function renderNotes(notes, targetElement) {
  if (notes.length === 0) {
    targetElement.innerHTML = '<h3>No notes to display</h3>';
    return;
  }

  targetElement.innerHTML = '';

  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.innerHTML = `
      <p><em>${note.category}</em></p>
      <p>${note.content}</p>
      <p>Dates: ${note.dates ? note.dates.join(', ') : 'N/A'}</p>
      <p><strong>${note.timestamp}</strong></p>
      ${targetElement === document.querySelector('#activeNotesList')
        ? `<button class="editButton" data-index="${index}">Edit</button>
           <button class="archiveButton" data-index="${index}">Archive</button>`
        : `<button class="unarchiveButton" data-index="${index}">Unarchive</button>`}
      <button class="deleteButton" data-index="${index}">Delete</button>
    `;
    targetElement.appendChild(noteDiv);

    addEventListenersAfterRender(targetElement);
  });
}

function addEventListenersAfterRender(targetElement) {
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

export function renderApp() {
  renderNotes(activeNotes, activeNotesList);
  renderNotes(archivedNotes, archivedNotesList);
  updateSummaryTable();
}
