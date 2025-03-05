import Blood from 'components/icons/factor/Blood';
import Lightning from 'components/icons/factor/Lightning';
import Range from 'components/icons/factor/Range';
import Tier from 'components/icons/factor/Tier';
import { IFactor } from 'types/types';

export const factors: IFactor[] = [
  {
    id: 1,
    icon: Lightning,
    title: 'Average GPA',
    color: 'primary.main',
    value: 3.12,
    max: 5,
    unit: '',
  },
  {
    id: 2,
    icon: Range,
    title: 'Stress Level',
    subTitle: '(1 : Low , 2 : Moderate , 3 : High)',
    color: 'error.light',
    value: 2.37,
    max: 3,
    unit: '',
  },
  {
    id: 3,
    icon: Blood,
    title: 'Overall Engagement',
    color: 'secondary.main',
    value: 6,
    max: 10,
    unit: '',
  },
  {
    id: 4,
    icon: Tier,
    title: 'Average Study Hour',
    color: 'warning.darker',
    value: 7.48,
    max: 24,
    unit: 'hr',
  },
];
