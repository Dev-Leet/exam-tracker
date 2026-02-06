import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, AlertCircle, CheckCircle2, Timer, Hourglass } from 'lucide-react';

const examsData = [
  {
    id: 1,
    date: '2026-02-09',
    startTime: '13:15', // 01:15 PM
    endTime: '16:15',   // 04:15 PM
    code: 'CSE3004',
    name: 'Design and Analysis of Algorithms',
  },
  {
    id: 2,
    date: '2026-02-24',
    startTime: '13:15', // 01:15 PM
    endTime: '16:15',   // 04:15 PM
    code: 'CSE4001',
    name: 'Internet and Web Programming',
  },
  {
    id: 3,
    date: '2026-02-25',
    startTime: '09:15', // 09:15 AM
    endTime: '12:15',   // 12:15 PM
    code: 'CSE3001',
    name: 'Database Management Systems',
  }
];

// Helper to format nice dates like "Mon, Feb 9"
const formatDate = (dateString) => {
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Helper to get full weekday name
const getWeekday = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
};

// Helper to format time like "01:15 PM"
const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Helper to calculate time remaining string for list items
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

const MiniCalendar = ({ exams }) => {
  // February 2026 Setup
  const daysInMonth = 28; 
  const startDay = 0; // Feb 1, 2026 is a Sunday (0)
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: startDay }, (_, i) => i);
  
  const examDays = exams.map(e => new Date(e.date).getDate());
  const today = new Date().getDate();
  const isCurrentMonth = new Date().getMonth() === 1 && new Date().getFullYear() === 2026;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 w-full max-w-xs shadow-lg">
      <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-2">
        <span className="text-sm font-semibold text-slate-200">February 2026</span>
        <Calendar size={14} className="text-slate-500"/>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500 font-medium mb-1">
        {['S','M','T','W','T','F','S'].map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {padding.map(i => <div key={`pad-${i}`} />)}
        {days.map(day => {
          const isExam = examDays.includes(day);
          const isToday = isCurrentMonth && day === today;
          
          let classes = "w-6 h-6 flex items-center justify-center rounded-full mx-auto transition-colors ";
          if (isExam) {
            classes += "bg-indigo-500 text-white font-bold shadow-sm shadow-indigo-500/50 cursor-help";
          } else if (isToday) {
            classes += "bg-slate-700 text-white font-medium";
          } else {
            classes += "text-slate-400 hover:bg-slate-800";
          }

          return (
             <div key={day} className={classes} title={isExam ? 'Exam Day' : ''}>
               {day}
             </div>
          )
        })}
      </div>
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
  // FIXED: Removed the unused 'currentTime' variable from destructuring
  const [, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const upcomingExams = examsData
    .filter(exam => calculateTimeStatus(exam) !== 'completed')
    .sort((a, b) => new Date(`${a.date}T${a.startTime}`) - new Date(`${b.date}T${b.startTime}`));

  const nextExam = upcomingExams.length > 0 ? upcomingExams[0] : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Responsive Header */}
        <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
          {/* Left Side: Title */}
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
              <h2 className="text-xl text-indigo-400 font-medium">February 2026</h2>
              <p className="text-slate-400 text-sm max-w-sm pt-2 leading-relaxed">
                Stay focused. Track your upcoming papers and manage your revision time effectively.
              </p>
            </div>
          </div>

          {/* Right Side: Mini Calendar */}
          <div className="flex justify-center md:justify-end shrink-0">
             <MiniCalendar exams={examsData} />
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

        {/* Exam List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2 border-t border-slate-800 pt-6">
            <Calendar className="w-5 h-5" />
            Full Schedule
          </h3>
          
          <div className="grid gap-4">
            {examsData.map((exam) => {
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
                cardStyles = "bg-slate-900 border-indigo-500/50 ring-1 ring-indigo-500/20";
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

        <footer className="pt-8 text-center text-slate-600 text-sm">
          <p>© 2026 Academic Scheduler</p>
        </footer>

      </div>
    </div>
  );
}
