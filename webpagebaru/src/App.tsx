import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Info, 
  RotateCcw, 
  Calculator, 
  CheckCircle, 
  Award, 
  Bookmark, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  FolderHeart, 
  TrendingUp,
  X,
  FileText,
  Calendar,
  School,
  GraduationCap
} from 'lucide-react';
import { GradingScaleType, Subject, SavedGwaRecord } from './types';

// Initial state helpers
const initialUPScaleSubjects: Subject[] = [
  { id: '1', name: 'Subject 1', units: '0', grade: '0' },
  { id: '2', name: 'Subject 2', units: '0', grade: '0' },
  { id: '3', name: 'Subject 3', units: '0', grade: '0' },
];

const initialDLSUScaleSubjects: Subject[] = [
  { id: '1', name: 'Subject 1', units: '0', grade: '0' },
  { id: '2', name: 'Subject 2', units: '0', grade: '0' },
  { id: '3', name: 'Subject 3', units: '0', grade: '0' },
];

const initialPercentageScaleSubjects: Subject[] = [
  { id: '1', name: 'Subject 1', units: '0', grade: '0' },
  { id: '2', name: 'Subject 2', units: '0', grade: '0' },
  { id: '3', name: 'Subject 3', units: '0', grade: '0' },
];

// Safe LocalStorage helpers to avoid crashing inside sandboxed iframes
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("Storage access is blocked or restricted in current iframe sandbox context:", e);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("Storage write is blocked or restricted in current iframe sandbox context:", e);
    }
  }
};

export default function App() {
  const [scale, setScale] = useState<GradingScaleType>('UP');
  const [subjects, setSubjects] = useState<Subject[]>(initialUPScaleSubjects);
  
  // Custom semester label for saving
  const [semesterLabel, setSemesterLabel] = useState<string>('1st Sem - Year 1');
  
  // History list of saved terms
  const [savedRecords, setSavedRecords] = useState<SavedGwaRecord[]>(() => {
    try {
      const local = safeStorage.getItem('gwa_saved_records');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) {
          // Robust filter against corrupted/outdated data
          return parsed.filter(item => item && typeof item === 'object' && 'id' in item);
        }
      }
      return [];
    } catch (e) {
      console.error("Failed to parse saved academic records from local storage:", e);
      return [];
    }
  });

  // Main calculations
  const [gwaResult, setGwaResult] = useState<number | null>(null);
  const [totalUnitsResult, setTotalUnitsResult] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [isConfirmingClear, setIsConfirmingClear] = useState<boolean>(false);

  // Sync saved history with local storage safely
  useEffect(() => {
    safeStorage.setItem('gwa_saved_records', JSON.stringify(savedRecords));
  }, [savedRecords]);

  // Keep template updated when switching scales
  const handleScaleChange = (newScale: GradingScaleType) => {
    setScale(newScale);
    setIsCalculated(false);
    setValidationError(null);
    if (newScale === 'UP') {
      setSubjects(initialUPScaleSubjects);
    } else if (newScale === 'DLSU') {
      setSubjects(initialDLSUScaleSubjects);
    } else {
      setSubjects(initialPercentageScaleSubjects);
    }
  };

  // Add subject row
  const addSubjectRow = () => {
    const ids = subjects.map(s => parseInt(s.id) || 0);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    const nextId = (maxId + 1).toString();
    const newSubject: Subject = {
      id: nextId,
      name: `Subject ${nextId}`,
      units: '0',
      grade: '0',
    };
    setSubjects([...subjects, newSubject]);
    setIsCalculated(false);
  };

  // Remove subject row
  const removeSubjectRow = (id: string) => {
    const updated = subjects.filter(sub => sub.id !== id);
    setSubjects(updated);
    setIsCalculated(false);
  };

  // Handle input alterations
  const updateSubjectField = (id: string, field: keyof Subject, value: string) => {
    const updated = subjects.map(sub => {
      if (sub.id === id) {
        return { ...sub, [field]: value };
      }
      return sub;
    });
    setSubjects(updated);
    setIsCalculated(false);
    setValidationError(null);
  };

  // Autocomplete or select grade from template list
  const quickSelectGrade = (id: string, selectedGrade: string) => {
    updateSubjectField(id, 'grade', selectedGrade);
  };

  // Quick preset options for different school loads
  const loadPreset = (presetType: 'light' | 'normal' | 'heavy') => {
    setIsCalculated(false);
    setValidationError(null);
    const scaleDefaultGrade = scale === 'UP' ? '1.75' : scale === 'DLSU' ? '3.0' : '88';
    const numSubjects = presetType === 'light' ? 3 : presetType === 'normal' ? 6 : 8;
    
    const presetSubjects: Subject[] = Array.from({ length: numSubjects }, (_, i) => ({
      id: (i + 1).toString(),
      name: `Subject ${i + 1}`,
      units: i % 2 === 0 ? '3' : '2',
      grade: scaleDefaultGrade,
    }));
    setSubjects(presetSubjects);
  };

  // Clear all subjects
  const clearAllSubjects = () => {
    setSubjects([]);
    setIsCalculated(false);
    setValidationError(null);
  };

  // Validation function return true/false
  const validateInputs = (): boolean => {
    if (subjects.length === 0) {
      setValidationError("Aww, look like you don't have any subjects. Click '+ Add Subject' to start computing!");
      return false;
    }

    for (let i = 0; i < subjects.length; i++) {
      const s = subjects[i];
      const parsedUnits = parseFloat(s.units);
      const parsedGrade = parseFloat(s.grade);

      if (s.name.trim() === '') {
        setValidationError(`Oops! Please fill in the name for Subject on row ${i + 1}.`);
        return false;
      }

      if (isNaN(parsedUnits) || parsedUnits <= 0) {
        setValidationError(`Holy moly! Units for "${s.name}" must be a valid positive number.`);
        return false;
      }

      if (isNaN(parsedGrade)) {
        setValidationError(`Wait! Grade for "${s.name}" must be a number.`);
        return false;
      }

      // Scale range check
      if (scale === 'UP') {
        if (parsedGrade < 1.00 || parsedGrade > 5.0) {
          setValidationError(`UP grades generally range from 1.00 (Excellent) to 5.00 (Failed). "${s.name}" has ${s.grade}. Please double check!`);
          return false;
        }
      } else if (scale === 'DLSU') {
        if (parsedGrade < 0.0 || parsedGrade > 4.0) {
          setValidationError(`DLSU grades generally range from 0.0 (Failed) to 4.0 (Excellent). "${s.name}" has ${s.grade}. Please double check!`);
          return false;
        }
      } else if (scale === 'PERCENTAGE') {
        if (parsedGrade < 50 || parsedGrade > 100) {
          setValidationError(`Percentage grade for "${s.name}" must be between 50 and 100 percent.`);
          return false;
        }
      }
    }

    setValidationError(null);
    return true;
  };

  // Main Calculation Execution
  const handleCalculate = () => {
    if (!validateInputs()) return;

    let totalUnits = 0;
    let weightedSum = 0;

    subjects.forEach(sub => {
      const units = parseFloat(sub.units);
      const grade = parseFloat(sub.grade);
      totalUnits += units;
      weightedSum += (grade * units);
    });

    if (totalUnits === 0) {
      setValidationError("Total units cannot be zero. Add positive units to compute GWA.");
      return;
    }

    const calculatedGwa = weightedSum / totalUnits;
    setGwaResult(parseFloat(calculatedGwa.toFixed(3)));
    setTotalUnitsResult(totalUnits);
    setIsCalculated(true);
  };

  // Save current calculation to history records
  const saveToHistory = () => {
    if (gwaResult === null) return;
    
    const newRecord: SavedGwaRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleDateString('en-PH', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      semesterName: semesterLabel.trim() || `Semester ${savedRecords.length + 1}`,
      gwa: gwaResult,
      totalUnits: totalUnitsResult,
      scale: scale,
      subjects: subjects.map(s => ({
        name: s.name,
        units: parseFloat(s.units),
        grade: parseFloat(s.grade)
      }))
    };

    setSavedRecords([newRecord, ...savedRecords]);
    
    // Auto increment label prediction for user convenience
    if (semesterLabel.includes('1st')) {
      setSemesterLabel(semesterLabel.replace('1st', '2nd'));
    } else if (semesterLabel.includes('2nd')) {
      setSemesterLabel(semesterLabel.replace('2nd', 'Midyear'));
    } else if (semesterLabel.includes('Midyear')) {
      const match = semesterLabel.match(/Year\s*(\d+)/i);
      if (match) {
        const nextYear = parseInt(match[1]) + 1;
        setSemesterLabel(`1st Sem - Year ${nextYear}`);
      } else {
        setSemesterLabel('1st Sem - Year 2');
      }
    } else {
      setSemesterLabel(`Term ${savedRecords.length + 2}`);
    }
  };

  // Delete history item
  const deleteRecord = (id: string) => {
    setSavedRecords(savedRecords.filter(rec => rec.id !== id));
  };

  // Load a saved calculation back into active worksheet
  const loadSavedRecordToWorksheet = (rec: SavedGwaRecord) => {
    setScale(rec.scale);
    setSemesterLabel(rec.semesterName);
    
    const formattedSubjects: Subject[] = Array.isArray(rec.subjects)
      ? rec.subjects.map((sub, idx) => ({
          id: (idx + 1).toString(),
          name: sub.name || `Subject ${idx + 1}`,
          units: sub.units ? sub.units.toString() : '3',
          grade: sub.grade ? sub.grade.toString() : '3.0'
        }))
      : [];

    setSubjects(formattedSubjects);
    setGwaResult(rec.gwa);
    setTotalUnitsResult(rec.totalUnits);
    setIsCalculated(true);
    setValidationError(null);
  };

  // Calculate Cumulative Overall CGWA from saved history
  const calculateCumulativeHistoryGwa = () => {
    const matchingRecords = savedRecords.filter(r => r.scale === scale);
    if (matchingRecords.length === 0) return null;

    let cumulativeWeightedGrade = 0;
    let cumulativeUnits = 0;

    matchingRecords.forEach(rec => {
      cumulativeWeightedGrade += (rec.gwa * rec.totalUnits);
      cumulativeUnits += rec.totalUnits;
    });

    if (cumulativeUnits === 0) return null;
    return {
      cgwa: parseFloat((cumulativeWeightedGrade / cumulativeUnits).toFixed(3)),
      units: cumulativeUnits,
      semesters: matchingRecords.length
    };
  };

  const cumulativeStats = calculateCumulativeHistoryGwa();

  // Philippine Honor Roll Text, emojis and color criteria
  const getHonorAwards = (gwa: number, currentScale: GradingScaleType) => {
    if (currentScale === 'UP') {
      if (gwa >= 1.00 && gwa <= 1.20) {
        return {
          title: "Summa Cum Laude ✨🏆",
          description: "Exceptional feat! You lead with outstanding Philippine excellence. Padayon!",
          color: "text-amber-800 bg-amber-100 border-amber-900",
          accentColor: "#d97706",
          badge: "DL Eligible"
        };
      } else if (gwa > 1.20 && gwa <= 1.45) {
        return {
          title: "Magna Cum Laude 🌟",
          description: "Stellar accomplishment! Highly prestigious score reflecting complete academic mastery.",
          color: "text-purple-800 bg-purple-100 border-purple-900",
          accentColor: "#9333ea",
          badge: "DL Eligible"
        };
      } else if (gwa > 1.45 && gwa <= 1.75) {
        return {
          title: "Cum Laude 🎓",
          description: "Top-tier standing! Deeply respected throughout major universities in Manila & provinces.",
          color: "text-blue-800 bg-blue-100 border-blue-900",
          accentColor: "#0284c7",
          badge: "DL Eligible"
        };
      } else if (gwa > 1.75 && gwa <= 2.00) {
        return {
          title: "Chancellor's Lister 🎖️",
          description: "First-class list honor. You hold deep focus and beautiful perseverance.",
          color: "text-emerald-800 bg-emerald-100 border-emerald-900",
          accentColor: "#0d9488",
          badge: "DL Eligible"
        };
      } else if (gwa <= 3.00) {
        return {
          title: "Good Academic Standing 👍",
          description: "Consistent path! You cleared all credits successfully without issues.",
          color: "text-slate-800 bg-slate-100 border-slate-900",
          accentColor: "#059669",
          badge: "Passed"
        };
      } else {
        return {
          title: "Needs Support ⚠️",
          description: "Take heart. Plan your next trimester with active consultations and strategies.",
          color: "text-rose-800 bg-rose-100 border-rose-900",
          accentColor: "#e11d48",
          badge: "Warning"
        };
      }
    } else if (currentScale === 'DLSU') {
      if (gwa >= 3.80 && gwa <= 4.00) {
        return {
          title: "Summa Cum Laude 💚✨",
          description: "Pristine green-and-white honors! Perfectly aligned with the absolute peak of DLSU Taft.",
          color: "text-emerald-800 bg-emerald-100 border-emerald-900",
          accentColor: "#15803d",
          badge: "First Honors"
        };
      } else if (gwa >= 3.60 && gwa < 3.80) {
        return {
          title: "Magna Cum Laude 🌟",
          description: "Remarkable DLSU Honors. Consistently exceptional mark of distinction.",
          color: "text-teal-800 bg-teal-100 border-teal-900",
          accentColor: "#0f766e",
          badge: "First Honors"
        };
      } else if (gwa >= 3.40 && gwa < 3.60) {
        return {
          title: "Cum Laude 🎓",
          description: "Brilliant DLSU GPA. Prominent candidate for first-class recognition ceremonies.",
          color: "text-sky-800 bg-sky-100 border-sky-900",
          accentColor: "#0369a1",
          badge: "First Honors"
        };
      } else if (gwa >= 3.00 && gwa < 3.40) {
        return {
          title: "Second Honors Lister 🎖️",
          description: "Excellent study focus. Splendid results keeping you safe on the Dean's List.",
          color: "text-violet-800 bg-violet-100 border-violet-900",
          accentColor: "#4338ca",
          badge: "Second Honors"
        };
      } else if (gwa >= 1.0) {
        return {
          title: "Passed Successfully 👍",
          description: "Courses passed securely. Continue honing your active craft tri-by-tri.",
          color: "text-slate-800 bg-slate-100 border-slate-900",
          accentColor: "#334155",
          badge: "Academic Pass"
        };
      } else {
        return {
          title: "Academic Deficiency ⚠️",
          description: "Grade fell under passing levels. Re-track core milestones for the next trimester.",
          color: "text-rose-800 bg-rose-100 border-rose-900",
          accentColor: "#be123c",
          badge: "Warning"
        };
      }
    } else {
      if (gwa >= 98.0) {
        return {
          title: "With Highest Honors 🏆✨",
          description: "Glorious high school score! Leading your batches with exceptional absolute pride.",
          color: "text-amber-800 bg-amber-100 border-amber-900",
          accentColor: "#b45309",
          badge: "With Highest Honors"
        };
      } else if (gwa >= 95.0 && gwa < 98.0) {
        return {
          title: "With High Honors 🌟",
          description: "Supremely respectable grade representing deep dedication over complex homework.",
          color: "text-purple-800 bg-purple-100 border-purple-900",
          accentColor: "#6b21a8",
          badge: "With High Honors"
        };
      } else if (gwa >= 90.0 && gwa < 95.0) {
        return {
          title: "With Honors 🎓",
          description: "Fantastic achievement putting you right into the outstanding honor roll ranks.",
          color: "text-blue-800 bg-blue-100 border-blue-900",
          accentColor: "#1d4ed8",
          badge: "With Honors"
        };
      } else if (gwa >= 75.0 && gwa < 90.0) {
        return {
          title: "Passed Comfortably 👍",
          description: "Good standard completion. Fully cleared to register upcoming school terms.",
          color: "text-slate-800 bg-slate-100 border-slate-900",
          accentColor: "#334155",
          badge: "Passed"
        };
      } else {
        return {
          title: "Failed Grade ⚠️",
          description: "Below standard 75% metric. Align with school counselors for recovery routes.",
          color: "text-rose-800 bg-rose-100 border-rose-900",
          accentColor: "#be123c",
          badge: "No Pass"
        };
      }
    }
  };

  const currentAward = gwaResult !== null ? getHonorAwards(gwaResult, scale) : null;

  // Typical grade templates depending on current scale
  const gradeSuggestions = scale === 'UP' 
    ? ['1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.50', '2.75', '3.00', '5.00']
    : scale === 'DLSU'
      ? ['4.0', '3.5', '3.0', '2.5', '2.0', '1.5', '1.0', '0.0']
      : ['98', '95', '92', '90', '85', '80', '75', '70'];

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 md:px-8 selection:bg-yellow-200 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Neubrutalist Bento Header Block */}
        <header className="bg-white border-3 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-yellow-400 border-2 border-slate-900 text-xs font-black uppercase px-2.5 py-0.5 rounded-full shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                v1.2 Live Portal
              </span>
              <span className="text-xs text-slate-500 font-bold tracking-widest uppercase">PHILIPPINES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
              GWA Calculator
            </h1>
            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest mt-0.5">
              General Weighted Average Tool for PH Students
            </p>
          </div>
          
          <div className="md:text-right border-t md:border-t-0 border-slate-900/10 pt-4 md:pt-0 flex flex-wrap md:flex-col gap-x-4 gap-y-1">
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Active System</div>
              <div className="text-sm font-black text-indigo-600 uppercase">
                {scale === 'UP' ? 'UP (1.00 - 5.00)' : scale === 'DLSU' ? 'DLSU (4.00 - 0.00)' : 'HIGH SCHOOL (50 - 100)'}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Scale Tabs (Neubrutalist Bento Selection) */}
        <div className="bg-white border-3 border-slate-900 rounded-3xl p-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleScaleChange('UP')}
            className={`py-3 px-4 text-xs sm:text-sm font-black tracking-tight rounded-2xl border-2 transition-all duration-150 flex items-center justify-center gap-2 ${
              scale === 'UP'
                ? 'bg-violet-500 text-white border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-x-0.5 -translate-y-0.5'
                : 'bg-slate-50 text-slate-700 border-transparent hover:border-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            UP / State Colleges (1.00 - 5.00)
          </button>
          
          <button
            onClick={() => handleScaleChange('DLSU')}
            className={`py-3 px-4 text-xs sm:text-sm font-black tracking-tight rounded-2xl border-2 transition-all duration-150 flex items-center justify-center gap-2 ${
              scale === 'DLSU'
                ? 'bg-emerald-500 text-white border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-x-0.5 -translate-y-0.5'
                : 'bg-slate-50 text-slate-700 border-transparent hover:border-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            DLSU / Taft (4.00 - 0.00)
          </button>

          <button
            onClick={() => handleScaleChange('PERCENTAGE')}
            className={`py-3 px-4 text-xs sm:text-sm font-black tracking-tight rounded-2xl border-2 transition-all duration-150 flex items-center justify-center gap-2 ${
              scale === 'PERCENTAGE'
                ? 'bg-amber-500 text-white border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-x-0.5 -translate-y-0.5'
                : 'bg-slate-50 text-slate-700 border-transparent hover:border-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            High School & % (50 - 100)
          </button>
        </div>

        {/* Bento Grid Main Layout */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Bento Block 1: Main Worksheet (Takes largest room) - span 8 on large, 12 on mobile */}
          <div className="col-span-12 lg:col-span-8 bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
            
            <div>
              <div className="flex justify-between items-center mb-6 border-b-2 border-slate-900 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-violet-600 rounded-full border border-slate-900"></span>
                  <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">Course Breakdown</h2>
                </div>
                
                <button 
                  onClick={() => setShowInfoModal(true)}
                  className="bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 text-slate-900 px-3 py-1 text-xs font-black rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform active:translate-y-0.5 flex items-center gap-1 cursor-pointer"
                  title="Scale Details Guide"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Info Guide</span>
                </button>
              </div>

              {/* Course rows headers */}
              <div className="grid grid-cols-12 gap-3 px-4 py-2 bg-slate-200 border-2 border-slate-950 rounded-xl text-[10px] font-black text-slate-700 uppercase tracking-wider mb-4">
                <div className="col-span-5 sm:col-span-6">Subject / Course Details</div>
                <div className="col-span-3 text-center">Units</div>
                <div className="col-span-3 text-center">Grade</div>
                <div className="col-span-1"></div>
              </div>

              {/* Dynamic rows container */}
              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {subjects.map((sub, index) => (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.15 }}
                      className="grid grid-cols-12 gap-2 sm:gap-3 px-3 py-3 bg-slate-50 border-2 border-slate-900 rounded-2xl items-center hover:bg-slate-100/50 transition-colors"
                    >
                      {/* Subject label and text input */}
                      <div className="col-span-5 sm:col-span-6 flex flex-col sm:flex-row sm:items-center gap-1.5 focus-within:text-violet-650">
                        <span className="text-[10px] font-black bg-slate-200 text-slate-800 border border-slate-900 rounded py-0.5 px-1.5 w-fit select-none shrink-0 font-mono">
                          Row {index + 1}
                        </span>
                        <input
                          type="text"
                          value={sub.name}
                          placeholder={`Enter name or code`}
                          onChange={(e) => updateSubjectField(sub.id, 'name', e.target.value)}
                          className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none placeholder-slate-400 border-b-2 border-transparent focus:border-slate-900 py-0.5"
                        />
                      </div>

                      {/* Units Input */}
                      <div className="col-span-3 text-center">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          placeholder="Units"
                          value={sub.units}
                          onChange={(e) => updateSubjectField(sub.id, 'units', e.target.value)}
                          className="w-full text-center py-1.5 px-1 text-sm font-mono font-bold bg-white border-2 border-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
                        />
                      </div>

                      {/* Grade Input with mini select bubble */}
                      <div className="col-span-3 flex items-center gap-1 relative">
                        <input
                          type="text"
                          placeholder="Grade"
                          value={sub.grade}
                          onChange={(e) => updateSubjectField(sub.id, 'grade', e.target.value)}
                          className="w-full text-center py-1.5 px-1 text-sm font-mono font-black text-indigo-700 bg-white border-2 border-slate-900 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
                        />
                        
                        {/* Grade Dropdown Selector */}
                        <div className="hidden sm:block shrink-0 dropdown group relative">
                          <button 
                            type="button"
                            className="bg-slate-100 hover:bg-yellow-300 border border-slate-900 text-slate-800 text-[9px] font-black uppercase px-1 rounded transition-colors"
                          >
                            Set
                          </button>
                          <div className="absolute right-0 bottom-full mb-1 opacity-0 pointer-events-none group-focus-within:opacity-100 group-focus-within:pointer-events-auto hover:opacity-100 hover:pointer-events-auto bg-white border-2 border-slate-900 shadow-lg rounded-xl p-2 grid grid-cols-4 gap-1 z-10 w-44 transition-opacity duration-150">
                            <span className="col-span-4 text-[9px] text-slate-400 font-extrabold text-center select-none pb-1">Quick Grade</span>
                            {gradeSuggestions.map(g => (
                              <button
                                key={g}
                                type="button"
                                onClick={() => quickSelectGrade(sub.id, g)}
                                className="p-0.5 hover:bg-yellow-300 hover:text-slate-900 text-[11px] font-mono font-bold border border-slate-300 rounded text-center transition-all bg-slate-50"
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Neubrutalist Delete Button */}
                      <div className="col-span-1 text-right flex justify-end">
                        <button
                          onClick={() => removeSubjectRow(sub.id)}
                          className="w-7 h-7 bg-red-400 hover:bg-red-500 border-2 border-slate-900 rounded-full flex items-center justify-center hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] active:translate-y-0.5 transition-all text-white shrink-0 cursor-pointer"
                          title="Delete Row"
                        >
                          <X className="w-3.5 h-3.5 text-slate-950 font-black stroke-[3]" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {subjects.length === 0 && (
                  <div className="text-center py-12 px-6 border-3 border-dashed border-slate-900 rounded-2xl bg-slate-50">
                    <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2 stroke-[1.5]" />
                    <p className="text-sm font-bold text-slate-900">Your worksheet is empty!</p>
                    <p className="text-xs text-slate-500 mt-1">Please click '+ Add Subject' below to insert a new grade row.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Validation Alerts inside Bento space */}
            {validationError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 bg-red-100 text-slate-900 text-xs font-bold rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-2"
              >
                <Info className="w-4 h-4 shrink-0 text-red-650" />
                <span>{validationError}</span>
              </motion.div>
            )}

            {/* Bottom Actions inside the same Bento body */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-4 border-t-2 border-slate-900">
              <button
                onClick={addSubjectRow}
                className="flex-1 bg-violet-400 hover:bg-violet-500 text-slate-950 font-black py-3 px-4 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all duration-150 flex items-center justify-center gap-1.5 text-sm uppercase tracking-wide cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Add Subject</span>
              </button>

              <button
                onClick={handleCalculate}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black py-3 px-4 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all duration-150 flex items-center justify-center gap-1.5 text-sm uppercase tracking-wide cursor-pointer"
              >
                <Calculator className="w-4 h-4 stroke-[3]" />
                <span>Calculate GWA</span>
              </button>
            </div>

          </div>

          {/* Bento Column 2 (Right side containing widgets blocks) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

            {/* Bento Block 2: Main Results Block (Changes colors when calculated) */}
            <div className={`border-3 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-colors ${
              isCalculated && gwaResult !== null 
                ? 'bg-indigo-700 text-white' 
                : 'bg-white text-slate-900'
            }`}>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isCalculated && gwaResult !== null ? 'text-indigo-200' : 'text-slate-400'}`}>
                    Active Calculation
                  </span>
                  <h3 className="text-lg font-black uppercase tracking-tight">Semester GWA</h3>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-black border-2 ${
                  isCalculated && gwaResult !== null ? 'bg-indigo-700 border-slate-900 text-white' : 'bg-slate-100 border-slate-900 text-slate-700'
                }`}>
                  {scale}
                </div>
              </div>

              {isCalculated && gwaResult !== null ? (
                <div className="space-y-4">
                  {/* Big bold bento GWA result */}
                  <div className="text-center py-4 bg-slate-950/20 rounded-2xl border-2 border-slate-900/10">
                    <div className="text-6xl sm:text-7xl font-black tracking-tighter leading-none">
                      {gwaResult}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mt-2">
                      Total Units: {totalUnitsResult} • Subjects: {subjects.length}
                    </div>
                  </div>

                  {/* Honor details bubble */}
                  {currentAward && (
                    <div className="bg-white text-slate-900 border-2 border-slate-900 rounded-2xl p-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Award className="w-5 h-5 text-indigo-600 animate-bounce" />
                        <span className="font-extrabold text-sm uppercase text-slate-900">{currentAward.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-bold leading-normal">
                        {currentAward.description}
                      </p>
                    </div>
                  )}

                  {/* Save to History layout */}
                  <div className="space-y-2 pt-2 border-t-2 border-slate-900/15">
                    <label className="block text-[10px] font-black uppercase text-indigo-200">Semester Track Label</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 1st Sem - Year 1"
                        value={semesterLabel}
                        onChange={(e) => setSemesterLabel(e.target.value)}
                        className="flex-1 bg-white border-2 border-slate-900 text-slate-900 text-xs font-mono font-black py-2 px-3 rounded-xl focus:outline-none"
                      />
                      <button
                        onClick={saveToHistory}
                        className="bg-yellow-400 text-slate-950 border-2 border-slate-900 text-xs font-black py-2 px-4 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] active:translate-y-0.5 transition-all uppercase tracking-wider shrink-0 cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-3">
                  <div className="w-12 h-12 bg-slate-100 border-2 border-slate-900 rounded-full flex items-center justify-center mx-auto shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <Calculator className="w-6 h-6 text-slate-550 stroke-[2]" />
                  </div>
                  <p className="text-xs font-extrabold text-slate-700 uppercase">Awaiting Computation</p>
                  <p className="text-[11px] text-slate-400 max-w-[200px] mx-auto leading-normal">
                    Insert grades then press "Calculate GWA" to trigger results & honors assessment!
                  </p>
                </div>
              )}

            </div>

            {/* Bento Block 3: Presets & Workspace controllers (Yellow accent) */}
            <div className="bg-yellow-100 border-3 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">
                  Workspace Helpers
                </span>
                <h3 className="text-lg font-black uppercase text-slate-900 mb-3 flex items-center gap-1.5">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                  Fill Templates
                </h3>
                <p className="text-[11px] font-bold text-slate-500 leading-normal mb-4">
                  Quickly fill rows with a generic semester workload according to standard requirements.
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => loadPreset('light')}
                    className="py-1.5 px-2 bg-white border-2 border-slate-900 rounded-xl text-[11px] font-black hover:bg-yellow-400 transition-colors uppercase tracking-tight shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
                  >
                    Light (3)
                  </button>
                  <button
                    onClick={() => loadPreset('normal')}
                    className="py-1.5 px-2 bg-white border-2 border-slate-900 rounded-xl text-[11px] font-black hover:bg-yellow-400 transition-colors uppercase tracking-tight shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
                  >
                    Norm (6)
                  </button>
                  <button
                    onClick={() => loadPreset('heavy')}
                    className="py-1.5 px-2 bg-white border-2 border-slate-900 rounded-xl text-[11px] font-black hover:bg-yellow-400 transition-colors uppercase tracking-tight shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
                  >
                    Heavy (8)
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-slate-900/10 text-right">
                <button
                  onClick={clearAllSubjects}
                  className="bg-white border-2 border-slate-900 text-slate-900 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl hover:bg-red-400 transition-colors inline-flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] active:translate-y-0.5"
                >
                  <RotateCcw className="w-3 h-3 text-slate-900 stroke-[3.5]" />
                  <span>Clear All Workspace</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bento Grid Row 2: Stats & Academic History */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Bento Block 4: Cumulative overall CGWA score (Seagreen Accent) */}
          <div className="col-span-12 md:col-span-4 bg-teal-700 text-white border-3 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black text-teal-200 uppercase tracking-widest block mb-1">
                Career Track Progress
              </span>
              <h3 className="text-lg font-black uppercase text-white mb-4 flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-teal-300" />
                Cumulative CGWA
              </h3>

              {savedRecords.length > 0 && cumulativeStats ? (
                <div className="space-y-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-6xl font-black tracking-tighter text-white font-mono">
                      {cumulativeStats.cgwa}
                    </span>
                    <span className="text-xs text-teal-200 uppercase font-bold">
                      ({scale} scale)
                    </span>
                  </div>
                  
                  <div className="bg-slate-950/20 p-3 rounded-xl border border-slate-950/10 text-[11px] font-bold text-teal-100 leading-relaxed font-semibold">
                    Computed across {cumulativeStats.semesters} saved semesters totalizing {cumulativeStats.units} units. Fantastic performance!
                  </div>

                  <div className="flex justify-between items-center bg-white text-slate-900 py-1.5 px-3 border-2 border-slate-900 rounded-xl shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
                    <span className="text-[10px] font-black uppercase text-slate-500">Overall Stand:</span>
                    <span className="text-[11px] font-black uppercase text-indigo-700">
                      {getHonorAwards(cumulativeStats.cgwa, scale).badge}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-teal-200 space-y-2">
                  <GraduationCap className="w-10 h-10 mx-auto text-teal-200 stroke-[1.5] animate-pulse" />
                  <p className="text-xs font-black uppercase text-teal-200">No CGWA computed yet</p>
                  <p className="text-[10px] text-teal-150 max-w-[190px] mx-auto leading-normal">
                    Compute your semesters and click "Save Semester" to observe automatically aggregated lifetime career average!
                  </p>
                </div>
              )}
            </div>
            
            <div className="text-[9px] font-bold text-teal-200 uppercase mt-4 pt-2 border-t border-white/10 tracking-widest text-center">
              Active formula: standard weighted unit divisor
            </div>
          </div>

          {/* Bento Block 5: Academic Saved History logs (Takes span 4) */}
          <div className="col-span-12 md:col-span-4 bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Saved Logs</span>
                <span className="text-[10px] bg-slate-100 border border-slate-900 text-slate-900 font-extrabold px-2 py-0.5 rounded-full font-mono">
                  {savedRecords.length} Term{savedRecords.length === 1 ? '' : 's'}
                </span>
              </div>

              {savedRecords.length === 0 ? (
                <div className="py-10 text-center text-slate-400 space-y-2">
                  <FolderHeart className="w-8 h-8 text-slate-300 mx-auto stroke-[1.5]" />
                  <p className="text-xs font-black uppercase text-slate-700">History Empty</p>
                  <p className="text-[10px] text-slate-400 max-w-[190px] mx-auto leading-normal">
                    Your semester logs are stored in your localized terminal space for seamless future tracking.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                  {savedRecords.map(rec => (
                    <div 
                      key={rec.id}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-900/60 transition-all flex justify-between items-center gap-2 text-xs"
                    >
                      <div className="truncate flex-1">
                        <h4 className="font-extrabold text-slate-900 truncate" title={rec.semesterName}>
                          {rec.semesterName}
                        </h4>
                        <span className="text-[9px] text-slate-400 font-mono">{rec.timestamp}</span>
                      </div>
                      
                      <div className="text-right flex items-center gap-2">
                        <div className="font-mono font-black text-sm text-indigo-700">
                          {rec.gwa}
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => loadSavedRecordToWorksheet(rec)}
                            className="bg-white border border-slate-900 text-[9px] text-slate-900 hover:bg-yellow-300 font-extrabold py-0.5 px-1 rounded shadow-[0.5px_0.5px_0px_0px_rgba(15,23,42,1)]"
                            title="Load sheet"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deleteRecord(rec.id)}
                            className="text-[9px] text-red-500 hover:underline font-bold"
                            title="Delete Log"
                          >
                            Del
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {savedRecords.length > 0 && (
              <div className="text-center mt-3 pt-2 border-t border-slate-100 min-h-[30px] flex items-center justify-center">
                {!isConfirmingClear ? (
                  <button
                    onClick={() => setIsConfirmingClear(true)}
                    className="text-[10px] text-red-500 hover:text-red-700 font-black uppercase tracking-wider cursor-pointer"
                  >
                    Clear logs directory
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-[9px] uppercase font-black">
                    <span className="text-red-600">Are you sure?</span>
                    <button
                      onClick={() => {
                        setSavedRecords([]);
                        setIsConfirmingClear(false);
                      }}
                      className="bg-red-500 text-white px-2 py-0.5 rounded border border-slate-900 cursor-pointer shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:bg-red-600 transition-colors"
                    >
                      Yes, Clear
                    </button>
                    <button
                      onClick={() => setIsConfirmingClear(false)}
                      className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-900 cursor-pointer shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bento Block 6: PH Universities Grading Guide Reference (Amber accent) */}
          <div className="col-span-12 md:col-span-4 bg-amber-50 border-3 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block mb-1">
                Help & Reference
              </span>
              <h3 className="text-lg font-black uppercase text-slate-900 mb-3 flex items-center gap-1.5">
                <School className="w-5 h-5 text-amber-700" />
                Filipino Grading Scale
              </h3>
              
              <ul className="space-y-2 text-[11px] text-slate-700 font-bold leading-normal">
                <li className="flex gap-1.5 items-start">
                  <span className="w-1.5 h-1.5 bg-violet-500 border border-slate-900 rounded-full mt-1 shrink-0"></span>
                  <span><strong>UP, PUP & State Schools:</strong> Uses 1.00 (Excellent) down to 3.00 (Passed) and 5.00 (Failed). Lower numeric values represent higher achievement.</span>
                </li>
                <li className="flex gap-1.5 items-start">
                  <span className="w-1.5 h-1.5 bg-emerald-500 border border-slate-900 rounded-full mt-1 shrink-0"></span>
                  <span><strong>La Salle (DLSU):</strong> 4.0 is outstanding, 1.0 is direct pass, and 0.0 represents deficiency.</span>
                </li>
                <li className="flex gap-1.5 items-start">
                  <span className="w-1.5 h-1.5 bg-amber-500 border border-slate-900 rounded-full mt-1 shrink-0"></span>
                  <span><strong>DepEd / Senior High:</strong> Percentage based scale from 100 down to 75 (passing bar limit).</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-100 p-2 rounded-xl border border-slate-300 text-[10px] font-bold text-slate-600 leading-normal mt-4">
              💡 Tip: Physical education (PE) and National Service Training (NSTP) courses generally do not impact standard university GWA calculations in the Philippines!
            </div>
          </div>

        </div>

        {/* Footer section complying with neat neubrutalist style */}
        <footer className="bg-white border-2 border-slate-900 rounded-2xl py-4 px-6 flex flex-col sm:flex-row justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <div>STUDENT CALCULATION PORTAL</div>
          <div className="hidden sm:block">Standard Weighted Average Formula (Σ (Grade * Units) / Σ Units)</div>
          <div>© 2026 Grade Insight Tools</div>
        </footer>

      </div>

      {/* Graduation systems guide Drawer / modal overlay */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfoModal(false)}
              className="absolute inset-0 bg-slate-950"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative max-w-lg w-full bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] z-10"
            >
              <div className="flex justify-between items-start mb-4 pb-2 border-b-2 border-slate-900">
                <h3 className="text-lg font-black uppercase text-slate-900 flex items-center gap-1.5">
                  <GraduationCap className="w-5 h-5 text-violet-600" />
                  PH Academics System Guide
                </h3>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="w-7 h-7 bg-red-400 hover:bg-red-500 border-2 border-slate-900 rounded-full flex items-center justify-center cursor-pointer shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                >
                  <X className="w-4 h-4 text-slate-950 stroke-[3.5]" />
                </button>
              </div>

              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 text-xs font-bold text-slate-700 leading-normal">
                
                <div className="p-3.5 bg-violet-50 border-2 border-slate-900 rounded-2xl">
                  <h4 className="font-extrabold text-violet-850 uppercase text-xs mb-1">1. State Colleges System (UP / PUP / PLM)</h4>
                  <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">
                    1.00 is excellent and 3.00 is passing. 5.00 represents failed credit. Lower integers indicate significantly better grade metrics.
                  </p>
                  <div className="grid grid-cols-3 gap-1 mt-2 text-[10px] text-center font-bold font-mono">
                    <span className="bg-white border border-slate-900 p-1 rounded">1.00 : Excellent</span>
                    <span className="bg-white border border-slate-900 p-1 rounded">3.00 : Passing</span>
                    <span className="bg-rose-100 border border-slate-900 p-1 rounded">5.00 : Failing</span>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-50 border-2 border-slate-900 rounded-2xl">
                  <h4 className="font-extrabold text-emerald-850 uppercase text-xs mb-1">2. La Salle System (DLSU Taft & others)</h4>
                  <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">
                    4.0 is outstanding and 1.0 is passing. 0.0 represents failure. Weighted GWA computes term-by-term and impacts Dean's Honor status.
                  </p>
                  <div className="grid grid-cols-3 gap-1 mt-2 text-[10px] text-center font-bold font-mono">
                    <span className="bg-white border border-slate-900 p-1 rounded">4.0 : Outstanding</span>
                    <span className="bg-white border border-slate-900 p-1 rounded">1.0 : Passed</span>
                    <span className="bg-rose-100 border border-slate-900 p-1 rounded">0.0 : Failed</span>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50 border-2 border-slate-900 rounded-2xl">
                  <h4 className="font-extrabold text-amber-850 uppercase text-xs mb-1">3. Percentage Standard (High Schools & Colleges)</h4>
                  <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">
                    Standard numeric value from 100 down to 75 (passing bar limit). Common in Senior High Schools, Ateneo (various forms), and UST.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border-2 border-slate-900 rounded-2xl text-[11px] text-slate-600">
                  📌 <strong>Weight Formula note:</strong> The General Weighted Average (GWA) is calculated as:
                  <div className="bg-white border border-slate-900 font-mono font-bold text-slate-800 p-2 rounded text-center my-1.5 text-xs">
                    GWA = Σ (Grade × Units) ÷ Σ Total Units
                  </div>
                  Each course grade is multiplied by its units load to ensure that higher unit subjects contribute proportionally more weight.
                </div>

              </div>

              <div className="mt-4 pt-4 border-t-2 border-slate-900 flex justify-end">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="bg-yellow-400 border-2 border-slate-900 text-slate-950 px-4 py-2 text-xs font-black rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] active:translate-y-0.5 transition-all uppercase cursor-pointer"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
