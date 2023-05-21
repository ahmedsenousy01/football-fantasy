type QueueElement<T> = [T, number]; // Payload and Priority

class PriorityQueue<T> {
    private elements: QueueElement<T>[];

    constructor(initialElements: QueueElement<T>[] = []) {
        this.elements = initialElements;
        this.sort();
    }

    // Enqueue a new element with a priority
    public enqueue(payload: T, priority: number) {
        this.elements.push([payload, priority]);
        this.sort();
    }

    // Dequeue the element with the highest priority
    public dequeue(): T | undefined {
        return this.elements.shift()?.[0];
    }

    // Sort the elements based on priority
    private sort() {
        this.elements.sort((a, b) => b[1] - a[1]);
    }

    // Check if the queue is empty
    public isEmpty(): boolean {
        return this.elements.length === 0;
    }

    // Get the size of the queue
    public size(): number {
        return this.elements.length;
    }

    // Get the element with the highest priority without dequeuing it
    public peek(): T | undefined {
        return this.elements[0]?.[0];
    }

    // Print the entire queue
    print(): T[] {
        return this.elements.map(([payload, priority]) => payload);
    }
}
