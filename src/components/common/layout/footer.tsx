/* eslint-disable react/jsx-no-target-blank */
import { PureComponent } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { IUser, IUIConfig } from 'src/interfaces';
import { withRouter } from 'next/router';
import { FooterTranslations } from './footer-translations';

interface IProps {
  currentUser: IUser;
  ui: IUIConfig;
  router: any;
}
const footerDate = new Date().getFullYear();
class Footer extends PureComponent<IProps> {
  state = {
    newTwitterLink: '',
    newInstagramLink: '',
    newFacebookLink: '',
    newYoutubeLink: ''
  };

  componentDidMount() {
    this.checkLink();
  }

  checkLink() {
    const { ui } = this.props;
    if (ui?.twitterLink?.indexOf('http:// ') === 0 || ui?.twitterLink?.indexOf('https:// ') === 0) {
      this.setState({ newTwitterLink: ui.twitterLink });
    } else {
      this.setState({ newTwitterLink: `https:// ${ui.twitterLink}` });
    }

    if (ui?.instagramLink?.indexOf('http:// ') === 0 || ui?.instagramLink?.indexOf('https:// ') === 0) {
      this.setState({ newInstagramLink: ui.instagramLink });
    } else {
      this.setState({ newInstagramLink: `https:// ${ui.instagramLink}` });
    }

    if (ui.facebookLink?.indexOf('http:// ') === 0 || ui.facebookLink?.indexOf('https:// ') === 0) {
      this.setState({ newFacebookLink: ui.facebookLink });
    } else {
      this.setState({ newFacebookLink: `https:// ${ui.facebookLink}` });
    }

    if (ui.youtubeLink?.indexOf('http:// ') === 0 || ui.youtubeLink?.indexOf('https:// ') === 0) {
      this.setState({ newYoutubeLink: ui.youtubeLink });
    } else {
      this.setState({ newYoutubeLink: `https:// ${ui.youtubeLink}` });
    }
  }

  render() {
    const { router } = this.props;
    const { ui, currentUser } = this.props;
    const {
      newTwitterLink, newInstagramLink, newFacebookLink, newYoutubeLink
    } = this.state;
    const menus = ui.menus.filter((m) => m.section === 'footer');
    const translations = router.locale === '' ? FooterTranslations['en-US'] : FooterTranslations['es-ES'];

    return (
      <div className="main-footer">
        <div className="main-container">
          <ul>
            {!currentUser._id && (
              <>
                <li className={router.pathname === '/auth/login' ? 'active' : ''}>
                  <Link legacyBehavior href="/auth/login">
                    <a>{translations.login}</a>
                  </Link>
                </li>
                <li className={router.pathname === '/auth/register' ? 'active' : ''}>
                  <Link legacyBehavior href={{ pathname: '/auth/register' }} as="/auth/register">
                    <a>{translations.signUp}</a>
                  </Link>
                </li>
              </>
            )}
            {menus
              && menus.length > 0
              && menus.map((item) => (
                <li key={item._id} className={router.pathname === item.path ? 'active' : ''}>
                  <a rel="noreferrer" href={item.path} target={item.isNewTab ? '_blank' : ''}>
                    {item.title}
                  </a>
                </li>
              ))}
          </ul>
          <div className="social-link">
            {!!ui.twitterLink && <a href={newTwitterLink} target="_blank"><img src="/twitter.png" alt="Twitter" width={35} /></a>}
            {!!ui.instagramLink && <a href={newInstagramLink} target="_blank"><img src="/instagram.png" alt="Instagram" width={35} /></a>}
            {!!ui.facebookLink && <a href={newFacebookLink} target="_blank"><img src="/facebook.png" alt="Facebook" width={35} /></a>}
            {!!ui.youtubeLink && <a href={newYoutubeLink} target="_blank"><img src="/youtube.png" alt="Youtube" width={35} /></a>}
          </div>
          {/* eslint-disable-next-line react/no-danger */}
          {!ui.footerContent ? <div className="footer-content" dangerouslySetInnerHTML={{ __html: ui.footerContent }} />
            : (
              <div className="copyright-text" style={{ color: 'white', textAlign: 'center' }}>
                <span>
                  <Link legacyBehavior href="/">
                    <img src="/logo-footer2.png" style={{ width: 100 }} alt="" />
                  </Link>
                  {' '}
                  © Copyright
                  {' '}
                  {footerDate}
                </span>
                <p style={{ textAlign: 'center' }}>
                  <img src="https:// www.dmca.com/img/dmca_logo.png?=sd" alt="" style={{ width: 70 }} />
                </p>
              </div>
            )}
        </div>
      </div>
    );
  }
}
const mapState = (state: any) => ({
  currentUser: state.user.current,
  ui: state.ui
});
export default withRouter(connect(mapState)(Footer));
