const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;

export function createNoteObject(content, category) {
  const timestamp = new Date().toLocaleString();
  const archived = false;
  const dates = content.match(dateRegex);
  return { timestamp, content, category, dates, archived };
}

const prepopulatedNotes = [
  createNoteObject('Buy groceries', 'Task'),
  createNoteObject('Call a friend', 'Task'),
  createNoteObject('Interesting idea', 'Idea'),
  createNoteObject('Remember to pay bills', 'Task'),
  createNoteObject('Book flight tickets', 'Task'),
  createNoteObject('Write a blog post', 'Task'),
  createNoteObject('Random thought', 'Random Thought')
];

export const initialNotesState = {
  activeNotes: prepopulatedNotes,
  archivedNotes: []
};
