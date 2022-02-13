import BaseModel from "../../../core/components/input-widget/BaseModel";

export default class BlogModel extends BaseModel {
    title = ''
    body = ''
    imageUrl = '';

    rules = {
        title: 'required',
        body: 'required'
    }

    attributeLabels = {
        imageUrl: 'Image URL',
        body: 'Description',
        title: 'Title',
    }

    constructor(data = {}) {
        super()
        Object.assign(this, {...data})
    }
}