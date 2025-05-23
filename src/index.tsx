import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';
import { useArticleCustomization } from './hooks/useArticleCustomization';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние для примененных стилей статьи
	const [articleStyles, setArticleStyles] = useState<ArticleStateType>(defaultArticleState);

	// Состояние для открытия/закрытия сайдбара
	const [isFormOpen, setIsFormOpen] = useState(false);

	// Состояние для временного хранения изменений в форме
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

	const customStyles = useArticleCustomization(articleStyles);

	// Обработчик открытия/закрытия сайдбара
	const handleToggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	// Обработчик применения стилей из формы
	const handleApplyStyles = (newStyles: ArticleStateType) => {
		setArticleStyles(newStyles);
	};

	// Обработчик сброса настроек
	const handleResetStyles = () => {
		setFormState(defaultArticleState);
		setArticleStyles(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={customStyles}>
			<ArticleParamsForm
				isOpen={isFormOpen}
				onToggle={handleToggleForm}
				formState={formState}
				onFormStateChange={setFormState}
				onApply={handleApplyStyles}
				onReset={handleResetStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
