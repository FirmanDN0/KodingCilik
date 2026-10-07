// Web Speech API - Text to Speech helper for Kiko AI Assistant

class SpeechAssistant {
  private enabled: boolean = true;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoice();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  private initVoice() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize Indonesian voice if available
    const indonesianVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID'));
    if (indonesianVoice) {
      this.voice = indonesianVoice;
    } else {
      // Fallback to cheerful friendly voice
      this.voice = voices.find(v => v.name.toLowerCase().includes('google') || v.lang.startsWith('en')) || voices[0] || null;
    }
  }

  public speak(text: string) {
    if (!this.enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop prior speech
      const cleanText = text.replace(/[*_#`[\]()]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      if (this.voice) {
        utterance.voice = this.voice;
      }
      utterance.pitch = 1.25; // Slightly higher, cheerful pitch for child-friendly robot
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Graceful fallback if speech synthesis is blocked
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public toggleSpeech(): boolean {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stop();
    }
    return this.enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }
}

export const speech = new SpeechAssistant();
