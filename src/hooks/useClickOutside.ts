import { useEffect } from 'react';

type UseClickOutsideProps = {
  isOpen: boolean;
  targetRef: React.RefObject<HTMLElement>;
  onClickOutside: (newValue: boolean) => void;
  onClose?: () => void;
};

export const useClickOutside = ({
  isOpen,
  targetRef,
  onClickOutside,
  onClose,
}: UseClickOutsideProps) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !targetRef.current?.contains(target)) {
        if (isOpen) {
          onClose?.();
          onClickOutside(false);
        }
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onClose, onClickOutside]);
};
