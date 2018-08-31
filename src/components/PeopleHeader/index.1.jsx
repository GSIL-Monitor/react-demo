import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Utils as util } from 'utils';
import { Link } from 'react-router';
import Data from 'data_js';
import { Icon, Popover } from 'antd';
import { getAPI } from 'api';
import { intlFormatMessage, moment } from 'lang';
import { RouteTree } from 'models/routeTree';
import WaterMark from 'widget/waterMark';
import puiProps from 'helper/puiProps';
import { renderLarkSvg } from 'helper/renderHelper';
import FeedbackBar from './components/feedbackBar';
import GlobalSearch from './components/globalSearch';
import ConfigMenu from './components/config';
import NexusMenu from './components/nexus';
import SpringBanner2018 from './components/springBanner2018';
import globalNotice from './globalNotice';
import { FormData } from 'mixins/FormData';
import Dashboard from './portal/dashboard';
import Entries from './portal/entries';
import 'font/iconfont.js';
import { sloganList } from 'data/slogan.json';

import LOGO_SRC from 'images/bytedancepeople-logo.png';
import LOGO_100_SRC from 'people-fe-common/images/ee100_logo.png';

// MOCK DATA, COMMENT IT WHEN RELEASE
// import { MOCK_DASHBOARD_LIST } from 'api/mocks/dashboard';


const getSetting = getAPI('dashboard.setting');
const getStrictSetting = getAPI('dashboard.strictSetting');
const getTodayDashboard = getAPI('dashboard.todayDashboard');

class NewFrame extends Component {
  static childContextTypes = {
    setting: PropTypes.object,
  }
  state = {
    userId: '',
    host: '',
    userName: '',
    display: [],
    feedbackVisible: false,
    interviews: [],
    offers: [],
    sloganCn: '',
    sloganEn: '',
    todayDate: '',
    week: '',
  };
  componentWillMount() {
    globalNotice.show();
    const display = Array(...Array(8)).map((item, i) => {
      return { area: 'up', display: true };
    });
    this.setState({
      display,
    });
    this.getSlogan();
    this.fetchDashboard();
  }
  hideFeedback = () => {
    this.setState({ feedbackVisible: false });
  };
  handleFeedbackVisibleChange = (visible) => {
    this.setState({ feedbackVisible: visible });
  };

  fetchDashboard() {
    return Promise.all([
      getSetting().catch(() => null),
      getStrictSetting().catch(() => null),
      getTodayDashboard().catch(() => null),
    ]).then(([setting, remuneration, todos]) => {
      // MOCK DATA, COMMENT IT WHEN RELEASE
      // todos = MOCK_DASHBOARD_LIST;

      const strictPermissions = (remuneration || {}).data || {};
      // 直接使用 Browser 实际使用的域名
      const host = window.location.origin;
      let tabs = [];
      if (setting) {
        tabs = tabs.concat(setting.tabs || []);
      }
      if (strictPermissions.can_see_cnb_card) {
        tabs.push({
          name: 'compensation',
          area: 'down',
          id: 115,
          father_id: 1,
          path: 'root.compensation',
          display: true,
        });
      }
      if (tabs) {
        this.routeTree = new RouteTree(tabs);
        this.setState({
          host,
          display: this.routeTree.getDisplay(),
        });
      }
      if (todos) {
        this.setState({
          interviews: todos.interviews,
          offers: todos.offers,
        });
      }
      return setting;
    });
  }

  getSlogan() {
    // temporary code
    ['slogan1', 'slogan2', 'slogan3'].forEach(key => {
      localStorage.getItem(key) && localStorage.removeItem(key)
    });
    const sloganDate = localStorage.getItem('portalSloganDate');
    const currentTime = new Date();
    const todayDate = moment().format('l');
    const week = moment().format('dddd');

    const sloganNum = sloganList.length;
    if (sloganDate === null || sloganDate != todayDate) {
      // 未存储slogan日期，存储新的slogan日期
      localStorage.setItem('portalSloganDate', todayDate);
      const newArray = Array.from(new Array(sloganNum),(val,index)=>index);
      const randomArr = newArray.sort(function(){return Math.random() > 0.5}).slice(0,3);
      localStorage.setItem('portalSloganIdList', JSON.stringify(randomArr));
    }else{
      // 已经存在当天日期，判断是否存在slogan
      if(localStorage.getItem('portalSloganIdList') === null){
        const newArray = Array.from(new Array(sloganNum),(val,index)=>index);
        const randomArr = newArray.sort(function(){return Math.random() > 0.5}).slice(0,3);
        localStorage.setItem('portalSloganIdList', JSON.stringify(randomArr));
      }
    }
    // 为当前时间选择合适的slogan显示
    const todayTime = parseInt(currentTime.getHours(), 10);
    let slogan = null;
    const sloganIdList = JSON.parse(localStorage.getItem('portalSloganIdList'));
    if (todayTime < 12) {
      slogan = sloganList[sloganIdList[0]];
    } else if (todayTime < 18) {
      slogan = sloganList[sloganIdList[1]];
    } else {
      slogan = sloganList[sloganIdList[2]];
    }
    const sloganCn = slogan.cn;
    const sloganEn = slogan.en;
    this.setState({
      sloganCn,
      sloganEn,
      todayDate,
      week,
    });
  }
  render() {
    const { location, history } = this.props;
    const { host, display, hideHeader, feedbackVisible, interviews = [], offers = [], sloganCn, sloganEn, todayDate, week } = this.state;
    const userEntries = display.filter(tab => tab.area === 'up');
    const systemEntries = display.filter(tab => tab.area === 'down');
    const hasRightMenu = interviews.length || offers.length;
    /* eslint-disable react/jsx-filename-extension */
    return (
      <div className="ant-layout-aside clearfix">
        <div className="frame-header">
          <div className="header-container">
            <div className="header-groups header-item-fixed">
              <div className="people-portal-logo">
                <a href="/"><img src={LOGO_SRC} alt="people-logo" /></a>
              </div>
            </div>
            <div className="header-groups header-item-expand header-item-reverse">
              <ConfigMenu host={host} className="header-item header-item-fixed" />
              <div className="feedback-item pui">
                <Popover
                  {...puiProps('Popover', true)}
                  placement="bottomRight"
                  overlayClassName="feedback-popover"
                  visible={feedbackVisible}
                  onVisibleChange={this.handleFeedbackVisibleChange}
                  trigger="click"
                  content={
                    <div>
                      <div className="pui-font-title-bold">{intlFormatMessage('People.base.feedbackTipsTitle')}</div>
                      <div className="feedback-popover-content pui-font-regular-gray">{intlFormatMessage('People.base.feedbackTipsContent')}</div>
                      <FeedbackBar
                        hideFeedback={this.hideFeedback}
                      />
                    </div>
                  }
                >
                  <span>
                    <svg className="icon" aria-hidden="true" style={{ color: 'white', marginRight: '8px' }}>
                      <use xlinkHref="#icon-service" />
                    </svg>
                    <span className="header-text">{intlFormatMessage('People.base.peopleService')}</span>
                  </span>
                </Popover>
              </div>
              <NexusMenu
                userEntries={userEntries}
                systemEntries={systemEntries}
                routeTree={this.routeTree}
                className="header-item header-item-fixed middle-item"
              />
              <GlobalSearch
                className="search-icon header-item header-item-fixed inputSearch"
                size="large"
                history={history}
                location={location}
                placeholder={intlFormatMessage('People.gs.enterKeyWord')}
              />
            </div>
          </div>
          <div className="header-info">
            <div className="slogan">
              <div className="slogan-main">
                {sloganCn}
              </div>
              <div className="slogan-sub">
                {sloganEn}
              </div>
            </div>
            <div className="header-time">
              {todayDate} <span className="week">{week}</span>
            </div>
          </div>
        </div>
        <div className="ant-layout-content-container tow-columns-width">
          <div className={`menu-container ${hasRightMenu ? 'col-2' : ''}`}>
            <div className="ant-layout-main left-menu">
              <div className="ant-layout-container portal-background">
                <div className="ant-layout-content">
                  <div className="portal-container">
                    <div>
                      <h3 className="portal-about-me">{intlFormatMessage('People.home.aboutMe')}</h3>
                      <Entries entries={userEntries} {...this.props} routeTree={this.routeTree} />
                    </div>
                    <SpringBanner2018 />
                    <div>
                      <h3 className="portal-application">{intlFormatMessage('People.home.application')}</h3>
                      <Entries entries={systemEntries} {...this.props} routeTree={this.routeTree} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ant-layout-main right-menu">
              <Dashboard interviews={interviews} offers={offers} />
            </div>
          </div>
        </div>
        <div className="ant-layout-footer" style={{ lineHeight: 1 }}>
          <img src={LOGO_100_SRC} alt="效率工程团队" />
        </div>
      </div>
    );
  }
}

export default NewFrame;
