"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkedListDisplay } from "@/components/visualizer/linked-list/linked-list-display"
import { LinkedListControls } from "@/components/visualizer/linked-list/linked-list-controls"
import { LinkedListOperations } from "@/components/visualizer/linked-list/linked-list-operations"
import { useLinkedList } from "@/hooks/use-linked-list"
import { ListType, LinkedList, ListNode } from "./types"
import { useState, useMemo } from "react" // Import useMemo


// REMOVED: import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// REMOVED: import { vscDarkPlus } from 'react-syntax-highlighter/styles/prism'; // Or any other style import


const LIST_TYPES: { value: ListType; label: string }[] = [
  { value: 'SLL', label: 'SLL' },
  { value: 'DLL', label: 'DLL' },
]

interface LinkedListVisualizerProps {
  content?: React.ReactNode
}

// Helper function to generate SLL C++ code based on current list state
const generateSLLCppCode = (list: LinkedList): string => {
  let nodeValues: number[] = [];
  let current = list.head;
  const visited = new Set<string>();

  while (current && !visited.has(current)) {
    const node = list.nodes.get(current);
    if (!node) break;
    nodeValues.push(Number(node.value));
    visited.add(current);
    current = node.next;
  }

  const initializations = nodeValues.length > 0
    ? `    // Current list elements: ${nodeValues.join(', ')}\n` +
      nodeValues.map(val => `    sll.insertBack(${val});`).join('\n')
    : `    // List is currently empty`;


  return `
// Singly Linked List in C++
#include <iostream>

class Node {
public:
    int data;
    Node* next;

    Node(int val) : data(val), next(nullptr) {}
};

class SinglyLinkedList {
public:
    Node* head;

    SinglyLinkedList() : head(nullptr) {}

    void insertFront(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    void insertBack(int val) {
        Node* newNode = new Node(val);
        if (head == nullptr) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next != nullptr) {
            temp = temp->next;
        }
        temp->next = newNode;
    }

    void deleteFront() {
        if (head == nullptr) {
            std::cout << "List is empty. Cannot delete from front." << std::endl;
            return;
        }
        Node* temp = head;
        head = head->next;
        delete temp;
    }

    void deleteBack() {
        if (head == nullptr) {
            std::cout << "List is empty. Cannot delete from back." << std::endl;
            return;
        }
        if (head->next == nullptr) { // Only one node
            delete head;
            head = nullptr;
            return;
        }
        Node* temp = head;
        while (temp->next->next != nullptr) {
            temp = temp->next;
        }
        delete temp->next;
        temp->next = nullptr;
    }

    void display() {
        Node* temp = head;
        while (temp != nullptr) {
            std::cout << temp->data << " -> ";
            temp = temp->next;
        }
        std::cout << "nullptr" << std::endl;
    }
};

int main() {
    SinglyLinkedList sll;
${initializations}
    std::cout << "Current list: ";
    sll.display();
    return 0;
}
  `.trim();
};

const generateDLLCppCode = (list: LinkedList): string => {
  let nodeValues: number[] = [];
  let current = list.head;
  const visited = new Set<string>();

  while (current && !visited.has(current)) {
    const node = list.nodes.get(current);
    if (!node) break;
    nodeValues.push(Number(node.value));
    visited.add(current);
    current = node.next;
  }

  const initializations = nodeValues.length > 0
    ? `    // Current list elements: ${nodeValues.join(', ')}\n` +
      nodeValues.map(val => `    dll.insertBack(${val});`).join('\n')
    : `    // List is currently empty`;

  return `
// Doubly Linked List in C++
#include <iostream>

class Node {
public:
    int data;
    Node* next;
    Node* prev;

    Node(int val) : data(val), next(nullptr), prev(nullptr) {}
};

class DoublyLinkedList {
public:
    Node* head;
    Node* tail;

    DoublyLinkedList() : head(nullptr), tail(nullptr) {}

    void insertFront(int val) {
        Node* newNode = new Node(val);
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
        }
    }

    void insertBack(int val) {
        Node* newNode = new Node(val);
        if (tail == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            newNode->prev = tail;
            tail->next = newNode;
            tail = newNode;
        }
    }

    void deleteFront() {
        if (head == nullptr) {
            std::cout << "List is empty. Cannot delete from front." << std::endl;
            return;
        }
        Node* temp = head;
        head = head->next;
        if (head != nullptr) {
            head->prev = nullptr;
        } else { // List became empty
            tail = nullptr;
        }
        delete temp;
    }

    void reverse() {
        Node* current = head;
        Node* temp = nullptr;

        while (current != nullptr) {
            temp = current->prev;
            current->prev = current->next;
            current->next = temp;
            current = current->prev;
        }

        // Swap head and tail
        temp = head;
        head = tail;
        tail = temp;
    }
};

int main() {
    DoublyLinkedList dll;
${initializations}

}
  `.trim();
};


export function LinkedListVisualizer({ content }: LinkedListVisualizerProps) {
  const [activeTab, setActiveTab] = useState<ListType | 'code'>('SLL');
  const [currentListType, setCurrentListType] = useState<ListType>('SLL');

  const {
    list,
    operations,
    animationState,
    isAnimating,
    insertFront,
    insertBack,
    deleteFront,
    deleteBack,
    reverse,
  } = useLinkedList(currentListType);


  // Use useMemo to re-generate C++ code only when the 'list' object changes
  const sllCppCode = useMemo(() => generateSLLCppCode(list), [list]);
  const dllCppCode = useMemo(() => generateDLLCppCode(list), [list]);


  const handleTabChange = (value: string) => {
    setActiveTab(value as ListType | 'code');
    // If the changed tab is an SLL or DLL tab, update the currentListType
    if (value === 'SLL' || value === 'DLL') {
      setCurrentListType(value);
    }
  };


  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Linked List</h1>
        <p className="text-muted-foreground">
          A dynamic data structure with nodes connected through references.
        </p>
      </div>

      <Tabs defaultValue="SLL" className="w-full space-y-6" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3">
          {LIST_TYPES.map(type => (
            <TabsTrigger key={type.value} value={type.value}>
              {type.label}
            </TabsTrigger>
          ))}
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        {LIST_TYPES.map(type => (
          <TabsContent key={type.value} value={type.value} className="space-y-6">
            {currentListType === type.value && (
              <LinkedListContent
                list={list}
                operations={operations}
                animationState={animationState}
                isAnimating={isAnimating}
                insertFront={insertFront}
                insertBack={insertBack}
                deleteFront={deleteFront}
                deleteBack={deleteBack}
                reverse={reverse}
              />
            )}
          </TabsContent>
        ))}

        {/* Code Tab Content: Simplified for no syntax highlighting */}
        <TabsContent value="code" className="prose prose-invert max-w-none">
          <h3 className="text-xl font-semibold mb-2">
            {currentListType === 'SLL' ? 'Singly Linked List C++ Code' : 'Doubly Linked List C++ Code'}
          </h3>
          {/* Using <pre> and <code> for basic preformatted text display */}
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
            <code>
              {currentListType === 'SLL' ? sllCppCode : dllCppCode}
            </code>
          </pre>
          {!currentListType && (
            <p>Select a Linked List type (SLL or DLL) to view its C++ code.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// LinkedListContent component remains the same
interface LinkedListContentProps {
  list: LinkedList;
  operations: any[];
  animationState: any;
  isAnimating: boolean;
  insertFront: (value: number) => void;
  insertBack: (value: number) => void;
  deleteFront: () => void;
  deleteBack: () => void;
  reverse: () => void;
}

function LinkedListContent({
  list,
  operations,
  animationState,
  isAnimating,
  insertFront,
  insertBack,
  deleteFront,
  deleteBack,
  reverse,
}: LinkedListContentProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-1 space-y-6">
        <LinkedListControls
          onInsertFront={insertFront}
          onInsertBack={insertBack}
          onDeleteFront={deleteFront}
          onDeleteBack={deleteBack}
          onReverse={reverse}
          isAnimating={isAnimating}
          isEmpty={!list.head}
        />
        <LinkedListOperations operations={operations} />
      </div>
      <div className="xl:col-span-2">
        <LinkedListDisplay
          list={list}
          highlightedNodes={animationState.highlightedNodes}
          message={animationState.message}
        />
      </div>
    </div>
  )
}