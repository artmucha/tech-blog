import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const menu = [
  {
    title: 'aktualności',
    path: '/',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'recenzje',
    path: '/recenzje',
    icon: getIcon(peopleFill)
  },
  {
    title: 'felietony',
    path: '/felietony',
    icon: getIcon(peopleFill)
  },
  {
    title: 'retro',
    path: '/retro',
    icon: getIcon(peopleFill)
  },
  {
    title: 'kontakt',
    path: '/kontakt',
    icon: getIcon(peopleFill)
  },

];

export default menu;