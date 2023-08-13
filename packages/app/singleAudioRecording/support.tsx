type MediaRecorderRef<T> = { current: T | null };

export function createRef<T>(initialValue: T | null): MediaRecorderRef<T> {
  return { current: initialValue };
}

const mediaRecorderRefx: MediaRecorderRef<MediaRecorder | null> = createRef(null);
export { mediaRecorderRefx };