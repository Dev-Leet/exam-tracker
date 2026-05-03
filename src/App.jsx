import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, BookOpen, AlertCircle, CheckCircle2, Timer, 
  Hourglass, Section, Calendar as CalendarIcon, X, Video, 
  GraduationCap, Users, Laptop, LayoutDashboard, Presentation, Upload 
} from 'lucide-react';

// --- EXAM DATA ---
const examsData = [
  { id: 1, date: '2026-04-20', startTime: '09:30', endTime: '12:30', code: 'CSE3006', name: 'Computer Networks', type: 'Term End' },
  { id: 2, date: '2026-04-13', startTime: '09:30', endTime: '12:30', code: 'CSE3009', name: 'Parallel and Distributed Computing', type: 'Term End' },
  { id: 3, date: '2026-04-19', startTime: '09:30', endTime: '12:30', code: 'CSE3012', name: 'Mobile Application Development', type: 'Term End' },
  { id: 4, date: '2026-04-22', startTime: '09:30', endTime: '12:30', code: 'MAT3002', name: 'Applied Linear Algebra', type: 'Term End' },
  { id: 5, date: '2026-04-23', startTime: '09:30', endTime: '12:30', code: 'PLA1006', name: 'Lateral Thinking', type: 'Term End' },
  { id: 6, date: '2026-04-16', startTime: '09:30', endTime: '12:30', code: 'CSE3016', name: 'AWS Solution Architect', type: 'Term End' },
  { id: 7, date: '2026-04-15', startTime: '09:30', endTime: '12:30', code: 'CSE4019', name: 'Advanced Java Programming', type: 'Term End' },
  { id: 8, date: '2026-04-28', startTime: '10:00', endTime: '13:00', code: 'CDS3005', name: 'Foundations of Data Science', type: 'Term End' },
  { id: 9, date: '2026-04-25', startTime: '09:00', endTime: '12:00', code: 'NPTEL', name: 'Marketing Analysis', type: 'Term End' }
];

// --- COMPLETE TRAINING DATA ---
const initialTrainingData = {
  link: 'meet.google.com/ymr-syhg-rdw',
  schedule: {
    '2026-05-04': [
      { school: 'SASL', faculty: 'Dr. Sheerin', topic: 'Percentages, Simple and compound Interest', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SCAI', faculty: 'Dr. Abhishek kumar shukla', topic: 'SQL', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SCAI', faculty: 'Dr Vijay Birccha', topic: 'AWS & Cloud basics', time: '12:00 - 13:00', type: 'Online' },
      { school: 'SCAI', faculty: 'Dr Jitendra Pratap Singh Mathur', topic: 'OOPs', time: '14:00 - 15:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Gargi roy', topic: 'Verbal Ability', time: '15:15 - 16:15', type: 'Online' }
    ],
    '2026-05-05': [
      { school: 'SASL', faculty: 'Dr. Jyoti Badge', topic: 'Quantitative Aptitude', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SCAI', faculty: 'Dr. Abhishek kumar shukla', topic: 'SQL', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SCAI', faculty: 'Dr Vijay Birccha', topic: 'AWS & Cloud basics', time: '12:00 - 13:00', type: 'Online' },
      { school: 'SCAI', faculty: 'Dr Jitendra Pratap Singh Mathur', topic: 'OOPs', time: '14:00 - 15:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Gargi Roy', topic: 'Verbal Ability', time: '15:15 - 16:15', type: 'Online' }
    ],
    '2026-05-06': [
      { school: 'SASL', faculty: 'Dr. D Harish Babu', topic: 'Logarithms, Progression, Geometry and Mensuration', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SCAI', faculty: 'Dr Sajjad ahmed', topic: 'Cyber security', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Anita', topic: 'Life Skills', time: '12:00 - 13:00', type: 'Online' }
    ],
    '2026-05-07': [
      { school: 'SCOPE', faculty: 'Dr Ravi Verma', topic: 'Computer Networks', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SCAI', faculty: 'Dr Sajjad ahmed', topic: 'Cyber security', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Sheerin', topic: 'Percentages, Simple and compound Interest', time: '12:00 - 13:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Vinod Bhatt', topic: 'Resume Writing', time: '14:00 - 15:00', type: 'Online' },
      { school: 'SBET', faculty: 'Dr. Karthik G L', topic: 'Medical Devices', time: '15:15 - 16:15', type: 'Online' }
    ],
    '2026-05-08': [
      { school: 'SCOPE', faculty: 'Dr Ravi Verma', topic: 'Computer Networks', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Navneet Kumar verma', topic: 'Logical Reasoning and Puzzles', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Rajeev', topic: 'Vocabulary for Placement', time: '12:00 - 13:00', type: 'Online' },
      { school: 'SEEE', faculty: 'Dr. Arindam Dutta', topic: 'Basic Electrical Engineering', time: '14:00 - 15:00', type: 'Online' },
      { school: 'SEEE', faculty: 'Dr. Arindam Dutta', topic: 'Basic Electrical Engineering', time: '15:00 - 16:00', type: 'Online' }
    ],
    '2026-05-11': [
      { school: 'SASL', faculty: 'Dr. Jyoti Badge', topic: 'Data Interpretation and Inequalities', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SCOPE', faculty: 'Dr Sasmita Padhy', topic: 'DBMS', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SCOPE', faculty: 'Dr Sandeep Monga', topic: 'Data Structure', time: '12:00 - 13:00', type: 'Online' },
      { school: 'SBET', faculty: 'Dr. Siddhartha Maiti', topic: 'Biomaterials', time: '14:00 - 15:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Rajeev', topic: 'Reading Comprehension for placements', time: '15:15 - 16:15', type: 'Online' }
    ],
    '2026-05-12': [
      { school: 'SCOPE', faculty: 'Dr Velmurugan', topic: 'OS', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SCOPE', faculty: 'Dr Sasmita Padhy', topic: 'DBMS', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SCOPE', faculty: 'Dr Sandeep Monga', topic: 'Data Structure', time: '12:00 - 13:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Manisha Jain', topic: 'Speed Math’s', time: '14:00 - 15:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Tausheef', topic: 'Critical Reasoning and Voices', time: '15:15 - 16:15', type: 'Online' }
    ],
    '2026-05-13': [
      { school: 'SCOPE', faculty: 'Dr Velmurugan', topic: 'OS', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SCOPE', faculty: 'Dr Sasmita Padhy', topic: 'DBMS', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SCOPE', faculty: 'Dr Sandeep Monga', topic: 'Data Structure', time: '12:00 - 13:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Kumar Abhishek', topic: 'Logical Connectives and Syllogism', time: '14:00 - 15:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Vinod', topic: 'Group Discussion and Case Study Discussion', time: '15:15 - 16:15', type: 'Online' }
    ],
    '2026-05-14': [
      { school: 'SCOPE', faculty: 'Dr Vikas Panthi', topic: 'SE', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SCOPE', faculty: 'Dr Sasmita Padhy', topic: 'DBMS', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. B Jaison', topic: 'Profit and loss, Partnership', time: '12:00 - 13:00', type: 'Online' },
      { school: 'SEEE', faculty: 'Dr. Om Prakash Pahari', topic: 'Microprocessors and Microcontrollers', time: '14:00 - 15:00', type: 'Online' },
      { school: 'SEEE', faculty: 'Dr. Om Prakash Pahari', topic: 'Microprocessors and Microcontrollers', time: '15:15 - 16:15', type: 'Online' }
    ],
    '2026-05-15': [
      { school: 'SCOPE', faculty: 'Dr Vikas Panthi', topic: 'SE', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Manisha Jain', topic: 'Speed Math’s', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Rajeev', topic: 'Reading Comprehension for placements', time: '12:00 - 13:00', type: 'Online' }
    ],
    '2026-05-18': [
      { school: 'SASL', faculty: 'Dr. Manisha Jain', topic: 'Stress Management, Adaptability and Professional networking', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SEEE', faculty: 'Dr. Deep Chandra Upadhyay', topic: 'Digital Electronics', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SEEE', faculty: 'Dr. Deep Chandra Upadhyay', topic: 'Digital Electronics', time: '12:00 - 13:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Navneet Kumar verma', topic: 'Logical Reasoning and Puzzles', time: '14:00 - 15:00', type: 'Online' }
    ],
    '2026-05-19': [
      { school: 'SASL', faculty: 'Dr. Zaheer Kareem Ansari', topic: 'Number System', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Tauseef', topic: 'Critical Reasoning and Voices', time: '10:30 - 11:30', type: 'Online' }
    ],
    '2026-05-20': [
      { school: 'SASL', faculty: 'Dr. Aashish', topic: 'Time and work', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Dev Brat Gupta', topic: 'Sentence Completion, Articles, Prepositions, Speech', time: '10:30 - 11:30', type: 'Online' }
    ],
    '2026-05-21': [
      { school: 'SASL', faculty: 'Dr. Zaheer Kareem Ansari', topic: 'Ratios and proportions, problems on ages, equations', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Kumar abhishek', topic: 'Logical Reasoning', time: '10:30 - 11:30', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Juhi Yashmeen', topic: 'E-mail and Report writing', time: '12:00 - 13:00', type: 'Online' }
    ],
    '2026-05-22': [
      { school: 'SASL', faculty: 'Dr. Ujjwal', topic: 'Data Arrangements and Blood relations', time: '09:00 - 10:00', type: 'Online' },
      { school: 'SASL', faculty: 'Dr. Dev Brat Gupta', topic: 'Sentence Completion, Articles, Prepositions, Speech', time: '10:30 - 11:30', type: 'Online' }
    ]
  }
};


// --- HELPERS ---

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
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
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
    case 'Term End': return 'bg-indigo-500';
    case 'Grade Improvement': return 'bg-amber-500';
    default: return 'bg-emerald-500';
  }
};

const calculateBreakDuration = (endTimeStr, nextStartTimeStr) => {
  if (!endTimeStr || !nextStartTimeStr) return null;
  
  const parseTime = (tStr) => {
    const match = tStr.trim().match(/(\d{1,2}):(\d{2})/);
    if (!match) return null;
    let h = parseInt(match[1], 10);
    let m = parseInt(match[2], 10);
    if (tStr.toLowerCase().includes('pm') && h < 12) h += 12;
    return { h, m };
  };

  const end = parseTime(endTimeStr);
  const start = parseTime(nextStartTimeStr);

  if (!end || !start) return null;

  const endTotalMins = (end.h * 60) + end.m;
  const startTotalMins = (start.h * 60) + start.m;
  const diffMins = startTotalMins - endTotalMins;

  if (diffMins <= 0) return null;

  const h = Math.floor(diffMins / 60);
  const m = diffMins % 60;

  if (h > 0 && m > 0) return `${h} hr ${m} min`;
  if (h > 0) return `${h} hr`;
  return `${m} min`;
};

// --- COMPONENTS ---

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

const FullCalendar = ({ exams }) => {
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

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full shadow-2xl overflow-hidden mt-4">
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
                {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((d, i) => (
                  <div key={i} className="bg-slate-800 p-2 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span className="hidden sm:inline">{d}</span>
                    <span className="sm:hidden">{d.slice(0, 3)}</span>
                  </div>
                ))}
                
                {padding.map(i => <div key={`pad-${i}`} className="bg-slate-900 min-h-[100px]" />)}
                
                {days.map(day => {
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayExams = examsByDate[dateStr];
                  const hasExams = dayExams && dayExams.length > 0;
                  
                  return (
                    <div
                      key={day}
                      className={`bg-slate-900 min-h-[120px] p-2 flex flex-col transition-colors border-t border-l border-slate-800/50 ${hasExams ? 'bg-slate-800/20' : ''}`}
                    >
                      <span className={`text-sm font-medium self-end w-6 h-6 flex items-center justify-center rounded-full mb-2
                        ${hasExams ? 'bg-slate-700 text-white' : 'text-slate-500'}
                      `}>
                        {day}
                      </span>
                      
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
                    </div>
                  )
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExamDashboard = () => {
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <FullCalendar exams={examsData} />

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
            <h1 className="text-3xl font-bold text-white tracking-tight">Term End Schedule</h1>
            <p className="text-slate-400 text-sm max-w-sm pt-2 leading-relaxed">
              Stay focused. Track your FAT papers and manage your revision time effectively.
            </p>
          </div>
        </div>
      </header>

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

      <div className="space-y-10">
        {['Term End', 'Grade Improvement', 'Mid Term', 'Regular'].map(sectionTitle => {
          const sectionExams = groupedExams[sectionTitle];
          if (!sectionExams || sectionExams.length === 0) return null;

          return (
            <div key={sectionTitle} className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2 border-t border-slate-800 pt-6">
                <Section className={`w-5 h-5 ${
                  sectionTitle === 'Grade Improvement' ? 'text-amber-500' :
                  sectionTitle === 'Term End' ? 'text-indigo-500' : 'text-emerald-500'
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
                    <div key={exam.id} className={`relative p-5 rounded-xl border transition-all duration-300 ${cardStyles}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center justify-center bg-slate-800 w-16 h-16 rounded-lg border border-slate-700 shrink-0">
                            <span className="text-xs text-slate-400 uppercase font-bold">
                              {new Date(exam.date).toLocaleString('en-US', { month: 'short' })}
                            </span>
                            <span className="text-2xl font-bold text-white">
                              {new Date(exam.date).getDate()}
                            </span>
                          </div>
                          
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

                        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 min-w-max">
                          {status === 'upcoming' && timeLeftStr && (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 mb-0.5">
                               <Hourglass size={12} />
                               <span>{timeLeftStr}</span>
                            </div>
                          )}
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
    </div>
  );
};


const TrainingDashboard = () => {
  const [scheduleMap, setScheduleMap] = useState(initialTrainingData.schedule);
  const [selectedDate, setSelectedDate] = useState('2026-05-04');
  
  const carouselDays = [];
  let d = new Date('2026-05-04');
  const maxDate = new Date('2026-05-22');
  
  while (d <= maxDate) {
    carouselDays.push(new Date(d).toISOString().split('T')[0]);
    d.setDate(d.getDate() + 1);
  }

  const selectedData = scheduleMap[selectedDate] || [];

  // User CSV Import - still kept just in case you ever want to update the schedule later without coding!
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const lines = text.split('\n');
      const newSchedule = {};
      
      let lastValidDate = null; // Memory for merged Excel cells!

      lines.forEach(line => {
        const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
        const cols = line.split(regex).map(s => s.trim().replace(/^"|"$/g, ''));
        
        if (cols.length >= 5) {
           const dateCell = cols[3];

           if (dateCell && /\d{1,2}\.\d{1,2}\.\d{2}/.test(dateCell)) {
             const [dd, mm, yy] = dateCell.split('.');
             lastValidDate = `20${yy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
           }

           const timeCell = cols[4];
           
           if (lastValidDate && timeCell && timeCell.includes('-')) {
              if (!newSchedule[lastValidDate]) {
                 newSchedule[lastValidDate] = [];
              }
              
              newSchedule[lastValidDate].push({
                school: cols[0] || 'TBD',
                faculty: cols[1] || 'TBD',
                topic: cols[2] || 'Practice / Self Study',
                time: timeCell.replace(/\s+/g, ' ').trim(),
                type: cols[5] || 'Online'
              });
           }
        }
      });

      if (Object.keys(newSchedule).length > 0) {
        setScheduleMap(newSchedule);
        const firstAvailable = Object.keys(newSchedule).sort()[0];
        if (firstAvailable) setSelectedDate(firstAvailable);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pt-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-2xl">
            <Presentation className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Summer Training</h1>
            <p className="text-slate-400 text-sm mt-1">B.Tech 23 Batch • Full Schedule</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-4 flex items-center gap-4 shadow-lg">
            <div className="bg-slate-800 p-2 rounded-lg">
              <Video className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Class Link</p>
              <a href={`https://${initialTrainingData.link}`} target="_blank" rel="noreferrer" className="text-sm font-mono text-indigo-300 hover:text-indigo-200 transition-colors">
                {initialTrainingData.link}
              </a>
            </div>
          </div>
          
          <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-700">
             <Upload size={14} className="text-indigo-400" />
             Import Custom CSV
             <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </header>

      {/* Date Selector Carousel */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-slate-200 font-semibold flex items-center gap-2">
             <CalendarIcon className="w-4 h-4 text-emerald-400"/>
             Select Date
           </h3>
           <span className="text-xs font-medium text-slate-500 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
             Timeline View
           </span>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar snap-x">
          {carouselDays.map((dateStr) => {
            const dateObj = new Date(dateStr);
            const isSelected = selectedDate === dateStr;
            const hasData = !!scheduleMap[dateStr];
            
            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`
                  snap-start shrink-0 flex flex-col items-center justify-center min-w-[70px] h-20 rounded-xl transition-all border
                  ${isSelected ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800'}
                `}
              >
                <span className="text-xs uppercase font-bold tracking-wider mb-1">
                  {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {dateObj.getDate()}
                </span>
                {hasData && (
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isSelected ? 'bg-emerald-400' : 'bg-indigo-500'}`} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Daily Schedule View */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-white">
            {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h2>
          {selectedData.length > 0 && (
            <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-md border border-slate-700">
              {selectedData.length} Sessions
            </span>
          )}
        </div>

        {selectedData.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <CheckCircle2 className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-300">No Training Scheduled</h3>
            <p className="text-slate-500 mt-1 max-w-sm">You have no classes today. Take a break!</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 pl-6 md:pl-10">
            {selectedData.map((session, index) => {
              const isLast = index === selectedData.length - 1;
              let breakStr = null;

              if (!isLast) {
                const partsCurrent = session.time.split('-');
                const partsNext = selectedData[index + 1].time.split('-');
                if (partsCurrent.length === 2 && partsNext.length === 2) {
                  breakStr = calculateBreakDuration(partsCurrent[1], partsNext[0]);
                }
              }

              return (
                <div key={index} className={`relative group ${!isLast ? 'mb-10' : ''}`}>
                  <div className="absolute left-[-31px] md:left-[-47px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500 group-hover:bg-emerald-500 transition-colors z-10" />
                  
                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold bg-emerald-500/10 w-max px-3 py-1 rounded-md border border-emerald-500/20">
                        <Clock size={16} />
                        {session.time}
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                        <Laptop size={12} />
                        {session.type}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-4 leading-tight">{session.topic}</h4>
                    
                    <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-500" />
                        <span className="font-medium text-slate-200">{session.faculty}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-slate-500" />
                        <span className="font-medium bg-slate-900 px-2 py-0.5 rounded text-indigo-300 border border-slate-700">
                          {session.school}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isLast && breakStr && (
                    <div className="absolute -bottom-5 left-[-23px] md:left-[-39px] -translate-x-1/2 translate-y-1/2 flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-full border border-slate-700 text-slate-400 text-[11px] font-semibold tracking-wider z-10 whitespace-nowrap shadow-md">
                      <Hourglass size={12} className="text-emerald-500" />
                      <span>{breakStr} break</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};


export default function App() {
  const [, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('training'); // default 'training' 

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
               </div>
               <span className="text-xl font-bold text-white tracking-tight hidden sm:block">Student Portal</span>
            </div>
            
            <nav className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('exams')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'exams' 
                    ? 'bg-indigo-500/20 text-indigo-300 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Exams</span>
              </button>
              <button 
                onClick={() => setActiveTab('training')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'training' 
                    ? 'bg-emerald-500/20 text-emerald-300 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Presentation className="w-4 h-4" />
                <span>Summer Training</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto p-6">
        {activeTab === 'exams' ? <ExamDashboard /> : <TrainingDashboard />}
        
        <footer className="pt-12 text-center text-slate-600 text-sm pb-8 border-t border-slate-800/50 mt-12">
          <p>© 2026 Academic Scheduler Portal</p>
        </footer>
      </main>

    </div>
  );
}