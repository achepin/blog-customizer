import { useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { useKeyPress } from 'src/hooks';

type BaseOptionProps = {
    option: OptionType;
    onChange: (option: OptionType) => void;
    isSelected: boolean;
    children: React.ReactNode;
    className?: string;
    selectAttribute?: string;
};

export const BaseOption = ({
    option,
    onChange,
    isSelected,
    children,
    className,
    selectAttribute = 'data-selected'
}: BaseOptionProps) => {
    const optionRef = useRef<HTMLDivElement>(null);

    useKeyPress({
        targetRef: optionRef,
        onKeyPress: () => onChange(option),
        requireActive: true
    });

    return (
        <div
            ref={optionRef}
            className={className}
            {...(selectAttribute ? { [selectAttribute]: isSelected } : { 'data-selected': isSelected })}
            onClick={() => onChange(option)}
            tabIndex={0}>
            {children}
        </div>
    );
};
