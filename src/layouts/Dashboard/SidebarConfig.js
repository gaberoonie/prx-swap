// routes
// components
// import Label from '../../components/Label';
import SvgIconStyle from 'components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/svgs/${name}.svg`} sx={{ width: '100%', height: '100%', color: 'white' }} />
);

export const ICONS = {
  home: getIcon('home'),
  market: getIcon('market'),
  nft: getIcon('nft'),
  sell: getIcon('sell'),
  buy: getIcon('buy'),
  migrate: getIcon('migrate'),
  team: getIcon('team'),
  land: getIcon('land'),
  private: getIcon('private'),
  random: getIcon('random'),
  vault: getIcon('vault'),
  pools: getIcon('pools'),
  admin: getIcon('admin'),
  game: getIcon('game'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  now: getIcon('now'),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    // subheader: 'general',
    items: [
      // {
      //   title: 'Home',
      //   path: '/',
      //   icon: ICONS.home
      // },
      // {
      //   title: 'Group Sale',
      //   path: '/group-sale',
      //   icon: ICONS.sell
      // },
      // {
      //   title:'Home',
      //   path:'/nft-mint',
      //   icon: ICONS.nft
      // },
      // {
      //   title:'Whitelist Mint',
      //   path:'/whitelist-mint',
      //   icon: ICONS.private
      // }
    ]
  },

];

export default sidebarConfig;
