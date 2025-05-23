import clsx from 'clsx';
import { ArticleStateType } from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
    fontFamilyOptions,
    fontSizeOptions,
    fontColors,
    backgroundColors,
    contentWidthArr
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

// Интерфейс пропсов компонента
interface ArticleParamsFormProps {
    isOpen: boolean;
    onToggle: () => void;
    formState: ArticleStateType;
    onFormStateChange: (state: ArticleStateType) => void;
    onApply: (state: ArticleStateType) => void;
    onReset: () => void;
}

export const ArticleParamsForm = ({
    isOpen,
    onToggle,
    formState,
    onFormStateChange,
    onApply,
    onReset
}: ArticleParamsFormProps) => {
    // Реф для отслеживания кликов вне формы
    const formRef = useRef<HTMLDivElement>(null);

    // Обработка клика вне формы
    useOutsideClickClose({
        isOpen,
        rootRef: formRef,
        onChange: (newValue) => {
            if (!newValue && isOpen) {
                onToggle();
            }
        }
    });

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onApply(formState);
    };

    return (
        <>
            <ArrowButton isOpen={isOpen} onClick={onToggle} />
            <aside ref={formRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <Text size={22} weight={800}>Настройки</Text>
                        <Separator />

                        <Select
                            title="Шрифт"
                            selected={formState.fontFamilyOption}
                            options={fontFamilyOptions}
                            onChange={(value) => onFormStateChange({ ...formState, fontFamilyOption: value })}
                        />

                        <RadioGroup
                            title="Размер шрифта"
                            name="fontSize"
                            selected={formState.fontSizeOption}
                            options={fontSizeOptions}
                            onChange={(value) => onFormStateChange({ ...formState, fontSizeOption: value })}
                        />

                        <Select
                            title="Цвет шрифта"
                            selected={formState.fontColor}
                            options={fontColors}
                            onChange={(value) => onFormStateChange({ ...formState, fontColor: value })}
                        />

                        <Select
                            title="Цвет фона"
                            selected={formState.backgroundColor}
                            options={backgroundColors}
                            onChange={(value) => onFormStateChange({ ...formState, backgroundColor: value })}
                        />

                        <RadioGroup
                            title="Ширина контента"
                            name="contentWidth"
                            selected={formState.contentWidth}
                            options={contentWidthArr}
                            onChange={(value) => onFormStateChange({ ...formState, contentWidth: value })}
                        />
                    </div>

                    <div className={styles.bottomContainer}>
                        <Button title='Сбросить' htmlType='reset' type='clear' onClick={onReset} />
                        <Button title='Применить' htmlType='submit' type='apply' />
                    </div>
                </form>
            </aside>
        </>
    );
};
