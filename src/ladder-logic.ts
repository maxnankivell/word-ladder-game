import { storeToRefs } from "pinia";
import { useWordObjectStore } from "@/stores/word-object-store";
import Queue from "./queue";
import { ParentConnection } from "./types";

/*
 * This function can be used to test if a valid solution exists as it will return null if one does not exist
 */
export function getShortestSolution(wordEntered: string, finalWord: string): string[] | null {
  const { wordArray, objectWithWordConnections } = storeToRefs(useWordObjectStore());
  const objectWithParents: ParentConnection = {};
  const queue = new Queue();

  if (!wordArray.value.includes(wordEntered) || !wordArray.value.includes(finalWord)) {
    return null;
  }

  // populateParentsObject(objectWithParents);

  objectWithParents[wordEntered] = null;
  queue.enQueue(wordEntered);
  while (!queue.isEmpty()) {
    const currentWord = queue.peek();
    queue.deQueue();
    for (const word of objectWithWordConnections.value[currentWord]) {
      if (word in objectWithParents) {
        continue;
      }

      objectWithParents[word] = currentWord;
      if (word === finalWord) {
        return getPathFromRootToLeaf(objectWithParents, word);
      }
      queue.enQueue(word);
    }
  }

  return null;
}

/*
 * This function checks if a word entered is valid
 */
export function isValidWord(wordEntered: string, previousWord: string): boolean {
  const { wordArray } = storeToRefs(useWordObjectStore());
  if (wordEntered.length !== 4 || !wordArray.value.includes(wordEntered)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < wordEntered.length; i++) {
    if (wordEntered.charAt(i) == previousWord.charAt(i)) {
      sum += 1;
    }
  }

  if (sum === 3) {
    return true;
  }
  return false;
}

/*
 * This function checks if the puzzle is complete
 */
export function isPuzzleComplete(wordEntered: string, finalWord: string): boolean {
  if (wordEntered === finalWord) {
    return true;
  }
  return false;
}

/*
 * This function retrieves a randow start an end word and returns them as an array
 */
export async function getRandomStartWordAndEndWord(): Promise<string[]> {
  const { wordArray, objectWithWordConnections } = storeToRefs(useWordObjectStore());
  const response = await fetch(
    `https://www.random.org/integers/?num=2&min=1&max=${wordArray.value.length}&col=1&base=10&format=plain&rnd=new`
  );
  const responseText = await response.text();
  const numberArray = responseText.split(/\r?\n/);
  const firstNumber = Number(numberArray[0]) - 1;
  const secondNumber = Number(numberArray[1]) - 1;
  if (
    notIntroPuzzle(wordArray.value[firstNumber], wordArray.value[secondNumber]) &&
    Object.keys(objectWithWordConnections.value).includes(wordArray.value[firstNumber]) &&
    !getWordsWithNumberOfConnections(1).includes(wordArray.value[firstNumber]) &&
    Object.keys(objectWithWordConnections.value).includes(wordArray.value[secondNumber]) &&
    !getWordsWithNumberOfConnections(1).includes(wordArray.value[secondNumber]) &&
    getShortestSolution(wordArray.value[firstNumber], wordArray.value[secondNumber])
  ) {
    console.log("success: ", wordArray.value[firstNumber], wordArray.value[secondNumber]);
    return [wordArray.value[firstNumber], wordArray.value[secondNumber]];
  }
  console.log("fail: ", wordArray.value[firstNumber], wordArray.value[secondNumber]);
  return getRandomStartWordAndEndWord();
}

/*
 * This function retrieves all possible next words from the current word
 */
export function getPossibleWords(word: string): string[] {
  const { objectWithWordConnections } = storeToRefs(useWordObjectStore());
  return objectWithWordConnections.value[word];
}

/*
 * This function retrieves the optimal next word from the current word
 */
export function getOptimalNextWord(word: string, finalWord: string): string | null {
  const bestWord = getShortestSolution(word, finalWord);
  if (bestWord && bestWord[1]) {
    return bestWord[1];
  }
  return null;
}

function notIntroPuzzle(wordEntered: string, finalWord: string): boolean {
  return wordEntered !== `them` && finalWord !== `than`;
}

function getWordsWithNumberOfConnections(n: number): string[] {
  const { objectWithWordConnections } = storeToRefs(useWordObjectStore());
  const result = [];

  for (const word in objectWithWordConnections.value) {
    if (objectWithWordConnections.value[word].length === n) {
      result.push(word);
    }
  }
  return result;
}

// function testForWordAlreadyInTree(
//   objectWithParents: ParentConnection,
//   wordToLookFor: string,
//   IDAtLeafOfTree: number
// ): boolean {
//   let testID: number | null = IDAtLeafOfTree;
//   let isAlreadyInTree = false;
//   if (objectWithParents[testID].word === wordToLookFor) {
//     isAlreadyInTree = true;
//   }
//   while (testID && objectWithParents[testID].parentID != null) {
//     testID = objectWithParents[testID].parentID;
//     if (testID && objectWithParents[testID].word === wordToLookFor) {
//       isAlreadyInTree = true;
//     }
//   }
//   return isAlreadyInTree;
// }

function getPathFromRootToLeaf(objectWithParents: ParentConnection, WordAtLeafOfTree: string): string[] {
  const finalSequence = [];
  let word: string | null = WordAtLeafOfTree;
  // The roots parent will always be empty string
  while (word != null) {
    finalSequence.unshift(word);
    word = objectWithParents[word];
  }

  return finalSequence;
}
