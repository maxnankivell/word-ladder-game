import { doc, getDoc } from "firebase/firestore";
import db from "@/firebase";

let commonWords: string[] = [];

const docRef = doc(db, "words", "gLpQZjmVmo1iF8MezN7D");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  commonWords = docSnap.data().commonWords;
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

const content = commonWords.join(", ");

// async function populateDatabase() {
//   let commonWords: string[] = [];

//   const docRefWords = doc(db, "words", "gLpQZjmVmo1iF8MezN7D");
//   const docSnap = await getDoc(docRefWords);

//   if (docSnap.exists()) {
//     commonWords = docSnap.data().commonWords;
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }

//   wordArray.value = commonWords;
//   populateObjectWithWordConnections();

//   const docRefGame = doc(db, "words", "word-ladder");
//   await updateDoc(docRefGame, {
//     wordConnections: objectWithWordConnections.value,
//     allWords: commonWords,
//   });
//   console.log("done");
// }

// function populateObjectWithWordConnections(): void {
//   for (const outerWord of wordArray.value) {
//     for (const innerWord of wordArray.value) {
//       let sum = 0;
//       for (let i = 0; i < outerWord.length; i++) {
//         if (outerWord.charAt(i) == innerWord.charAt(i)) {
//           sum += 1;
//         }
//       }
//       if (sum === 3) {
//         if (objectWithWordConnections.value[outerWord]) {
//           objectWithWordConnections.value[outerWord].push(innerWord);
//         } else {
//           objectWithWordConnections.value[outerWord] = [innerWord];
//         }
//       }
//     }
//   }

//   console.log(objectWithWordConnections.value);
// }
