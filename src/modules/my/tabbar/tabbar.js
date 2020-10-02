import { LightningElement, api } from 'lwc';

export default class TabBar extends LightningElement {
  activeTab;
  isRendered = false;
  tabItemsPrivate = [];

  @api
  set tabItems(value) {
    this.tabItemsPrivate = [];
    Object.keys(value).forEach((key) => {
      this.tabItemsPrivate.push(value[key]);
      if (value[key].visible) {
        this.activeTab = value[key].value;
      }
    });
  }
  get tabItems() {
    return this.tabItemsPrivate;
  }

  @api
  set selectedTab(value) {
    console.log(value);
    if (value && this.activeTab !== value) {
      this.styleTab(this.activeTab, value);
      this.activeTab = value;
    }
  }
  get selectedTab() {
    return this.activeTab;
  }

  renderedCallback() {
    if (this.isRendered) return;
    this.isRendered = true;
    this.template
      .querySelector(`a[data-item="${this.activeTab}"]`)
      .parentNode.classList.add('slds-is-active');
  }

  handleTabItemClick(event) {
    const choice = event.currentTarget.dataset.item;
    this.styleTab(this.activeTab, choice);
    this.activeTab = choice;
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent('categorychange', {
        detail: choice,
        bubbles: true
      })
    );
  }

  styleTab(itemOld, itemNew) {
    const tabOld = this.template.querySelector(`a[data-item="${itemOld}"]`);
    const tabNew = this.template.querySelector(`a[data-item="${itemNew}"]`);
    tabOld.parentNode.classList.remove('slds-is-active');
    tabNew.parentNode.classList.add('slds-is-active');
  }
}
