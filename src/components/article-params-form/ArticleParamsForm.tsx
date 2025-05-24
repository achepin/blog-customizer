import clsx from 'clsx';
import { ArticleStateType, defaultArticleState } from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useRef, useState } from 'react';
import { useClickOutside } from 'src/hooks';
import {
    fontFamilyOptions,
    fontSizeOptions,
    fontColors,
    backgroundColors,
    contentWidthArr
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

// Интерфейс пропсов компонента - теперь требует только колбэк для применения стилей
interface ArticleParamsFormProps {
    onStylesApply: (styles: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onStylesApply }: ArticleParamsFormProps) => {
    // Внутреннее состояние для открытия/закрытия сайдбара
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    // Внутреннее состояние для временного хранения изменений в форме
    const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

    // Реф для отслеживания кликов вне формы
    const formRef = useRef<HTMLDivElement>(null);

    // Обработчик открытия/закрытия сайдбара
    const handleToggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    // Обработка клика вне формы
    useClickOutside({
        isOpen: isFormOpen,
        targetRef: formRef,
        onClickOutside: (newValue: boolean) => {
            if (!newValue && isFormOpen) {
                handleToggleForm();
            }
        }
    });

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onStylesApply(formState);
    };

    // Обработчик сброса настроек
    const handleReset = () => {
        setFormState(defaultArticleState);
        onStylesApply(defaultArticleState);
    };

    // Обработчик изменения состояния формы
    const handleFormStateChange = (newState: ArticleStateType) => {
        setFormState(newState);
    };

    return (
        <>
            <ArrowButton isOpen={isFormOpen} onClick={handleToggleForm} />
            <aside ref={formRef} className={clsx(styles.container, { [styles.container_open]: isFormOpen })}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <Text size={31} weight={800}>ЗАДАЙТЕ ПАРАМЕТРЫ</Text>

                        <Select
                            title="Шрифт"
                            selected={formState.fontFamilyOption}
                            options={fontFamilyOptions}
                            onChange={(value) => handleFormStateChange({ ...formState, fontFamilyOption: value })}
                        />

                        <RadioGroup
                            title="Размер шрифта"
                            name="fontSize"
                            selected={formState.fontSizeOption}
                            options={fontSizeOptions}
                            onChange={(value) => handleFormStateChange({ ...formState, fontSizeOption: value })}
                        />

                        <Select
                            title="Цвет шрифта"
                            selected={formState.fontColor}
                            options={fontColors}
                            onChange={(value) => handleFormStateChange({ ...formState, fontColor: value })}
                        />
                        <div style={{ marginBottom: '50px' }}>
                            <Separator />
                        </div>

                        <Select
                            title="Цвет фона"
                            selected={formState.backgroundColor}
                            options={backgroundColors}
                            onChange={(value) => handleFormStateChange({ ...formState, backgroundColor: value })}
                        />

                        <Select
                            title="Ширина контента"
                            selected={formState.contentWidth}
                            options={contentWidthArr}
                            onChange={(value) => handleFormStateChange({ ...formState, contentWidth: value })}
                        />
                    </div>

                    <div className={styles.bottomContainer}>
                        <Button title='Сбросить' htmlType='reset' type='clear' onClick={handleReset} />
                        <Button title='Применить' htmlType='submit' type='apply' />
                    </div>
                </form>
            </aside>
        </>
    );
};
