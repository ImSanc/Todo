import classNames from 'classnames';
import React from 'react';

function ErrorDialog({ message, onClose, color }) {

  const backGround = {
    red  :  'bg-red-300',
    green : 'bg-green-300'
  }

  return (
    <div className= { classNames( backGround[color] || 'bg-red-300' ,' flex justify-center items-center mt-1 p-2 rounded-lg')}>
        <div className='font-medium text-lg flex justify-center items-center'>
            {message}
        </div>
        <div onClick={onClose} className=' flex justify-center items-center '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    </div>
  );
}

export default ErrorDialog;