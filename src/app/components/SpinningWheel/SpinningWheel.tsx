'use client'

import React, { useState, useEffect } from 'react'
import { Gift } from 'lucide-react'

interface SpinningWheelProps {
  names?: string[]
  onSelectName?: (name: string) => void
}

const SpinningWheel: React.FC<SpinningWheelProps> = ({
  names = [
    "MysticPhoenix",
    "CosmicDragon",
    "QuantumNexus",
    "StellarMatrix",
    "CryptoVector",
    "DigitalPulse",
    "NeuralNova",
    "CyberSpark"
  ],
  onSelectName
}) => {
  const [mounted, setMounted] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const spinWheel = () => {
    if (spinning || !mounted) return

    setSpinning(true)
    setResult(null)

    const segments = names.length
    const segmentAngle = 360 / segments
    const fullRotations = (3 + Math.floor(Math.random() * 3)) * 360
    const randomSegment = Math.floor(Math.random() * segments)
    const finalAngle = fullRotations + randomSegment * segmentAngle

    setRotation(finalAngle)

    setTimeout(() => {
      setSpinning(false)
      const selectedName = names[randomSegment]
      setResult(selectedName)
      if (onSelectName) {
        onSelectName(selectedName)
      }
    }, 3000)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Main wheel container */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
        {/* Outer ring decoration */}
        <div className="absolute inset-0 rounded-full border-8 border-red-500/20 animate-pulse"></div>
        
        {/* Spinning wheel */}
        <div
          className="absolute w-full h-full rounded-full border-4 border-white shadow-lg"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
              : 'none',
            background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)'
          }}
        >
          {names.map((name, index) => {
            const angle = (360 / names.length) * index
            const hue = (360 / names.length) * index
            return (
              <div
                key={name}
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div
                  className="absolute w-full h-1/2 origin-bottom"
                  style={{
                    background: `linear-gradient(to bottom, hsla(${hue}, 80%, 75%, 0.9), hsla(${hue}, 70%, 60%, 0.9))`,
                    clipPath: 'polygon(50% 0, 100% 0, 50% 100%, 0 0)',
                    boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <span
                  className="absolute text-white font-bold text-xs md:text-sm"
                  style={{
                    transform: `translateY(-70px) rotate(${-angle}deg)`,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}
                >
                  {name}
                </span>
              </div>
            )
          })}
        </div>

        {/* Center pointer */}
        <div className="absolute top-0 left-1/2 -ml-4 w-8 h-8 z-10">
          <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[24px] border-b-red-500 filter drop-shadow-md"></div>
        </div>
      </div>

      {/* Spin button */}
      <button
        onClick={spinWheel}
        disabled={spinning}
        className={`px-6 py-2 rounded-full text-white font-bold text-sm transform transition-all duration-200 ${
          spinning
            ? 'bg-gray-400 cursor-not-allowed scale-95'
            : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-105 hover:shadow-lg'
        }`}
      >
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4" />
          {spinning ? 'Spinning...' : 'Spin Wheel'}
        </div>
      </button>

      {/* Result display */}
      {result && (
        <div className="text-lg font-bold text-center p-2 rounded-lg bg-green-100 text-green-700 animate-bounce">
          Selected: {result}
        </div>
      )}
    </div>
  )
}

export default SpinningWheel