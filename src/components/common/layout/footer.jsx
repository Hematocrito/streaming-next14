var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* eslint-disable react/jsx-no-target-blank */
import { PureComponent } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { FooterTranslations } from './footer-translations';
var footerDate = new Date().getFullYear();
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            newTwitterLink: '',
            newInstagramLink: '',
            newFacebookLink: '',
            newYoutubeLink: ''
        };
        return _this;
    }
    Footer.prototype.componentDidMount = function () {
        this.checkLink();
    };
    Footer.prototype.checkLink = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var ui = this.props.ui;
        if (((_a = ui === null || ui === void 0 ? void 0 : ui.twitterLink) === null || _a === void 0 ? void 0 : _a.indexOf('http:// ')) === 0 || ((_b = ui === null || ui === void 0 ? void 0 : ui.twitterLink) === null || _b === void 0 ? void 0 : _b.indexOf('https:// ')) === 0) {
            this.setState({ newTwitterLink: ui.twitterLink });
        }
        else {
            this.setState({ newTwitterLink: "https:// ".concat(ui.twitterLink) });
        }
        if (((_c = ui === null || ui === void 0 ? void 0 : ui.instagramLink) === null || _c === void 0 ? void 0 : _c.indexOf('http:// ')) === 0 || ((_d = ui === null || ui === void 0 ? void 0 : ui.instagramLink) === null || _d === void 0 ? void 0 : _d.indexOf('https:// ')) === 0) {
            this.setState({ newInstagramLink: ui.instagramLink });
        }
        else {
            this.setState({ newInstagramLink: "https:// ".concat(ui.instagramLink) });
        }
        if (((_e = ui.facebookLink) === null || _e === void 0 ? void 0 : _e.indexOf('http:// ')) === 0 || ((_f = ui.facebookLink) === null || _f === void 0 ? void 0 : _f.indexOf('https:// ')) === 0) {
            this.setState({ newFacebookLink: ui.facebookLink });
        }
        else {
            this.setState({ newFacebookLink: "https:// ".concat(ui.facebookLink) });
        }
        if (((_g = ui.youtubeLink) === null || _g === void 0 ? void 0 : _g.indexOf('http:// ')) === 0 || ((_h = ui.youtubeLink) === null || _h === void 0 ? void 0 : _h.indexOf('https:// ')) === 0) {
            this.setState({ newYoutubeLink: ui.youtubeLink });
        }
        else {
            this.setState({ newYoutubeLink: "https:// ".concat(ui.youtubeLink) });
        }
    };
    Footer.prototype.render = function () {
        var router = this.props.router;
        var _a = this.props, ui = _a.ui, currentUser = _a.currentUser;
        var _b = this.state, newTwitterLink = _b.newTwitterLink, newInstagramLink = _b.newInstagramLink, newFacebookLink = _b.newFacebookLink, newYoutubeLink = _b.newYoutubeLink;
        var menus = ui.menus.filter(function (m) { return m.section === 'footer'; });
        var translations = router.locale === '' ? FooterTranslations['en-US'] : FooterTranslations['es-ES'];
        return (<div className="main-footer">
        <div className="main-container">
          <ul>
            {!currentUser._id && (<>
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
              </>)}
            {menus
                && menus.length > 0
                && menus.map(function (item) { return (<li key={item._id} className={router.pathname === item.path ? 'active' : ''}>
                  <a rel="noreferrer" href={item.path} target={item.isNewTab ? '_blank' : ''}>
                    {item.title}
                  </a>
                </li>); })}
          </ul>
          <div className="social-link">
            {!!ui.twitterLink && <a href={newTwitterLink} target="_blank"><img src="/twitter.png" alt="Twitter" width={35}/></a>}
            {!!ui.instagramLink && <a href={newInstagramLink} target="_blank"><img src="/instagram.png" alt="Instagram" width={35}/></a>}
            {!!ui.facebookLink && <a href={newFacebookLink} target="_blank"><img src="/facebook.png" alt="Facebook" width={35}/></a>}
            {!!ui.youtubeLink && <a href={newYoutubeLink} target="_blank"><img src="/youtube.png" alt="Youtube" width={35}/></a>}
          </div>
          {/* eslint-disable-next-line react/no-danger */}
          {!ui.footerContent ? <div className="footer-content" dangerouslySetInnerHTML={{ __html: ui.footerContent }}/>
                : (<div className="" style={{ color: 'white', textAlign: 'center' }}>
                <span>
                  <Link legacyBehavior href="/">
                    <img src="/logo-footer2.png" style={{ width: 100 }} alt=""/>
                  </Link>
                  {' '}
                  © Copyright
                  {' '}
                  {footerDate}
                </span>
                <p style={{ textAlign: 'center' }}>
                  <img src="https:// www.dmca.com/img/dmca_logo.png?=sd" alt="" style={{ width: 70 }}/>
                </p>
              </div>)}
        </div>
      </div>);
    };
    return Footer;
}(PureComponent));
var mapState = function (state) { return ({
    currentUser: state.user.current,
    ui: state.ui
}); };
export default withRouter(connect(mapState)(Footer));
