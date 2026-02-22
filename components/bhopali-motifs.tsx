export function MughalArch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main arch outline */}
      <path
        d="M10 260 V100 Q10 10 100 10 Q190 10 190 100 V260"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      {/* Inner arch */}
      <path
        d="M30 260 V110 Q30 35 100 35 Q170 35 170 110 V260"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      {/* Keystone decoration */}
      <circle cx="100" cy="55" r="4" fill="currentColor" opacity="0.4" />
      {/* Side pillars */}
      <line x1="10" y1="260" x2="30" y2="260" stroke="currentColor" strokeWidth="2" />
      <line x1="170" y1="260" x2="190" y2="260" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function JaliPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern id="jali" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          {/* Star shape - simplified jali */}
          <path
            d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
          />
          {/* Diamond connectors */}
          <rect x="18" y="18" width="4" height="4" transform="rotate(45 20 20)" fill="currentColor" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="120" height="120" fill="url(#jali)" />
    </svg>
  )
}

export function DomeSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {/* City silhouette with domes and minarets */}
      <path
        d="M0 120 V90 H30 V70 Q30 50 45 50 Q60 50 60 70 V90 H80 V40 L85 20 L90 40 V90 H120 V65 Q120 35 150 35 Q180 35 180 65 V90 H200 V75 Q200 45 230 45 Q260 45 260 75 V90 H280 V40 L285 15 L290 40 V90 H310 V60 Q310 30 340 30 Q370 30 370 60 V90 H400 V120 Z"
        fill="currentColor"
        opacity="0.08"
      />
    </svg>
  )
}

export function LakeWaves({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 60 Q180 20 360 50 Q540 80 720 40 Q900 0 1080 50 Q1260 100 1440 60 V100 H0 Z"
        fill="currentColor"
        opacity="0.06"
      />
      <path
        d="M0 70 Q180 40 360 65 Q540 90 720 55 Q900 20 1080 65 Q1260 100 1440 70 V100 H0 Z"
        fill="currentColor"
        opacity="0.04"
      />
    </svg>
  )
}

export function ArchDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-border" />
      <svg viewBox="0 0 60 30" className="w-12 text-primary/40" fill="none">
        <path
          d="M5 30 V12 Q5 2 30 2 Q55 2 55 12 V30"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

export function JaliBorder({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="jaliBorder" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M0 10 Q10 0 20 10 Q30 20 40 10"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <circle cx="20" cy="10" r="2" fill="currentColor" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="800" height="20" fill="url(#jaliBorder)" />
    </svg>
  )
}
