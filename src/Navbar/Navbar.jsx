import React from 'react'

function navbar() {
  return (
    <nav class="bg-black p-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <a href="#" class="text-white text-2xl font-bold">ValueGlance</a>
            <div class="space-x-4">
                <a href="#" class="text-white hover:text-gray-400">Home</a>
                <a href="#" class="text-white hover:text-gray-400">Appl</a>
            </div>
        </div>
    </nav>
  )
}

export default navbar