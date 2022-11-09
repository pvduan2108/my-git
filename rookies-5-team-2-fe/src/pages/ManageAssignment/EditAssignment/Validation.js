export const validateAssignmentNote = note => {
  if (note.length > 1200) return "Note cannot be more than 1200 characters";
  return ""
};

export const validateSearchBox = searchTerm => {
  if (searchTerm.length > 49) return "Search cannot be more than 50 characters";
  return ""
};

export const validateTheSame = (after, before) => {
  if ((after.type === before.type) 
      && (after.assignedTo === before.assignedTo)
      && (after.assignedDate===before.assignedDate) 
      && (after.assetCode===before.assetCode)
      && (after.note===before.note)) {
      return "No change is made!";
  }
  return "";
}