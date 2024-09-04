import React from 'react';
import Link from 'next/link';

const Homepage = ({ todos = [] }) => {
  return (
    <div>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>Anushree's Todo List</h1>
      <Link 
        href='/form'  
        className='inline-block mt-10 mx-20 px-4 py-2 bg-red-800 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300'
      >
        + Add Task
      </Link>
      <div className='mt-10 mx-20'>
        {todos.length > 0 ? (
          <ul className='list-disc pl-5'>
            {todos.map(todo => (
              <li key={todo.id} className='mb-4'>
                <h2 className='text-xl font-semibold'>{todo.title}</h2>
                <p className='text-gray-700'>{todo.description}</p>
                <p className='text-gray-500'>Due Date: {todo.dueDate}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-gray-500'>No todos available.</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
