'use client'

import { useState } from 'react'
import { LandingPage } from '@/components/landing-page'
import { WorkoutTracker } from '@/components/workout-tracker'

export default function Page() {
  const [view, setView] = useState<'landing' | 'tracker'>('landing')

  if (view === 'tracker') {
    return <WorkoutTracker onGoHome={() => setView('landing')} />
  }

  return <LandingPage onStartTracker={() => setView('tracker')} />
}
