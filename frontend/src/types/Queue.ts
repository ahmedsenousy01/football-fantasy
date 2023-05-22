import assert, { assertDefined } from "@/utils/error/assert";

class QueueNode<T> {
  value: T;
  next: QueueNode<T> | null;

  constructor(value: T, next: QueueNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export class Queue<T> {
  head: QueueNode<T> | null = null;
  tail: QueueNode<T> | null = null;
  private size: number = 0;
  get length() {
    return this.size;
  }
  constructor(arr?: Array<T>) {
    if (arr !== undefined) {
      this.head = new QueueNode(arr[0]);
      this.tail = this.head;
      assertDefined(this.tail);
      arr.slice(1).forEach((val) => {
        // @ts-ignore
        this.tail.next = new QueueNode(val);
        // @ts-ignore
        this.tail = this.tail.next;
      });
      this.size = arr.length;
    }
  }

  isEmpty() {
    return this.head !== null;
  }

  pop() {
    assert(this.head !== null, "Popping from empty queue");
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    return value;
  }

  push(value: T) {
    if (this.tail === null) {
      this.head = new QueueNode<T>(value);
      this.tail = this.head;
      return;
    }

    this.tail.next = new QueueNode<T>(value);
    this.tail = this.tail.next;
    this.size++;
  }
}
