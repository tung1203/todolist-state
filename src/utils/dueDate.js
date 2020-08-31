import converIso from "./convertIso";
/**
 * normal
 * warning
 * overDate
 */
export default function dueDate(dueDate) {
  let alarm = 1000 * 60 * 60 * 24 * 1; // 1 day //8640000

  const today = converIso(Date.now());
  dueDate = converIso(dueDate);
  let timeLeft = new Date(dueDate) - new Date(today);
  if (timeLeft < 0) {
    return "overdate";
  }
  if (timeLeft < alarm) {
    return "warning";
  }

  return "normal";
}
