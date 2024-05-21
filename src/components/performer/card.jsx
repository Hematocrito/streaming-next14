var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Modal, Tooltip, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
//import { Event } from 'src/socket';
import Link from 'next/link';
import { BsShareFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { HomeListingTranslations } from './home-listing-translations';
import Image from 'next/image';
function ShareModalContent(_a) {
    var _this = this;
    var performer = _a.performer;
    var router = useRouter();
    var locale = router.locale;
    var translations = locale === '' ? HomeListingTranslations['en-US'] : HomeListingTranslations['es-ES'];
    var onShare = function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText("".concat(window.location.href, "model/").concat(performer.username))];
                case 1:
                    _a.sent();
                    message.success('Link has been copied to clipboard!');
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    message.error('Error while coping the link, please copy link from browser directly!');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<div style={{ paddingTop: 8, paddingBottom: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Image height={30} width={30} style={{
            borderRadius: '50%',
            objectFit: 'cover'
        }} alt="Avatar" src={'/img/beso-grande.jpg'}/>
        <span style={{
            fontSize: 16, fontWeight: 'bolder', marginTop: 4, marginLeft: 4, color: 'black'
        }}>
          @
          {performer === null || performer === void 0 ? void 0 : performer.username}
        </span>
        <Image src="/img/icon-verified.png" height={20} width={20} style={{ marginLeft: 4, marginTop: 6 }} alt=""/>
      </div>
      <div style={{
            borderTop: '1px solid rgb(199 199 199)', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 8
        }} onClick={onShare}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <BsShareFill color="#0cecf8" fontSize={18} style={{ marginTop: 12 }}/>
        </div>
        <span style={{
            fontSize: 14, fontWeight: 'bolder', marginTop: 12, marginLeft: 16, color: 'black'
        }}>
          {translations.shareProfileBtn}
        </span>
      </div>
    </div>);
}
export function PerformerCard(_a) {
    var performer = _a.performer, _b = _a.linkToLiveStream, linkToLiveStream = _b === void 0 ? false : _b;
    var _c = useState(performer.isOnline), online = _c[0], setOnline = _c[1];
    var _d = useState(false), showShareModal = _d[0], setShowShareModal = _d[1];
    var href = linkToLiveStream ? {
        pathname: '/stream',
        query: { username: (performer === null || performer === void 0 ? void 0 : performer.username) || (performer === null || performer === void 0 ? void 0 : performer._id) }
    } : {
        pathname: '/model/profile',
        query: { username: (performer === null || performer === void 0 ? void 0 : performer.username) || (performer === null || performer === void 0 ? void 0 : performer._id) }
    };
    var as = linkToLiveStream ? "/stream/".concat((performer === null || performer === void 0 ? void 0 : performer.username) || (performer === null || performer === void 0 ? void 0 : performer._id)) : "/model/".concat((performer === null || performer === void 0 ? void 0 : performer.username) || (performer === null || performer === void 0 ? void 0 : performer._id));
    return (<>
      <Link legacyBehavior href={'/stream'} as={"/stream/".concat((performer === null || performer === void 0 ? void 0 : performer.username) || (performer === null || performer === void 0 ? void 0 : performer._id))}>
        <a>
          <div className='model-card' style={{ backgroundImage: "url(/img/imagen5.jpg)" }}>
          {performer.streamingStatus === 'public' && (<Image src="/img/live-rosa.png" alt="" className="live"/>)}
          {performer.streamingStatus === 'private' && (<Image src="/live-rojo.png" alt="" className="live"/>)}  
            <Tooltip title={(performer === null || performer === void 0 ? void 0 : performer.name) || (performer === null || performer === void 0 ? void 0 : performer.username)}>
              <Image className="avatar" alt="Avatar" src={'/img/beso-grande.jpg'} width={100} height={100}/>
              {performer.streamingStatus !== 'private' && performer.streamingStatus !== 'public' && online === 1 && (<span className="online-status active"/>)}
              <div className="model-name"/>
              <div className="model-username-wrapper">
                <span>{(performer === null || performer === void 0 ? void 0 : performer.name) || (performer === null || performer === void 0 ? void 0 : performer.username) || 'N/A'}</span>
                <Image src="/img/icon-verified.png" width={16} height={16} style={{ height: 16, marginLeft: 3 }} alt=""/>
                <br />
                <span className="model-username">
                  @
                  {performer === null || performer === void 0 ? void 0 : performer.username}
                  {' '}
                </span>
              </div>
            </Tooltip>     

            <div className="feed-top-right">
              <MoreOutlined onClick={function (e) {
            e.preventDefault();
            setShowShareModal(true);
        }}/>
            </div>     
          </div>
        </a>
      </Link>
      <Modal width={275} open={showShareModal} footer={null} onCancel={function () { return setShowShareModal(false); }} className="shareModal">
        <ShareModalContent performer={performer}/>
      </Modal>
    </>);
}
PerformerCard.defaultProps = {
    linkToLiveStream: false
};
export default PerformerCard;
