// import React, { useRef } from 'react';
// import { MutableRefObject } from 'react';

// const mediaRecorderRefx: MutableRefObject<MediaRecorder | null> = useRef<MediaRecorder | null>(null);

// export { mediaRecorderRefx };


type MediaRecorderRef<T> = { current: T | null };

export function createRef<T>(initialValue: T | null): MediaRecorderRef<T> {
  return { current: initialValue };
}

// Usage example:
const mediaRecorderRefx: MediaRecorderRef<MediaRecorder | null> = createRef(null);
export { mediaRecorderRefx };