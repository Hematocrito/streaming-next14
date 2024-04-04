/* eslint-disable react/require-default-props */
/* eslint-disable no-sequences */
import { PureComponent } from 'react';
import { Input } from 'antd';
import Router from 'next/router';
// import './search-bar.less';

const { Search } = Input;
interface IProps {
  onEnter?: Function;
}

class SearchBar extends PureComponent<IProps> {
  onSearch = (q:any) => {
    if (!q || !q.trim()) return;
    Router.push({ pathname: '/search', query: { q } });
  };

  render() {
    const { onEnter } = this.props;
    return (
      <div className="search-bar">
        <Search
          placeholder="Type to search here ..."
          allowClear
          enterButton
          onPressEnter={(e: any) => (this.onSearch(e?.target?.value), onEnter(e))}
          onSearch={this.onSearch.bind(this)}
        />
      </div>
    );
  }
}

export default SearchBar;
