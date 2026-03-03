import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, AlertCircle, CheckCircle2, Timer, Hourglass, Section, Calendar as CalendarIcon, X } from 'lucide-react';

const examsData = [
  // Grade Improvement Section
  {
    id: 2,
    date: '2026-03-05',
    startTime: '13:15',
    endTime: '16:15',
    code: 'CSE4001',
    name: 'Internet and Web Programming',
    type: 'Grade Improvement'
  },
  {
    id: 3,
    date: '2026-03-06',
    startTime: '09:15',
    endTime: '12:15',
    code: 'CSE3001',
    name: 'Database Management Systems',
    type: 'Grade Improvement'
  },
  // Mid Term Section
  {
    id: 4,
    date: '2026-03-16',
    startTime: '14:30', // 02:30 PM
    endTime: '16:00',   // 04:00 PM
    code: 'CSE3006',
    name: 'Computer Networks',
    type: 'Mid Term'
  },
  {
    id: 5,
    date: '2026-03-11',
    startTime: '09:15', // 09:15 AM
    endTime: '10:45',   // 10:45 AM
    code: 'CSE3009',
    name: 'Parallel and Distributed Computing',
    type: 'Mid Term'
  },
  {
    id: 6,
    date: '2026-03-18',
    startTime: '14:30', // 02:30 PM
    endTime: '16:00',   // 04:00 PM
    code: 'CSE3012',
    name: 'Mobile Application Development',
    type: 'Mid Term'
  },
  {
    id: 7,
    date: '2026-03-12',
    startTime: '14:30', // 02:30 PM
    endTime: '16:00',   // 04:00 PM
    code: 'MAT3002',
    name: 'Applied Linear Algebra',
    type: 'Mid Term'
  },
  {
    id: 8,
    date: '2026-03-20',
    startTime: '09:15', // 09:15 AM
    endTime: '10:45',   // 10:45 AM
    code: 'PLA1006',
    name: 'Lateral Thinking',
    type: 'Mid Term'
  },
  {
    id: 9,
    date: '2026-03-17',
    startTime: '09:15', // 09:15 AM
    endTime: '10:45',   // 10:45 AM
    code: 'CSE3016',
    name: 'AWS Solution Architect',
    type: 'Mid Term'
  },
  {
    id: 10,
    date: '2026-03-09',
    startTime: '14:30', // 02:30 PM
    endTime: '16:00',   // 04:00 PM
    code: 'CSE4019',
    name: 'Advanced Java Programming',
    type: 'Mid Term'
  },
  {
    id: 11,
    date: '2026-03-18',
    startTime: '09:15', // 09:15 AM
    endTime: '10:45',   // 10:45 AM
    code: 'CDS3005',
    name: 'Foundations of Data Science',
    type: 'Mid Term'
  }
];

const formatDate = (dateString) => {
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const getWeekday = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
};

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const getTimeRemainingText = (date, startTime) => {
  const target = new Date(`${date}T${startTime}`);
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
};

const calculateTimeStatus = (exam) => {
  const now = new Date();
  const examStart = new Date(`${exam.date}T${exam.startTime}`);
  const examEnd = new Date(`${exam.date}T${exam.endTime}`);

  if (now > examEnd) return 'completed';
  if (now >= examStart && now <= examEnd) return 'active';
  return 'upcoming';
};

const getExamColor = (type) => {
  switch (type) {
    case 'Grade Improvement': return 'bg-amber-500';
    case 'Mid Term': return 'bg-indigo-500';
    default: return 'bg-emerald-500';
  }
};

const FullCalendar = ({ exams }) => {
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);

  const allDates = exams.map(e => new Date(e.date));
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));
  
  const startMonth = minDate.getMonth();
  const startYear = minDate.getFullYear();
  const endMonth = maxDate.getMonth();
  const endYear = maxDate.getFullYear();

  const monthsToRender = [];
  let currentY = startYear;
  let currentM = startMonth;
  
  while (currentY < endYear || (currentY === endYear && currentM <= endMonth)) {
    monthsToRender.push(new Date(currentY, currentM, 1));
    currentM++;
    if (currentM > 11) {
      currentM = 0;
      currentY++;
    }
  }

  const examsByDate = exams.reduce((acc, exam) => {
    if (!acc[exam.date]) acc[exam.date] = [];
    acc[exam.date].push(exam);
    return acc;
  }, {});

  const handleDayClick = (dateStr, dayExams) => {
    if (dayExams && dayExams.length > 0) {
      setSelectedDayInfo({ date: dateStr, exams: dayExams });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full shadow-2xl relative mt-4">
      <div className="flex items-center gap-3 p-6 border-b border-slate-800 bg-slate-800/50">
        <CalendarIcon className="text-indigo-400 w-6 h-6" />
        <h3 className="text-xl font-bold text-white">Interactive Schedule</h3>
      </div>

      <div className="flex flex-col gap-8 p-6 overflow-x-auto custom-scrollbar">
        {monthsToRender.map((monthDate, idx) => {
          const year = monthDate.getFullYear();
          const month = monthDate.getMonth();
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const startDayOfWeek = new Date(year, month, 1).getDay();

          const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
          const padding = Array.from({ length: startDayOfWeek }, (_, i) => i);
          
          const monthName = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

          return (
            <div key={idx} className="min-w-[800px]">
              <h4 className="text-center font-semibold text-slate-200 mb-4 text-lg bg-slate-800/30 py-2 rounded-lg">{monthName}</h4>
              <div className="grid grid-cols-7 gap-px bg-slate-700 border border-slate-700 rounded-xl overflow-hidden">
                {/* Day Headers */}
                {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((d, i) => (
                  <div key={i} className="bg-slate-800 p-2 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span className="hidden sm:inline">{d}</span>
                    <span className="sm:hidden">{d.slice(0, 3)}</span>
                  </div>
                ))}
                
                {/* Empty Padding Cells */}
                {padding.map(i => <div key={`pad-${i}`} className="bg-slate-900 min-h-[100px]" />)}
                
                {/* Actual Days */}
                {days.map(day => {
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayExams = examsByDate[dateStr];
                  const hasExams = dayExams && dayExams.length > 0;
                  
                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(dateStr, dayExams)}
                      disabled={!hasExams}
                      className={`
                        bg-slate-900 min-h-[120px] p-2 flex flex-col transition-colors border-t border-l border-slate-800/50 text-left
                        ${hasExams ? 'hover:bg-slate-800/80 cursor-pointer bg-slate-800/20' : 'cursor-default'}
                        ${selectedDayInfo?.date === dateStr ? 'ring-2 ring-indigo-500 bg-slate-800/50 z-10 relative' : ''}
                      `}
                    >
                      <span className={`text-sm font-medium self-end w-6 h-6 flex items-center justify-center rounded-full mb-2
                        ${hasExams ? 'bg-slate-700 text-white' : 'text-slate-500'}
                      `}>
                        {day}
                      </span>
                      
                      {/* Directly render subjects for the day */}
                      <div className="flex flex-col gap-1.5 flex-1 w-full">
                        {hasExams && dayExams.map((ex, i) => (
                           <div 
                             key={i} 
                             className={`flex flex-col text-xs px-2.5 py-2 rounded-md ${getExamColor(ex.type).replace('bg-', 'bg-').replace('-500', '-500/10')} border border-${getExamColor(ex.type).split('-')[1]}-500/30 w-full`}
                           >
                             <div className="flex items-center gap-1.5 mb-1 w-full overflow-hidden">
                               <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getExamColor(ex.type)}`} />
                               <span className="font-mono font-bold truncate text-slate-200">{ex.code}</span>
                             </div>
                             <p className="text-slate-300 font-medium break-words leading-tight" title={ex.name}>
                               {ex.name}
                             </p>
                           </div>
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Tooltip / Modal for Selected Day */}
      {selectedDayInfo && (
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-sm bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in duration-200">
          <div className="flex justify-between items-start mb-3 border-b border-slate-700 pb-2">
            <div>
               <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Exam Details</span>
               <h4 className="text-white font-semibold">{formatDate(selectedDayInfo.date)}</h4>
            </div>
            <button 
              onClick={() => setSelectedDayInfo(null)}
              className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="space-y-3">
            {selectedDayInfo.exams.map(exam => (
              <div key={exam.id} className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                 <div className="flex items-center gap-2 mb-1">
                   <span className={`w-2 h-2 rounded-full ${getExamColor(exam.type)}`} />
                   <span className="text-xs font-semibold text-slate-300">{exam.type}</span>
                 </div>
                 <p className="font-bold text-indigo-300 text-sm mb-0.5">{exam.code}</p>
                 <p className="text-slate-200 text-sm leading-tight mb-2">{exam.name}</p>
                 <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={12} />
                    <span>{formatTime(exam.startTime)} - {formatTime(exam.endTime)}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Overlay to click out of modal */}
      {selectedDayInfo && (
        <div 
          className="fixed inset-0 z-10 bg-black/20 backdrop-blur-[1px]" 
          onClick={() => setSelectedDayInfo(null)}
        />
      )}
    </div>
  );
};

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  if (Object.keys(timeLeft).length === 0) {
    return <span className="text-emerald-400 font-bold">Exam Started!</span>;
  }

  return (
    <div className="flex space-x-4 text-center">
      <div className="flex flex-col">
        <span className="text-3xl font-bold font-mono text-white">{timeLeft.days}</span>
        <span className="text-xs text-slate-400 uppercase">Days</span>
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold font-mono text-white">{timeLeft.hours}</span>
        <span className="text-xs text-slate-400 uppercase">Hrs</span>
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold font-mono text-white">{timeLeft.minutes}</span>
        <span className="text-xs text-slate-400 uppercase">Mins</span>
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold font-mono text-indigo-400">{timeLeft.seconds}</span>
        <span className="text-xs text-slate-400 uppercase">Secs</span>
      </div>
    </div>
  );
};

export default function App() {
  const [, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const upcomingExams = examsData
    .filter(exam => calculateTimeStatus(exam) !== 'completed')
    .sort((a, b) => new Date(`${a.date}T${a.startTime}`) - new Date(`${b.date}T${b.startTime}`));

  const nextExam = upcomingExams.length > 0 ? upcomingExams[0] : null;

  const groupedExams = examsData.reduce((acc, exam) => {
    const type = exam.type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(exam);
    return acc;
  }, {});

  Object.keys(groupedExams).forEach(key => {
    groupedExams[key].sort((a, b) => new Date(`${a.date}T${a.startTime}`) - new Date(`${b.date}T${b.startTime}`));
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8"> {/* Increased max-width for the full calendar */}
        
        {/* Full Interactive Calendar appended at the top */}
        <FullCalendar exams={examsData} />

        {/* Responsive Header */}
        <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10 pt-8 border-t border-slate-800">
          <div className="flex items-start gap-4">
            <div className="hidden md:flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl h-min">
              <BookOpen className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 md:hidden mb-2">
                 <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <BookOpen className="w-6 h-6 text-indigo-400" />
                 </div>
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Exam Schedule</h1>
              <p className="text-slate-400 text-sm max-w-sm pt-2 leading-relaxed">
                Stay focused. Track your upcoming papers and manage your revision time effectively.
              </p>
            </div>
          </div>
        </header>

        {/* Hero Section: Next Exam Countdown */}
        {nextExam ? (
          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-8 relative overflow-hidden shadow-2xl shadow-indigo-900/20">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Timer size={120} />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 mb-2">
                  Up Next
                </span>
                <h2 className="text-2xl font-bold text-white leading-tight">{nextExam.name}</h2>
                <p className="text-slate-400 font-mono text-lg">{nextExam.code}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 pt-2">
                  <Calendar size={16} />
                  <span>{formatDate(nextExam.date)}</span>
                  <span className="mx-2">•</span>
                  <Clock size={16} />
                  <span>{formatTime(nextExam.startTime)}</span>
                </div>
              </div>

              <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm">
                 <Countdown targetDate={`${nextExam.date}T${nextExam.startTime}`} />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">All Exams Completed!</h2>
            <p className="text-emerald-200/70 mt-2">Great job, relax and enjoy your break.</p>
          </div>
        )}

        {/* Grouped Exam Lists */}
        <div className="space-y-10">
          {['Grade Improvement', 'Mid Term', 'Regular'].map(sectionTitle => {
            const sectionExams = groupedExams[sectionTitle];
            if (!sectionExams || sectionExams.length === 0) return null;

            return (
              <div key={sectionTitle} className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2 border-t border-slate-800 pt-6">
                  <Section className={`w-5 h-5 ${
                    sectionTitle === 'Grade Improvement' ? 'text-amber-500' :
                    sectionTitle === 'Mid Term' ? 'text-indigo-500' : 'text-emerald-500'
                  }`} />
                  {sectionTitle} Schedule
                </h3>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                  {sectionExams.map((exam) => {
                    const status = calculateTimeStatus(exam);
                    const isNext = nextExam && nextExam.id === exam.id;
                    const timeLeftStr = getTimeRemainingText(exam.date, exam.startTime);
                    const weekday = getWeekday(exam.date);
                    
                    let cardStyles = "bg-slate-900 border-slate-800 hover:border-slate-700";
                    let statusBadge = null;

                    if (status === 'completed') {
                      cardStyles = "bg-slate-900/50 border-slate-800 opacity-60";
                      statusBadge = <span className="text-xs font-medium text-emerald-500 flex items-center gap-1"><CheckCircle2 size={14}/> Done</span>;
                    } else if (status === 'active') {
                      cardStyles = "bg-indigo-900/20 border-indigo-500/50";
                      statusBadge = <span className="text-xs font-medium text-indigo-400 flex items-center gap-1 animate-pulse"><AlertCircle size={14}/> In Progress</span>;
                    } else if (isNext) {
                      cardStyles = "bg-slate-900 border-indigo-500/50 ring-1 ring-indigo-500/20 shadow-lg shadow-indigo-900/20";
                    }

                    return (
                      <div 
                        key={exam.id} 
                        className={`relative p-5 rounded-xl border transition-all duration-300 ${cardStyles}`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          
                          {/* Date Box and Details */}
                          <div className="flex items-center gap-4">
                            {/* Date Box */}
                            <div className="flex flex-col items-center justify-center bg-slate-800 w-16 h-16 rounded-lg border border-slate-700 shrink-0">
                              <span className="text-xs text-slate-400 uppercase font-bold">
                                {new Date(exam.date).toLocaleString('en-US', { month: 'short' })}
                              </span>
                              <span className="text-2xl font-bold text-white">
                                {new Date(exam.date).getDate()}
                              </span>
                            </div>
                            
                            {/* Title & Code */}
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="font-mono text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                                  {exam.code}
                                </span>
                                {status === 'upcoming' && (
                                   <span className="text-xs font-medium text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded flex items-center gap-1">
                                     {weekday}
                                   </span>
                                )}
                                {statusBadge}
                              </div>
                              <h4 className={`font-semibold text-lg leading-tight ${status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
                                {exam.name}
                              </h4>
                            </div>
                          </div>

                          {/* Time & Remaining Column */}
                          <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 min-w-max">
                            
                            {/* Time Remaining Badge for List Items */}
                            {status === 'upcoming' && timeLeftStr && (
                              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 mb-0.5">
                                 <Hourglass size={12} />
                                 <span>{timeLeftStr}</span>
                              </div>
                            )}

                            {/* Exam Time */}
                            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                              <Clock size={14} />
                              <span>{formatTime(exam.startTime)} - {formatTime(exam.endTime)}</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <footer className="pt-8 text-center text-slate-600 text-sm pb-12">
          <p>© 2026 Academic Scheduler</p>
        </footer>

      </div>
    </div>
  );
}
