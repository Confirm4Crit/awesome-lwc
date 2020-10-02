import { LightningElement } from 'lwc';
import { tabItems, tabElements } from './tabs';

export default class App extends LightningElement {
  currentNavigationItem = 'components';
  tabItems = tabItems;
  nextNavigationItem;
  previousNavigationItem;

  tabElements = tabElements;
  _isWindowHistoryUpdate = false;

  connectedCallback() {
    let that = this;
    window.onpopstate = function (event) {
      if (event.state && event.state.page) {
        that._isWindowHistoryUpdate = true;
        that.tabItems[that.currentNavigationItem].visible = false;
        that.currentNavigationItem = event.state.page;
        that.handleCategoryChange();
      }
    };
    if (window.location.hash) {
      const location = window.location.hash.substring(
        1,
        window.location.hash.length
      );
      if (this.tabElements.indexOf(location) > -1) {
        this.currentNavigationItem = location;
        window.history.replaceState({ page: location }, null, '');
      }
    } else {
      window.history.replaceState(
        { page: this.currentNavigationItem },
        null,
        ''
      );
    }
    this.tabItems[this.currentNavigationItem].visible = true;
  }

  handleCategoryChange(event) {
    if (event) {
      if (this.currentNavigationItem !== event.detail) {
        this.tabItems[this.currentNavigationItem].visible = false;
        this.currentNavigationItem = event.detail;
      } else {
        return;
      }
    }
    this.tabItems[this.currentNavigationItem].visible = true;
  }

  hideCurrentNavigationItemFromNav() {
    this.tabItems[
      this.tabElements[
      this.tabElements.indexOf(this.currentNavigationItem)
      ]
    ].visible = false;
  }

  scrollAndLocation() {
    if (!this._isWindowHistoryUpdate) {
      window.history.pushState(
        { page: this.currentNavigationItem },
        null,
        '#'.concat(this.currentNavigationItem)
      );
    }
    this._isWindowHistoryUpdate = false;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
