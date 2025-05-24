import { useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from '../../constants/articleProps';
import { useArticleCustomization } from '../../hooks/useArticleCustomization';

import styles from '../../styles/index.module.scss';

export const App = () => {
	// Состояние только для примененных стилей статьи
	const [articleStyles, setArticleStyles] = useState<ArticleStateType>(defaultArticleState);

	const customStyles = useArticleCustomization(articleStyles);

	// Единственный обработчик для применения стилей
	const handleStylesApply = (newStyles: ArticleStateType) => {
		setArticleStyles(newStyles);
	};

	return (
		<main
			className={styles.main}
			style={customStyles}>
			<ArticleParamsForm onStylesApply={handleStylesApply} />
			<Article />
		</main>
	);
};
