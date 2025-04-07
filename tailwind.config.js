/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      grotesk: ['"Space Grotesk"', 'sans-serif'],
    },   
    extend: {
      animation: {
        'flicker': 'flicker 2s infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'dragonball-glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '0.4' },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 20px 6px rgba(255,125,0,0.6)',
          },
          '50%': {
            boxShadow: '0 0 30px 10px rgba(255,175,0,0.9)',
          },
        },
      },
    },      
    extend: {     
      keyframes: {
        glowBlue: {
          '0%, 100%': {
            textShadow: '0 0 8px #3b82f6, 0 0 16px #3b82f6, 0 0 24px #3b82f6',
          },
          '50%': {
            textShadow: '0 0 16px #3b82f6, 0 0 32px #3b82f6, 0 0 40px #3b82f6',
          },
        },
        glowPurple: {
          '0%, 100%': {
            textShadow: '0 0 8px #a855f7, 0 0 16px #a855f7, 0 0 24px #a855f7',
          },
          '50%': {
            textShadow: '0 0 16px #a855f7, 0 0 32px #a855f7, 0 0 40px #a855f7',
          },
        },
        glowGreen: {
          '0%, 100%': {
            textShadow: '0 0 8px #22c55e, 0 0 16px #22c55e, 0 0 24px #22c55e',
          },
          '50%': {
            textShadow: '0 0 16px #22c55e, 0 0 32px #22c55e, 0 0 40px #22c55e',
          },
        },
        glowYellow: {
          '0%, 100%': {
            textShadow: '0 0 8px #eab308, 0 0 16px #eab308, 0 0 24px #eab308',
          },
          '50%': {
            textShadow: '0 0 16px #eab308, 0 0 32px #eab308, 0 0 40px #eab308',
          },
        },
        glowRed: {
          '0%, 100%': {
            textShadow: '0 0 8px #ef4444, 0 0 16px #ef4444, 0 0 24px #ef4444',
          },
          '50%': {
            textShadow: '0 0 16px #ef4444, 0 0 32px #ef4444, 0 0 40px #ef4444',
          },
        },
      },
      animation: {
        glowBlue: 'glowBlue 2s ease-in-out infinite',
        glowPurple: 'glowPurple 2s ease-in-out infinite',
        glowGreen: 'glowGreen 2s ease-in-out infinite',
        glowYellow: 'glowYellow 2s ease-in-out infinite',
        glowRed: 'glowRed 2s ease-in-out infinite',
      },
      extend: {
        boxShadow: {
          glowBlue: '0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 40px #3b82f6',
          glowPurple: '0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 40px #a855f7',
          glowGreen: '0 0 10px #22c55e, 0 0 20px #22c55e, 0 0 40px #22c55e',
          glowYellow: '0 0 10px #eab308, 0 0 20px #eab308, 0 0 40px #eab308',
          glowRed: '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 40px #ef4444',
        },
        colors: {
          primary: '#C084FC', // magical violet
          accent: '#60A5FA',  // vibrant blue
          danger: '#F87171',  // red alert
          success: '#34D399', // green boost
          bgDark: '#0F172A',  // dark navy bg
          bgCard: '#1E293B',  // dark slate card
          borderGlow: '#7DD3FC', // for glowing effects
        },
        animation: {
          glow: "glow 1.5s ease-in-out infinite alternate",
        },
        keyframes: {
          glow: {
            "0%": { boxShadow: "0 0 5px #00eaff" },
            "100%": { boxShadow: "0 0 20px #00eaff" },
          },
        },
        extend: {
          animation: {
            'glow-pulse': 'glow 2s ease-in-out infinite',
            'sparkle': 'sparkle 1.5s ease-in-out infinite',
          },
          keyframes: {
            glow: {
              '0%, 100%': { transform: 'translateY(0)', boxShadow: '0 0 10px #7f5af0' },
              '50%': { transform: 'translateY(-6px)', boxShadow: '0 0 20px #7f5af0' },
            },
            sparkle: {
              '0%, 100%': { opacity: '0.7', transform: 'translate(0, 0) scale(1)' },
              '50%': { opacity: '1', transform: 'translate(-2px, 2px) scale(1.2)' },
            },
          },
        }        
      },
    },
    extend: {
      colors: {
        background: "#0b0f19",
        primary: "#a78bfa",    // lilac-purple
        secondary: "#2dd4bf",  // teal
        highlight: "#fbbf24",  // gold
        textMain: "#f1f5f9",   // off-white
        textMuted: "#94a3b8",  // fog gray
      },
    },
    
  },
  plugins: [],
};

