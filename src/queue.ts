export default class Queue {
  private queue: number[];

  constructor() {
    this.queue = [];
  }

  length(): number {
    return this.queue.length;
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  enQueue(item: number): void {
    this.queue.unshift(item);
  }

  deQueue(): number | undefined {
    return this.queue.pop();
  }

  peek(): number {
    return this.queue[this.queue.length - 1];
  }
}
