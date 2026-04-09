import React, { useState, useEffect, useCallback } from 'react';
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
        title: title.trim(), 
        type,
      }));
      dispatch(toggleModal());
      setTitle('');
    }
  };

  const handleClose = useCallback(() => {
    dispatch(toggleModal());
  }, [dispatch]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const typeColors = {
    Work: 'bg-blue-500',
    Personal: 'bg-emerald-500',
    Holiday: 'bg-rose-500',
    Milestone: 'bg-amber-500',
  };

  const typeLabels = {
    Work: 'Work / Deep Focus',
    Personal: 'Personal Growth',
    Holiday: 'Rest / Holiday',
    Milestone: 'Milestone',
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xl"
      onClick={handleClose}
    >
      <div 
        className="bg-white w-full sm:w-auto sm:max-w-lg sm:mx-4 rounded-t-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {/* Drag handle — mobile only */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-zinc-300 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="px-4 sm:px-8 pt-3 sm:pt-8 pb-3 sm:pb-6 border-b border-gray-100 bg-[#f9f5eb]">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8c6f47]">Momentum</p>
              <h2 className="text-xl sm:text-3xl font-semibold text-[#2c2114] mt-0.5 sm:mt-1">
                New Event
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="text-2xl sm:text-3xl text-[#8c6f47] hover:text-[#5c4730] transition-colors leading-none p-1 -mr-1"
            >
              ×
            </button>
          </div>
          <p className="text-[#6b5a44] mt-1 sm:mt-2 text-xs sm:text-lg truncate">
            {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            }) : ''}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4 sm:space-y-8">
          {/* Event Title */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#5c4730] mb-1.5 sm:mb-2">
              What are you planning?
            </label>
            <input 
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Team sync, Climb training..."
              className="w-full px-3 sm:px-5 py-2.5 sm:py-4 bg-white border border-[#d4c3a8] rounded-xl sm:rounded-2xl 
                         focus:outline-none focus:border-[#8c6f47] text-sm sm:text-lg placeholder:text-[#a38b6e]
                         placeholder:text-xs sm:placeholder:text-base"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#5c4730] mb-2 sm:mb-3">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {['Work', 'Personal', 'Holiday', 'Milestone'].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setType(category)}
                  className={`py-2.5 sm:py-4 px-2 sm:px-4 rounded-xl sm:rounded-2xl border transition-all flex flex-col items-center gap-1 sm:gap-2
                    ${type === category 
                      ? 'border-[#8c6f47] bg-[#f9f5eb] shadow-sm' 
                      : 'border-zinc-200 sm:border-transparent hover:bg-white hover:border-gray-200'
                    }`}
                >
                  <div className={`w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full ${typeColors[category]}`} />
                  <span className="text-[9px] sm:text-xs font-medium text-[#3c2f1f] leading-tight text-center">
                    {typeLabels[category]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 sm:gap-4 pt-1 sm:pt-4">
            <button 
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 sm:py-4 text-[#6b5a44] font-medium hover:bg-gray-100 rounded-xl sm:rounded-2xl transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            
            <button 
              type="submit"
              disabled={!title.trim()}
              className="flex-1 py-2.5 sm:py-4 bg-[#2c2114] hover:bg-black disabled:bg-gray-300 
                         text-white font-semibold rounded-xl sm:rounded-2xl transition-all active:scale-95
                         shadow-lg shadow-[#2c2114]/30 disabled:shadow-none text-sm sm:text-base"
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
