import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

/**
 * CDOT Compass design tokens.
 *
 * Brand colors are exposed both as CSS-variable-backed semantic tokens
 * (so shadcn/ui primitives work out of the box) and as explicit brand
 * utilities. Never hardcode hex values in components — reference these tokens.
 */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        heading: 'hsl(var(--heading))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        /* CDOT / Colorado accent identity */
        'cdot-green': 'hsl(var(--secondary))',
        'cdot-orange': 'hsl(var(--cdot-orange))',
        'cdot-yellow': 'hsl(var(--cdot-yellow))',
        'cdot-navy': 'hsl(var(--cdot-navy))',
        'cdot-teal': 'hsl(var(--cdot-teal))',
        'cdot-indigo': 'hsl(var(--cdot-indigo))',
        'cdot-purple': 'hsl(var(--cdot-purple))',
        'cdot-gold': 'hsl(var(--cdot-gold))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'heading-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        section: ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'card-title': ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.6' }],
        small: ['14px', { lineHeight: '1.5' }],
      },
      borderRadius: {
        button: '14px',
        card: '20px',
        search: '16px',
        dialog: '24px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.05)',
        card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 2px 6px rgba(16, 24, 40, 0.05)',
        'card-hover': '0 6px 16px rgba(16, 24, 40, 0.08)',
        dialog: '0 24px 48px rgba(16, 24, 40, 0.16)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
} satisfies Config
