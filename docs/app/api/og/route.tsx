import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Subtle background dots */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.04,
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Color Swatches - Minimalist decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '120px',
            display: 'flex',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#3b82f6',
              opacity: 0.15,
            }}
          />
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#8b5cf6',
              opacity: 0.15,
            }}
          />
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#ec4899',
              opacity: 0.15,
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '120px',
            display: 'flex',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#10b981',
              opacity: 0.15,
            }}
          />
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#f59e0b',
              opacity: 0.15,
            }}
          />
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#ef4444',
              opacity: 0.15,
            }}
          />
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 80px',
          }}
        >
          {/* Title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#000000',
                letterSpacing: '-0.02em',
              }}
            >
              react-
            </span>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 400,
                color: '#ff6b9d',
                letterSpacing: '-0.01em',
                fontFamily: 'cursive',
                marginLeft: '4px',
                marginRight: '4px',
              }}
            >
              beautiful
            </span>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#000000',
                letterSpacing: '-0.02em',
              }}
            >
              -color
            </span>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '28px',
              color: '#666666',
              maxWidth: '800px',
              lineHeight: 1.4,
              marginBottom: '40px',
            }}
          >
            The most flexible and beautiful color picker for React
          </div>

          {/* Features badges */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: '9999px',
                background: '#f0f9ff',
                fontSize: '18px',
                color: '#0369a1',
                fontWeight: 500,
              }}
            >
              Compound Components
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: '9999px',
                background: '#faf5ff',
                fontSize: '18px',
                color: '#7c3aed',
                fontWeight: 500,
              }}
            >
              Type-Safe
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: '9999px',
                background: '#fef2f2',
                fontSize: '18px',
                color: '#dc2626',
                fontWeight: 500,
              }}
            >
              Lightweight
            </div>
          </div>

          {/* Color palette visualization at bottom */}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
