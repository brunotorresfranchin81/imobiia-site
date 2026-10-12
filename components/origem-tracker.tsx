'use client'

import { useEffect } from 'react'
import { salvarOrigem } from '@/lib/origem'

export function OrigemTracker() {
  useEffect(() => {
    salvarOrigem()
  }, [])

  return null
}
