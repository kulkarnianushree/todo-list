"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Form = () => {
  const [userDetails, setUserDetails] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const router = useRouter();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [id]: value
    }));
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    let formattedDate;
    if (selectedDate.toDateString() === today.toDateString()) {
      formattedDate = 'Today';
    } else if (selectedDate.toDateString() === tomorrow.toDateString()) {
      formattedDate = 'Tomorrow';
    } else {
      formattedDate = event.target.value;
    }

    setUserDetails(prevDetails => ({
      ...prevDetails,
      dueDate: formattedDate
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        body: JSON.stringify(userDetails),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const data = await response.json();
      console.log('Task added:', data);

      router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="p-5 border border-gray-300 rounded-md" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-5 text-center text-indigo-600">Please Provide Your Task Details</h1>

      <div className="mb-4">
        <label htmlFor='title' className='block text-lg font-medium text-gray-700'>Task Title</label>
        <input
          type='text'
          id='title'
          className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Enter Task here'
          value={userDetails.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor='description' className='block text-lg font-medium text-gray-700'>Description</label>
        <input
          type='text'
          id='description'
          className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Enter Task description here'
          value={userDetails.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor='dueDate' className='block text-lg font-medium text-gray-700'>Due Date</label>
        <input
          type='date'
          id='dueDate'
          className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          onChange={handleDateChange}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type='submit'
          className='px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Add Task
        </button>
        <button
          type='button'
          className='px-4 py-2 bg-gray-300 text-black rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
          onClick={() => router.push('/')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
