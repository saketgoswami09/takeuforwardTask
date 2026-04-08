import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, addEvent } from '../../features/calendarSlice';

const EventModal = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.calendar.selectedDate);
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Work');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addEvent({ 
        id: Date.now().toString(),
        title: title.trim(), 
        type,
        date: selectedDate 
      }));
      dispatch(toggleModal());
      setTitle('');
    }
  };

  const typeColors = {
    Work: 'bg-blue-500',
    Personal: 'bg-emerald-500',
    Holiday: 'bg-rose-500',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Paper Feel */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100 bg-[#f9f5eb]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8c6f47]">Momentum</p>
              <h2 className="text-3xl font-semibold text-[#2c2114] mt-1">
                New Event
              </h2>
            </div>
            <button
              onClick={() => dispatch(toggleModal())}
              className="text-3xl text-[#8c6f47] hover:text-[#5c4730] transition-colors leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-[#6b5a44] mt-2 text-lg">
            {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            }) : ''}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium text-[#5c4730] mb-2">
              What are you planning?
            </label>
            <input 
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Team sync, Climb training, Family dinner..."
              className="w-full px-5 py-4 bg-white border border-[#d4c3a8] rounded-2xl 
                         focus:outline-none focus:border-[#8c6f47] text-lg placeholder:text-[#a38b6e]"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-[#5c4730] mb-3">
              Category
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Work', 'Personal', 'Holiday'].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setType(category)}
                  className={`py-4 px-5 rounded-2xl border transition-all flex flex-col items-center gap-2
                    ${type === category 
                      ? 'border-[#8c6f47] bg-[#f9f5eb] shadow-sm' 
                      : 'border-transparent hover:bg-white hover:border-gray-200'
                    }`}
                >
                  <div className={`w-5 h-5 rounded-full ${typeColors[category]}`} />
                  <span className="text-sm font-medium text-[#3c2f1f]">
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={() => dispatch(toggleModal())}
              className="flex-1 py-4 text-[#6b5a44] font-medium hover:bg-gray-100 rounded-2xl transition-colors"
            >
              Cancel
            </button>
            
            <button 
              type="submit"
              disabled={!title.trim()}
              className="flex-1 py-4 bg-[#2c2114] hover:bg-black disabled:bg-gray-300 
                         text-white font-semibold rounded-2xl transition-all active:scale-95
                         shadow-lg shadow-[#2c2114]/30 disabled:shadow-none"
            >
              Add to Calendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;