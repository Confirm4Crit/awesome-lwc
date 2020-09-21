import { LightningElement } from 'lwc';
import { componentListData } from 'data/componentListData';

export default class ComponentList extends LightningElement {
    components = {};
    connectedCallback() {
        this.components = this.allComponents = componentListData;
    }

    handleSearchKeyInput(event) {
        const searchKey = event.target.value.toLowerCase();
        this.components = this.allComponents.filter((components) =>
            components.title.toLowerCase().includes(searchKey)
        );
    }
}
