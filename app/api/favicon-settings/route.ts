import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface FaviconSettings {
  preset: 'silver' | 'gold' | 'brass' | 'graphite' | 'custom';
  customColor: string;
  glareAngle: number;
  sweepDuration: number;
  cycleDuration: number;
  glareWidth: number;
  glareColor: string;
  reliefEnabled: boolean;
}

const DEFAULT_SETTINGS: FaviconSettings = {
  preset: 'silver',
  customColor: '#CBD5E1',
  glareAngle: 135,
  sweepDuration: 3.0,
  cycleDuration: 10.0,
  glareWidth: 46,
  glareColor: '#FFFFFF',
  reliefEnabled: true,
};

const filePath = path.join(process.cwd(), 'lib', 'data', 'favicon-settings.json');

function readSettings(): FaviconSettings {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    }
  } catch {
    // fallback to defaults on read error
  }
  return DEFAULT_SETTINGS;
}

function writeSettings(settings: FaviconSettings) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing favicon settings:', err);
  }
}

export async function GET() {
  const settings = readSettings();
  return NextResponse.json(settings, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate and clamp settings
    const sweepDuration = Math.max(0.5, Math.min(15.0, Number(body.sweepDuration) || 3.0));
    const cycleDuration = Math.max(sweepDuration, Math.min(15.0, Number(body.cycleDuration) || 10.0));
    const glareAngle = Number(body.glareAngle) ?? 135;
    const glareWidth = Math.max(10, Math.min(80, Number(body.glareWidth) || 46));
    
    const settings: FaviconSettings = {
      preset: ['silver', 'gold', 'brass', 'graphite', 'custom'].includes(body.preset)
        ? body.preset
        : 'silver',
      customColor: typeof body.customColor === 'string' ? body.customColor : '#CBD5E1',
      glareAngle,
      sweepDuration,
      cycleDuration,
      glareWidth,
      glareColor: typeof body.glareColor === 'string' ? body.glareColor : '#FFFFFF',
      reliefEnabled: body.reliefEnabled !== false,
    };

    writeSettings(settings);

    return NextResponse.json({ success: true, settings });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Invalid settings payload' },
      { status: 400 }
    );
  }
}
