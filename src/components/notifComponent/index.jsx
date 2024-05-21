var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import HeaderIconContainer from '@components/common/layout/header-icon-container';
import NotificationHeaderMenu from '@components/notification/NotificationHeaderMenu';
import { notificationService } from '@services/notification.service';
import { userService } from '@services/user.service';
import { createClient } from '@supabase/supabase-js';
import { Dropdown } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import { firebaseCloudMessaging } from '../../../utils/firebase';
function NotifComponent(_a) {
    var _this = this;
    var currentUser = _a.currentUser;
    var _b = useState([]), notifications = _b[0], setNotifications = _b[1];
    var _c = useState(0), unreadCount = _c[0], setUnreadCount = _c[1];
    var initialData = function () { return __awaiter(_this, void 0, void 0, function () {
        var request, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, notificationService.search({
                        limit: 50, sort: 'desc', sortBy: 'updatedAt'
                    })];
                case 1:
                    request = _a.sent();
                    if (request.status === 0) {
                        data = request.data;
                        if (data.data.length > 0) {
                            setNotifications(data.data);
                            setUnreadCount(data.data.filter(function (notif) { return !notif.read; }).length);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        initialData();
    }, []);
    var readAll = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, notificationService.readAll()];
                case 1:
                    _a.sent();
                    initialData();
                    return [2 /*return*/];
            }
        });
    }); };
    var readOne = function (notification) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!notification.read) return [3 /*break*/, 2];
                    //  goi api PUT read
                    return [4 /*yield*/, notificationService.read(notification._id)];
                case 1:
                    //  goi api PUT read
                    _a.sent();
                    initialData();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        // LISTEN CHANGES FOR IN-APP NOTIF
        var client = createClient('https://ukoppnzhogvmkxwmxriv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrb3Bwbnpob2d2bWt4d214cml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2MzI0MDQsImV4cCI6MjAwODIwODQwNH0.GKHaBWjdaWLJinim2ZEI4G131qsqqaIk1e29tuVI0iM');
        var channel = client.channel('room-1');
        channel
            .on('broadcast', { event: 'test' }, function (payload) {
            console.log('PAYLOAD--', payload);
            initialData();
        })
            .subscribe();
        // END LISTEN CHANGES FOR IN-APP NOTIF
        // LISTEN CHANGES FOR PUSH NOTIF
        // Event listener that listens for the push notification event in the background
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', function (event) {
                console.log('event for the service worker', event);
                var notification = event.data.firebaseMessaging.payload.notification;
                console.log('new push notification', notification);
            });
        }
        // Calls the getMessage() function if the token is there
        function setToken() {
            return __awaiter(this, void 0, void 0, function () {
                var token, updateMeRequest, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, firebaseCloudMessaging.init()];
                        case 1:
                            token = _a.sent();
                            console.log('token', token);
                            if (!token) return [3 /*break*/, 3];
                            console.log('token', token);
                            return [4 /*yield*/, userService.updateMe(__assign(__assign({}, currentUser), { deviceToken: token }))];
                        case 2:
                            updateMeRequest = _a.sent();
                            console.log('updateMeRequest', updateMeRequest);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            console.log(error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        setToken();
        // END LIST CHANGES POR PUSH NOTIF
    });
    return (<HeaderIconContainer value={unreadCount} isDesktop>
      <Dropdown overlay={<NotificationHeaderMenu notifications={notifications} readAll={readAll} readOne={readOne}/>} forceRender trigger={['click']} onOpenChange={function (open) {
            if (open) {
                setUnreadCount(0);
            }
        }}>
        <AiOutlineBell className="middle-icon"/>
      </Dropdown>
    </HeaderIconContainer>);
}
export default NotifComponent;
