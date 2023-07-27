export const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;

export function createNoteObject(content, category) {
  const timestamp = new Date().toLocaleString();
  const archived = false;
  const dates = content.match(dateRegex);
  return { timestamp, content, category, dates, archived };
}

const prepopulatedNotes = [
  createNoteObject('I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021', 'Task'),
  createNoteObject('Call a friend', 'Task'),
  createNoteObject('Interesting idea', 'Idea'),
  createNoteObject('Remember to pay bills', 'Task'),
  createNoteObject('Book flight tickets', 'Task'),
  createNoteObject('Write a blog post', 'Task'),
  createNoteObject('Random thought', 'Random Thought')
];

export function setActiveNoteIndexToEdit(index) {
  activeNoteIndexToEdit = index;
}

export function updateActiveNotes(updatedNotes) {
  activeNotes = updatedNotes;
}

export const initialNotesState = {
  activeNotes: prepopulatedNotes,
  archivedNotes: []
};

export let activeNotes = initialNotesState.activeNotes;
export let archivedNotes = initialNotesState.archivedNotes;
export let activeNoteIndexToEdit = -1;