"use client"

import { QueueControls } from "@/components/visualizer/queue/queue-controls"
import { QueueDisplay } from "@/components/visualizer/queue/queue-display"
import { QueueOperations } from "@/components/visualizer/queue/queue-operations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQueue } from "@/hooks/use-queue"
import { useState, useMemo } from "react"

// Import QueueNode type from where it's defined
import { QueueNode } from "@/components/visualizer/queue/types" // Assuming types.ts defines QueueNode

// SIMPLIFIED Helper function to generate Queue C++ code with standalone functions
// It now directly accepts QueueNode[] and the queue's max capacity.
const generateQueueCppCode = (currentQueueNodes: QueueNode[], maxCapacity: number): string => {
  const elements = currentQueueNodes.map(node => node.value) || [];
  const capacity = maxCapacity;

  const initializations = elements.length > 0
    ? `    // Current queue elements: ${elements.join(', ')}\n` +
      elements.map(val => `    enqueue(${val});`).join('\n') // Call standalone enqueue
    : `    // Queue is currently empty`;

  return `
#include <iostream>
#include <vector>


void enqueue(int item) {
    if (isFull()) {
        return; // Queue is full, cannot add
    }
    queue_rear_idx = (queue_rear_idx + 1) % QUEUE_CAPACITY; // Move rear_idx circularly
    queue_arr[queue_rear_idx] = item; // Insert item
    queue_current_size++; // Increment size
}

int dequeue() {
    if (isEmpty()) {
        return -1; // Queue is empty, cannot remove; return -1 as indicator
    }
    int item = queue_arr[queue_front_idx]; // Get front item
    queue_front_idx = (queue_front_idx + 1) % QUEUE_CAPACITY; // Move front_idx circularly
    queue_current_size--; // Decrement size
    return item;
}

int main() {

${initializations}

}
  `.trim();
};


interface QueueVisualizerProps {
  content: React.ReactNode
}

export function QueueVisualizer({ content }: QueueVisualizerProps) {
  const QUEUE_MAX_SIZE = 8; // Define your max size here or get it from props

  const [activeTab, setActiveTab] = useState<string>('visualization');

  const {
    queue,
    operations,
    isAnimating,
    highlightedIndex,
    enqueue,
    dequeue,
    clear,
    isFull,
    isEmpty,
  } = useQueue(QUEUE_MAX_SIZE);

  const queueCppCode = useMemo(() => generateQueueCppCode(queue, QUEUE_MAX_SIZE), [queue, QUEUE_MAX_SIZE]);


  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Queue</h1>
        <p className="text-muted-foreground">
          A First-In-First-Out (FIFO) data structure with enqueue and dequeue operations.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <QueueControls
                onEnqueue={enqueue}
                onDequeue={dequeue}
                onClear={clear}
                isAnimating={isAnimating}
                isFull={isFull}
                isEmpty={isEmpty}
              />
              <QueueOperations operations={operations} />
            </div>
            <div className="xl:col-span-2">
              <QueueDisplay
                queue={queue}
                highlightedIndex={highlightedIndex}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="prose prose-invert max-w-none">
          <h3 className="text-xl font-semibold mb-2">Queue C++ Code (Procedural Style)</h3>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
            <code>
              {queueCppCode}
            </code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  )
}