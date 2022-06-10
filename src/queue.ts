export default class Queue {
  private queue: string[];

  constructor() {
    this.queue = [];
  }

  length(): number {
    return this.queue.length;
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  enQueue(item: string): void {
    this.queue.unshift(item);
  }

  dequeue(): string | undefined {
    return this.queue.pop();
  }

  peek(): string {
    return this.queue[this.queue.length - 1];
  }
}
