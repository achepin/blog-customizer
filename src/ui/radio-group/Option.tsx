import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { BaseOption } from 'src/ui/common';

import styles from './RadioGroup.module.scss';

type OptionProps = {
	value: OptionType['value'];
	title: OptionType['title'];
	selected: OptionType;
	groupName: string;
	onChange: (option: OptionType) => void;
	option: OptionType;
};

export const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange, option } = props;

	const inputId = `${groupName}_radio_item_with_value__${value}`;
	const isChecked = value === selected.value;

	return (
		<BaseOption
			option={option}
			onChange={onChange}
			isSelected={isChecked}
			className={styles.item}
			selectAttribute="data-checked"
			>
			<input
				className={styles.input}
				type='radio'
				name={groupName}
				id={inputId}
				value={value}
				onChange={() => onChange?.(option)}
				tabIndex={-1}
			/>
			<label className={styles.label} htmlFor={inputId}>
				<Text size={18} uppercase>
					{title}
				</Text>
			</label>
		</BaseOption>
	);
};
