import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
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
	// Состояние только для примененных стилей статьи
	const [articleStyles, setArticleStyles] = useState<ArticleStateType>(defaultArticleState);

	const customStyles = useArticleCustomization(articleStyles);

	// Единственный обработчик для применения стилей
	const handleStylesApply = (newStyles: ArticleStateType) => {
		setArticleStyles(newStyles);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={customStyles}>
			<ArticleParamsForm onStylesApply={handleStylesApply} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
