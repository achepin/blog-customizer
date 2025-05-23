import { useEffect } from 'react';

type UseKeyPressProps<T = unknown> = {
  targetRef: React.RefObject<HTMLElement>;
  onKeyPress: (value?: T) => void;
  value?: T;
  keyName?: string;
  requireActive?: boolean;
};

export const useKeyPress = <T>({
  targetRef,
  onKeyPress,
  value,
  keyName = 'Enter',
  requireActive = false
}: UseKeyPressProps<T>) => {
  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === keyName) {
        if (!requireActive || document.activeElement === element) {
          onKeyPress(value);
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress, value, keyName, requireActive]);
};
