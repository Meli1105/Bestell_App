// function renderMenu() {
//     let contentRef = document.getElementById("content");
//   contentRef.innerHTML = ""; // in case of a render function --> empty innerHTML before adding the content, otherwhise the content will be repeated over and over again

//   for (let indexNote = 0; indexNote < allNotes.entry.length; indexNote++) {
//     if (allNotes.entryTypes[indexNote] === "note") {
//       contentRef.innerHTML += getNoteTemplate(indexNote); // += means adding to existing content
//     } else if (allNotes.entryTypes[indexNote] === "diary") {
//       contentRef.innerHTML += getDiaryTemplate(indexNote);
//     }
//   }
// }
