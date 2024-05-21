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
/* eslint-disable react/require-default-props */
/* eslint-disable no-sequences */
import { PureComponent } from 'react';
import { Input } from 'antd';
import Router from 'next/router';
// import './search-bar.less';
var Search = Input.Search;
var SearchBar = /** @class */ (function (_super) {
    __extends(SearchBar, _super);
    function SearchBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSearch = function (q) {
            if (!q || !q.trim())
                return;
            Router.push({ pathname: '/search', query: { q: q } });
        };
        return _this;
    }
    SearchBar.prototype.render = function () {
        var _this = this;
        var onEnter = this.props.onEnter;
        return (<div className="search-bar">
        <Search placeholder="Type to search here ..." allowClear enterButton onPressEnter={function (e) { var _a; return (_this.onSearch((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value), onEnter && onEnter(e)); }} onSearch={this.onSearch.bind(this)}/>
      </div>);
    };
    return SearchBar;
}(PureComponent));
export default SearchBar;
