import {
  IUser, StreamSettings, IUIConfig, ISettings
} from 'src/interfaces';
import { NextPageContext } from 'next';
import { PureComponent } from 'react';
import { isDesktop } from 'react-device-detect';
import { HeaderTranslations } from './header-translations';
import { Avatar, Badge, Card, Col, Drawer, Dropdown, Input, Menu, Row, Tooltip, message } from 'antd';
import Link from 'next/link';
import { AiFillCaretDown, AiFillStar, AiOutlineBlock, AiOutlineClockCircle, AiOutlineDollar, AiOutlineDollarCircle, AiOutlineFlag, AiOutlineHeart, AiOutlineIdcard, AiOutlineLogout, AiOutlineNotification, AiOutlinePicture, AiOutlinePlusSquare, AiOutlineQuestionCircle, AiOutlineStar, AiOutlineTeam, AiOutlineUser, AiOutlineUserAdd, AiOutlineVideoCamera } from 'react-icons/ai';
import Router, { withRouter, NextRouter } from 'next/router';
import { formatDate } from 'src/lib';
import NotifComponent from '@components/notifComponent';
import { BsChatDots } from 'react-icons/bs';
import { GiWallet } from 'react-icons/gi';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { ModelEarningIcon } from '@components/icons';
import HeaderIconContainer from './header-icon-container';
import SearchBar from './search-bar';
import { StreamingIcon } from '@components/icons/StreamingIcon';
import dynamic from 'next/dynamic';
import { authService } from '@services/auth.service';
import { HiArchive } from 'react-icons/hi';

//const StreamIcon: any = dynamic(() => import('@components/streaming/live-stream-icon'), { ssr: false });
 
interface IProps {
  currentUser?: IUser;
  streamSettings: StreamSettings;
  privateRequests?: any;
  //logout: Function;
  router: NextRouter;
  ui: any;
  // eslint-disable-next-line react/no-unused-prop-types
  //settings: ISettings;
  //cart: any;
  //addCart: Function;
  //addPrivateRequest: Function;
  //loggedIn: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  //clearCart: Function;
  // eslint-disable-next-line react/no-unused-prop-types
  //notificationCount: number;
}

function PrivateChatRequestMenuItem({
  streamSettings,
  privateRequests
}:any) {
  if (!privateRequests?.length) return null;

  const renderCardTitle = (user:any) => {
    const { username, balance = 0 } = user;

    return (
      <span>
        {username}
        {' '}
        <span className="wallet-content">
          <img
            src="/wallett.png"
            alt=""
            width="10"
            height="10"
            style={{ marginLeft: '7px' }}
          />
          {' '}
          {balance.toFixed(2)}
        </span>
      </span>
    );
  };

  return privateRequests.map((request:any) => (
    <Menu.Item
      key={request.conversationId}
      onClick={() => {
        Router.push(
          {
            pathname: `/model/live/${streamSettings.optionForPrivate
              === 'webrtc'
              ? 'webrtc/'
              : ''
            }privatechat`,
            query: { id: request.conversationId }
          },
          `/model/live/${streamSettings.optionForPrivate === 'webrtc'
            ? 'webrtc/'
            : ''
          }privatechat/${request.conversationId}`
        );
        message.destroy();
      }}
    >
      <Card bordered={false} hoverable={false}>
        <Card.Meta
          avatar={(
            <Avatar
              src={
                request.user.avatar || '/no-avatar.png'
              }
            />
          )}
          title={renderCardTitle(request.user)}
          description={formatDate(
            request.user.createdAt
          )}
        />
      </Card>
    </Menu.Item>
  ));
}

export const headerContent = {
  'en-US': {
    search: {
      placeholder: 'Search anything...'
    },
    options: {
      influencers: {
        label: 'INFLUENCERS',
        tooltip: 'Models'
      },
      live: {
        label: 'LIVE',
        tooltip: 'Live Models'
      },
      notifications: {
        tooltip: 'Notifications',
        markAsRead: 'Mark as read',
        seeAll: 'See all',
        noNotifications: 'There are no notifications'
      },
      messenger: {
        tooltip: 'Messenger'
      },
      shopping: {
        tooltip: 'Shopping'
      }
    },
    sidebar: {
      editProfile: 'Edit Profile',
      wallet: 'Wallet',
      favorites: 'My Favorites',
      wishes: 'My Wishlist',
      subscriptions: 'My Subscriptions',
      purchasedMedia: 'Purchased media',
      transactions: 'Transactions',
      contact: 'Contact Administrator',
      signOut: 'Sign Out'
    },
    authOptions: {
      signUp: 'Register',
      signIn: 'Sign In'
    }
  },
  'es-ES': {
    search: {
      placeholder: 'Busca algo...'
    },
    options: {
      influencers: {
        label: 'MODELOS',
        tooltip: 'Modelos'
      },
      live: {
        label: 'EN VIVO',
        tooltip: 'Modelos en vivo'
      },
      notifications: {
        tooltip: 'Notificaciones',
        markAsRead: 'Marcar como leídas',
        seeAll: 'Ver todas',
        noNotifications: 'No hay notificaciones'
      },
      messenger: {
        tooltip: 'Chat'
      },
      shopping: {
        tooltip: 'Carrito'
      }
    },
    sidebar: {
      editProfile: 'Editar perfil',
      wallet: 'Billetera',
      favorites: 'Mis Favoritos',
      wishes: 'Mi lista de deseos',
      subscriptions: 'Mis Suscripciones',
      purchasedMedia: 'Medios comprados',
      transactions: 'Transacciones',
      contact: 'Contactar al administrador',
      signOut: 'Cerrar Sesión'
    },
    authOptions: {
      signUp: 'Registrarse',
      signIn: 'Iniciar Sesión'
    }
  },
  'pt-BR': {
    search: {
      placeholder: 'Buscar algo...'
    },
    options: {
      influencers: {
        label: 'INFLUENCIADORES',
        tooltip: 'Modelos'
      },
      live: {
        label: 'AO VIVO',
        tooltip: 'Modelos ao Vivo'
      },
      notifications: {
        tooltip: 'Notificações',
        markAsRead: 'Marcar como lido',
        seeAll: 'Ver todos',
        noNotifications: 'Não há notificações'
      },
      messenger: {
        tooltip: 'Mensagens'
      },
      shopping: {
        tooltip: 'Compras'
      }
    },
    sidebar: {
      editProfile: 'Editar Perfil',
      wallet: 'Carteira',
      favorites: 'Meus Favoritos',
      wishes: 'Minha Lista de Desejos',
      subscriptions: 'Minhas Assinaturas',
      purchasedMedia: 'Mídias Compradas',
      transactions: 'Transações',
      contact: 'Contato com o Administrador',
      signOut: 'Sair'
    },
    authOptions: {
      signUp: 'Registrar',
      signIn: 'Entrar'
    }
  },
  'ru-RU': {
    search: {
      placeholder: 'Искать что-нибудь...'
    },
    options: {
      influencers: {
        label: 'ИНФЛУЕНСЕРЫ',
        tooltip: 'Модели'
      },
      live: {
        label: 'В ЭФИРЕ',
        tooltip: 'Модели в прямом эфире'
      },
      notifications: {
        tooltip: 'Уведомления',
        markAsRead: 'Отметить как прочитанное',
        seeAll: 'Посмотреть все',
        noNotifications: 'Нет уведомлений'
      },
      messenger: {
        tooltip: 'Мессенджер'
      },
      shopping: {
        tooltip: 'Покупки'
      }
    },
    sidebar: {
      editProfile: 'Редактировать профиль',
      wallet: 'Кошелек',
      favorites: 'Мои избранные',
      wishes: 'Мой список желаний',
      subscriptions: 'Мои подписки',
      purchasedMedia: 'Купленные материалы',
      transactions: 'Транзакции',
      contact: 'Связаться с администратором',
      signOut: 'Выйти'
    },
    authOptions: {
      signUp: 'Регистрация',
      signIn: 'Вход'
    }
  }

};
 
export default class Header extends PureComponent<IProps> {
  state = {
    totalUnreadMessage: 0,
    openSearch: false,
    openProfile: false,
    openWalletModal: false,
    showAlert: false,
    balance: this.props.currentUser?.balance || 0,
    isDesktop: false
  };

  componentDidMount() {
    const {
      currentUser,
      ui
    } = this.props;
    if (window.innerWidth > 1023) {
      this.setState({ isDesktop: true });
    } else {
      this.setState({ isDesktop: false });
    }
    const updateMedia = () => {
      if (window.innerWidth > 1023) {
        this.setState({ isDesktop: true });
      } else {
        this.setState({ isDesktop: false });
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }

  toggleLanguage(newLocale:any) {
    const { router } = this.props;
    const { pathname } = router;
    router.push(pathname, pathname, { locale: newLocale });

    // router.push({ pathname, query }, asPath, { locale: newLocale });
    // router.push('/new');
    // localStorage.setItem('locale', newLocale);
    // window.location.reload();
  }
  translateLocale(router:any) {
    switch (router.locale) {
      case 'en-US':
        return 'English';
      case 'es-ES':
        return 'Español';
      case 'pt-BR':
        return 'Portugués';
      case 'ru-RU':
        return 'Русский';
      default:
        return 'English';
    }
  }

  showWalletModal(e:any) {
    e.preventDefault();
    this.setState({ openWalletModal: true });
  }

  async beforeLogout() {
    //const { logout: logoutHandler } = this.props;
    const token = authService.getToken();
    const socket: any = this.context;
    token
      && socket
      && (await socket.emit('auth/logout', {
        token
      }));
    //logoutHandler();
  }
  
  renderLoginSignup() {
    const { router } = this.props;
    const authOptions = headerContent['en-US'] ? headerContent['en-US'].authOptions : headerContent['es-ES'].authOptions;

    return (
      <Col xs={{ span: 14 }} sm={{ span: 14 }} md={{ span: 17 }} lg={{ span: 18 }} xl={{ span: 18 }} className="unauth-content-container">
        <Link legacyBehavior href="/auth/register">
          <a style={{ color: 'white', fontWeight: 'bold' }}>{authOptions.signUp}</a>
        </Link>
        <Link legacyBehavior href="/auth/login">
          <a style={{ color: 'white', fontWeight: 'bold' }}>{authOptions.signIn}</a>
        </Link>
        <Dropdown overlay={() => (
          <Menu>
            <Menu.Item key={1} onClick={() => this.toggleLanguage('en-US')}>
              <img src="/usa.jpg" width={25} height={20} alt="" />
              &nbsp; English
            </Menu.Item>
            <Menu.Item key={2} onClick={() => this.toggleLanguage('es-ES')}>
              <img src="/españa.jpg" width={25} height={20} alt="" />
              &nbsp; Español
            </Menu.Item>
            <Menu.Item key={3} onClick={() => this.toggleLanguage('pt-BR')} disabled>
              <img src="/brasil.jpg" width={25} height={20} alt="" />
              &nbsp; Portugués
            </Menu.Item>
            <Menu.Item key={4} onClick={() => this.toggleLanguage('ru-RU')} disabled>
              <img src="/rusia.jpg" width={25} height={20} alt="" />
              &nbsp; Русский
            </Menu.Item>
          </Menu>
        )}
        >
          <a
            onClick={(e) => e.preventDefault()}
            className="languages-dropdown-container"
          >
            {this.translateLocale(router)}
            <AiFillCaretDown />
          </a>
        </Dropdown>
      </Col>
    );
  }
  
  renderUserLoginMenu() {
    const {
      router, currentUser
    } = this.props;
    //  const { search, options } = headerContent[router.locale];

    let h = headerContent['en-US'];
    let search;
    let options;

    if (typeof (h) === 'undefined') {
      h = headerContent['en-US'];
      search = h.search;
      options = h.options;
    } else {
      search = h.search;
      options = h.options;
    }
    return (
      <>
        {
          !this.state.isDesktop ? (
            <Col
              xs={{ span: 11 }}
              sm={{ span: 11 }}
              md={{ span: 16 }}
              lg={{ span: 16 }}
              xl={{ span: 16 }}
              style={{
                padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', width: '100%', overflow: 'auto' }}>
                <Link legacyBehavior href="/model">
                  <AiFillStar className="middle-icon" style={{ flex: '0 0 15%' }} />
                </Link>
                <Link legacyBehavior href="/search/live">
                  <AiOutlineTeam className="middle-icon" style={{ flex: '0 0 15%' }} />
                </Link>
                <NotifComponent currentUser={currentUser} />
                <Link legacyBehavior href="/messages">
                  <BsChatDots className="middle-icon" style={{ flex: '0 0 15%' }} />
                </Link>
                <GiWallet onClick={this.showWalletModal.bind(this)} className="middle-icon" style={{ flex: '0 0 15%' }} />
              </div>
            </Col>
          ) : (
            <Col xs={{ span: 11 }} sm={{ span: 11 }} md={{ span: 16 }} lg={{ span: 16 }} xl={{ span: 13 }} className="middle-container">
              <Tooltip title="Search anything">
                <Input suffix={<SearchOutlined />} placeholder={search.placeholder} className="search-input" />
              </Tooltip>
            </Col>
          )

        }

        <Col
          xs={{ span: 3 }}
          sm={{ span: 3 }}
          md={{ span: 4 }}
          lg={{ span: 6 }}
          xl={{ span: 6 }}
          style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'
          }}
        >
          {this.state.isDesktop ? (
            <div style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, color: 'white', fontWeight: 600
            }}
            >
              <Link legacyBehavior href="/model">
                <Tooltip title={options.influencers.tooltip}>
                  <span className="hide">{options.influencers.label}</span>
                </Tooltip>
              </Link>
              <Link legacyBehavior href="/search/live">
                <Tooltip title={options.live.tooltip}>
                  <span className="hide">
                    <AiOutlineTeam style={{ fontSize: 20 }} />
                  </span>
                </Tooltip>
              </Link>
              {}

              <Tooltip title="0.00">
                <div
                  style={{ display: 'flex', alignItems: 'center' }}
                  onClick={this.showWalletModal.bind(this)}
                >
                  <GiWallet style={{ height: 23, width: 23, marginLeft: 4 }} />
                  {' '}
                  <span
                    className="hide"
                    style={{ paddingLeft: 4, paddingRight: 9 }}
                  >
                    {0.00}
                  </span>
                </div>
              </Tooltip>

              <Avatar
                onClick={() => this.setState({ openProfile: true })}
                src={currentUser?.avatar || '/no-avatar.png'}
              />

            </div>

          ) : (
            <Avatar
              onClick={() => this.setState({ openProfile: true })}
              src={currentUser?.avatar || '/no-avatar.png'}
            />
          )}
        </Col>
      </>
    );
  }

  renderPerformerLoginMenu() {
    const {
      router, currentUser, privateRequests, streamSettings
    } = this.props;
    console.log('Private Request ', privateRequests);
    console.log('StreamSettings ', streamSettings);
    let h = headerContent['en-US'];
    let search;

    if (typeof (h) === 'undefined') {
      h = headerContent['en-US'];
      search = h.search;
    } else {
      search = h.search;
    }
    return (
      <>
        {
          !this.state.isDesktop ? (

            <Col
              xs={{ span: 11 }}
              sm={{ span: 11 }}
              md={{ span: 16 }}
              lg={{ span: 16 }}
              xl={{ span: 16 }}
              style={{
                padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', width: '100%', overflow: 'auto' }}>
                <Link
                  legacyBehavior
                  href={{
                    pathname: '/model/profile',
                    query: {
                      username: currentUser?.username || currentUser?._id
                    }
                  }}
                  as={`/model/${currentUser?.username || currentUser?._id}`}
                >
                  <AiOutlineUser className="middle-icon" style={{ flex: '0 0 15%' }} />
                </Link>

                {}
                <Dropdown
                  overlay={(
                    <Menu>
                      {privateRequests?.length > 0
                        ? <PrivateChatRequestMenuItem privateRequests={privateRequests} streamSettings={streamSettings} />
                        : <Menu.Item key="no-request">There is no private requests</Menu.Item>}
                    </Menu>
                )}
                >
                  <li
                    style={{
                      cursor: 'pointer',
                      color: '#ffffff',
                      marginTop: '5px',
                      marginLeft: '6px',
                      marginRight: '-6px'
                    }}
                  >
                    <AiOutlineUserAdd style={{ fontSize: 26, marginLeft: 4 }} />
                    <Badge
                      className="cart-total"
                      count={privateRequests?.length}
                      size="small"
                      style={{ marginLeft: -8, fontSize: 10 }}
                    />
                  </li>
                </Dropdown>
                <Link
                  legacyBehavior
                  href="/model/earning"
                  as="/model/earning"
                >
                  <ModelEarningIcon width={30} height={30} />
                </Link>
              </div>
            </Col>
          ) : (
            <Col xs={{ span: 11 }} sm={{ span: 11 }} md={{ span: 16 }} lg={{ span: 16 }} xl={{ span: 13 }} className="middle-container">
              <Tooltip title="Search anything">
                <Input suffix={<SearchOutlined />} placeholder={search.placeholder} className="search-input" />
              </Tooltip>
            </Col>
          )

        }

        <Col
          xs={{ span: 3 }}
          sm={{ span: 3 }}
          md={{ span: 6 }}
          lg={{ span: 6 }}
          xl={{ span: 6 }}
          style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'
          }}
        >
          {this.state.isDesktop ? (
            <div style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, color: 'white', fontWeight: 600
            }}
            >
              <Link
                legacyBehavior
                href={{
                  pathname: '/model/profile',
                  query: {
                    username: currentUser?.username || currentUser?._id
                  }
                }}
                as={`/model/${currentUser?.username || currentUser?._id}`}
              >
                <a style={{ color: 'white' }}>
                  <UserOutlined style={{ fontSize: 20 }} />
                </a>
              </Link>
              {}

              <Dropdown
                overlay={(
                  <Menu>
                    {privateRequests?.length > 0
                      ? <PrivateChatRequestMenuItem privateRequests={privateRequests} streamSettings={streamSettings} />
                      : <Menu.Item key="no-request">There is no private requests</Menu.Item>}
                  </Menu>
                )}
              >
                <li
                  style={{
                    cursor: 'pointer',
                    color: '#ffffff'
                  }}
                >
                  <AiOutlineUserAdd style={{ fontSize: 22 }} />
                  <Badge
                    className="cart-total"
                    count={privateRequests?.length}
                    size="small"
                    style={{ marginLeft: -8, fontSize: 10 }}
                  />
                </li>
              </Dropdown>
              <Link
                legacyBehavior
                href="/model/earning"
                as="/model/earning"
              >
                <a>
                  <Tooltip title={(this.state.balance || 0).toFixed(2)}>
                    <ModelEarningIcon width={23} height={23} />
                    {' '}
                    <span className="hide" style={{ color: 'white' }}>
                      {(this.state.balance || 0).toFixed(2)}
                    </span>
                  </Tooltip>
                </a>
              </Link>
              <Avatar
                onClick={() => this.setState({ openProfile: true })}
                src={currentUser?.avatar || '/no-avatar.png'}
              />

            </div>

          ) : (
            <Avatar
              onClick={() => this.setState({ openProfile: true })}
              src={currentUser?.avatar || '/no-avatar.png'}
            />
          )}
        </Col>
      </>
    );
  }

  renderMenuAllUserType() {
    const { router, currentUser } = this.props;
    /*
    const {
      totalUnreadMessage
    } = this.state;
    */
    // const { options } = headerContent[router.locale];

    let h = headerContent['en-US'];
    let options;

    if (typeof (h) === 'undefined') {
      h = headerContent['en-US'];
      options = h.options;
    } else {
      options = h.options;
    }

    return [
      <Tooltip title={options.notifications.tooltip}>
        <NotifComponent currentUser={currentUser} />
      </Tooltip>,

      <HeaderIconContainer value={this.state.totalUnreadMessage} isDesktop={this.state.isDesktop}>
        <Link legacyBehavior href="/messages">
          <BsChatDots className="middle-icon" style={{ flex: '0 0 15%' }} />
        </Link>
      </HeaderIconContainer>
    ];
  }
  
  render(){
    const {
      currentUser,
      router,
      ui
    } = this.props;
    const {
      openSearch,
      openProfile,
      showAlert,
      openWalletModal
    } = this.state;
    const trans = router.locale === '' ? HeaderTranslations['en-US'] : HeaderTranslations['es-ES'];
    return (
    <>
      <Row className="new-header-container">
        <Col
          xs={{ span: 10 }}
          sm={{ span: 10 }}
          md={{ span: 5 }}
          lg={{ span: 5 }}
          xl={{ span: 5 }}
          style={{ padding: 0 }}
          className="logo-column"
        >
          <Link legacyBehavior href="/">
            <a
              title="Homepage"
              className="logo-nav"
            >
              <img className="logo" alt="logo" src={this.state.isDesktop ? '/img/logo_responsive.png' : '/img/logo.png'} />
            </a>
          </Link>
        </Col>
        {!currentUser?._id && this.renderLoginSignup()}
        {currentUser?._id && !currentUser.isPerformer && this.renderUserLoginMenu()}
        {currentUser?._id && currentUser.isPerformer && this.renderPerformerLoginMenu()}
        <Drawer
            title="Search"
            closable
            onClose={() => this.setState({ openSearch: false })}
            open={openSearch}
            key="search-drawer"
            className="profile-drawer"
            width={280}

          >
          <SearchBar onEnter={() => this.setState({ openSearch: false })} />
        </Drawer>
        {!!currentUser?._id
            && (
          <Drawer
          title={(
            <div className="profile-user">
              <Tooltip title="Profile">
                <img
                  src={currentUser.avatar || '/no-avatar.png'}
                  alt="avatar"
                  className="avatar-in-drawer"
                />
                <a className="profile-name">
                  {currentUser.name || 'N/A'}
                  <span>
                    @
                    {currentUser.username || 'n/a'}
                  </span>
                </a>
              </Tooltip>
            </div>
          )}
          closable
          onClose={() => this.setState({ openProfile: false })}
          visible={openProfile}
          key="profile-drawer"
          className="profile-drawer"
          width={280}
        >
          {currentUser.isPerformer && (
                  <div className="profile-menu-item">
                    <Link legacyBehavior href="/model/live" as="/live">
                      <div
                        className={
                          router.pathname === '/model/live'
                            ? 'menu-item active'
                            : 'menu-item'
                        }
                      >
                        
                        <span style={{ paddingLeft: 8 }}>
                          { trans.golive }
                        </span>
                      </div>
                    </Link>
                    <Link legacyBehavior href="/model/account" as="/model/account">
                      <div
                        className={
                          router.pathname === '/model/account'
                            ? 'menu-item active'
                            : 'menu-item'
                        }
                      >
                        <AiOutlineIdcard style={{ height: 23, width: 23 }} />
                        <span style={{ paddingLeft: 8 }}>
                          {trans.editProfile}
                        </span>
                      </div>
                    </Link>
                    <Link legacyBehavior href={{ pathname: '/model/black-list' }}>
                      <div
                        className={
                          router.pathname === '/model/black-list'
                            ? 'menu-item active'
                            : 'menu-item'
                        }
                      >
                        <AiOutlineBlock style={{ height: 23, width: 23 }} />
                        <span style={{ paddingLeft: 8 }}>
                          {trans.blacklist}
                        </span>
                      </div>
                    </Link>
                    <Link legacyBehavior href={{ pathname: '/model/violations-reported' }}>
                      <div
                        className={
                          router.pathname === '/model/violations-reported'
                            ? 'menu-item active'
                            : 'menu-item'
                        }
                      >
                        <AiOutlineFlag style={{ height: 23, width: 23 }} />
                        <span style={{ paddingLeft: 8 }}>
                          {trans.violations}
                        </span>
                      </div>
                    </Link>
                    <Link
                      legacyBehavior
                      href={{ pathname: '/model/my-subscriber' }}
                      as="/model/my-subscriber"
                    >
                      <div
                        className={
                          router.pathname === '/model/my-subscriber'
                            ? 'menu-item active'
                            : 'menu-item'
                        }
                      >
                        <AiOutlineHeart style={{ width: 23, height: 23 }} />
                        <span style={{ paddingLeft: 8 }}>
                          {trans.subscribers}
                        </span>
                      </div>
                    </Link>

                    <Link
                      legacyBehavior
                      href={{ pathname: '/model/my-post/create' }}
                      as="/model/my-post/create"
                    >
                      <div
                        className={
                          router.pathname === '/model/my-post/create'
                            ? 'menu-item active'
                            : 'menu-item'
                        }
                      >
                        <AiOutlinePlusSquare style={{ width: 23, height: 23 }} />
                        <span style={{ paddingLeft: 8 }}>
                          {trans.posts}
                        </span>
                      </div>
                    </Link>

                    <Link legacyBehavior href="/model/my-video" as="/model/my-video">
                      <div
                        className={
                          router.pathname === '/model/my-video'
                            ? 'menu-item active'
                            : 'menu-item'
                        }
                      >
                        <AiOutlineVideoCamera style={{ height: 23, width: 23 }} />
                        <span style={{ paddingLeft: 8 }}>
                          {trans.videos}
                        </span>
                      </div>
                    </Link>
                    <Link
                      legacyBehavior
                      href="/model/my-gallery/listing"
                      as="/model/my-gallery/listing"
                    >
                      <div
                        className={
                          router.pathname === '/model/my-gallery/listing'
                            ? 'menu-item active'
                            : 'menu-item'
                        }
                      >
                        <AiOutlinePicture style={{ height: 23, width: 23 }} />
                        <span style={{ paddingLeft: 8 }}>
                          {trans.galleries}
                        </span>
                      </div>
                    </Link>

                    <Link legacyBehavior href="/model/earning">
                      <div
                        className={
                          router.pathname === '/model/earning'
                            ? 'menu-item active'
                            : 'menu-item'
                        }
                      >
                        <AiOutlineDollar style={{ height: 23, width: 23 }} />
                        <span style={{ paddingLeft: 8 }}>
                          {trans.earnings}
                        </span>
                      </div>
                    </Link>
                    <Link legacyBehavior href="/model/payout-request">
                      <div
                        className={
                          router.pathname === '/model/payout-request'
                            ? 'menu-item active'
                            : 'menu-item'
                        }
                      >
                        <AiOutlineNotification style={{ height: 23, width: 23 }} />
                        <span style={{ paddingLeft: 8 }}>
                          {trans.payout}
                        </span>
                      </div>
                    </Link>

                    <div style={{ marginTop: 32 }}>
                      <Link legacyBehavior href={{ pathname: '/contact' }}>
                        <div
                          className={
                            router.pathname === '/contact'
                              ? 'menu-item active'
                              : 'menu-item'
                          }
                        >
                          <AiOutlineQuestionCircle style={{ width: 23, height: 23 }} />
                          <span style={{ paddingLeft: 8 }}>
                            {trans.contact}
                          </span>
                        </div>
                      </Link>
                      <div
                        className="menu-item"
                        aria-hidden
                        onClick={() => this.beforeLogout()}
                      >
                        <AiOutlineLogout style={{ width: 23, height: 23 }} />
                        <span style={{ paddingLeft: 8 }}>
                          {trans.signOut}
                        </span>
                      </div>
                      <div
                        className="menu-item"
                        aria-hidden
                        onClick={() => router.push('/model/', '/model/', { locale: 'en-US' })}
                      >
                        <img src="/usa.jpg" width={30} height={20} alt="" />
                        <span style={{ paddingLeft: 10 }}>
                          English
                        </span>
                      </div>

                      <div
                        className="menu-item"
                        aria-hidden
                        onClick={() => this.toggleLanguage('es-ES')}
                      >
                        <img src="/españa.jpg" width={30} height={20} alt="" />
                        <span style={{ paddingLeft: 10 }}>
                          Español
                        </span>
                      </div>

                      <div
                        className="menu-item"
                        aria-hidden
                        // onClick={() => this.toggleLanguage('pt-BR')}
                      >
                        <img src="/brasil.jpg" width={30} height={20} alt="" />
                        <span style={{ paddingLeft: 10 }}>
                          Portugués
                        </span>
                      </div>

                      <div
                        className="menu-item"
                        aria-hidden
                        // onClick={() => this.toggleLanguage('ru-RU')}
                      >
                        <img src="/rusia.jpg" width={25} height={20} alt="" style={{ border: '1px solid #dcdcdc' }} />
                        <span style={{ paddingLeft: 10 }}>
                          Русский
                        </span>
                      </div>
                    </div>
                  </div>
                )}
          {!currentUser.isPerformer && (
          <div className="profile-menu-item">
            <Link legacyBehavior href="/user/account" as="/user/account">
              <div
                className={
                  router.pathname === '/user/account'
                    ? 'menu-item active'
                    : 'menu-item'
                }
              >
                <AiOutlineIdcard style={{ height: 23, width: 23 }} />
                <span style={{ paddingLeft: 8 }}>
                  {trans.editProfile}
                </span>
              </div>
            </Link>
            <a onClick={this.showWalletModal.bind(this)}>
              <div
                className={
                  router.pathname === '/wallet-package'
                    ? 'menu-item active'
                    : 'menu-item'
                }
              >
                <GiWallet style={{ height: 23, width: 23 }} />
                <span style={{ paddingLeft: 8 }}>
                  {trans.wallet}
                </span>
              </div>
            </a>
            <Link legacyBehavior href="/user/my-favorite" as="/user/my-favorite">
              <div
                className={
                  router.pathname === '/user/my-favorite'
                    ? 'menu-item active'
                    : 'menu-item'
                }
              >
                <AiOutlineHeart style={{ height: 23, width: 23 }} />
                <span style={{ paddingLeft: 8 }}>
                  {trans.favorites}
                </span>
              </div>
            </Link>
            <Link legacyBehavior href="/user/my-wishlist" as="/user/my-wishlist">
              <div
                className={
                  router.pathname === '/user/my-wishlist'
                    ? 'menu-item active'
                    : 'menu-item'
                }
              >
                <AiOutlineClockCircle style={{ height: 23, width: 23 }} />
                <span style={{ paddingLeft: 8 }}>
                  {trans.wishes}
                </span>
              </div>
            </Link>
            <Link legacyBehavior href="/user/my-subscription" as="/user/my-subscription">
              <div
                className={
                  router.pathname === '/user/my-subscription'
                    ? 'menu-item active'
                    : 'menu-item'
                }
              >
                <AiOutlineStar style={{ width: 23, height: 23 }} />
                <span style={{ paddingLeft: 8 }}>
                  {trans.subscriptions}
                </span>
              </div>
            </Link>
            <Link legacyBehavior href="/user/purchased-media" as="/user/purchased-media">
              <div
                className={
                  router.pathname === '/user/purchased-media'
                    ? 'menu-item active'
                    : 'menu-item'
                }
              >
                <HiArchive style={{ height: 23, width: 23 }} />
                <span style={{ paddingLeft: 8 }}>
                  {trans.purchasedMedia}
                </span>
              </div>
            </Link>

            <Link legacyBehavior href="/user/payment-history" as="/user/payment-history">
              <div
                className={
                  router.pathname === '/user/payment-history'
                    ? 'menu-item active'
                    : 'menu-item'
                }
              >
                <AiOutlineDollarCircle style={{ width: 23, height: 23 }} />
                <span style={{ paddingLeft: 8 }}>
                  {trans.transactions}
                </span>
              </div>
            </Link>
            <Link legacyBehavior href={{ pathname: '/contact' }}>
              <div
                className={
                  router.pathname === '/contact'
                    ? 'menu-item active'
                    : 'menu-item'
                }
              >
                <AiOutlineQuestionCircle style={{ width: 23, height: 23 }} />
                <span style={{ paddingLeft: 8 }}>
                  {trans.contact}
                </span>
              </div>
            </Link>
            <div style={{ marginTop: 32 }}>
              <div
                className="menu-item"
                aria-hidden
                onClick={() => this.beforeLogout()}
              >
                <AiOutlineLogout style={{ width: 23, height: 23 }} />
                <span style={{ paddingLeft: 8 }}>
                  {trans.signOut}
                </span>
              </div>

              <div
                className="menu-item"
                aria-hidden
                onClick={() => this.toggleLanguage('en-US')}
              >
                <img src="/usa.jpg" width={30} height={20} alt="" />
                <span style={{ paddingLeft: 10 }}>
                  English
                </span>
              </div>

              <div
                className="menu-item"
                aria-hidden
                onClick={() => this.toggleLanguage('es-ES')}
              >
                <img src="/españa.jpg" width={30} height={20} alt="" />
                <span style={{ paddingLeft: 10 }}>
                  Español
                </span>
              </div>

              <div
                className="menu-item"
                aria-hidden
                onClick={() => this.beforeLogout()}
              >
                <img src="/brasil.jpg" width={30} height={20} alt="" />
                <span style={{ paddingLeft: 10 }}>
                  Portugués
                </span>
              </div>

              <div
                className="menu-item"
                aria-hidden
                onClick={() => this.beforeLogout()}
              >
                <img src="/rusia.jpg" width={30} height={20} alt="" style={{ border: '1px solid #dcdcdc' }} />
                <span style={{ paddingLeft: 10 }}>
                  Русский
                </span>
              </div>
            </div>
          </div>
        )}      
        </Drawer>  
        )}
      </Row>  
    </>
    )
  }
}