import { CSSProperties, useMemo } from 'react';
import { ArticleStateType } from '../constants/articleProps';

export const useArticleCustomization = (articleConfig: ArticleStateType): CSSProperties => {
  return useMemo(() => ({
    '--font-family': articleConfig.fontFamilyOption.value,
    '--font-size': articleConfig.fontSizeOption.value,
    '--font-color': articleConfig.fontColor.value,
    '--container-width': articleConfig.contentWidth.value,
    '--bg-color': articleConfig.backgroundColor.value,
  } as CSSProperties), [
    articleConfig.fontFamilyOption.value,
    articleConfig.fontSizeOption.value,
    articleConfig.fontColor.value,
    articleConfig.contentWidth.value,
    articleConfig.backgroundColor.value,
  ]);
};