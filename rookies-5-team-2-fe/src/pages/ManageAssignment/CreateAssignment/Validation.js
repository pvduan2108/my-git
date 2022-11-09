export const validateAssignmentNote = note => {
    if (note.length > 1200) return "Note cannot be more than 1200 characters";
    return ""
  };

export const validateDate = (day, month, year) => {
  const currentTime = new Date();
  if(year > currentTime.getFullYear) return true;
  if(month > currentTime.getMonth() + 1) return true;
  if(day >= currentTime.getDate()) return true;
  return false;
}