export interface WordConnection {
  [word: string]: string[];
}
// export interface ParentConnection {
//   [word: string]: string;
// }
export interface ParentConnection {
  [id: number]: { parentID: number | null; word: string };
}
