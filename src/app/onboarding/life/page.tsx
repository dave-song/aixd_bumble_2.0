'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PhoneFrame, StatusBar } from '@/components/layout';
import { ProgressBar, Chip, Toggle } from '@/components/ui';
import { ChevronRight } from 'lucide-react';
import { lifeExperiences } from '@/lib/mockData';

export default function LifePage() {
  const router = useRouter();
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [showOnProfile, setShowOnProfile] = useState(true);

  const toggleExperience = (id: string) => {
    if (selectedExperiences.includes(id)) {
      setSelectedExperiences(selectedExperiences.filter((e) => e !== id));
    } else if (selectedExperiences.length < 3) {
      setSelectedExperiences([...selectedExperiences, id]);
    }
  };

  const handleNext = () => {
    router.push('/onboarding/values');
  };

  const travelExperiences = lifeExperiences.filter((e) => e.category === 'travel');
  const educationExperiences = lifeExperiences.filter((e) => e.category === 'education');
  const workingExperiences = lifeExperiences.filter((e) => e.category === 'working');

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />
        
        {/* Progress bar */}
        <div className="px-6 pt-4">
          <ProgressBar steps={5} currentStep={3} />
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pt-8 overflow-auto hide-scrollbar pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-[28px] font-bold text-black leading-tight">
              Your life
            </h1>
            <p className="text-gray-600 mt-2 text-base leading-relaxed">
              Pick <span className="font-semibold">up to 3</span> to find friends with <span className="font-semibold">shared experiences.</span>
            </p>
          </motion.div>

          {/* Toggle */}
          <div className="mt-6">
            <Toggle
              checked={showOnProfile}
              onChange={setShowOnProfile}
              label="Shown on my profile"
            />
          </div>

          {/* Travel */}
          <div className="mt-6">
            <h2 className="text-base font-semibold text-black mb-3">Travel</h2>
            <div className="flex flex-wrap gap-2">
              {travelExperiences.map((exp) => (
                <Chip
                  key={exp.id}
                  emoji={exp.emoji}
                  label={exp.label}
                  selected={selectedExperiences.includes(exp.id)}
                  onSelect={() => toggleExperience(exp.id)}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-6" />

          {/* Education */}
          <div>
            <h2 className="text-base font-semibold text-black mb-3">Education</h2>
            <div className="flex flex-wrap gap-2">
              {educationExperiences.map((exp) => (
                <Chip
                  key={exp.id}
                  emoji={exp.emoji}
                  label={exp.label}
                  selected={selectedExperiences.includes(exp.id)}
                  onSelect={() => toggleExperience(exp.id)}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-6" />

          {/* Working */}
          <div>
            <h2 className="text-base font-semibold text-black mb-3">Working</h2>
            <div className="flex flex-wrap gap-2">
              {workingExperiences.map((exp) => (
                <Chip
                  key={exp.id}
                  emoji={exp.emoji}
                  label={exp.label}
                  selected={selectedExperiences.includes(exp.id)}
                  onSelect={() => toggleExperience(exp.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="p-6 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {selectedExperiences.length}/3 selected
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className={`
                w-14 h-14 rounded-full flex items-center justify-center
                transition-colors duration-200
                ${
                  selectedExperiences.length > 0
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-400'
                }
              `}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
