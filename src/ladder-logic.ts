import { storeToRefs } from "pinia";
import { useWordObjectStore } from "@/stores/word-object-store";
import Queue from "./queue";
import { ParentConnection } from "./types";

/*
 * This method can be used to test if a valid solution exists as it will return null if one does not exist
 */
export function getShortestSolution(wordEntered: string, finalWord: string): string[] | null {
  const { objectWithWordConnections, objectWithParents } = storeToRefs(useWordObjectStore());
  const queue = new Queue();

  queue.enQueue(wordEntered);
  while (!queue.isEmpty()) {
    const currentWord = queue.peek();
    queue.deQueue();
    for (const word of objectWithWordConnections.value[currentWord]) {
      if (testForWordAlreadyInTree(objectWithParents.value, word, currentWord, wordEntered)) {
        continue;
      }

      objectWithParents.value[word] = currentWord;
      if (word === finalWord) {
        return getPathFromRootToLeaf(objectWithParents.value, finalWord);
      }
      queue.enQueue(word);
    }
  }

  return null;
}

function testForWordAlreadyInTree(
  objectWithParents: ParentConnection,
  wordToLookFor: string,
  wordAtLeafOfTree: string,
  wordAtRootOfTree: string
): boolean {
  let testWord = wordAtLeafOfTree;
  if (testWord === wordToLookFor) {
    return true;
  }
  while (testWord != wordAtRootOfTree) {
    testWord = objectWithParents[testWord];
    if (testWord === wordToLookFor) {
      return true;
    }
  }
  return false;
}

function getPathFromRootToLeaf(objectWithParents: ParentConnection, wordAtLeafOfTree: string): string[] {
  const finalSequence = [];
  let word = wordAtLeafOfTree;
  // The roots parent will always be empty string
  while (word) {
    finalSequence.unshift(word);
    word = objectWithParents[word];
  }

  return finalSequence;
}
