import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { BaseOption } from 'src/ui/common';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: (option: OptionType) => void;
};

export const Option = ({ option, onClick }: OptionProps) => {
	const { value, title, optionClassName, className } = option;

	return (
		<BaseOption
			option={option}
			onChange={onClick}
			isSelected={false}
			className={clsx(styles.option, styles[optionClassName || ''])}
			>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</BaseOption>
	);
};
