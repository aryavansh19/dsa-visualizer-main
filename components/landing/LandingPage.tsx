"use client";

import React from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button";


export default function LandingPage() {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
            {/* Nav */}
            <nav className="w-full flex justify-between items-center py-6 px-8 text-sm">
                <div className="font-bold text-lg">DS Visualizer</div>
                <div className="space-x-6 hidden md:flex">
                    <a href="#" className="hover:underline">Visualizer</a>
                    <a href="#" className="hover:underline">Dashboard</a>
                    <a href="#" className="hover:underline">About Us</a>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm">Start Now ↗</Button>
            </nav>

            {/* Main Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 -mt-90">

                <h1 className="text-center text-4xl md:text-6xl font-bold leading-tight mb-6">
                    Data Structure Visualizer <br />
                </h1>
                <h3 className="text-center leading-tight mb-6">Interactive tool for learning and understanding data structures through visual animations and step-by-step operations</h3>
                <div className="flex gap-4">
                    {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm">Visualize ↗</Button> */}
                    <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm">
                        Visualize ↗
                    </Button>

                    <Button variant="secondary" className="bg-white text-black px-6 py-2 text-sm">More ↓</Button>
                </div>
            </main>

            {/* ASCII Hand Image */}
            <div className="absolute bottom-[-60px] left-0 w-full pointer-events-none select-none z-0">
                <img src="/img.png" alt="ascii hand" className="w-full object-cover opacity-90" />
            </div>

            {showModal && (
                <div className="fixed inset-0 backdrop-blur-md bg-black/60 flex justify-center items-center z-50">


                    {/* Gradient border wrapper */}
                    <div className="rounded-xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500">
                        {/* Modal content inside */}
                        <div className="bg-black text-white p-6 rounded-xl w-80">
                            <h2 className="text-xl font-bold mb-6 text-center">Select Data Structure</h2>

                            {/* Buttons with even spacing */}
                            <div className="flex flex-col space-y-4">
                                <Link href="\visualizer\queue">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition duration-200">
                                        Queue
                                    </button>
                                </Link>
                                <Link href="\visualizer\linked-list">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition duration-200">
                                        Linked List (Coming Soon...) 
                                    </button>
                                </Link>
                                <Link href="/routes/tree">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition duration-200">
                                        Tree (Coming Soon...)
                                    </button>
                                </Link>
                                <Link href="/routes/graph">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition duration-200">
                                        Graph (Coming Soon...)
                                    </button>
                                </Link>
                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="mt-6 text-sm text-gray-400 hover:underline block mx-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                </div>
            )}


        </div>
    );
}
